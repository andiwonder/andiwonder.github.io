import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';

export default class Grid extends Component {
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
    let axis;

    switch(this.props.orient){
      case 'left':
        axis = d3.axisLeft();
        break;
      case 'right':
        axis = d3.axisRight();
        break;
      case 'top':
        axis = d3.axisTop();
        break;
      case 'bottom':
        axis = d3.axisBottom();
        break;
    }

    this.grid = axis.scale(this.props.scale)
                    .ticks(this.props.ticks)
                    .tickSize(-this.props.len, 0, 0)
                    .tickFormat("");

    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.grid);
  }

  render() {    
    let translate = `translate(0,${this.props.h})`;
    return (
      <g className={this.props.className} transform={this.props.gridType=='x'?translate:""}>
      </g>
    );
  }
}
