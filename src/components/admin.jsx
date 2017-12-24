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
      <div id="admin" className="admin">
        <div className="card-panel teal lighten-2">
          Left Player: <input type="text" name="left_player" id="left_player" onChange={this.update_state} value={this.state.overlay_info.left_player} /> <br />
        </div>
        <div className="row">
          Left Character: <input type="text" name="left_character" id="left_character" onChange={this.update_state} value={this.state.overlay_info.left_character} /> <br />
          Left Score: <input type="text" name="left_score" id="left_score" onChange={this.update_state} value={this.state.overlay_info.left_score} /> <br />

          Right Player: <input type="text" name="right_player" id="right_player" onChange={this.update_state} value={this.state.overlay_info.right_player} /> <br />
          Right Character: <input type="text" name="right_character" id="right_character" onChange={this.update_state} value={this.state.overlay_info.right_character} /> <br />
          Right Score: <input type="text" name="right_score" id="right_score" onChange={this.update_state} value={this.state.overlay_info.right_score} /> <br />

          Tourney Name: <input type="text" name="tourney_name" id="tourney_name" onChange={this.update_state} value={this.state.overlay_info.tourney_name} /> <br />
          Tourney Round: <input type="text" name="tourney_round" id="tourney_round" onChange={this.update_state} value={this.state.overlay_info.tourney_round} /> <br />
          Tourney Link: <input type="text" name="tourney_link" id="tourney_link" onChange={this.update_state} value={this.state.overlay_info.tourney_link} /> <br />

          <button id="send_update" name="send_update" onClick={this.update_info}>Send Update</button>
        </div>
      </div>
    );
  }
}
