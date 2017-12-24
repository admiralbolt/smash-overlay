import React from "react";
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: "some guy",
      socket: io("/overlay_info")
    };

    this.update_info = this.update_info.bind(this);
    this.update_state = this.update_state.bind(this);
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({player: data.player});
    });
  }

  update_state(e) {
    let update = {};
    update[e.target.name] = e.target.value;
    this.setState(update);
  }

  update_info(e) {
    const data = {
      "player": this.state.player
    };
    this.state.socket.emit("update_overlay", data);
  }

  componentDidMount() {
    browserHistory.push('/');
  }
  render() {
    return (
      <div id="home">
        Player:
        <input type="text" name="player" id="player" onChange={this.update_state} value={this.state.player} />
        <button id="send_update" name="send_update" onClick={this.update_info}>Send Update</button>
      </div>
    );
  }
}
