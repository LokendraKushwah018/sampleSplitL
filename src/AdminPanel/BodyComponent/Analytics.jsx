import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PageHeader } from '../Common/Components'
// import logo from '../../../components/assets/img/alive.jpg'
import axios from 'axios';
import { topfans, toptracks } from '../../Api/Config';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Stack } from '@mui/system';
import Container from '../../Components/Layout/Backend/Container'


const Analytics = () => {

  let token = localStorage.getItem('logintoken');
  let [toptrack, setToptracks] = useState([]);
  let [topfan, setTopfans] = useState([]);

  useEffect(() => {
    ttrack();
    tfans();
  }, [])
  const ttrack = () => {
    axios(
      {
        url: `${toptracks}`,
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
  const tfans = () => {
    axios(
      {
        url: `${topfans}`,
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
      <Box mt={2}>
        {/* //title section  */}
        <PageHeader title='Analytics' />
      </Box>
      <div style={{ background: 'white', width: "500px", height: '650px' }}>
        <div style={{ background: 'gray' }}>
          <p style={{ color: 'white' }}><hr />&nbsp;&nbsp;TOP TRACKS<hr /></p>
        </div>
        <div>

          {toptrack.map((track) => {
            return (
              <>
                <div style={{ float: "left" }}>
                  <img style={{ width: '100px', height: '100px', marginLeft: '20px' }} src={track.imageName} alt="/" />
                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{track.musicPlayed}</p>
                </div>
              </>
            )
          })}
        </div><br /><br /><br /><br /><br />
        <div style={{ background: 'gray' }}>
          <p style={{ color: 'white' }}><hr />&nbsp;&nbsp;TOP FANS<hr /></p>
        </div>
        <div>
          {topfan.map((fan) => {
            return (
              <>
                <div style={{ float: 'left' }}>
                  <Stack direction="row" style={{ marginLeft: '20px' }}>
                    <Avatar style={{ width: '100px', height: '100px', background: '#1F2D5A', borderRadius: '0px' }} >{fan.username}</Avatar>
                  </Stack>

                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{fan.topuser}</p>

                </div>
              </>
            )
          })}
        </div><br /><br /><br /><br /><br />
        <div style={{ background: 'gray' }}>
          <p style={{ color: 'white' }}><hr />&nbsp;&nbsp;TOP COUNTRIES<hr /></p>
        </div>
        <div>
          {topfan.map((item) => {
            return (
              <>
                <div style={{ float: 'left' }}>
                  <Stack direction="row" style={{ marginLeft: '20px' }}>
                    <Avatar style={{ width: '100px', height: '100px', background: '#2F76DB', borderRadius: '0px' }} >{item.country}</Avatar>
                  </Stack>
                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{item.topuser}</p>

                </div>
              </>
        )
          })}
        {/* <div style={{ float: 'left' }}>
          <Stack direction="row" style={{ marginLeft: '20px' }}>
            <Avatar style={{ width: '100px', height: '100px', background: '#1F2D5A', borderRadius: '0px' }} >{topfan.country}</Avatar>
          </Stack>
        </div> */}
      </div>

      {/* <Stack direction="row" spacing={3}>
            <Avatar style={{ width: '100px', height: '100px' }}></Avatar>
            
            <Avatar style={{ width: '100px', height: '100px' }}></Avatar>
          </Stack>
          {/* <p style={{textAlign:'center'}}>hello</p> */}
      {/* </div> */}
      {/* <div>
          <div style={{float:"left"}}>
          <img style={{width:'100px' , height:'100px', marginLeft:'20px'}} src={logo} alt="/" />
          <p style={{textAlign:"center"}}>hello</p>
          </div> */}
      {/* <div style={{float:"left"}}>
          <img style={{width:'100px' , height:'100px', marginLeft:'20px'}} src={logo} alt="/" />
          <p>hello</p>
          </div> */}
      {/* <img style={{width:'100px' , height:'100px', float:'left' ,marginLeft:'20px'}} src={logo} alt="/" />
          <img style={{width:'100px' , height:'100px', float:'left', marginLeft:'20px'}} src={logo} alt="/" />
          <img style={{width:'100px' , height:'100px', float:'left', marginLeft:'20px'}} src={logo} alt="/" /> */}
      {/* </div> */}
    </div>
    </Container>
    </>
  )
}
export default Analytics;