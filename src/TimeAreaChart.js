import React, { Component } from 'react';
import * as d3 from 'd3';

import Grid from './Grid';
import Axis from './Axis';

export default class TimeAreaChart extends Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.state = {
      width: 800,
      height: 480
    }
  }

  createChart() {
    this.w = this.state.width - (this.props.margin.left + this.props.margin.right);
    this.h = this.props.height - (this.props.margin.top + this.props.margin.bottom);
    const that = this;

    //Fix
    // used that to pass reference to this, right way to do it?

    this.xScale = d3.scaleTime()
                    .domain(d3.extent(that.props.data, function (d) {
                      return d[that.props.xData];
                    }))
                    .rangeRound([0, that.w]);

    this.yScale = d3.scaleLinear()
                    .domain([0,d3.max(that.props.data,function(d){
                        return d[that.props.yData]+that.props.yMaxBuffer;
                    })])
                    .range([that.h, 0]);

    this.area = d3.area()
                  .x(function (d) {
                      return that.xScale(d[that.props.xData]);
                  })
                  .y0(that.h)
                  .y1(function (d) {
                      return that.yScale(d[that.props.yData]);
                  })
                  .curve(d3.curveCardinal);
    
    //Fix
    // passed .curve(d3.curveCadinal) for interpolation                  

    this.transform=`translate(${this.props.margin.left},${this.props.margin.top})`;    
  }

  createElements(element, i) {
    let object;

    switch(element.type){
      case 'xGrid':
        object = <Grid h={this.h} len={this.h} scale={this.xScale} 
                       gridType="x" key={i} {...this.props} {...element.props}/>;
        break;
      case 'yGrid':
        object = <Grid h={this.h} len={this.w} scale={this.yScale} 
                       gridType="y" key={i} {...this.props} {...element.props}/>;
        break;
      case 'xAxis':
        object=<Axis h={this.h} scale={this.xScale} axisType="x" key={i} {...this.props} {...element.props}/>;
        break;
      case 'yAxis':
        object=<Axis h={this.h} scale={this.yScale} axisType="y" key={i} {...this.props} {...element.props}/>;
        break;
 
      case 'area':
        var data=[];
        for(var k=0,j=0;k<this.props.data.length;++k){
            if(this.props.data[k][this.props.type]===element.props.value){
                data[j]=this.props.data[k];
                ++j;
            }
        }
        object=<path className={element.props.className} d={this.area(data)} key={i} fill={element.props.fill}/>;
        break;
    }
    return object;
  }

  render() {
    this.createChart();
    let elements;

    if(this.props.children != null) {
      if(Array.isArray(this.props.children)){
        elements = this.props.children.map((element,i) => {
          return this.createElements(element, i);
        })
      } else {
        elements = this.createElements(this.props.children, 0);
      }
    }

    return (      
        <svg id={this.props.chartId} width={this.state.width} height={this.state.height}>
          <g transform={this.transform}>
            {elements}
          </g>
        </svg>
    );
  }
}

TimeAreaChart.defaultProps = {
  width: 800,
  height: 300,
  chartId: 'v1_chart',
  interpolations: 'linear',
  margin: { top: 5, right: 5, bottom: 5, left: 5},
  yMaxBuffer:10
}
