import React from 'react';
import io from 'socket.io-client';
import default_data from '../default_data.js';
import default_dubs from '../default_dubs.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: default_data,
      dubs_info: default_dubs,
      mtv_melee_socket: io('/overlay_info'),
      dubs_socket: io('/dubs_overlay')
    };

    this.update_info = this.update_info.bind(this);
    this.update_dubs = this.update_dubs.bind(this);
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

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          overlay_info: this.state.overlay_info,
          dubs_info: this.state.dubs_info,
          update_callback: this.update_info,
          update_dubs: this.update_dubs
        })}
      </div>
    );
  }
}
