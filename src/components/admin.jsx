import React from 'react';
import io from 'socket.io-client';
import materialize from 'materialize-css';
import CharacterSelect from './character_select.jsx';
import {Input} from 'react-materialize';
require('../styles/admin.scss');

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: props.overlay_info,
      dubs_info: props.dubs_info,
      mtv_melee_socket: io('/overlay_info'),
      dubs_socket: io('/dubs_overlay'),
      singles_has_init: false,
      dubs_has_init: false
    };

    this.character_change = this.character_change.bind(this);
    this.key_press = this.key_press.bind(this);
    this.update_info = this.update_info.bind(this);
    this.update_state = this.update_state.bind(this);

    // Well this is bad code.
    this.update_dubs_color_left = this.update_dubs_color_left.bind(this);
    this.update_dubs_color_right = this.update_dubs_color_right.bind(this);
    this.dubs_character_change = this.dubs_character_change.bind(this);
    this.dubs_key_press = this.dubs_key_press.bind(this);
    this.update_dubs_info = this.update_dubs_info.bind(this);
    this.update_dubs_state = this.update_dubs_state.bind(this);
  }

  componentDidMount() {
    var self = this;
    // Reload state data when update comes through the mtv_melee socket.
    this.state.mtv_melee_socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data}, () => {
        if (self.state.singles_has_init) {
          materialize.toast("Stream updated.", 1000);
        } else {
          self.setState({"singles_has_init": true});
        }
      });
    });

    // Reload state data when update comes through the dubs socket.
    this.state.dubs_socket.on('update_overlay', function(data) {
      self.setState({dubs_info: data}, () => {
        if (self.state.dubs_has_init) {
          materialize.toast("Stream updated.", 1000);
        } else {
          self.setState({"dubs_has_init": true});
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

  /**
   * Socket functions for singles.
   */
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

  /**
   * Socket functions for dubs.
   */
   dubs_character_change(icon_path, state_name) {
     // Simulate update state event.
     const event = {
       target: {
         name: state_name,
         value: icon_path
       }
     };
     this.update_dubs_state(event);
   }

   update_dubs_color_left(e) {
     const event = {
       target: {
         name: 'left_team_color',
         value: e.target.value
       }
     };
     this.update_dubs_state(event);
   }

   update_dubs_color_right(e) {
     const event = {
       target: {
         name: 'right_team_color',
         value: e.target.value
       }
     };
     this.update_dubs_state(event);
   }

   update_dubs_state(e) {
     let update = {...this.state.dubs_info};
     update[e.target.name] = e.target.value;
     this.setState({
       dubs_info: update
     });
   }

   update_dubs_info(e) {
     this.props.update_dubs(this.state.dubs_info);
   }

   dubs_key_press(e) {
     if (e.key === "Enter") {
       e.target.blur();
       this.update_dubs_info(e);
     }
   }

  render() {
    return (
      <div id="admin" className="admin">
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s6"><a href="#singles">Singles</a></li>
              <li className="tab col s6"><a href="#dubs">Dubs</a></li>
            </ul>
          </div>
          <div className="row">
            <div className="col s12">

            </div>
          </div>
          <div id="singles" className="col s12">
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
                      <CharacterSelect onChange={this.character_change} stateName="left_character" value={this.state.overlay_info.left_character} />
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
                      <CharacterSelect onChange={this.character_change} stateName="right_character" value={this.state.overlay_info.right_character} />
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
          </div>
          <div id="dubs" className="col s12">
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
                      <input className="overlay-input" type="text" name="tourney_name" id="tourney_name" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.tourney_name} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="tourney_round">Round</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="tourney_round" id="tourney_round" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.tourney_round} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="tourney_link">Link</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="tourney_link" id="tourney_link" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.tourney_link} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card for left player */}
              <div className="col s4">
                <div className="card-panel">
                  <h2 className="card-title">Left Team</h2>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_team_name">Team Name</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="left_team_name" id="left_team_name" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.left_team_name} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_team_color">Team Color</label>
                    </div>
                    <div className="col s9">
                      <Input onChange={this.update_dubs_color_left} s={12} type="select" value={this.state.dubs_info.left_team_color}>
                        <option value='Blue'>Blue</option>
                        <option value='Green'>Green</option>
                        <option value='Red'>Red</option>
                      </Input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_player_1">Player1 Name</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="left_player_1" id="left_player_1" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.left_player_1} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_character_1">Player1 Character</label>
                    </div>
                    <div className="col s9">
                      <CharacterSelect onChange={this.dubs_character_change} stateName="left_character_1" value={this.state.dubs_info.left_character_1} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_player_2">Player2 Name</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="left_player_2" id="left_player_2" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.left_player_2} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_character_2">Player2 Character</label>
                    </div>
                    <div className="col s9">
                      <CharacterSelect onChange={this.dubs_character_change} stateName="left_character_2" value={this.state.dubs_info.left_character_2} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="left_score">Score</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="number" name="left_score" id="left_score" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.left_score} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card for right player */}
              <div className="col s4">
                <div className="card-panel">
                  <h2 className="card-title">Right Team</h2>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_team_name">Team Name</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="right_team_name" id="right_team_name" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.right_team_name} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_team_color">Team Color</label>
                    </div>
                    <div className="col s9">
                      <Input onChange={this.update_dubs_color_right} s={12} type="select" value={this.state.dubs_info.right_team_color}>
                        <option value='Blue'>Blue</option>
                        <option value='Green'>Green</option>
                        <option value='Red'>Red</option>
                      </Input>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_player_1">Player1 Name</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="right_player_1" id="right_player_1" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.right_player_1} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_character_1">Player1 Character</label>
                    </div>
                    <div className="col s9">
                      <CharacterSelect onChange={this.dubs_character_change} stateName="right_character_1" value={this.state.dubs_info.right_character_1} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_player_2">Player2 Name</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="text" name="right_player_2" id="right_player_2" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.right_player_2} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_character_2">Player2 Character</label>
                    </div>
                    <div className="col s9">
                      <CharacterSelect onChange={this.dubs_character_change} stateName="right_character_2" value={this.state.dubs_info.right_character_2} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col s3">
                      <label className="input-label valign-wrapper" htmlFor="right_score">Score</label>
                    </div>
                    <div className="col s9">
                      <input className="overlay-input" type="number" name="right_score" id="right_score" onKeyPress={this.dubs_key_press} onChange={this.update_dubs_state} value={this.state.dubs_info.right_score} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="row">
              <div className="col s12">
                <button className="waves-effect waves-light btn update-button" id="send_update" name="send_update" onClick={this.update_dubs_info}>Send Overlay Update</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
