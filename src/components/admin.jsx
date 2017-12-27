import React from "react";
import io from 'socket.io-client';
import materialize from 'materialize-css';
import CharacterSelect from './character_select.jsx';
require('../styles/admin.scss');

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: props.overlay_info,
      socket: io('/overlay_info'),
      has_init: false
    };

    this.character_change = this.character_change.bind(this);
    this.key_press = this.key_press.bind(this);
    this.update_info = this.update_info.bind(this);
    this.update_state = this.update_state.bind(this);
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data}, () => {
        if (self.state.has_init) {
          materialize.toast("Stream updated.", 1000);
        } else {
          self.setState({"has_init": true});
        }
      });
    });
  }

  character_change(icon_path, state_name) {
    // Simulate update state event.
    const event = {
      target: {
        name: state_name,
        value: icon_path
      }
    };
    this.update_state(event);
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

  key_press(e) {
    if (e.key === "Enter") {
      e.target.blur();
      this.update_info(e);
    }
  }

  render() {
    return (
      <div id="admin" className="admin">
        <div className="row">
          {/* Card for general info */}
          <div className="col s4">
            <div className="card-panel">
              <h2 className="card-title">Tourney</h2>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="tourney_name">Name</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="tourney_name" id="tourney_name" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.tourney_name} />
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="tourney_round">Round</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="tourney_round" id="tourney_round" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.tourney_round} />
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="tourney_link">Link</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="tourney_link" id="tourney_link" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.tourney_link} />
                </div>
              </div>
            </div>
          </div>

          {/* Card for left player */}
          <div className="col s4">
            <div className="card-panel">
              <h2 className="card-title">Left Player</h2>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="left_player">Name</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="left_player" id="left_player" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.left_player} />
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="left_character">Character</label>
                </div>
                <div className="col s9">
                  <CharacterSelect onChange={this.character_change} stateName="left_character"/>
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="left_score">Score</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="number" name="left_score" id="left_score" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.left_score} />
                </div>
              </div>
            </div>
          </div>

          {/* Card for right player */}
          <div className="col s4">
            <div className="card-panel">
              <h2 className="card-title">Right Player</h2>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="right_player">Name</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="right_player" id="right_player" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.right_player} />
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="right_character">Character</label>
                </div>
                <div className="col s9">
                  <CharacterSelect onChange={this.character_change} stateName="right_character"/>
                </div>
              </div>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="right_score">Score</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="number" name="right_score" id="right_score" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.overlay_info.right_score} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="waves-effect waves-light btn update-button" id="send_update" name="send_update" onClick={this.update_info}>Send Overlay Update</button>
          </div>
        </div>
        <div className="row">
          <div className="col s12">

          </div>
        </div>
      </div>
    );
  }
}
