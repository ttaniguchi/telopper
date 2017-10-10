import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import IconPause from 'material-ui/svg-icons/av/pause';
import IconPlay from 'material-ui/svg-icons/av/play-arrow';

import { STEPS } from './index';

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 360;
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
export default class Telopper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentTime: 0,
      duration: 0,
      playbackRate: 1,
      text: '',
      telops: [],
      times: [],
    };
  }
  componentDidMount() {
    this.video.load();
    this.video.addEventListener('timeupdate', () => (
      this.setState({
        currentTime: this.video.currentTime || 0,
        duration: this.video.duration || 0,
      })
    ));
    const ctx = this.canvas.getContext('2d');

    this.interval = setInterval(() => {
      ctx.drawImage(this.video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const telop = this.getTelop();
      const posX = (CANVAS_WIDTH / 2) - (ctx.measureText(telop).width / 2);
      ctx.font = 'bold 24px "Noto Sans JP"';
      ctx.fillStyle = 'white';
      ctx.fillText(telop, posX, CANVAS_HEIGHT - 32);
    }, 1000 / 30);
  }
  componentWillUnmount() {
    this.video.removeEventListener('timeupdate', this.setState, true);
    clearInterval(this.interval);
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
        end: this.video.currentTime + 4,
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
  handleStep(step) {
    const { handleStep } = this.props;

    this.video.pause();
    this.video.currentTime = 0;
    handleStep(step);
  }
  render() {
    const { source, step } = this.props;
    const { currentTime, duration, playbackRate, text, telops, times } = this.state;

    return (
      <center>
        <Card style={{ width: 690 }}>
          <CardMedia>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <video
                ref={c => (this.video = c)}
                src={source}
                style={{ display: 'none' }}
              />
              <canvas
                ref={c => (this.canvas = c)}
                width={CANVAS_WIDTH}
                height={CANVAS_HEIGHT}
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
          </CardMedia>
          <CardActions>
            <div style={{ display: 'flex' }}>
              <IconButton style={{ height: 64 }} onClick={() => this.togglePlay()}>
                {this.video && this.video.paused === false ? <IconPlay /> : <IconPause />}
              </IconButton>
              <div style={{ padding: '24px 0', width: 160 }}>
                {(format(currentTime).split('.'))[0]} / {(format(duration).split('.'))[0]}
              </div>
              <Slider
                min={0}
                max={duration || 1}
                step={0.1}
                style={{ width: CANVAS_WIDTH - 160 }}
                value={currentTime}
                onChange={(e, val) => (this.video.currentTime = val)}
                disabled={currentTime === 0}
              />
            </div>
          </CardActions>
          {step === STEPS.CREATE_TEXT && (
            <CardText>
              <div>
                <textarea
                  rows={20}
                  cols={80}
                  value={text}
                  onChange={e => this.setState({
                    text: e.target.value,
                    telops: e.target.value.split('\n').filter(str => (str !== '')),
                    times: [],
                  })}
                />
              </div>
              <div>
                <RaisedButton
                  label="文字起こし完了"
                  onMouseDown={() => this.handleStep(STEPS.PUNCHING)}
                  disabled={telops.length === 0}
                  primary
                />
              </div>
            </CardText>
          )}
          {step === STEPS.PUNCHING && (
            <CardActions>
              {telops.length === times.length ? (
                <RaisedButton
                  label="VTTファイル作成"
                  onMouseDown={() => this.handleStep(STEPS.BUILD)}
                  primary
                />
              ) : (
                <RaisedButton
                  label={`パンチ(${times.length})`}
                  onMouseDown={e => this.punch(e)}
                  primary
                />
              )}
            </CardActions>
          )}
          {step === STEPS.BUILD && (
            <CardText>
              <pre style={{ textAlign: 'left' }}>
                {this.getText()}
              </pre>
            </CardText>
          )}
        </Card>
      </center>
    );
  }
}
Telopper.propTypes = {
  source: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,

  handleStep: PropTypes.func.isRequired,
};
