import {Component} from "react";
import React from "react";

class Foo extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    console.log(this);
  }
  render() {
    return <button onClick={this.handleClick}>Нажми на меня</button>;
  }
}

export default Foo
