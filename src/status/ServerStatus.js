import React from 'react';
import axios from 'axios';
import config from '../config';

class ServerStatus extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      status: 'down'
    };

    this.checkStatus();
  }

  render() {
    return <div>Server status:
      <p style={{color: this.state.status === 'alive' ? 'green' : 'red'}}>{this.state.status}</p>
    </div>;
  }

  checkStatus() {
    axios.get(config.statusUrl)
      .then(() => this.setState({status: 'alive'}))
      .catch(() => this.setState({status: 'down'}));
  }

  componentDidMount() {
    this.interval = setInterval(() => this.checkStatus(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
}

export default ServerStatus;