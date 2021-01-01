import React, { Component } from "react";
import Bar from "../Components/Bar";
import Input from "../Components/Input";
import Button from "../Components/Button";
const initialState = {
  delay: 50,
  numbers: [],
  stringNumbers: "",
  blueNumber: null,
  greenNumber: null,
  disabled: false,
  end: false,
};
const numberReg = /^[0-9\s]*$/;
class SortVisualizer extends Component {
  state = initialState;

  delayHandleChange = (ev) => {
    ev.persist();
    const { value } = ev.target;
    if (RegExp(numberReg).test(value))
      this.setState((state) => ({ ...state, delay: value }));
  };

  numbersHandleChange = (ev) => {
    ev.persist();
    const { value } = ev.target;
    if (RegExp(numberReg).test(value))
      this.setState((state) => ({
        state,
        stringNumbers: value,
        numbers: value.split?.(" ").filter((n) => !!n),
      }));
  };

  clear = () => this.setState(initialState);

  sleep = () => new Promise((resolve) => setTimeout(resolve, this.state.delay));

  insertionSort = async () => {
    // An array of integers to sort.
    this.setState((state) => ({ ...state, disabled: true }));
    let { numbers: copy } = this.state;
    for (let i = 1; i <= copy.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (copy[j + 1] < copy[j]) {
          await this.sleep();
          const temp = copy[j];
          copy[j] = copy[j + 1];
          copy[j + 1] = temp;
          this.setState((state) => ({
            ...state,
            greenNumber: j,
            numbers: copy,
          }));
        } else {
          break;
        }
        this.setState((state) => ({ ...state, blueNumber: i }));
      }
    }

    this.setState((state) => ({
      ...state,
      greenNumber: null,
      blueNumber: null,
      disabled: false,
      end: true,
    }));
  };

  render() {
    return (
      <div className={"visualizer-container"}>
        <div className={"array-container"}>
          {this.state.numbers.map((number, key) => (
            <Bar
              key={key}
              height={number}
              backgroundColor={
                key === this.state.blueNumber
                  ? "blue"
                  : key === this.state.greenNumber
                  ? "green"
                  : "limegreen"
              }
            />
          ))}
        </div>
        {this.state.end ? <div id="end-message">Sort has been ended</div> : ""}
        <div className={"input-container"}>
          <div>
            <Input
              elementId={"interval"}
              type="text"
              width={"300px"}
              placeholder={"Interval(ms) - default is 50ms"}
              onChange={this.delayHandleChange}
              value={this.state.delay}
            />
          </div>
          <div>
            <Input
              elementId={"array"}
              type="text"
              width={"600px"}
              placeholder={"Numbers"}
              onChange={this.numbersHandleChange}
              value={this.state.stringNumbers}
            />
          </div>
        </div>
        <footer className="app-footer">
          <Button
            elementId={"start"}
            text={"Insertion Sort"}
            onClick={this.insertionSort}
            disabled={this.state.disabled}
          />
          <Button elementId={"clean"} text={"Clear"} onClick={this.clear} />
        </footer>
      </div>
    );
  }
}

export default SortVisualizer;
