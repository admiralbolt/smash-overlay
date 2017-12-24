import React from 'react';
import io from 'socket.io-client';
import default_data from '../default_data.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overlay_info: default_data,
      socket: io('/overlay_info')
    };

    this.update_info = this.update_info.bind(this);
  }

  componentDidMount() {
    var self = this;
    this.state.socket.on('update_overlay', function(data) {
      self.setState({overlay_info: data});
    });
  }

  update_info(info) {
    this.setState({
      overlay_info: info
    }, () => {
      console.log(this.state);
      this.state.socket.emit('update_overlay', this.state.overlay_info);
    });
  }

  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          overlay_info: this.state.overlay_info,
          update_callback: this.update_info
        })}
      </div>
    );
  }
}
