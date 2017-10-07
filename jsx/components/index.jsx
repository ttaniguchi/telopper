import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import Telopper from './Telopper';

const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { source: null };
  }
  render() {
    const { source } = this.state;

    return (
      <div>
        {source === null ? (
          <center>
            <Dropzone
              accept="video/*;capture=camcorder"
              onDrop={(a, e) => this.setState({ source: createObjectURL(e[0]) })}
            >
              <p>動画ファイルを</p>
              <p>ドラッグしてください</p>
            </Dropzone>
          </center>
        ) : (
          <Telopper source={source} />
        )}
      </div>
    );
  }
}
