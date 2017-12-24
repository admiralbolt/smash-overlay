import React from "react";
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: props.overlay_info,
      socket: io('/overlay_info')
    };

    this.update_info = this.update_info.bind(this);
    this.update_state = this.update_state.bind(this);
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data});
    });
  }

  update_state(e) {
    let update = {...this.state.overlay_info};
    update[e.target.name] = e.target.value;
    this.setState({
      overlay_info: update
    });
  }

  update_info(e) {
    this.props.update_callback(this.state.overlay_info);
  }

  render() {
    return (
      <div id="home">
        Player:
        <input type="text" name="player" id="player" onChange={this.update_state} value={this.state.overlay_info.player} />
        <button id="send_update" name="send_update" onClick={this.update_info}>Send Update</button>
      </div>
    );
  }
}
