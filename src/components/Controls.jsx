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
          <button
            value="Move Back"
            disabled={this.props.moveBackButtonDisabled}
            onClick={(e) => this.props.handleAction(e.target.value)}
          >
            Move Back
          </button>
          <button
            value="Move Forward"
            disabled={this.props.moveForwardButtonDisabled}
            onClick={(e) => this.props.handleAction(e.target.value)}
          >
            Move Forward
          </button>

          <button
            value="Delete"
            disabled={this.props.deleteButtonDisabled}
            onClick={(e) => this.props.handleAction(e.target.value)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}
