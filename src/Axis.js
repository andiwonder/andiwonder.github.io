import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import * as d3 from 'd3';

export class Axis extends Component {

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
    this.axis = d3.axisBottom()
                  .scale(this.props.scale)
                  .ticks(this.props.tick);
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
