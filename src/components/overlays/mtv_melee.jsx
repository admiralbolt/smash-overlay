import React from "react";
import io from 'socket.io-client';


export default class MTVMeleeOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "some guy",
      socket: io("/overlay_info")
    };

    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({player: data.player});
    });
  }

  render() {
    return (
      <div id="contact">
        Player: {this.state.player}
      </div>
    );
  }
}
