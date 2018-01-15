import React, { Component } from 'react';
import * as d3 from "d3";

class Histogram extends React.Component {
  constructor(props){
    super(props);
    this.update_d3 = this.update_d3.bind(this);
    this.makeBar = this.makeBar.bind(this);
  }

  componentWillMount(){
    this.histogram = d3.histogram();
    this.widthScale = d3.scaleLinear();
    this.yScale = d3.scaleLinear();
    this.update_d3(this.props);
  }

  componentWillReceiveProps(newProps){
    this.update_d3(newProps);
  }

  update_d3(props){
    this.histogram
        .bins(props.bins)
        .value(this.props.value);

    let bars = this.histogram(props.data);
    let counts = bars.map((d) => { return d.y});

    this.setState({bars: bars});

    this.widthScale
        .domain([d3.min(counts), d3.max(counts)])
        .range([9, props.width-props.axisMargin]);

    this.yScale
        .domain([0, d3.max(bars.map((d) => { return d.x+d.dx}))])
        .range([0, props.height-props.topMargin-props.bottomMargin]);
  }

  makeBar(bar){
    // console.log("make bar props");
    // console.log(this.props);
    // console.log('bar is');
    // console.log(bar);
    let percent = bar.y/this.props.data.length*100;

    let props = {
      percent: percent,
      x: this.props.axisMargin,
      y: this.yScale(bar.x),
      width: this.widthScale(bar.y),
      height: this.yScale(bar.dx),
      key: "histogram-bar-" + bar.x + "-" + bar.y
    }
    
    // console.log("reassigned props is ");
    // console.log(props);

    return(
      <HistogramBar {...props} />
    )
  }

  render(){
    const translate = "translate(0, " + this.props.topMargin + ")";  
    return (
      <g className='histogram' transform={translate}>
        {this.state.bars.map(this.makeBar)}
      </g>
    )    
  }
}

const HistogramBar = (props) => {
  console.log(" props is ");
  console.log(props);
  let translate = "translate(" + props.x + "," + props.y + ")";
  let label = props.percent.toFixed(0) + '%';

  if (props.percent < 1){
    label = props.percent.toFixed(2)+"%";
  }

  if (props.width < 20) {
    label = label.replace("%", "");
  }

  if (props.width < 10) {
    label = "";
  }

  return(
    <g transform={translate} className="bar">
      <rect width={props.width}
            height={props.height-2}
            transform="translate(0,1)">
      </rect>
      <text textAnchor="end"
        x={props.width-5}
        y={props.height/2 + 3}>
        {label}        
      </text>
    </g>
  )
}

export default Histogram;