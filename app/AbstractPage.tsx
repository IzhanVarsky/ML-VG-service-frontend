import React from "react";

export default class AbstractPage extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    return this.returnFunc();
  }

  returnFunc() {
    return null;
  }
}