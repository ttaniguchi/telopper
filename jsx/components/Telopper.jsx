import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;

export default class Telopper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentTime: 0,
      frameCount: 0,
      playbackRate: 1,
      telops: [],
      times: [],
    };
  }
  componentDidMount() {
    this.video.addEventListener('timeupdate', () => (
      this.setState({
        currentTime: this.video.currentTime,
        frameCount: Math.floor((this.video.duration * 1000) / 30),
      })
    ));
    const ctx = this.canvas.getContext('2d');

    setInterval(() => {
      ctx.drawImage(this.video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const telop = this.getTelop();
      const posX = (CANVAS_WIDTH / 2) - (ctx.measureText(telop).width / 2);
      ctx.font = 'bold 24px "Noto Sans JP"';
      ctx.fillStyle = 'white';
      ctx.fillText(telop, posX, CANVAS_HEIGHT - 32);
    }, 1000 / 30);
  }
  getTelop() {
    const { currentTime, telops, times } = this.state;

    return telops.filter((row, i) => (
      times[i] &&
      times[i].start <= currentTime &&
      times[i].end >= currentTime
    ));
  }
  getText() {
    const { telops, times } = this.state;

    const format = time => {
      let t = time;
      const h = Math.floor(t / 3600);
      t -= h * 3600;
      const i = Math.floor(t / 60);
      t -= i * 60;
      const s = Math.floor(t);
      t -= s;
      const ss = Math.floor(t * 1000);
      return `${
        `0${h}`.slice(-2)}:${`0${i}`.slice(-2)}:${`0${s}`.slice(-2)}.${`00${ss}`.slice(-3)
      }`;
    };
    const text = times.map((row, i) => (
      `${i + 1}\n${format(row.start)} --> ${format(row.end)}\n${telops[i]}\n`
    ));
    return `WEBVTT\n\n${text.join('\n')}`;
  }

  punch() {
    const { telops, times } = this.state;

    if (this.video.paused) {
      this.video.play();
      return;
    }
    if (telops.length > times.length) {
      // 1つ前の終了時間を調整
      if (times.length > 0) {
        const beforeTime = times.pop();
        times.push(
          (beforeTime.end > this.video.currentTime)
            ? { start: beforeTime.start, end: this.video.currentTime }
            : beforeTime
        );
      }
      // 開始・終了時間の登録
      times.push({
        start: this.video.currentTime,
        end: this.video.currentTime + 2,
      });
      this.setState({ times });
    }
  }
  togglePlay() {
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
  }
  handleText(text) {
    this.setState({
      telops: text.split('\n').filter(str => (str !== '')),
      times: [],
    });
  }
  render() {
    const { source } = this.props;
    const { currentTime, frameCount, playbackRate, times } = this.state;

    return (
      <div>
        <video
          ref={c => (this.video = c)}
          src={source}
          style={{ display: 'none' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <canvas
            ref={c => (this.canvas = c)}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={() => this.togglePlay()}
          />
          <center>
            <div>
              {playbackRate === 1 ? '標準' : `x${playbackRate}倍`}
            </div>
            <Slider
              axis="y"
              min={0.5}
              max={1.5}
              step={0.1}
              style={{ height: 200, margin: 16 }}
              value={playbackRate}
              onChange={(e, val) => {
                this.video.playbackRate = val;
                this.setState({ playbackRate: val });
              }}
            />
          </center>
        </div>
        <Slider
          min={0}
          max={frameCount || 1}
          step={1}
          value={(currentTime * 1000) / 30}
          onChange={(e, val) => (this.video.currentTime = (val / 1000) * 30)}
          disabled={!frameCount}
        />
        <textarea
          rows={20}
          cols={80}
          onChange={e => this.handleText(e.target.value)}
        />
        <RaisedButton
          label={`パンチ(${times.length})`}
          onMouseDown={e => this.punch(e)}
          primary
        />
        <pre>{this.getText()}</pre>
      </div>
    );
  }
}
Telopper.propTypes = {
  source: PropTypes.string.isRequired,
};
