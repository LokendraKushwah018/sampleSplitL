import React,{useState,useEffect} from 'react'
import drumsImg from '../../Components/Assets/img/drums.jpg'
import vocalImg from '../../Components/Assets/img/vocals.jpg'
import sampleImg from '../../Components/Assets/img/sample.jpg'
import beatImg from '../../Components/Assets/img/beat.jpg'
import axios from 'axios'
import {categoryMusic , usermostplayed} from '../../Api/Config'
import Navbar from '../UserBackend/Navbar'
// import { Link } from 'react-router-dom'


const Freestem = () => {
 
const [music, setMusic] = useState([]);
// const [most , setMost] = useState([])
const url = categoryMusic;

 const handleClick=(c)=>{
     axios(
          {
            url: `${url}?filterKey=${c}`,
            method: "get"
          }
        ).then((response) => {
          console.log(response.data.getSongData);
          setMusic(response.data.getSongData)
        }).catch((err) => {
          console.log(err);
        })
 }
 const MostPlayed = (id) => {
  axios(
      {    
          url: `${usermostplayed}${id}`, 
          method: "get"            
      })
  .then((response) => {
      // setMost(response.data);
      console.log(response.data);
  }).catch((err) => {
      console.log(err);
  })
} 
 useEffect(() => {
     handleClick("public");
    //  MostPlayed();
   }, []);

  return (
    <>
    <Navbar />
       <div className="category" style={{display:'inline-flex',margin:'20px 0px 0px 60px'}}>
            <div className='categoryCard' onClick={()=>handleClick('Drums')}>
                  <h2 style={{margin:'0 5px 5px 80px'}} >Drums</h2>
                 <img src={drumsImg} alt="" />
            </div>
              &nbsp; 
             <div className='categoryCard' onClick={()=>handleClick('Vocals')}>
                  <h2 style={{margin:'0 5px 5px 80px'}} >Vocals</h2>
                  <img src={vocalImg} alt="" />
             </div>
              &nbsp; 
             <div  className='categoryCard' onClick={()=>handleClick('Samples')}>
                  <h2 style={{margin:'0 5px 5px 80px'}} >Sample</h2>
                  <img src={sampleImg} alt="" />
             </div>
               &nbsp;
             <div className='categoryCard' onClick={()=>handleClick('Beats')}>
                  <h2 style={{margin:'0 5px 5px 80px'}} >Beats</h2>
                  <img src={beatImg} alt="" />
             </div>
       </div>

       <div style={{ overflow: 'hidden' }}>
        {music.map((value, index) => {
          return (
            <>
              <div 
              onClick={()=>MostPlayed(value.id)}
              style={{ width: '800px', height: '54px', background: '#1F2D5A',color:'white', margin: '10px',marginLeft:"100px", float: 'left' }}>
                <div 
                // onClick={()=>MostPlayed(value.id)}
                >
                  <img src={value.imageName} alt="/" style={{ width: '100px', height: '54px', float: 'left' }} />
                </div>
                <div 
                // onClick={()=>MostPlayed(value.id)}
                style={{ height: '54px', float: 'left' }}>
                  <audio controls style={{ backgroundColor: "#C8C8C8" }}>
                    <source src={value.music} type="audio/ogg"  
                            // onClick={()=>MostPlayed(value.id)}
                            />
                  </audio>
                </div >
                <div style={{ float: 'left', width: '200px', height: '54px' }}>
                  <h5 style={{lineHeight:'54px',textAlign: 'center'}}>{value.trackTitle}</h5>
                </div>
                <div style={{ float: 'left', textAlign: 'center', width: '100px', height: '54px' }}>
                  <h5>{value.bpm}</h5>
                  <p>{value.keyOptional}</p>
                </div>
                <div style={{ float: 'left', textAlign: 'center', width: '100px', height: '54px' }}>
                  <h5>{value.primaryGenre}</h5>
                  <p>{value.type}</p>
                </div>
                {/* <Button variant="contained" onClick={async () => {
                  let res = await axios.delete(`${deletemusic}${songs.id}`, {
                    headers: {
                      "Authorization": `Bearer ${token}`
                    }
                  });
                  console.log(res);
                  // if(res.status===204)
                  // {
                  //   alert("Music Deleted Successfully");
                  // }
                }}>DELETE</Button>&nbsp;&nbsp;&nbsp;&nbsp; */}
                {/* <button type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal" 
                  onClick={()=>{
                    setedit(songs.id)
                  }}
                  data-bs-whatever="@getbootstrap">EDIT</button> */}
              </div>
            </>
          )
        })}
      </div>
          
    </>
  )
}

export default Freestem
