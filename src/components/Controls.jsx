import React, { Component } from "react";

export default class Controls extends Component {
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <div>Controls</div>
        <div>
          <input
            placeholder="Input task name"
            value={this.props.newTask}
            onChange={(e) => this.props.setNewTask(e.target.value)}
          />
          <button
            onClick={this.props.addNewTask}
            disabled={this.props.createButtonDisabled}
          >
            Create Task
          </button>
        </div>

        <div>
          <input
            placeholder="Select Task"
            onChange={(e) => this.props.setSelectedTask(e.target.value)}
          />
          <button disabled={true}>Move Back</button>
          <button disabled={true}>Move Forward</button>
          <button disabled={true}>Delete</button>
        </div>
      </div>
    );
  }
}
