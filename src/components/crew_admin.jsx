import React from 'react';
import io from 'socket.io-client';
import materialize from 'materialize-css';
import CharacterSelect from './character_select.jsx';
import {Input} from 'react-materialize';

export default class CrewAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crew_info: props.crew_info,
      crew_socket: io('/crew_overlay'),
      crew_has_init: false
    };

    this.key_press = this.key_press.bind(this);
    this.update_info = this.update_info.bind(this);
    this.update_state = this.update_state.bind(this);
    this.update_player_name = this.update_player_name.bind(this);
    this.update_player_stocks = this.update_player_stocks.bind(this);

  }

  componentDidMount() {
    var self = this;
    // Reload state data when update comes through the mtv_melee socket.
    this.state.crew_socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data}, () => {
        if (self.state.singles_has_init) {
          materialize.toast("Stream updated.", 1000);
        } else {
          self.setState({"crew_has_init": true});
        }
      });
    });
  }

  update_state(e) {
    let update = {...this.state.overlay_info};
    update[e.target.name] = e.target.value;
    this.setState({
      crew_info: update
    });
  }

  update_player_name(e) {
    let update = {...this.state.crew_info};
    let character = e.target.name.split("_")[0];
    let index = e.target.name.split("_")[1];
    if (character == "falco") {
      update["falco_players"][index] = e.target.value;
    } else if (character == "marth") {
      update["marth_players"][index] = e.target.value;
    }
    this.setState({
      crew_info: update
    });
  }

  update_player_stocks(e) {
    let update = {...this.state.crew_info};
    let character = e.target.name.split("_")[0];
    let index = e.target.name.split("_")[2];
    if (character == "falco") {
      update["falco_stocks"][index] = e.target.value;
    } else if (character == "marth") {
      update["marth_stocks"][index] = e.target.value;
    }
    this.setState({
      crew_info: update
    });
  }

  update_info(e) {
    this.props.update_crews(this.state.crew_info);
  }

  key_press(e) {
    if (e.key === "Enter") {
      e.target.blur();
      this.update_info(e);
    }
  }

  createPlayers(character, player_list, player_stocks) {
    let players = [];
    for (let i = 0; i < 8; i++) {
      let children = [];
      children.push(
        <div key={character + "_div_" + i} className="col s5">
          <input className="overlay-input" type="text" key={character + i} name={character + "_" + i} id={character + i} onKeyPress={this.key_press} onChange={this.update_player_name} value={player_list[i]} />
        </div>
      );
      children.push(
        <div key={character + "_divstocks_" + i} className="col s5">
          <input className="overlay-input" type="number" key={character + "_stocks_" + i} name={character + "_stocks_" + i} id={character + "_stocks_" + i} onKeyPress={this.key_press} onChange={this.update_player_stocks} value={player_stocks[i]} />
        </div>
      );
      players.push(<div className="row" key={character + "_player_" + i}>{children}</div>);
    }
    return players;
  }



  render() {
    return (
      <div className="col s12">
        <div className="row">
          <div className="col s5">
            <div className="card-panel">
              <h2 className="card-title">Faaaaalcoooo</h2>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="falco_current_player">Current Player</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="falco_current_player" id="falco_current_player" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.crew_info.falco_current_player} />
                </div>
              </div>

              {this.createPlayers("falco", this.state.crew_info.falco_players, this.state.crew_info.falco_stocks)}
            </div>
          </div>


          <div className="col s1"></div>


          <div className="col s5">
            <div className="card-panel">
              <h2 className="card-title">Marf</h2>
              <div className="row">
                <div className="col s3">
                  <label className="input-label valign-wrapper" htmlFor="marth_current_player">Current Player</label>
                </div>
                <div className="col s9">
                  <input className="overlay-input" type="text" name="marth_current_player" id="marth_current_player" onKeyPress={this.key_press} onChange={this.update_state} value={this.state.crew_info.marth_current_player} />
                </div>
              </div>

              {this.createPlayers("marth", this.state.crew_info.marth_players, this.state.crew_info.marth_stocks)}
            </div>
          </div>
        </div>
      </div>
    );
  }

}
