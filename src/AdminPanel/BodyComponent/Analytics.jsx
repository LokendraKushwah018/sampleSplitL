import React from 'react';
import { Box } from '@material-ui/core';
import { PageHeader } from '../Common/Components'
import axios from 'axios';
import { adminbaseurl } from '../../Api/Config';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Stack } from '@mui/system';
import Container from '../../Components/Adminlayout/Container';
import { useSelector } from 'react-redux';
import '../css/Analytics.css'
// import '../css/styles'

const Analytics = () => {
  const token = useSelector(state=>state.admin.adminlogintoken) 
   // let token = localStorage.getItem('logintoken');
  let [toptrack, setToptracks] = useState([]);
  let [topfan, setTopfans] = useState([]);

  useEffect(() => {
    ttrack();
    tfans();
  }, [])

  // Top Track API
  const ttrack = () => {
    axios(
      {
        url: `${adminbaseurl}topTrack`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data.getTrack);
      setToptracks(res.data.getTrack);
    }).catch((err) => {
      console.log(err);
    })
  }
    // Top Fans API   
  const tfans = () => {
    axios(
      {
        url: `${adminbaseurl}getTopFans`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data.topFans);
      setTopfans(res.data.topFans);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <>
      <Container>
        <Box mt={0}>
            {/* title section */}
          <PageHeader title='Analytics' />
        </Box>
        <div className='analytics' 
        // style={{ background: 'white', width: "1000px", height: '640px', boxShadow: '5px 10px 8px 10px #888888', marginLeft:40 }}
        >
          <div style={{ background: 'gray' }}>
            <hr />
            <p className='toptrack' 
            // style={{ color: 'white', marginLeft: '10px' }}
            >TOP TRACKS</p><hr />
          </div>
          <div>
            {toptrack.map((track, index) => {
              return (
                <div style={{ float: "left" }} key={index}>
                  <img className='tpimage' 
                  // style={{ width: '200px', height: '100px', marginLeft: '40px' }} 
                  src={track.imageName} alt="/" />
                  {/* <p style={{ textAlign: "center" }}>
                    {track.trackTitle} */}
                  <p style={{ textAlign: "center" }}>{track.musicPlayed}</p>
                  
                </div>
              )
            })}
          </div>
          <div className='trackdiv'>
            <hr /><p className='toptrack'>TOP FANS</p><hr />
          </div>
          <div>
            {topfan.map((fan, index) => {
              return (
                <div style={{ float: 'left' }} key={index}>
                  <div direction="row" >
                    <div className='avatar'
                    
                      //  style={{ width: '200px', height: '100px', background: '#1F2D5A', borderRadius: '0px',marginLeft: '40px' }} 
                    ><h6 className='topfanuser'> <br/><br/>{fan.username}</h6></div>
                  </div>
                  <p style={{ textAlign: "center" }}>{fan.topuser}</p>
                </div>
              )
            })}
          </div>
          <div className='trackdiv' >
            <hr /><p className='toptrack'>TOP COUNTRIES</p><hr />
          </div>
          <div>
            {topfan.map((item, index) => {
              return (
                <div style={{ float: 'left' }} key={index}>
                  <div direction="row" >
                    <div className='avatar1' 
                    //  style={{ width: '200px', height: '100px', background: '#2F76DB' , borderRadius: '0px',marginLeft: '40px' }} 
                    ><h6 className='topfanuser1'> <br/><br/> {item.country}</h6></div>
                  </div>
                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{item.topuser}</p>
                </div>
              )
            })}
          </div>
        </div><br /><br />
      </Container>
    </>
  )
}
export default Analytics;