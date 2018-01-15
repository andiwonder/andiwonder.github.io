import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.renderGrid = this.renderGrid.bind(this);
  }

  componentDidMount() {
    this.renderGrid();
  }

  componentDidUpdate(prevProps, prevState) {
    this.renderGrid();
  }

  renderGrid() {
    this.grid = d3.axisLeft()
                  .scale(this.props.scale)
                  .ticks(this.props.ticks)
                  .tickSize(-this.props.len, 0, 0)
                  .tickFormat("");

    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.grid);
  }

  render() {
    translate = `translate(0,${this.props.h})`;
    return (
      <g className={this.props.className} transform={this.props.gridType=='x'?translate:""}>
      </g>
    );
  }
}
