import React, { Component } from "react";
import "./App.css";
import debounce from "./debounce";

export default class AutoCompletedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      text: "",
      active: 0,
      loading: false,
    };
  }

  componentDidMount() {
    this.sendTextChange = debounce(this.sendTextChange, 500);
  }

  sendTextChange = async (value) => {
    let results = [];
    if (value.length > 0) {
      results = await this.props.fetchResults(value);
    }

    this.setState(() => ({
      ...this.state,
      ...{
        results,
        loading: false,
        active: 0
      },
    }));
  };

  onTextChange = async (e) => {
    const value = e.target.value;
    this.setState(() => ({
      ...this.state,
      ...{
        results: [],
        text: value,
        loading: true,
        active: 0,
      },
    }));
    this.sendTextChange(value);
  };

  selectedText(value) {
    this.setState(() => ({ text: value, results: [], active: 0 }));
  }

  onKeyDown = (e) => {
    if (this.loading) return;
    const { active, results } = this.state;
    if(results.length < 1)
        return;
    // enter key
    if (e.keyCode === 13) {
      this.setState(
        { active: 0, results: [], text: results[active] } 
      );
    } else if (e.keyCode === 38) {
        // up arrow
      if (active === 0) {
        return;
      }

      this.setState(
        {
          active: active - 1,
        } 
      );
    } else if (e.keyCode === 40) {
        // down arrow
      if (active  === results.length - 1) {
        return;
      }

      this.setState({
        active: active + 1,
      });
    }
  };

  render() {
    const { text, results, loading, active } = this.state;
    return (
      <div id="container">
        <h2>Cats</h2>
        <input
          id="query"
          type="text"
          onChange={this.onTextChange}
          onKeyDown={this.onKeyDown}
          value={text}
        />
        {results.length > 0 && (
          <ul>
            {results.map((item, index) => (
              <li
                key={index}
                className={`${active === index ? "suggestion-active" : ""}`}
                onClick={() => this.selectedText(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
        {loading && <p>Loading...</p>}
      </div>
    );
  }
}
