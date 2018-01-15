import React, {Component} from 'react';
import * as d3 from 'd3';
import {Grid, Axis} from './GridAxis';
import Tooltip from './Tooltip'
import ReactDOM from 'react-dom';
import $ from "jquery";

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip:{ display:false, data:{key:'',value:''}},
      width: this.props.width
    };
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  componentWillMount() {
    $(window).on('resize', (e) => {
      this.updateSize();
    })

    this.setState({width: this.props.width});
  }

  componentDidMount() {
    this.updateSize();
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  updateSize() {
    const node = ReactDOM.findDOMNode(this);
    let parentWidth = $(node).width();

    if(parentWidth< this.props.width){
      this.setState({width: parentWidth-20});
    }else{
      this.setState({width: this.props.width});
    }
  }

  
  showToolTip(e){
    e.target.setAttribute('fill','#FFFFFF');

    this.setState({tooltip:{
      display:true,
      data: {
        key: e.target.getAttribute('data-key'),
        value: e.target.getAttribute('data-value')
      },
      pos: {
        x:e.target.getAttribute('cx'),
        y:e.target.getAttribute('cy')
      }
    }}, () => { console.log(this.state); })    
  }

  hideToolTip(e){
    e.target.setAttribute('fill', '#7dc7f4');
    this.setState({tooltip:{ display:false, data:{key:'',value:''}}})
  }


  render() {
    const data=[
      {day:'02-11-2016',count:180},
      {day:'02-12-2016',count:250},
      {day:'02-13-2016',count:150},
      {day:'02-14-2016',count:496},
      {day:'02-15-2016',count:140},
      {day:'02-16-2016',count:380},
      {day:'02-17-2016',count:100},
      {day:'02-18-2016',count:150}
    ];
    
    const margin = {top: 5, right: 50, bottom: 20, left: 50};
    let w = this.state.width - (margin.left + margin.right);
    let h = this.props.height - (margin.top + margin.bottom);
    const parseDate = d3.timeParse("%m-%d-%Y");

    data.map((d) => {
      d.date = parseDate(d.day);
    });
    const x = d3.scaleTime()
                .domain(d3.extent(data, (d) => { return d.date}))
                .rangeRound([0, w]);
    const y = d3.scaleLinear()
                .domain([0, d3.max(data, (d) => { return d.count+100})])
                .range([h, 0]);
    const line = d3.line()
                 .x((d) => {return x(d.date);})
                 .y((d) => {return y(d.count);})
                 .curve(d3.curveCardinal);

    const yAxis = d3.axisLeft(y)                    
                    .ticks(5);

    const xAxis = d3.axisBottom(x)                    
                    .tickValues(data.map((d,i)=>{ if (i>0) return d.date;}).splice(1))
                    .ticks(4);

    const yGrid = d3.axisLeft(y)                    
                    .ticks(5)
                    .tickSize(-w, 0, 0)
                    .tickFormat("");

    let transform = `translate(${margin.left},${margin.top})`

    return(
      <div>
        <svg id={this.props.chartId} width={this.state.width} height={this.props.height}>
          <g transform={transform}>
            <Grid h={h} grid={yGrid} gridType="y"/>
            <Axis h={h} axis={yAxis} axisType="y" />
            <Axis h={h} axis={xAxis} axisType="x"/>
            <path className="line shadow" d={line(data)} strokeLinecap="round"/>
            <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>
            <Tooltip tooltip={this.state.tooltip} />
          </g>
        </svg>
      </div>
    )
  }
}

class Dots extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const data = this.props.data.splice(1);
    data.pop();

    let circles = data.map((d, i) => {
      return (
        <circle className="dot" r="7" cx={this.props.x(d.date)}
                cy={this.props.y(d.count)} stroke="#3f5175" 
                strokeWidth="5px" key={i} fill="#7dc7f4"
                onMouseOver={this.props.showToolTip}
                onMouseOut={this.props.hideToolTip}
                data-key={d3.timeFormat("%b %e")(d.date)}
                data-value={d.count}
        />
      )
    })

    return (
      <g>
        {circles}
      </g>
    )
  }
}

LineChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart'
}

export default LineChart;
