import React, { Component } from "react";
import Tasks from "./Tasks";

export default class Stage extends Component {
  render() {
    return (
      <div
        style={{
          width: "25%",
          textAlign: "center",
          backgroundColor: "#FFE4B5",
          border: "solid",
          height: "40vh",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {this.props.stage}
        </div>
        {this.props.tasks.map((task, idx) => (
          <Tasks key={idx} task={task} />
        ))}
      </div>
    );
  }
}
