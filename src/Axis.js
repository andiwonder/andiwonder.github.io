import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3';

export default class Axis extends Component {

  constructor(props){
    super(props);
    this.renderAxis = this.renderAxis.bind(this);
  }
  
  componentDidUpdate() {
    this.renderAxis();
  }

  componentDidMount() {
    this.renderAxis();
  }

  renderAxis() {
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

    this.axis = axis.scale(this.props.scale)
                    .ticks(this.props.ticks);

    if(this.props.tickFormat!=null && this.props.axisType==='x') {
      this.axis.tickFormat(d3.timeFormat(this.props.tickFormat));
    };
    const node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.axis);
  }


  render() {
    let translate = `translate(0,${this.props.h})`;
    return (
       <g className={this.props.className} transform={this.props.axisType=='x'?translate:""} >
       </g>
    );
  }
}
