import React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../UserBackend/Navbar'
import axios from 'axios';
import { useRef } from "react";
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";

const Splitsong = () => {
  const musicinput = useRef();

  const [stems, setStems] = useState();
  const [file_name, setFile_name] = useState();
  const [type, setType] = useState();
  const [data, updateData] = useState();
  const [dummy, updateDummy] = useState();
  const [vocals, setVocals] = useState(false);
  const [fourvocals , setfourVocals] = useState(false);
  const [accompaniment, setaccompaniment] = useState(false);
  const [bass, setbass] = useState(false);
  const [drums, setdrums] = useState(false);
  const [other, setother] = useState(false);
  const [loading, setLoading] = useState(false);
  const [button,setButton] = useState();
  const inputRef = React.useRef()

  const ErrorToast = ()=>{
    toast.error("Try Again");
  }

  const models = (event) => {
    event.preventDefault();
    setButton("")
    setLoading(true);
    let formData = new FormData();
    formData.append('stems', stems);
    formData.append('file_name', file_name);
    formData.append('type', type);
    console.log(formData);
    axios({
      url: 'http://192.168.29.237:5001/api/user/getstemsAudio',
      method: 'post',
      data: formData,

    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
      }
      musicinput.current.value = "";
      setType("")
      if (response.data.vocals) {
        setVocals(true);
        updateData(response.data);
      }
      else if (response.data.accompaniment) {
        setaccompaniment(true);
        updateData(response.data);
      }
      else if (response.data.bass) {
        setbass(true);
        updateData(response.data);
      }
      
      else if (response.data.drums) {
        setdrums(true);
        updateData(response.data);
      }
      else if (response.data.other) {
        setother(true);
        updateData(response.data);
      }
      else if (response.status===200) {
        setfourVocals(true);
        updateData(response.data);
      }
      
    }).catch((err) => {
      console.log(err)
      ErrorToast();
      setLoading(false)
    });
  }
  return (
    <>
      <Navbar />   
      <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored" />
      {loading &&
        <Stack sx={{ width: '100%', color: 'grey.500', mb: 1 }} spacing={2}>
          <LinearProgress color="info" /><span style={{ textAlign: 'center', color: 'black' }}>
            [ Please wait while song is spliting.... ]</span>
        </Stack>       
      }      
      <div style={{ float: 'left' }}>
        <form
          onSubmit={models}
        >
          <div className="dropdown m-5" style={{ display: 'inline' }}
          >
            <button className="btn btn-secondary dropdown-toggle" value="2stems" type='button'
              onClick={(e) => setStems(e.target.value)}
              id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              2stems
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                <li><button className="dropdown-item" value="vocals" type='button'
                  onClick={(e) => setType(e.target.value)}>Vocals</button></li>
                <li><button className="dropdown-item" value="accompaniment" type='button'
                  onClick={(e) => setType(e.target.value)}>Accompaniment</button></li>
            </ul>
          </div>
          <Button
            variant="contained"
            component="label"
          >
            Upload Song
            <input
              onChange={(e) => setFile_name(e.target.files[0])}
              type="file"
              ref={musicinput}
              required
            />
          </Button>&nbsp;
          <button type="submit" className='btn btn-primary'
          >Submit</button>
        </form>
      </div>

      {/* 4Stems Section Start   */}
      <div style={{ float: 'left'}}>
        <form
          onSubmit={models}
        >
          <div className="dropdown m-5" style={{ display: 'inline' }}
          >
            <button className="btn btn-secondary dropdown-toggle" value="4stems" type='button'
              onClick={(e) => setStems(e.target.value)}
              id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
              4stems
            </button>
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2" >
              <li ><button className="dropdown-item" value="vocals" type='button'
                onClick={(e) => setType(e.target.value)} >Vocals</button></li>
              <li><button className="dropdown-item" value="bass" type='button'
                onClick={(e) => setType(e.target.value)}>Bass</button></li>
              <li><button className="dropdown-item" value="drums" type='button'
                onClick={(e) => setType(e.target.value)}>Drums</button></li>
              <li><button className="dropdown-item" value="other" type='button'
                onClick={(e) => setType(e.target.value)}>Other</button></li>
            </ul>
          </div>
          <Button
            variant="contained"
            component="label"
          >
            Upload Song
            <input
              onChange={(e) => setFile_name(e.target.files[0])}
              type="file"
              ref={musicinput}
              required
            />
          </Button>&nbsp;
          <button className='btn btn-primary' 
          >Submit</button>
        </form>
      </div>
       {/* 4Stems Section End   */}
      {vocals &&
        <AudioPlayer
        style={{ height:'120px',textAlign : 'center',background:'#2F76DB',color:'black',width:'300px',margin:"50px"}}
        autoPlay={false}           
        controls={false}
        src={data.vocals}
        showJumpControls={false}
      />
      }
      {accompaniment &&
         <AudioPlayer
         style={{ height:'120px',textAlign : 'center',background:'#2F76DB',color:'black',width:'300px',margin:"50px"}}
         autoPlay={false}           
         controls={false}
         src={data.accompaniment}
         showJumpControls={false}
       />
      }
      {fourvocals &&
        <AudioPlayer
        style={{ height:'120px',textAlign : 'center',background:'#2F76DB',color:'black',width:'300px',margin:"50px"}}
        autoPlay={false}           
        controls={false}
        src={data.vocals}
        showJumpControls={false}
      />
      }
      {bass &&
        <AudioPlayer
        style={{ height:'120px',textAlign : 'center',background:'#2F76DB',color:'black',width:'300px',margin:"50px"}}
        autoPlay={false}           
        controls={false}
        src={data.bass}
        showJumpControls={false}
      />
      }{drums &&
        <AudioPlayer
         style={{ height:'120px',textAlign : 'center',background:'#2F76DB',color:'black',width:'300px',margin:"50px"}}
         autoPlay={false}           
         controls={false}
         src={data.drums}
         showJumpControls={false}
       />
      }
      {other &&
       <AudioPlayer
       style={{ height:'120px',textAlign : 'center',background:'#2F76DB',color:'black',width:'300px',margin:"50px"}}
       autoPlay={false}           
       controls={false}
       src={data.other}
       showJumpControls={false}
     />
      }      
    </>
  );
}
export default Splitsong