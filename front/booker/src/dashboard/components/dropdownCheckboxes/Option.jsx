import React, { Component } from "react";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";
import "./option.scss"

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected) => {
    this.props.setSelected(selected);
    this.setState({
      optionSelected: selected
    });
  };

  render() {
    return (
      <span
        class="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please selecet account(s)"
      >
        <ReactSelect
          className="select"
          options={this.props.options}
          isMulti={this.props.multiSelect}
          closeMenuOnSelect={!this.props.multiSelect}
          isClearable={true}
          hideSelectedOptions={this.props.multiSelect}
          components={{
            Option
          }}
          onChange={this.handleChange}
          allowSelectAll={this.props.multiSelect}
          value={this.state.optionSelected}
        />
      </span>
    );
  }
}