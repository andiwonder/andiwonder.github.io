import React, { Component } from 'react';
import * as d3 from 'd3';

export default class DonutChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      width: 0
    }
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount() {
    this.pie = d3.pie()
                 .value((d) => { return d.count })
                 .padAngle(this.props.padAngle)
                 .sort(null)

    this.color = d3.scaleOrdinal()
                   .range(['#68c8d7','#eccd63','#bb8cdd','#de6942','#52b36e','#bbc7d9']);

    const data = [
      { name: 'IE', count: 40 },
      { name: 'Chrome', count: 32 },
      { name: 'Safari', count: 14 },
      { name: 'Firefox', count: 9 },
      { name: 'Others', count: 6 }
    ];

    this.setState({data: data, width: this.props.width});
  }

  updateData() {
    
    var data = [
      { name: 'IE', count: Math.random() },
      { name: 'Chrome', count: Math.random() },
      { name: 'Safari', count: Math.random() },
      { name: 'Firefox', count: Math.random() },
      { name: 'Others', count: Math.random() },
      { name: 'Opera', count: Math.random() }
    ];

    this.setState({data:data });
  }

  render() {    
    return (
      <svg id={this.props.id} width={this.state.width}
           height={this.props.height} className="shadow" onClick={this.updateData}>
        <DonutChartPath width={this.state.width} height={this.props.height} pie={this.pie} color={this.color} data={this.state.data} />
        <DonutChartLegend pie={this.pie} color={this.color} data={this.state.data} width={this.state.width} height={this.props.height} />
      </svg>
    );
  }
}

DonutChart.defaultProps = {
  width: 450,
  height: 250,
  padAngle: 0
}



class DonutChartPath extends Component {
  constructor(props){
   super(props); 
   this.createChart = this.createChart.bind(this);
  }


  componentWillMount() {
    let radius=this.props.height;

    let outerRadius = radius/2;
    let innerRadius = radius/3.3;

    this.arc = d3.arc()
                 .outerRadius(outerRadius)
                 .innerRadius(innerRadius);

    this.transform=`translate(${radius/2},${radius/2})`;
  }

  createChart() {
    let paths = (this.props.pie(this.props.data)).map((d,i) => {
      return (
        <path fill={this.props.color(i)} d={this.arc(d)} key={i} />
      )
    });
    return paths;
  }

  render() {
    let paths = this.createChart();

    return (
      <g transform={this.transform}>
        {paths}
      </g>
    );
  }
}

class DonutChartLegend extends Component {
  constructor(props){
    super(props);
    this.createChart = this.createChart.bind(this);
  }
  
  createChart() {
    let texts = (this.props.pie(this.props.data)).map((d,i) => {

      const transform=`translate(10,${i*30})`;
      const rectStyle = {
        fill: this.props.color(i),
        stroke: this.props.color(i)
      };
      const textStyle = {
        fill: this.props.color(i)
      };

      return(
        <g transform={transform} key={i}>
          <rect width="20" height="20" style={rectStyle} rx="2" rx="2" />
          <text x="30" y="15" className="browser-legend" style={textStyle}>
            {d.data.name}
          </text>
        </g>
      )
    });
    return texts;
  }


  render() {
    const style={
      visiblity:'visible'
    };

    if (this.props.width<=this.props.height+70) { style.visiblity = 'hidden'}
    let texts = this.createChart();
    let transform = `translate(${this.props.width/2 + 80},55)`
    return (
      <g is transform={transform} style={style}>
        {texts}
      </g>
    );
  }
}


// DonutChart.defaultProps