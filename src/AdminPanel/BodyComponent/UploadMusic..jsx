import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from 'axios';
import { inputLabelClasses } from "@mui/material/InputLabel";
// import { PageHeader } from "../../Common/Components";
import { uploadmusic } from '../../Api/Config'
import { useRef } from "react";
import Container from '../../Components/Layout/Backend/Container'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogPost = () => {
  const Uploadtoast = () => {
    toast.success("Login Successfully !")
  };
  let token = localStorage.getItem('logintoken')
  const imageinput = useRef();
  const musicinput = useRef();

  let [files, setImage] = useState(null);
  let [music, setMusic] = useState();
  let [trackTitle, settrackTitle] = useState();
  let [trackType, settrackType] = useState();
  let [bpm, setbpm] = useState();
  let [keyOptional, setkeyOptional] = useState();
  let [primaryGenre, setprimaryGenre] = useState();
  let [type, setType] = useState();


  const Search = () => {
    let formData = new FormData();
    formData.append('image', files);
    formData.append('music', music);
    formData.append('trackTitle', trackTitle);
    formData.append('trackType', trackType);
    formData.append('bpm', bpm);
    formData.append('keyOptional', keyOptional);
    formData.append('primaryGenre', primaryGenre);
    formData.append('type', type);


    axios(
      {
        url: `${uploadmusic}`,
        method: "post",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        data: formData,
      }
    ).then((response) => {
      console.log(response);
      imageinput.current.value = "";
      musicinput.current.value = "";
      settrackTitle("");
      settrackType("");
      setbpm("");
      setkeyOptional("");
      setprimaryGenre("");
      setType("");
      if (response.status === 201) {
        Uploadtoast();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
    <Container>    
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, mt: 3, width: '50ch' , ml:0 },
        }}
        noValidate
        autoComplete="off"
        responsive="True"
      >

        <div style={{ display: 'flex-box' }}>
          <TextField
            id="outlined-required"
            label="Track Title"
            value={trackTitle}
            onChange={(e) => settrackTitle(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // color: "white",
                }
              }
            }}
          />
          <TextField
            id="outlined-required"
            label="Track Type"
            value={trackType}
            onChange={(e) => settrackType(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // color: "white",
                }
              }
            }}

          />
          <TextField
            id="outlined-required"
            label="BPM(Beat per minute)"
            value={bpm}
            onChange={(e) => setbpm(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // color: "white",
                }
              }
            }}
          />
          <TextField
            id="outlined-required"
            label="Key(Optional)"
            value={keyOptional}
            onChange={(e) => setkeyOptional(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // color: "white",
                }
              }
            }}
          />
          <TextField
            id="outlined-required"
            label="Primary genre"
            value={primaryGenre}
            onChange={(e) => setprimaryGenre(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // color: "white",
                }
              }
            }}
          />
          <TextField
            id="outlined-required"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            InputLabelProps={{
              sx: {
                color: "black",
                [`&.${inputLabelClasses.shrink}`]: {
                  // color: "white",
                }
              }
            }}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ ml: 0 , mt:2 }}
          >
            Upload Image
            <input
              type="file"
              label='show'
              ref={imageinput}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          <ToastContainer
            autoClose={1000}
            position="top-center"
            className="toast-container"
            toastClassName="dark-toast"
            theme="colored" />
          <Button
            variant="contained"
            component="label"
            sx={{ ml: 0 , mt:2}}
          >
            Upload Song
            <input
              onChange={(e) => setMusic(e.target.files[0])}
              type="file"
              ref={musicinput}
            />
          </Button><br/>    
          <Button
            onClick={Search}
            variant="contained"
            sx={{ ml: 20, mt: 5 }}
          >Upload</Button>
        </div>
      </Box> 
          </Container>
    </>
  );
}

export default BlogPost