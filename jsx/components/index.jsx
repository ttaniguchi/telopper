import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Header from './Header';
import Input from './Input';
import Output from './Output';
import Telop from './Telop';

const styles = {
  video: {
    width: 480,
  },
};
const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: '',
      time: 0,
      telops: [],
      startTimes: [],
      endTimes: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getTelops = this.getTelops.bind(this);
    this.getTime = this.getTime.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.video.addEventListener('timeupdate', () => (
      this.setState({
        time: this.video.currentTime,
      })
    ));
  }
  getTelops(telopText) {
    const telops = telopText.split('\n').filter(str => (str !== ''));
    this.setState({
      telops,
      startTimes: [],
      endTimes: [],
    });
  }
  getTime(currentTime) {
    if (this.state.telops.length > this.state.startTimes.length) {
      // 1つ前の終了時間を調整
      if (this.state.endTimes.length > 0) {
        const beforeEndTime = this.state.endTimes.pop();
        this.state.endTimes.push(
          (beforeEndTime > currentTime) ? currentTime : beforeEndTime
        );
      }
      // 開始・終了時間の登録
      this.state.startTimes.push(currentTime);
      this.state.endTimes.push(currentTime + 2);
      this.setState({
        startTimes: this.state.startTimes,
        endTimes: this.state.endTimes,
      });
    }
  }
  handleChange(e) {
    this.setState({
      source: createObjectURL(e.target.files[0]),
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ float: 'left' }}>
          <video
            style={styles.video}
            ref={c => (this.video = c)}
            src={this.state.source}
            controls
          />
        </div>
        <div style={{ float: 'left' }}>
          <Telop
            time={this.state.time}
            telops={this.state.telops}
            startTimes={this.state.startTimes}
            endTimes={this.state.endTimes}
          />
        </div>
        <div style={{ clear: 'both' }} />

        <div>
          <input
            type="file"
            accept="video/*;capture=camcorder"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <RaisedButton
            label={'record'}
            style={{ width: 320 }}
            onClick={() => this.getTime(this.video.currentTime)}
          />
        </div>
        <Input handleClick={this.getTelops} />
        <Output
          telops={this.state.telops}
          startTimes={this.state.startTimes}
          endTimes={this.state.endTimes}
        />
      </div>
    );
  }
}
