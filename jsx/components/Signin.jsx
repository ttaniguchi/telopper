import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UITheme from './../constants/UITheme';
import { SIGNED } from './../reducers/Session';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

export default class Signin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      service: '',
      branch: '',
      password: '',
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.checkSigned = this.checkSigned.bind(this);
    this.handleChangeService = this.handleChangeService.bind(this);
    this.handleChangeBranch = this.handleChangeBranch.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  componentWillMount() {
    this.checkSigned(this.props.authentication);
  }
  componentWillUpdate(nextProps) {
    this.checkSigned(nextProps.authentication);
  }
  checkSigned(authentication) {
    if (authentication > SIGNED.NONE) {
      this.context.router.push('/');
    }
  }
  handleChangeService(e) {
    this.setState({
      service: e.target.value,
    });
  }
  handleChangeBranch(e) {
    this.setState({
      branch: e.target.value,
    });
  }
  handleChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleTouchTap() {
    this.props.createBranchSession({
      service_id: this.state.service,
      branch_id: this.state.branch,
      password: this.state.password,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(UITheme)}>
        <div style={styles.container}>
          <h1>ClipLine</h1>
          <h2>学習用</h2>
          <div>
            <TextField
              id="service"
              hintText="サービスID"
              type="text"
              value={this.state.service}
              onChange={this.handleChangeService}
            />
          </div>
          <div>
            <TextField
              id="branch"
              hintText="店舗ID"
              type="text"
              value={this.state.branch}
              onChange={this.handleChangeBranch}
            />
          </div>
          <div>
            <TextField
              id="password"
              hintText="パスワード"
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <div>
            <RaisedButton
              label="ログイン"
              secondary
              onTouchTap={() => this.handleTouchTap()}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
Signin.propTypes = {
  authentication: React.PropTypes.number.isRequired,
  createBranchSession: React.PropTypes.func.isRequired,
};
Signin.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
