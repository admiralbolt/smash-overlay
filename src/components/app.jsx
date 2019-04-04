import React from 'react';
import io from 'socket.io-client';
import default_data from '../default_data.js';
import default_dubs from '../default_dubs.js';
import default_crew from '../default_crew.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: default_data,
      dubs_info: default_dubs,
      crew_info: default_crew,
      mtv_melee_socket: io('/overlay_info'),
      dubs_socket: io('/dubs_overlay'),
      crew_socket: io('/crew_overlay')
    };

    this.update_info = this.update_info.bind(this);
    this.update_dubs = this.update_dubs.bind(this);
    this.update_crews = this.update_crews.bind(this);
  }

  componentDidMount() {
    var self = this;
    // mtv_melee socket updates
    this.state.mtv_melee_socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data});
    });
    // dubs socket updates
    this.state.dubs_socket.on('update_overlay', function(data) {
      self.setState({dubs_info: data});
    });
    // crews socket updates
    this.state.crew_socket.on('update_overlay', function(data) {
      self.setState({crew_info: data});
    });
  }

  update_info(info) {
    this.setState({
      overlay_info: info
    }, () => {
      this.state.mtv_melee_socket.emit('update_overlay', this.state.overlay_info);
    });
  }

  update_dubs(info) {
    this.setState({
      dubs_info: info
    }, () => {
      this.state.dubs_socket.emit('update_overlay', this.state.dubs_info);
    });
  }

  update_crews(info) {
    this.setState({
      crew_info: info
    }, () => {
      this.state.crew_socket.emit('update_overlay', this.state.crew_info);
    });
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          overlay_info: this.state.overlay_info,
          dubs_info: this.state.dubs_info,
          crew_info: this.state.crew_info,
          update_callback: this.update_info,
          update_dubs: this.update_dubs,
          update_crews: this.update_crews
        })}
      </div>
    );
  }
}
