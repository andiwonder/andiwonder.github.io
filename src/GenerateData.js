import * as moment from 'moment';
import * as d3 from 'd3';


const GenerateData = () => {
  var dataArea=[];
  const parseDate = d3.timeParse("%m-%d-%Y");
 
  for(var i=0,j=0;i<15;++i,++j){
   
      var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 30) + 5),type:'A'};
      d.date = parseDate(d.day);
      dataArea[i]=d;
  }
  for(var i=15,j=0;i<30;++i,++j){
   
      var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 40) + 20),type:'B'};
      d.date = parseDate(d.day);
      dataArea[i]=d;
  }
  for(var i=30,j=0;i<45;++i,++j){
   
      var d={day:moment().subtract(j, 'days').format('MM-DD-YYYY'),count:Math.floor((Math.random() * 50) + 30),type:'C'};
      d.date = parseDate(d.day);
      dataArea[i]=d;
  }
   
  return dataArea;
}

export default GenerateData;