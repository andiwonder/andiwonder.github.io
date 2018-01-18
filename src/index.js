import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LineChart from './LineChart';
import DonutChart from './DonutChart';
import registerServiceWorker from './registerServiceWorker';
import BarChart from './BarChart';
import ProgressChart from './ProgressChart'

import TimeAreaChart from './TimeAreaChart';
import GenerateData from './GenerateData';


const Visitors = () => {
  return (
    <div>
      <h3>Line Chart</h3>
      <div className="bottom-right-svg">
        <LineChart/>
      </div>
    </div>
  )
}

const RetVisitors = () => {
  return (
    <div>
      <h3>Progress Chart with bars</h3>
      <div className="pad bottom-right-svg">
        <ProgressChart />
        <br/>
        <BarChart />
      </div>
    </div>
  )
};

const Browser = () => {
  return (
    <div>
      <h3>Pie chart</h3>
      <div className="pad bottom-left-svg">
          <DonutChart id="bs_chart" padAngle={0.03}/>
      </div>
    </div>
  )
};

const dataArea = GenerateData();

const D3TimeAreaChart = () => {
  const margin={
    top: 20, right: 30, bottom: 20, left: 50
  };
  return (
    <TimeAreaChart data={dataArea} xData="date" yData="count" type="type" margin={margin}
                 yMaxBuffer={10} id="multi-area-chart" interpolations="cardinal">
      <yGrid orient="left" className="y-grid" ticks={5}/>
      <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
      <yAxis orient="left" className="axis" ticks={5}/>
      <area className="area" fill="#ca6f96" value="C"/>
      <area className="area" fill="#53c79f" value="B"/>
      <area className="area" fill="#e58c72" value="A"/>
    </TimeAreaChart>
  )
}

const D3TimeLineChart = () => {
  return(
    <TimeLineChart data={data} xData="date" yData="count" margin={margin}
                     yMaxBuffer={10} id="line-chart">
      <defs>
        <gradient color1="#fff" color2="#53c79f" id="area"/>
      </defs>
      {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
      <yGrid orient="left" className="y-grid" ticks={5}/>
      <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4}/>
      <yAxis orient="left" className="axis" ticks={5}/>
      <area className="area" fill="url(#area)"/>
      <path className="line shadow" strokeLinecap="round"/>
      <dots r="5" format="%b %e" removeFirstAndLast={false}/>
      <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count"/>
    </TimeLineChart>
  )
}

// const Page = () => {
//   return (
//     <div className="container">
//       <MainPageSelection />
//       <Cards />
//       <MainContainer />
//       <SubContainer />
//     </div>
//   )
// }

ReactDOM.render(<RetVisitors/>,document.getElementById("ret_visitors"));
ReactDOM.render(<Browser/>,document.getElementById("browser"));
ReactDOM.render(<Visitors/>,document.getElementById("top-line-chart"));
ReactDOM.render(<D3TimeAreaChart/>,document.getElementById("time-area-chart"));

// ReactDOM.render(<App url='data/h1bs.csv'/>, document.getElementById('h1bgraph'));
registerServiceWorker();
