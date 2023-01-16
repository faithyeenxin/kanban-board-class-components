import React, { Component } from "react";
import Stage from "./Stage";

export default class Board extends Component {
  render() {
    return (
      <div style={{ display: "flex" }}>
        {this.props.stages.map((stage, idx) => (
          <Stage key={idx} stage={stage} tasks={this.props.tasks.get(stage)} />
        ))}
      </div>
    );
  }
}
