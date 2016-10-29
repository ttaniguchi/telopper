import React, { Component } from 'react';

export default class Output extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.getText = this.getText.bind(this);
  }
  getFormat(time) {
    let t = time;
    const h = Math.floor(t / 3600);
    t -= h * 3600;
    const i = Math.floor(t / 60);
    t -= i * 60;
    const s = Math.floor(t);
    t -= s;
    const ss = Math.floor(t * 1000);
    return `${`0${h}`.slice(-2)}:${`0${i}`.slice(-2)}:${`0${s}`.slice(-2)}.${`00${ss}`.slice(-3)}`;
  }
  getText() {
    const text = this.props.telops.map((row, i) => (
      `${
        i + 1
      }\n${
        this.getFormat(this.props.startTimes[i])
      } --> ${
        this.getFormat(this.props.endTimes[i])
      }\n${
        row
      }\n`
    ));
    return `WEBVTT\n\n${text.join('\n')}`;
  }

  render() {
    return (
      <pre>{this.getText()}</pre>
    );
  }
}
Output.propTypes = {
  telops: React.PropTypes.array.isRequired,
  startTimes: React.PropTypes.array.isRequired,
  endTimes: React.PropTypes.array.isRequired,
};
