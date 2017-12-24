import React from "react";
import io from 'socket.io-client';


export default class MTVMeleeOverlay extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      overlay_info: props.overlay_info,
      socket: io("/overlay_info")
    };
    console.log(this.state.overlay_info.left_player);
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data});
    });
  }

  render() {
    return (
      <div id="contact">
        Left Player: {this.state.overlay_info.left_player} <br />
        Left Character: {this.state.overlay_info.left_character} <br />
        Left Score: {this.state.overlay_info.left_score} <br />
        <br />
        Right Player: {this.state.overlay_info.right_player} <br />
        Right Character: {this.state.overlay_info.right_character} <br />
        Right Score: {this.state.overlay_info.right_score} <br />
        <br />
        Tourney Name: {this.state.overlay_info.tourney_name} <br />
        Tourney Round: {this.state.overlay_info.tourney_round} <br />
        Tourney Link: {this.state.overlay_info.tourney_link} <br />
      </div>
    );
  }
}
