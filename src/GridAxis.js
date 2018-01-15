import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

export class Axis extends React.Component {
  constructor(props){
    super(props);
    this.renderAxis = this.renderAxis.bind(this);
  }

  componentDidMount(){
    this.renderAxis();
  }

  componentDidUpdate(){
    this.renderAxis();
  }

  renderAxis(){
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.axis);
  }

  render(){
    const translate=`translate(0,${this.props.h})`;
    return(
      <g className="axis" 
         transform={this.props.axisType=='x'?translate:''}>        
      </g>
    );
  }
}

export class Grid extends React.Component {
  constructor(props){
    super(props);
    this.renderGrid = this.renderGrid.bind(this);
  }

  componentDidMount(){
    this.renderGrid();
  }

  componentDidUpdate(){
    this.renderGrid();
  }

  renderGrid(){
    let node = ReactDOM.findDOMNode(this);
    d3.select(node).call(this.props.grid);    
  }

  render(){
    const translate=`translate(0,${this.props.h})`;
    return(
      <g className="y-grid" 
         transform={this.props.gridType=='x'?translate:''}>        
      </g>
    );    
  }
}