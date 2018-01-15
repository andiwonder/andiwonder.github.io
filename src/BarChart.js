import React, { Component } from 'react';
import * as d3 from 'd3';

export default class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {width: 300};
  }
  
  render() {
    const data = [
      { month:'Jan', value:40 },
      { month:'Feb', value:50 },
      { month:'Mar', value:65 },
      { month:'Apr', value:60 },
      { month:'May', value:70 },
      { month:'Jun', value:55 },
      { month:'Jul', value:80 },
      { month:'Aug', value:55 },
      { month:'Sep', value:75 },
      { month:'Oct', value:50 },
      { month:'Nov', value:60 },
      { month:'Dec', value:75 }
    ];

    const margin = {top:5,right:5,bottom:5,left:5};
    const w = this.state.width-(margin.left+margin.right);
    const h = this.props.height-(margin.top+margin.bottom);

    const transform = 'translate('+margin.left+','+margin.top+')';

    const x = d3.scaleBand()
        .domain(data.map(function(d){
            return d.month;
        }))
        .rangeRound([0,this.state.width],.35);

    const y=d3.scaleLinear()
        .domain([0,100])
        .range([this.props.height,0]);

    let rectBackground=(data).map(function(d, i) {
      // needs fix, used -5 to get some padding
      return (
        <rect fill="#58657f" rx="3" ry="3" key={i}
              x={x(d.month)} y={margin.top-margin.bottom}
              height={h}
              width={(x.bandwidth()) - 8 }/>
      )
    });

    var rectForeground=(data).map(function(d, i) {
      // needs fix, used -5 to get some padding
      return (
        <rect fill="#74d3eb" rx="3" ry="3" key={i}
              x={x(d.month)} y={y(d.value)} className="shadow"
              height={h-y(d.value)}
              width={(x.bandwidth()) - 8 }/>
      )
    });
 
    return (
      <div>
        <svg id={this.props.chartId} width={this.state.width}
             height={this.props.height}>
          <g transform={transform}>
              {rectBackground}
              {rectForeground}
          </g>
        </svg>
      </div>
    );
  }
}

BarChart.defaultProps = {
  width: 300,
  height: 70,
  chartId: 'v_chart'
}