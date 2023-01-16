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
        moveBackButtonDisabled: true,
        moveForwardButtonDisabled: true,
        deleteButtonDisabled: true,
        selectedTask: val,
      }));

      console.log(val);
      for (let stage of this.state.stages) {
        if (this.state.tasks.get(stage).includes(val)) {
          console.log(stage);
          switch (stage) {
            case "Backlog":
              this.setState((prev) => ({
                moveBackButtonDisabled: true,
                moveForwardButtonDisabled: false,
                deleteButtonDisabled: false,
              }));
              break;
            case "Done":
              this.setState((prev) => ({
                moveBackButtonDisabled: false,
                deleteButtonDisabled: false,
              }));
              break;
            default:
              this.setState((prev) => ({
                moveForwardButtonDisabled: false,
                moveBackButtonDisabled: false,
                deleteButtonDisabled: false,
              }));
          }
        }
      }
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

    this.handleAction = (action) => {
      console.log(action);
      let stageInFocus;
      let newTasksList;
      let prevStage;
      let nextStage;
      for (let stage of this.state.stages) {
        if (this.state.tasks.get(stage).includes(this.state.selectedTask)) {
          stageInFocus = stage;
          prevStage = this.state.stages[this.state.stages.indexOf(stage) - 1];
          nextStage = this.state.stages[this.state.stages.indexOf(stage) + 1];
        }
      }
      console.log(
        `stage in focus: ${stageInFocus}, previous stage: ${prevStage}, next stage: ${nextStage}`
      );
      switch (action) {
        case "Move Back":
          newTasksList = this.state.tasks
            .get(stageInFocus)
            .filter((item) => item !== this.state.selectedTask);
          console.log(newTasksList);
          this.setState((prev) => ({
            tasks: new Map(
              prev.tasks.set(stageInFocus, newTasksList),
              prev.tasks.set(prevStage, [
                ...prev.tasks.get(prevStage),
                prev.selectedTask,
              ])
            ),
          }));
          if (prevStage === "Backlog") {
            this.setState((prev) => ({
              moveBackButtonDisabled: true,
              moveForwardButtonDisabled: false,
              deleteButtonDisabled: false,
            }));
          } else {
            this.setState((prev) => ({
              moveBackButtonDisabled: false,
              moveForwardButtonDisabled: false,
              deleteButtonDisabled: false,
            }));
          }
          break;
        case "Move Forward":
          newTasksList = this.state.tasks
            .get(stageInFocus)
            .filter((item) => item !== this.state.selectedTask);
          console.log(newTasksList);
          this.setState((prev) => ({
            tasks: new Map(
              prev.tasks.set(stageInFocus, newTasksList),
              prev.tasks.set(nextStage, [
                ...prev.tasks.get(nextStage),
                prev.selectedTask,
              ])
            ),
          }));
          if (nextStage === "Done") {
            this.setState((prev) => ({
              moveBackButtonDisabled: false,
              moveForwardButtonDisabled: true,
              deleteButtonDisabled: false,
            }));
          } else {
            this.setState((prev) => ({
              moveBackButtonDisabled: false,
              moveForwardButtonDisabled: false,
              deleteButtonDisabled: false,
            }));
          }
          break;
        case "Delete":
          newTasksList = this.state.tasks
            .get(stageInFocus)
            .filter((item) => item !== this.state.selectedTask);
          console.log(newTasksList);
          this.setState((prev) => ({
            tasks: new Map(prev.tasks.set(stageInFocus, newTasksList)),
            selectedTask: "",
          }));
          break;
        default:
        // code block
      }
    };
  }

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
          moveBackButtonDisabled={this.state.moveBackButtonDisabled}
          moveForwardButtonDisabled={this.state.moveForwardButtonDisabled}
          deleteButtonDisabled={this.state.deleteButtonDisabled}
          handleAction={this.handleAction}
        />
        <Board stages={this.state.stages} tasks={this.state.tasks} />
      </div>
    );
  }
}
