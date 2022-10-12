import { useEffect, useState } from 'react';
import Container from '../../Components/Layout/Backend/Container'

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

  const token = localStorage.getItem("logintoken")
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
      const url = `http://localhost:5001/api/admin/toptrackByDate?filterkey=${c}`
      //  const token = localStorage.getItem("logintoken");
      await fetch(url, tokenAPI(token)).then((data) => {
        // console.log("Api data", data)
        const res = data.json();
        return res
      }).then((res) => {
        console.log("ressss", res.sumtData)
        // for (const val of res) {
        if(c == "TODAY"){
          todayData.push(res.sumtData)
          setTodayData(todayData)

        }else if(c == "WEEK"){
          weekData.push(res.sumtData)
        setWeekData(weekData)

        }else if(c == "MONTH"){
          console.log(res.sumtData)
          monthData.push(res.sumtData)
        setMonthData(monthData)

        }
        //     // labelSet.push(val.name)
        // }
        // console.log(setData.data)
      }).catch(err => {
        console.log("error", err)
      })
    }
    fetchData("TODAY");
    fetchData("WEEK");
    fetchData("MONTH");
  }, [])
  console.log(monthData[0])
  const datas =  {
    labels: ['Music Viewed'],
    datasets: [
      {
        label: 'Today',
        data: todayData,
        // borderColor: 'rgb(255, 99, 132)',
        // backgroundColor: 'rgba(25, 90, 13, 0.5)',
        backgroundColor :'#90f7c9',
      },
      {
        label: 'WEEK',
        data: weekData,
        // borderColor: 'rgb(53, 162, 235)',
        backgroundColor: '#43f6f6',
      },
      {
        label: 'MONTH',
        data: monthData,
        // borderColor: 'rgb(53, 162, 235)',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        backgroundColor: '#fcb045',
        
      },
    ],
  }
  return (
    <Container>
    <div 
    // style={{ width: '120%' }}
    >
      <h3 style={{textAlign:'center'}} >User View Bar Chart</h3>
      {
        // console.log("dataaaaaa", data)
      }
      <Bar data={datas} options={options} />
    </div>
    </Container>
    )
}
export default BlogGraph;