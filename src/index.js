import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LineChart from './LineChart';
import DonutChart from './DonutChart';
import registerServiceWorker from './registerServiceWorker';
import BarChart from './BarChart';
import ProgressChart from './ProgressChart'


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
// ReactDOM.render(<App url='data/h1bs.csv'/>, document.getElementById('h1bgraph'));
registerServiceWorker();
