import React from 'react';
import io from 'socket.io-client';
import character_data from '../../character_data';
require('../../styles/overlay_base.scss');
require('../../styles/mtv_melee.scss');


export default class MTVMeleeOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: props.overlay_info,
      socket: io("/overlay_info"),
      rankings: {}
    };
  }

  componentDidMount() {
    var self = this;
    fetch("https://cors-anywhere.herokuapp.com/https://www.garpr.com:3001/googlemtv/rankings")
      .then(res => res.json())
      .then((result) => {
        var ranking_map = {}
        result["ranking"].forEach((rank_obj) => {
          ranking_map[rank_obj.name.toLowerCase()] = rank_obj.rank
        });
        self.setState({rankings: ranking_map})
      });
    this.state.socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data});
    });
  }

  render() {
    const left_character = this.state.overlay_info.left_character.split("/")[4];
    const right_character = this.state.overlay_info.right_character.split("/")[4];
    const left_facing = character_data[left_character].facing;
    const right_facing = character_data[right_character].facing;
    const left_ranking = this.state.rankings[this.state.overlay_info.left_player.toLowerCase()] || -1;
    const right_ranking = this.state.rankings[this.state.overlay_info.right_player.toLowerCase()] || -1;

    return (
      <div className="overlay-container">
        <div className="row">
          <div className="left-side col s9">

            <div className="info-rectangle-bottom left-player">
              <div className="row info-content valign-wrapper">
                <div key="something_unique" className="col s3 left-align">
                  <img className={(left_facing == 'left') ? 'reverse' : ''} src={this.state.overlay_info.left_character} />
                </div>
                <div className="col s6 center-align">
                  {this.state.overlay_info.left_player}

                  {(left_ranking != -1) ? <div className="ranking">GarPR Rank: {left_ranking}</div> : ''}
                </div>
                <div className="col s3 right-align">
                  {this.state.overlay_info.left_score}
                </div>
              </div>
            </div>

            <div className="info-rectangle-bottom right-player">
              <div className="row info-content valign-wrapper">
                <div className="col s3 left-align">
                  {this.state.overlay_info.right_score}
                </div>
                <div className="col s6 center-align">
                  {this.state.overlay_info.right_player}

                  {(right_ranking != -1) ? <div className="ranking">GarPR Rank: {right_ranking}</div> : ''}
                </div>
                <div className="col s3 right-align">
                  <img className={(right_facing == 'right') ? 'reverse' : ''} src={this.state.overlay_info.right_character} />
                </div>
              </div>
            </div>

            <div className="info-rectangle-top tourney-name">
              <div className="row info-content-top valign-wrapper center-align">
                <div className="col s12">{this.state.overlay_info.tourney_name}</div>
              </div>
            </div>

            <div className="info-rectangle-top tourney-round">
              <div className="row info-content-top valign-wrapper center-align">
                <div className="col s12">{this.state.overlay_info.tourney_round}</div>
              </div>
            </div>
          </div>
          <div className="right-side col s3 center-align">
            <div className="camera">


            </div>
            <div className="black-box cam-height">
              <div className="web-cam">
                Web Cam
              </div>

            </div>
            <div className="black-box gar-height">
              <div>
                <img className="gar" src="/public/images/smash_gar.png" />
              </div>
            </div>
            <div className="misc">


              <div className="tourney-link center-align">
                {this.state.overlay_info.tourney_link}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
