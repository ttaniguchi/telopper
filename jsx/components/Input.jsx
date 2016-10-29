import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeText(e) {
    this.setState({
      text: e.target.value,
    });
    this.props.handleClick(e.target.value);
  }

  render() {
    return (
      <textarea
        rows={20}
        cols={80}
        value={this.state.text}
        onChange={this.handleChangeText}
      />
    );
  }
}
Input.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};
