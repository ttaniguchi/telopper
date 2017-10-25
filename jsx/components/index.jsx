import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Step, Stepper, StepButton } from 'material-ui/Stepper';

import Telopper from './Telopper';

export const STEPS = {
  FILE_SELECT: 0,
  CREATE_TEXT: 1,
  PUNCHING: 2,
  BUILD: 3,
};
export const STEP_NAMES = [
  'ファイル選択',
  '文字起こし',
  '文字埋め込み',
  'VTTファイル完成',
];
const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      source: null,
      step: STEPS.FILE_SELECT,
    };
  }
  render() {
    const { source, step } = this.state;

    return (
      <center>
        <Stepper activeStep={step}>
          {STEP_NAMES.map((name, i) => (
            <Step key={name}>
              <StepButton onClick={() => this.setState({ step: i })}>{name}</StepButton>
            </Step>
          ))}
        </Stepper>
        {step === STEPS.FILE_SELECT ? (
          <Dropzone
            accept="video/*;capture=camcorder"
            onDrop={(a, file) => this.setState({
              source: createObjectURL(file[0]),
              step: STEPS.CREATE_TEXT,
            })}
          >
            <p>動画ファイルを</p>
            <p>ドラッグしてください</p>
          </Dropzone>
        ) : (
          <Telopper
            source={source}
            step={step}
            handleStep={s => this.setState({ step: s })}
          />
        )}
      </center>
    );
  }
}
