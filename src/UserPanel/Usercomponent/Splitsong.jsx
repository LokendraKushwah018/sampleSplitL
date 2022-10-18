// import React from 'react'
// import Navbar from '../UserBackend/Navbar'
// // import { Link } from 'react-router-dom'
// // import { Button , Input} from '@mui/material'

// const Splitsong = () => {

//   return (
// <>
//       <Navbar />
//       <h3>Split Song</h3>
//       <div  style={{ marginLeft: 60 , marginTop:20 }}>
//          <button type="button" className="btn btn-dark"
//                 // style={{ marginRight: 60 , marginTop:20 }}
//                 >Upload Songs
//                 <input type="file" label='show' />
//               </button>          
//                 <button
//                   className="btn btn-dark">Convert </button>
//      </div>    
//      </>
//   )
// }

// export default Splitsong
import * as React  from 'react';
import { useState } from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import Navbar from '../UserBackend/Navbar'
import axios from 'axios';
import { useRef } from "react";
import Button from '@mui/material/Button';


 const Splitsong = () => {

  const musicinput = useRef();
    // const [file_name,setFile_name] = useState([])
   const [vocals, setVocals] = useState();
   const [accompaniment, setAccompaniment] = useState();
   const [stems, setStems] = useState();
   const [file_name, setFile_name] = useState();
  //  const[file,setFile] = useState(null);
  console.log(accompaniment);
   console.log(stems);
    console.log(vocals);
    console.log(file_name);
const models = (event) => {
  event.preventDefault()
  let formData = new FormData();
  
  formData.append('stems',stems);
  // formData.append('vocals', vocals);
  formData.append('file_name', file_name);
  // formData.append('accompaniment', accompaniment);
  
 console.log(formData)
  axios({
    url:'http://192.168.29.237:5001/api/user/getstemsAudio',
    method:'POST',
    headers:{
      "Content-type": "multipart/form-data",
      
    },
    data: formData,
    
  }).then((response)=>{
    console.log(response);
    // setFile_name(response)
    musicinput.current.value = "";
    console.log('dataaaa',formData)

    // setStems(response)
  }).catch((err)=>{
    console.log(err)
  });
// console.log(file)
console.log(file_name);
console.log(stems);
}

  return (
    <>
    <Navbar />
    {/* <form > */}
     <button 
    onClick= {models}
    >Button</button>
    <div className="dropdown m-5" style={{ display: 'inline'}} >
        <button className="btn btn-secondary dropdown-toggle" type="button" value="2stems"
    onClick={(e)=>setStems(e.target.value)}

          id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          2stems
        </button>
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li><button className="dropdown-item" value="Vocals" 
          onClick={(e)=>setVocals(e.target.value)}>Vocals</button></li>
          <li><button className="dropdown-item" value="Accompinent" onClick={(e)=>setAccompaniment(e.target.value)} >Accompaniment</button></li>
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
            />
          </Button>    
{/*  
 <select value={stems} onChange={(e)=>setStems(e.target.value)}>
  <option value="Vocals">Vocal</option>
  <option value="Accompinent">Accompinent</option>

 </select>
  <h1>{stems}</h1> */}
  {/* </form> */}
    </>
  );
}


export default Splitsong
