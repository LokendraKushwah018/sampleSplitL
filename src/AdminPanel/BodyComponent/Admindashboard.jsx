import { useEffect, useState } from 'react';
import Container from '../../Components/Adminlayout/Container'
import { AdminAPI, adminDashboard} from '../../Api/Config'
import { PageHeader } from '../Common/Components'

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

  const tokenAPI = (token) => {
    return ({
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
  }
 
  useEffect(() => {
    const todayData = [];
      const weekData = [];
      const monthData = [];
    const fetchData = async (c) => {
      const url =  `${adminDashboard}${c}`
      //  const token = localStorage.getItem("logintoken");
      await fetch(url, tokenAPI(token)).then((data) => {
        // console.log("Api data", data)
        const res = data.json();
        return res
      }).then((res) => {
        // console.log("ressss", res.sumtData)
        // for (const val of res) {
        if(c === "TODAY"){
          todayData.push(res.sumtData)
          setTodayData(todayData)

        }else if(c === "WEEK"){
          weekData.push(res.sumtData)
        setWeekData(weekData)

        }else if(c === "MONTH"){
          // console.log(res.sumtData)
          monthData.push(res.sumtData)
        setMonthData(monthData)
        }
        //     // labelSet.push(val.name)
        // }
        // console.log(setData.data)
      }).catch(err => {
        // console.log("error", err)
      })
    }
    fetchData("TODAY");
    fetchData("WEEK");
    fetchData("MONTH");
  }, [])
  // console.log(monthData[0])
  const datas =  {
    labels: ['Music Viewed'],
    datasets: [
      {
        label: 'Today',
        data: todayData,
        borderColor: '#98b4db',
        // backgroundColor: 'rgba(25, 90, 13, 0.5)',
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
    ],
  }
  return (
    <Container>
    <div 
    //  style={{ background:"grey"  ,  position: 'center'}}

    >
      <h3 style={{textAlign:'center'}} >User View Bar Chart</h3>
      <PageHeader title='Dashboard' />
      {
        // console.log("dataaaaaa", data)
      }
      <Bar data={datas} options={options} />
    </div>
    </Container>
    )
}
export default BlogGraph;