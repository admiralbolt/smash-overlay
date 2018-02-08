import React from 'react';
import io from 'socket.io-client';
import character_data from '../../character_data';
require('../../styles/overlay_base.scss');
require('../../styles/mtv_dubs.scss');


export default class MTVMeleeDubs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dubs_info: props.dubs_info,
      socket: io("/dubs_overlay")
    };
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({dubs_info: data});
    });
  }

  render() {
    const left_character_1 = this.state.dubs_info.left_character_1.split("/")[4];
    const left_character_2 = this.state.dubs_info.left_character_2.split("/")[4];
    const right_character_1 = this.state.dubs_info.right_character_1.split("/")[4];
    const right_character_2 = this.state.dubs_info.right_character_2.split("/")[4];
    const left_facing_1 = character_data[left_character_1].facing;
    const left_facing_2 = character_data[left_character_2].facing;
    const right_facing_1 = character_data[right_character_1].facing;
    const right_facing_2 = character_data[right_character_2].facing;

    return (
      <div className="overlay-container">
        <div className="row">
          <div className="dubs-column col s2 center-align">


            <div className="col-info">
              {this.state.dubs_info.tourney_name}
            </div>

            <div className={`team-info team-color-${this.state.dubs_info.left_team_color}`}>
              <p className="team-name">{this.state.dubs_info.left_team_name}</p>
              <div className="team-player row">
                <div className="col s2"></div>
                <div key="something_unique_1" className="col s2 left-align">
                  <img className={(left_facing_1 == 'left') ? 'reverse' : ''} src={this.state.dubs_info.left_character_1} />
                </div>
                <div className="col s5 left-align">
                  <span className="dubs-player">{this.state.dubs_info.left_player_1}</span>
                </div>
              </div>

              <div className="team-player row">
                <div className="col s2"></div>
                <div key="something_unique_1" className="col s2 left-align">
                  <img className={(left_facing_2 == 'left') ? 'reverse' : ''} src={this.state.dubs_info.left_character_2} />
                </div>
                <div className="col s5 left-align">
                  <span className="dubs-player">{this.state.dubs_info.left_player_2}</span>
                </div>
              </div>
            </div>

            <div className="dubs-col-footer">
              <img className="gar reverse" src="/public/images/smash_gar.png" />
              <div className="tourney-link center-align">
                {this.state.dubs_info.tourney_link}
              </div>
            </div>

          </div>

          <div className="game col s8"></div>

          <div className="dubs-column col s2 center-align">

            <div className="col-info">
              {this.state.dubs_info.tourney_round}
            </div>

            <div className={`team-info team-color-${this.state.dubs_info.right_team_color}`}>
              <p className="team-name">{this.state.dubs_info.right_team_name}</p>
              <div className="team-player row">
                <div className="col s2"></div>
                <div className="col s5 right-align">
                  <span className="dubs-player">{this.state.dubs_info.right_player_1}</span>
                </div>
                <div key="something_unique_1" className="col s2 right-align">
                  <img className={(right_facing_1 == 'right') ? 'reverse' : ''} src={this.state.dubs_info.right_character_1} />
                </div>
              </div>

              <div className="team-player row">
                <div className="col s2"></div>
                <div className="col s5 right-align">
                  <span className="dubs-player">{this.state.dubs_info.right_player_2}</span>
                </div>
                <div key="something_unique_1" className="col s2 right-align">
                  <img className={(right_facing_2 == 'right') ? 'reverse' : ''} src={this.state.dubs_info.right_character_2} />
                </div>
              </div>
            </div>

            <div className="dubs-col-footer">
              <img className="gar" src="/public/images/smash_gar.png" />
              <div className="tourney-link center-align">
                {this.state.dubs_info.tourney_link}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
