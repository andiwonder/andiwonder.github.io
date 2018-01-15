import React, { Component } from 'react';
import * as d3 from "d3";
import * as _ from 'lodash';
import './App.css';
// import Histogram from './Drawers';
import LineChart from './LineChart';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rawData : []
    };
    this.loadRawData = this.loadRawData.bind(this);
  }

  componentWillMount(){
    this.loadRawData();
    // console.log(this.state);
  }

  loadRawData(){    
    var dateFormat = d3.timeParse("%m/%d/%Y");
    // var testdate = ('8/1/2013');
    // console.log('test date is ' + testdate)
    // console.log(dateFormat(testdate));
    d3.csv(this.props.url)
      .row(function(d) {        
        if(!d['base salary']){
          return null;
        }        


        return {
          employer: d.employer,
          submit_date: dateFormat(d['submit date']),
          start_date: dateFormat(d['start date']),
          case_status: d['case status'],
          job_title: d['job title'],
          base_salary: d['base salary'],
          salary_to: d['salary to'] ? Number(d['salary to']) : null,
          city: d['city'],
          state: d.state
        };
      }.bind(this))
      .get(function(error, rows) {
        if(error){
          console.error(error);          
          console.error(error.stack);
        } else {
          // console.log(rows);
          this.setState({rawData: rows});
        }
      }.bind(this));
  }

  render() {
    const data = JSON.stringify(this.state.rawData.slice(0,5));
    const params = {
      bins: 200,
      width: 500,
      height: 500,
      axisMargin: 83,
      topMargin: 10,
      bottomMargin: 5,
      value: function(d) {return d.salary}
    }
    const fullWidth = 700;


    if (!this.state.rawData.length) {
      return (
        <h2>Loading data</h2>
      )
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <LineChart />
        </div>
      </div>
    );
  }
}

export default App;
