import { useEffect, useState } from 'react';
import Container from '../../Components/Adminlayout/Container'
import { adminbaseurl, adminDashboard} from '../../Api/Config'
import { PageHeader } from '../Common/Components'
import '../css/adminDashBargraph.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { Today } from '@mui/icons-material';
// import { Button } from 'bootstrap';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  indexAxis: 'x',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
};


const BlogGraph = () => {
  const token = useSelector(state=>state.admin.adminlogintoken)
  // const token = localStorage.getItem("logintoken")
  const [monthData, setMonthData] = useState([])
  const [weekData, setWeekData] = useState([])
  const [todayData, setTodayData] = useState([])
  const [subammount , setSubammount] = useState([])
  const [subscriber , setSubscriber] = useState([])

  const tokenAPI = (token) => {
    return ({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
  }

  const total = () => {
    axios({
      url: `${adminbaseurl}getTotalSubAmount`,
      method: "get",
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    }).then((response) => {
      //  console.log(response)
      setSubammount(response.data.getTotal)
    }).catch((error) => {
      console.log(error)
    })
  }

  const totalUser = () => {
    axios({
      url: `${adminbaseurl}totalSubByuser`,
      method: "get",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response)=> {
      // console.log(response)
      setSubscriber(response.data.getTotalSub)
    }).catch((error)=> {
      console.log(error)
    })
  }
 
  useEffect(() => {
    total();
    totalUser();
    const todayData = [];
      const weekData = [];
      const monthData = [];
    const fetchData = async (c) => {
      const url =  `${adminbaseurl}${adminDashboard}${c}`
      //  const token = localStorage.getItem("logintoken");
      await fetch(url, tokenAPI(token)).then((data) => {  
        // console.log("Api data", data)
        const res = data.json();
        return res
      }).then((res) => {
        //  console.log("ressss", res.sumtData)
        //  console.log(res)

        if(c === "TODAY"){
          todayData.push(res.sumtData)
          setTodayData(todayData)
          // setVisible(todayData)
        console.log(res)
        }else if(c === "WEEK"){
          weekData.push(res.sumtData)
        setWeekData(weekData)
        // setVisible(weekData)

        
        }else if(c === "MONTH"){
          monthData.push(res.sumtData)
        setMonthData(monthData)
        // setVisible(monthData)

        }
    
      }).catch(err => {
      })
    }
    fetchData("TODAY");
    fetchData("WEEK");
    fetchData("MONTH");
  }, [])
  const datas =  {
    labels: ['Music Viewed'],
    datasets: [
      {
        label: 'TODAY',
        // button: {todayData},
        data: todayData,
        borderColor: '#98b4db',
        backgroundColor :'#2F76DB',
      },
      {
        label: 'WEEK',
        data: weekData,
        borderColor: 'rgb(146, 143, 143)',
        backgroundColor: 'rgb(216, 212, 212)',
      },
      {
        label: 'MONTH',
        data: monthData,
        borderColor: '#373f5a',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: '#1F2D5A',        
      },      
    ]
  }

  return (
    <Container>
    <> 
    <PageHeader title='Dashboard' />
 <div className="row1 " >
  <div className="col-lg-7 ">  
    <div className="small-box bg-secondary text-dark">    
      <div className="inner">
        <h3 className='monthdata'>{monthData} </h3>
        <p className='playmonth'>Play This Month</p>
      </div>
      {/* <b>dsfdsfdd</b> */}
      <div className="icon">
       <i className="ion ion-bag" />
      </div> 
    </div>
  </div>  
  <div className="col-lg-6 ">
    <div className="small-box text-dark " style={{backgroundColor:'#2F76DB'}}>
      <div className="inner">
        <h3>{subscriber}</h3>
        <p>User Subscription</p>
      </div>
      <div className="icon">
        <i className="ion ion-person-add" />
      </div>
    </div>
  </div>
  <div className="col-lg-7 ">
    <div className="small-box bg-secondary text-dark " >
      <div className="inner">
        <h3>${subammount}</h3>
        <p>Sale This Month</p>
      </div>
      <div className="icon">
        <i className="ion ion-pie-graph" />
      </div>      
    </div>
  </div>
</div>
<p className='adminbargraph'>
<Bar data={datas} options={options} />
</p>
{/* <div className="card bg-gradient-dark ">
  <div className="card-header"
  style={{marginTop: -200}}>
    <h3 className="card-title ">
      <i className="far fa-calendar-alt mr-2" />
      Calendar
    </h3>   
    <div className="card-tools">
      <button type="button" className="btn btn-dark btn-sm ml-2 mr-2 " data-card-widget="collapse">
        <i className="fas fa-minus " />
      </button>
      <button type="button" className="btn btn-dark btn-sm" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  <div className="card-body pt-0">
    <div id="calendar" style={{width: '100%'}} />
  </div>
</div> */}
     
    </><br/>
    </Container>
    )
}
export default BlogGraph;