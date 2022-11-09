import React from 'react';
import { useState } from 'react';
import Navbar from '../Userlayout/Navbar'
import axios from 'axios';
import { useRef } from "react";
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import "react-h5-audio-player/lib/styles.css";
import AudioPlayer from "react-h5-audio-player";
import { samplesplitsong } from '../../Api/Config';
import '../css/home.css'

const Home = () => {
  const musicinput = useRef();

  const [stems, setStems] = useState();
  const [file_name, setFile_name] = useState();
  const [type, setType] = useState();
  const [data, updateData] = useState();
  const [vocals, setVocals] = useState(false);
  const [fourvocals , setfourVocals] = useState(false);
  const [accompaniment, setaccompaniment] = useState(false);
  const [bass, setbass] = useState(false);
  const [drums, setdrums] = useState(false);
  const [other, setother] = useState(false);
  const [loading, setLoading] = useState(false);

  const ErrorToast = ()=>{
    toast.error("Try Again");
  }

  const models = (event) => {
    event.preventDefault();
    setVocals(false);
    setaccompaniment(false);
    setbass(false);
    setdrums(false);
    setfourVocals(false);
    setother(false);
    setLoading(true);
    let formData = new FormData();
    formData.append('stems', stems);
    formData.append('file_name', file_name);
    formData.append('type', type);
    console.log(formData);
    axios({
      url: `${samplesplitsong}`,
      method: 'post',
      data: formData,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        event.target.reset();
        setLoading(false);
        
      }
      // musicinput.current.value = "";

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
      else if (response.data.fourStemsVocals) {
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
          {/* <h1 className="display-1">SampleSplit</h1> */}
          {/* <h1 style={{textAlign:"center"}}>Now Split the Song Here.....</h1>                  */}
      {loading &&
        <Stack sx={{ width: '100%', color: 'grey.500', mb: 1 }} spacing={2}>
          <LinearProgress color="info" /><span style={{ textAlign: 'center', color: 'black' }}>
            [ Please wait while song is spliting.... ]</span>
        </Stack>       
      }      
      <div  style={{ float: 'left' }}>
        <form className="frame"
          onSubmit={models}>
          <div className="dropdown " style={{ display: 'inline'}}>
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
          sx={{ml:12}}
          className='label'
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
          </Button>
          <button type="submit" className='btn btn-primary'
          >Submit</button>
        </form>
      </div>

      {/* 4Stems Section Start   */}
      <div style={{ float: 'left'}}>
        <form className="fram"
          onSubmit={models}
        >
          <div className="dropdown " style={{ display: 'inline' }} >
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
          sx={{ml:12}}
            className='label'
            variant="contained"
            component="label" >
            Upload Song
            <input
              onChange={(e) => setFile_name(e.target.files[0])}
              type="file"
              ref={musicinput}
              required />
          </Button>
          <button className='btn btn-primary' 
          >Submit</button>
        </form>
      </div>
       {/* 4Stems Section End   */}
      {vocals &&
        <AudioPlayer
        style={{ height:'120px',textAlign : 'center',background:'black',
        color:'black',width:'1360px', marginTop:420}}
        autoPlay={false}           
        controls={false}
        src={data.vocals}
        showJumpControls={false}/>
      }
      {accompaniment &&
         <AudioPlayer
        //  style={{ height:'120px',textAlign : 'center',background:'black',
        //  color:'black',width:'800px',margin:"80px", marginLeft:300}}         
         autoPlay={false}           
         controls={false}
         src={data.accompaniment}
         showJumpControls={false}/>
      }
      {fourvocals &&
        <AudioPlayer
        // style={{ height:'120px',textAlign : 'center',background:'black',
        // color:'black',width:'800px',margin:"80px", marginLeft:300}}        
        autoPlay={false}           
        controls={false}
        src={data.fourStemsVocals}
        showJumpControls={false}/>
      }
      {bass &&
        <AudioPlayer
        // style={{ height:'120px',textAlign : 'center',background:'black',
        // color:'black',width:'800px',margin:"80px", marginLeft:300}}        
        autoPlay={false}           
        controls={false}
        src={data.bass}
        showJumpControls={false}/>
      }{drums &&
        <AudioPlayer
        // style={{ height:'120px',textAlign : 'center',background:'black',
        // color:'black',width:'800px',margin:"80px", marginLeft:300}}         
        autoPlay={false}           
         controls={false}
         src={data.drums}
         showJumpControls={false}/>
      }
      {other &&
       <AudioPlayer
       style={{ }}      
       autoPlay={false}           
       controls={false}
       src={data.other}       
       showJumpControls={false}/>
      }  
        
    </>
  );
}
export default Home
