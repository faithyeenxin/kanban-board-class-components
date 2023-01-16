import Board from "./components/Board";
import Controls from "./components/Controls";

import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: new Map([
        ["Backlog", ["task 0", "task 1", "task 2", "task 3"]],
        ["To Do", ["task 4", "task 5", "task 6"]],
        ["Ongoing", ["task 7", "task 8"]],
        ["Done", ["task 9"]],
      ]),
      stages: ["Backlog", "To Do", "Ongoing", "Done"],
      newTask: "",
      selectedTask: "",
      createButtonDisabled: true,
      moveBackButtonDisabled: true,
      moveForwardButtonDisabled: true,
      deleteButtonDisabled: true,
    };

    this.setNewTask = (val) => {
      let consolidatedTasks = [];
      for (let task of this.state.tasks.values()) {
        consolidatedTasks.push(...task);
      }

      if (!consolidatedTasks.includes(val)) {
        this.setState((prev) => ({
          createButtonDisabled: false,
          newTask: val,
        }));
      } else {
        this.setState((prev) => ({
          createButtonDisabled: true,
          newTask: val,
        }));
      }
    };
    this.setSelectedTask = (val) => {
      console.log(`selected task is: ${val}`);
      this.setState((prev) => ({
        selectedTask: val,
      }));
    };

    this.addNewTask = () => {
      this.setState((prev) => ({
        tasks: new Map(
          prev.tasks.set("Backlog", [
            ...prev.tasks.get("Backlog"),
            prev.newTask,
          ])
        ),
        newTask: "",
      }));
    };
  }

  // componentDidUpdate() {
  //   console.log("component was updated");
  // }

  render() {
    return (
      <div>
        <h1>Class Components Kanban Board</h1>
        <Controls
          newTask={this.state.newTask}
          setNewTask={this.setNewTask}
          setSelectedTask={this.setSelectedTask}
          addNewTask={this.addNewTask}
          createButtonDisabled={this.state.createButtonDisabled}
          moveBackButtonDisabled={this.moveBackButtonDisabled}
          moveForwardButtonDisabled={this.moveForwardButtonDisabled}
          deleteButtonDisabled={this.deleteButtonDisabled}
        />
        <Board stages={this.state.stages} tasks={this.state.tasks} />
      </div>
    );
  }
}
