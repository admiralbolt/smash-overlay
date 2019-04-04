import React from 'react';
import io from 'socket.io-client';
import character_data from '../../character_data';
require('../../styles/overlay_base.scss');
require('../../styles/mtv_crew.scss');


export default class MTVMeleeCrew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crew_info: props.crew_info,
      socket: io("/crew_overlay")
    };
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({crew_info: data});
    });
  }

  renderPlayers(character, player_list, player_stocks) {
    console.log(character);
    console.log(player_list);
    let players = [];
    for (let i = 0; i < 8; i++) {
      if (player_list[i] === undefined || player_list[i].length == 0) continue;
      let children = [];
      for (let j = 0; j < player_stocks[i]; j++) {
        children.push(
          <div key={player_list[i] + character + "_icon_" + j} className="col s1 left-align">
            <img src={(character == "falco") ? "/public/images/character_icons/Falco/FalcoOriginal.png" : "/public/images/character_icons/Marth/MarthOriginal.png"} />
          </div>
        );
      }
      players.push(
        <div key={character + i} className="team-player row">
          <div className="col s1"></div>
          <div className="col s4 left-align">
            <span className="dubs-player">{player_list[i]}</span>
          </div>
          <div className="col s1"></div>
          {children}
        </div>
      );
    }
    return players;
  }

  render() {

    let totalFalcoStocks = 0;
    for (let i = 0; i < this.state.crew_info.falco_stocks.length; i++) {
      totalFalcoStocks += parseInt(this.state.crew_info.falco_stocks[i]);
    }
    let totalMarthStocks = 0;
    for (let i = 0; i < this.state.crew_info.marth_stocks.length; i++) {
      totalMarthStocks += parseInt(this.state.crew_info.marth_stocks[i]);
    }

    return (
      <div className="overlay-container">
        <div className="row">
          <div className="dubs-column col s2 center-align">


            <div className="col-info">
              Falco
            </div>
            <div className="row"></div>

            <div className="row">
              <h3 className="current-player">{this.state.crew_info.falco_current_player}</h3>
            </div>

            {this.renderPlayers("falco", this.state.crew_info.falco_players, this.state.crew_info.falco_stocks)}

            <div className="row">
              <h3 className="total-stocks">Total Stocks: {totalFalcoStocks}</h3>
            </div>

            <div className="dubs-col-footer">
              <img className="gar reverse" src="/public/images/smash_gar.png" />
            </div>

          </div>

          <div className="game col s8"></div>

          <div className="dubs-column col s2 center-align">

            <div className="col-info">
              Marth
            </div>
            <div className="row"></div>

            <div className="row">
              <h3 className="current-player">{this.state.crew_info.marth_current_player}</h3>
            </div>

            {this.renderPlayers("marth", this.state.crew_info.marth_players, this.state.crew_info.marth_stocks)}

            <div className="row">
              <h3 className="total-stocks">Total Stocks: {totalMarthStocks}</h3>
            </div>

            <div className="dubs-col-footer">
              <img className="gar" src="/public/images/smash_gar.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
