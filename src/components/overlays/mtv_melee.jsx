import React from 'react';
import io from 'socket.io-client';
require('../../styles/overlay_base.scss');
require('../../styles/mtv_melee.scss');


export default class MTVMeleeOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: props.overlay_info,
      socket: io("/overlay_info")
    };
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data});
    });
  }

  render() {
    return (
      <div className="overlay-container">
        <div className="row">
          <div className="left-side col s9">

            <div className="info-rectangle-bottom left-player">
              <div className="row info-content valign-wrapper">
                <div className="col s3 left-align">
                  <img src={this.state.overlay_info.left_character} />
                </div>
                <div className="col s6 center-align">
                  {this.state.overlay_info.left_player}
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
                </div>
                <div className="col s3 right-align">
                  <img className="reverse" src={this.state.overlay_info.right_character} />
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

              <div className="info-rectangle-player">
                <div className="row valign-wrapper">
                  <div className="col s12 center-align">{this.state.overlay_info.left_player}</div>
                </div>
              </div>
            </div>
            <div className="camera">

              <div className="info-rectangle-player">
                <div className="row valign-wrapper">
                  <div className="col s12 center-align">{this.state.overlay_info.right_player}</div>
                </div>
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
