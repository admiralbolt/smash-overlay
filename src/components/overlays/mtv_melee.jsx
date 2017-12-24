import React from "react";
import io from 'socket.io-client';


export default class MTVMeleeOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: props.overlay_info,
      socket: io("/overlay_info")
    };
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
        Player: {this.state.overlay_info.player}
      </div>
    );
  }
}
