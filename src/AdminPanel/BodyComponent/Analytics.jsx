
import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { PageHeader } from '../Common/Components'
import axios from 'axios';
import { topfans, toptracks } from '../../Api/Config';
import { useEffect } from 'react';
import { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Stack } from '@mui/system';
import Container from '../../Components/Adminlayout/Container';

const Analytics = () => {

  let token = localStorage.getItem('logintoken');
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
    // Top Fans API   
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
            {/* title section */}
          <PageHeader title='Analytics' />
        </Box>
        <div style={{ background: 'white', width: "500px", height: '650px', boxShadow: '5px 10px 8px 10px #888888' }}>
          <div style={{ background: 'gray' }}>
            <hr /><p style={{ color: 'white' }}>&nbsp;&nbsp;TOP TRACKS</p><hr />
          </div>
          <div>

            {toptrack.map((track, index) => {
              return (

                <div style={{ float: "left" }} key={index}>
                  <img style={{ width: '100px', height: '100px', marginLeft: '20px' }} src={track.imageName} alt="/" />
                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{track.musicPlayed}</p>
                </div>

              )
            })}
          </div><br /><br /><br /><br /><br />
          <div style={{ background: 'gray' }}>
            <hr /><p style={{ color: 'white' }}>&nbsp;&nbsp;TOP FANS</p><hr />
          </div>
          <div>
            {topfan.map((fan, index) => {
              return (
                <div style={{ float: 'left' }} key={index}>
                  <Stack direction="row" style={{ marginLeft: '20px' }}>
                    <Avatar style={{ width: '100px', height: '100px', background: '#1F2D5A', borderRadius: '0px' }} >{fan.username}</Avatar>
                  </Stack>

                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{fan.topuser}</p>

                </div>
              )
            })}
          </div><br /><br /><br /><br /><br />
          <div style={{ background: 'gray' }}>
            <hr /><p style={{ color: 'white' }}>&nbsp;&nbsp;TOP COUNTRIES</p><hr />
          </div>
          <div>
            {topfan.map((item, index) => {
              return (
                <div style={{ float: 'left' }} key={index}>
                  <Stack direction="row" style={{ marginLeft: '20px' }}>
                    <Avatar style={{ width: '100px', height: '100px', background: '#2F76DB', borderRadius: '0px' }} >{item.country}</Avatar>
                  </Stack>
                  <p style={{ textAlign: "center" }}>&nbsp;&nbsp;&nbsp;&nbsp;{item.topuser}</p>

                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </>
  )
}
export default Analytics;