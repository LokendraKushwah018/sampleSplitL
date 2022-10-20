// import React, { useState, useEffect } from 'react'
// import drumsImg from '../../Components/Assets/img/drums.jpg'
// import vocalImg from '../../Components/Assets/img/vocals.jpg'
// import sampleImg from '../../Components/Assets/img/sample.jpg'
// import beatImg from '../../Components/Assets/img/beat.jpg'
// import axios from 'axios'
// import { categoryMusic, search, usermostplayed } from '../../Api/Config'
// import Navbar from '../UserBackend/Navbar'
// import 'react-audio-player-pro/dist/style.css';
// import '../css/freestem.css'
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
// import IconButton from '@mui/material/IconButton';
// import DownloadIcon from '@mui/icons-material/Download';
// // import background from "../css/backgroundimage.jpg"
// import { Navigate, useNavigate } from 'react-router-dom'
// import { toast, ToastContainer } from 'react-toastify'
// import ClearIcon from '@mui/icons-material/Clear';
// // import { Link } from 'react-router-dom'


// const Freestem = () => {
//   // const Wrap = styled.div`
//   // background:black; 
//   // border:1px solid black;
//   // &:hover {
//   //   background:black;
//   //   border : 1px solid white ;
//   // }

//   // `
//   const [music, setMusic] = useState([]);
//   const [play, setPlay] = useState([])
//   const [playingMusic, setPlayingMusic] = useState([])
//   const [state, setstate] = useState([])
//   const [songs, setSongs] = useState([]);
//   const [query, setQuery] = useState('');
//   const [downloadmusic,setDownloadmusic] = useState([]);
//   const [Id,setId] = useState([]);
//   const [donate, setDonate] = useState({ title: "", amount: "" });
//   const [title, setTitle] = useState('')
//   const [amount, setAmount] = useState('')
//   const navigate = useNavigate();
//   const token = localStorage.getItem("userlogintoken");

//   // console.log("queryr ", query)
//   // const [play , setPlay] = useState([])

//   const Warningtoast = () => {
//     toast.info("Wait For a second");
//   }
//   const searchApi = () => {
//     console.log("queryr1111 ", query)

//     axios(
//       {
//         url: `${search}`,
//         method: "get",
//         // responseType: 'blob', // important

//       })
//       .then((response) => {
//         setSongs(response.data.getSong);
//         console.log(response.data.getSong);
//       }).catch((err) => {
//         console.log(err);
//       })
//   }
//   const url = categoryMusic;

//   const mediaMetadata = {

//     // required
//     title: 'Pure Water',

//     // optional
//     artist: 'Meydän',

//     // optional
//     album: 'Interplanetary Forest',

//     // optional
//     artwork: [

//       // src, sizes and type is required
//       { src: '/path/to/image/64px/64px', sizes: '64x64', type: 'image/png' },
//       { src: '/path/to/image/128px/128px', sizes: '128x128', type: 'image/png' },
//     ],
//   };

//   const handleClick = (c) => {
//     axios(
//       {
//         url: `${url}?filterKey=${c}`,
//         method: "get"
//       }
//     ).then((response) => {
//       console.log(response.data.getSongData);
//       setMusic(response.data.getSongData)
//     }).catch((err) => {
//       console.log(err);
//     })
//   }
//   const handleClear = () => {
//     setQuery('');
//     // setSongs('');
//   };
//   const MostPlayed = (id) => {
//     axios(
//       {
//         url: `${usermostplayed}${id}`,
//         method: "get"
//       })
//       .then((response) => {
//         // setMost(response.data);
//         console.log(response.data);
//       }).catch((err) => {
//         console.log(err);
//       })
//   }
//   useEffect(() => {
//     handleClick("public");
//     //  MostPlayed();
//   }, []);

//   const show = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setDonate({ ...donate, [name]: value })
//     console.log(setDonate)
//   }
//   const donation = (e) => {
//     Warningtoast();
//     e.preventDefault();
//     axios(
//       {
//         url: 'http://localhost:5001/api/user/DonationPay',
//         method: 'post',
//         data: {
//           title,
//           amount
//         },
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`
//         }
//       }
//     ).then((res) => {
//       console.log(res.data.links);
//       const ammount = amount;
//       console.log(ammount);
//       localStorage.setItem("ammount", ammount);
//       if (res.status === 200) {
//         window.location.href = res.data.links
//       }
//     }).catch((err) => {
//       console.log(err);
//     })
//   }

//   const SearchPlayer = (id, music, trackTitle) => {
//     console.log(id);
//     console.log(music);
//     console.log(trackTitle);
//     setPlayingMusic(music);
//     setPlay(trackTitle);
//     console.log("musiccName11111", playingMusic)
//     console.log("trackname111111", play);
//   }

//   const Bottom = (id, music, trackTitle, imageName) => {
//     console.log(id);
//     console.log(music);
//     console.log(trackTitle);
//     setstate(imageName);
//     setPlayingMusic(music);
//     setPlay(trackTitle);
//     console.log("musiccName22222", playingMusic)
//     console.log("tracktitleName22222", play)
//     axios(
//       {
//         url: `${usermostplayed}${id}`,
//         method: "get"
//       })
//       .then((response) => {
//         // setMost(response.data);
//         console.log(response.data);
//       }).catch((err) => {
//         console.log(err);
//       })
//   }
//   // console.log("musiccNamenext", playingMusic);
//   const BuyPlan = () => {
//     navigate("/buyplan");
//   }
//   const download = (id,music) => {
//     console.log(id);
//     console.log(music);
//     setId(id)
//     setDownloadmusic(music);
//     console.log("download", downloadmusic)
//   }
//   return (
//     <>
//       <Navbar />
//       <ToastContainer
//         autoClose={1500}
//         position="top-center"
//         className="toast-container"
//         toastClassName="dark-toast"
//         theme="colored" />

//       <div style={{
//         // backgroundImage: `url(${background})`, backgroundAttachment: 'fixed', backgroundize: "cover",
//         backgroundRepeat: "no-repeat", backgroundSize: "100% 100% ",
//       }}>
//         {/* <div className="wrap">
//           <div className="search">
//             <input type="text" className="searchTerm" placeholder="What are you looking for?" />
//               <button type="submit" className="searchButton">
//                 <i className="fa fa-search"></i>
//               </button>
//           </div>
//         </div> */}
//         <div className='wrap'>
//           <input className='search_bar mt-1'
//             style={{ borderRadius: '50px', color: 'white' }}
//             type="text"
//             // onKeyPress={searchApi}
//             onKeyPress={searchApi}
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder='Search Any Songs and Listen'            
//             />            
//        <ClearIcon onClick={handleClear}/>
//         {/* <button className="handleClear" onClick={handleClear}>Clear</button> */}
//           </div>
//         {songs.filter((user) =>
//           user.trackTitle.toLowerCase().includes(query.toLowerCase())).map((item, i) => {
//             return (
//               <>
//                 <div
//                   style={{
//                     width: '400px',
//                     height: '41px',
//                     color: 'white',
//                     display: 'block',
//                     margin: '10px',
//                     marginLeft: "500px",
//                   }}>
//                   <div >
//                     <img src={item.imageName}
//                       onClick={() => SearchPlayer(item.id, item.music, item.trackTitle)}

//                       alt="/" style={{ width: '70px', height: '40px', float: 'left' }} />
//                   </div>
//                   {/* <div style={{ height: '100px', float: 'left' }}>
//                                     <audio controls>
//                                         <source src={item.music} type="audio/ogg"/>
//                                     </audio>
//                                 </div > */}
//                   <div>
//                     <h5 style={{ textAlign: 'center', lineHeight: '41px' ,color:'black'}}>
//                       {item.trackTitle}</h5>
//                   </div>
//                 </div>
//               </>
//             )
//           })}
//         <div style={{
//           display: 'inline-flex', margin: '0px 0px 0px 70px'
//         }}>
//           <div onClick={() => handleClick('Drums')}>
//             <h2 style={{ color: 'white', textAlign: 'center' }} >Drums</h2>
//             <img src={drumsImg} alt="/" style={{ width: '300px', height: "200px" }} />
//           </div>
//           &nbsp;
//           <div onClick={() => handleClick('Vocals')}>
//             <h2 style={{ color: 'white', textAlign: 'center' }} >Vocals</h2>
//             <img src={vocalImg} alt="/" style={{ width: '300px', height: "200px" }} />
//           </div>
//           &nbsp;
//           <div onClick={() => handleClick('Samples')}>
//             <h2 style={{ color: 'white', textAlign: 'center' }} >Sample</h2>
//             <img src={sampleImg} alt="/" style={{ width: '300px', height: "200px" }} />
//           </div>
//           &nbsp;
//           <div onClick={() => handleClick('Beats')}>
//             <h2 style={{ color: 'white', textAlign: 'center' }} >Beats</h2>
//             <img src={beatImg} alt="/" style={{ width: '300px', height: "200px" }} />
//           </div>
//         </div>
//         <div style={{ float: 'left', marginLeft: '80px' }}>

//           {music.map((value, i) => {
//             return (
//               <>
//                 <div style={{ margin: '10px', float: 'left', width: '400px', height: '60px' }}  
//                 onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}>
//                   <div style={{ float: 'left' }} 
//                   onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}>
//                     <img src={value.imageName} alt="/" 
//                     style={{ width: '60px', height: '60px', borderRadius: '10px' }} />
//                   </div>
//                   <div>
//                     <div
//                       style={{
//                         width: '200px',
//                         height: '60px',
//                         textAlign: 'center',
//                         float: 'left',
//                         color: 'black',
//                       }}>
//                       <h5 style={{ lineHeight: '30px' }}>{value.trackTitle}</h5>
//                       <p>{value.tracktype}</p>
//                     </div>
//                   </div>
//                   <IconButton>
//                     <DownloadIcon
//                       sx={{ m: 2, color: 'dark' }}
//                       onClick={BuyPlan}
//                       data-bs-toggle="modal" href="#exampleModalToggle" role="button"
//                     />
//                   </IconButton>
//                   {/* <Tooltip title="Donate" placement='top'>
//                     <IconButton >
//                       <AttachMoneyIcon
//                         sx={{ color: "white" }}
//                         // type="button"
//                         // data-toggle="modal"
//                         // data-target="#exampleModal"
//                         // data-whatever="@mdo"

//                       />
//                     </IconButton>
//                   </Tooltip> */}
//                 </div>
//               </>
//             )
//           })}
//         </div>
//         <div style={{ width: '100%', height: '500px' }}>

//         </div>

//         {/* <div style={{ display: 'flex' }}>
//         <div style={{ margin: '10px' }}>
//           <img src="./one.jpg" alt="/" style={{ width: '150px', height: '150px' }} />
//           <div style={{ background: 'yellow', width: '150px', height: '50px', textAlign: 'center' }}><h5>hello</h5></div>
//         </div>
//       </div> */}

//         {/* <div >
//         {music.map((value, i) => {
//           return (
//             <>
//               <Wrap
//                 onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}
//                 style={{ width: '1000px', height: '55px', color: 'white', margin: '10px', marginLeft: '0px', float: 'left' }}>
//                 <div
//                 >
//                   <img src={value.imageName} alt="/" style={{ width: '100px', height: '52px', float: 'left' }} />
//                 </div>
//                 <div
//                   style={{ height: '54px', float: 'left' }}>
//                   <audio controls style={{ backgroundColor: "#C8C8C8" }} controlsList="noplaybackrate">
//                     <source src={value.music} type="audio/ogg"
//                     />
//                   </audio>
//                 </div >

//                 <div style={{ float: 'left', width: '600px', height: '54px' }}>
//                   <h5 style={{ lineHeight: '54px', textAlign: 'center', align: 'center' }}>{value.trackTitle}</h5>
//                 </div>
//                 <div style={{ float: 'right', width: '200px', height: '54px' }}>
//                   <PlayArrowIcon />
//                 </div>
//               </Wrap>
//             </>
//           )
//         })}
//       </div> */}
//         <div className="Apps">
//           <AudioPlayer
//             // style={{ width: "300px" }}
//             style={{ borderRadius: "1rem", textAlign: 'center' }}
//             autoPlay
//             // layout="horizontal"
//             // src={playingMusic.length ? playingMusic : "./_ff.mp3" }
//             src={playingMusic}
//             // onPlay={(e) => console.log("onPlay")}
//             showSkipControls={true}
//             showJumpControls={false}
//             header={play}
//           // footer="All music from: https://www.bensound.com"
//           // onClickPrevious={handleClickPrevious}
//           // onClickNext={handleClickNext}
//           // onEnded={handleClickNext}
//           // other props here
//           />

//         </div>
//         <div className="modal fade" id="exampleModalToggle" aria-hidden="true"
//           aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalToggleLabel">Download</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 Download This Song 
//                 <IconButton>
//                   <DownloadIcon
//                     aria-label="Close"
//                     data-bs-dismiss="modal"
//                     sx={{ color: '#1F2D5A' }} download />
//                 </IconButton>
//                 <audio controls >
//                   <source src={downloadmusic} type="audio/ogg" />
//                 </audio>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-outline-info" data-bs-target="#exampleModalToggle2"
//                   data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
//           aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="exampleModalToggleLabel2">Donate</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 <form >
//                   <div className="form-group">
//                     <label className="col-form-label">Title</label>
//                     <input type="text" class="form-control" id="recipient-name"
//                       name="title" value={title}
//                       onChange={(e) => setTitle(e.target.value)} className="form-control"
//                       required
//                     />
//                   </div>
//                   <div className="form-group">
//                     <label  for="message-text"  className="col-form-label">Amount</label>
//                     <input id="message-text"
//                       type="amount" name="amount" value={amount}
//                       onChange={(e) => setAmount(e.target.value)} className="form-control"
//                       required
//                     ></input>
//                   </div>
//                   <button onClick={donation} className="btn btn-outline-success">Submit</button>

//                 </form>
//               </div>
//               <div className="modal-footer">
//                 <button style={{ background: "#1F2D5A" }} className="btn text-white" data-bs-target="#exampleModalToggle"
//                   data-bs-toggle="modal" data-bs-dismiss="modal">Back to Download</button>
//               </div>
//             </div>
//           </div>
//         </div>
       
//         {/* <div className="modal fade mt-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">Donate</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={Donation}>
//                 <div className="mb-3">
//                   <label className="form-label">Title</label>
//                   <input type="text" name="title" value={donate.title}
//                     onChange={show} className="form-control" required />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Amount</label>
//                   <input type="number" className="form-control" name='amount'
//                     value={donate.amount} onChange={show} required />
//                   <button type="submit" className="btn btn-primary">Submit</button>

//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-primary">Download</button>
//               <button type="button" className="btn btn-warning">Donate</button>

//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//             </div>
//           </div>
//         </div>
//       </div> */}


        
//         {/* <AudioPlayerControlSprite />
//         <Audio
//           // string - path to audio file, required
//           src={playingMusic}
//           // string - 'none' | 'metadata' | 'auto', default: 'auto', optional
//           preload="auto"

//           // duration - number, default: 0, optional
//           // will updated automatically when track started or metadata loaded
//           duration={100}

//           // MediaMetadata - media meta data, optional
//           // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata
//           // mediaMetadata={mediaMetadata}

//           // string - wrapper's className name, optional, deafult: ''
//           98="my-className-name"

//           // callback function - called on did mount, optional, default: noop
//           onDidMount={console.log}

//           // string - name for download file, optional, deafult: <src>
//           // downloadFileName=""

//           // boolean - show repeat button, optional, deafult: false
//           useRepeatButton={true}
//         /> */}
//       </div>

//     </>
//   )
// }

// export default Freestem







import React, { useState, useEffect } from 'react'
import drumsImg from '../../Components/Assets/img/drums.jpg'
import vocalImg from '../../Components/Assets/img/vocals.jpg'
import sampleImg from '../../Components/Assets/img/sample.jpg'
import beatImg from '../../Components/Assets/img/beat.jpg'
import axios from 'axios'
import { categoryMusic, search, usermostplayed } from '../../Api/Config'
import Navbar from '../UserBackend/Navbar'
import 'react-audio-player-pro/dist/style.css';
import '../css/freestem.css'
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
// import background from "../css/backgroundimage.jpg"
import { Navigate, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// import { Link } from 'react-router-dom'


const Freestem = () => {
  // const Wrap = styled.div`
  // background:black; 
  // border:1px solid black;
  // &:hover {
  //   background:black;
  //   border : 1px solid white ;
  // }

  // `
  const [music, setMusic] = useState([]);
  const [play, setPlay] = useState([])
  const [playingMusic, setPlayingMusic] = useState([])
  const [state, setstate] = useState([])
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState([]);
  const [Id, setId] = useState([]);
  const [gaana, setGaana] = useState([]);
  const [input, setinput] = useState();
  const [visible, setVisible] = useState(true);


  const [donate, setDonate] = useState({ title: "", amount: "" });
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const navigate = useNavigate();
  const token = localStorage.getItem("userlogintoken");

  // console.log("queryr ", query)
  // const [play , setPlay] = useState([])
  // const removeElement = () => {

  // };
  const Warningtoast = () => {
    toast.info("Wait For a second");
  }
  const searchApi = () => {
    console.log("queryr1111 ", query)

    axios(
      {
        url: `${search}${query}`,
        method: "get",
      })
      .then((response) => {
        setSongs(response.data.getSong);
        console.log(response.data.getSong);
      }).catch((err) => {
        console.log(err);
      })
  }
  const url = categoryMusic;

  const handleClick = (c) => {
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

  const show = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDonate({ ...donate, [name]: value })
    console.log(setDonate)
  }
  const donation = (e) => {
    Warningtoast();
    e.preventDefault();
    axios(
      {
        url: 'http://localhost:5001/api/user/DonationPay',
        method: 'post',
        data: {
          title,
          amount
        },
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data.links);
      const ammount = amount;
      console.log(ammount);
      localStorage.setItem("ammount", ammount);
      if (res.status === 200) {
        window.location.href = res.data.links
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  const SearchPlayer = (id, music, trackTitle) => {
    setTimeout(() => {
      setinput("");
      setVisible((prev) => !prev);
    })
    console.log(id);
    console.log(music);
    console.log(trackTitle);
    setPlayingMusic(music);
    setPlay(trackTitle);
    console.log("musiccName11111", playingMusic)
    console.log("trackname111111", play);
  }

  const Bottom = (id, music, trackTitle, imageName) => {
    console.log(id);
    console.log(music);
    console.log(trackTitle);
    setstate(imageName);
    setPlayingMusic(music);
    setPlay(trackTitle);
    console.log("musiccName22222", playingMusic)
    console.log("tracktitleName22222", play)
    axios(
      {
        url: `${usermostplayed}${id}`,
        method: "get"
      })
      .then((response) => {
        console.log(response.data);
      }).catch((err) => {
        console.log(err);
      })
  }
  const BuyPlan = () => {
    navigate("/buyplan");
  }
  const Download = (id) => {
    setId(id);
    console.log(id);
    axios(
      {
        url: `http://localhost:5001/api/user/getDownloadSong/${id}`,
        method: 'get',
        headers: {
          "Authorization": `Bearer ${token}`
        },
      }
    ).then((res) => {
      console.log(res.data.data);
      setGaana(res.data.data)
      console.log("gana", gaana)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <Navbar />
      <ToastContainer
        autoClose={1500}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored" />

      <div style={{
      }}>
        <div className='wrap'>
          <input className='search_bar mt-1'
            style={{ borderRadius: '50px' }}
            type="text"
            value={input}
            onKeyPress={searchApi}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Any Songs and Listen' />
        </div>
        {songs.filter((user) =>
          user.trackTitle.toLowerCase().includes(query.toLowerCase())).map((item, i) => {
            return (
              <>
                {visible && (
                  <div
                    style={{
                      width: '400px',
                      height: '41px',
                      color: 'black',
                      display: 'block',
                      margin: '10px',
                      marginLeft: "500px",
                    }}>
                    <div>

                      <img src={item.imageName}
                        onClick={() => SearchPlayer(item.id, item.music, item.trackTitle)}

                        alt="/" style={{ width: '70px', height: '40px', float: 'left' }} />
                    </div>
                    
                    <div>
                      <h5 style={{ textAlign: 'center', lineHeight: '41px' }}>{item.trackTitle}</h5>
                    </div>
                  </div>
                )}
              </>
            )
          })}
        <div style={{
          display: 'inline-flex', margin: '0px 0px 0px 70px'
        }}>
          <div onClick={() => handleClick('Drums')}>
            <h2 style={{ textAlign: 'center' }} >Drums</h2>
            <img src={drumsImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
          &nbsp;
          <div onClick={() => handleClick('Vocals')}>
            <h2 style={{ textAlign: 'center' }} >Vocals</h2>
            <img src={vocalImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
          &nbsp;
          <div onClick={() => handleClick('Samples')}>
            <h2 style={{ textAlign: 'center' }} >Sample</h2>
            <img src={sampleImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
          &nbsp;
          <div onClick={() => handleClick('Beats')}>
            <h2 style={{ textAlign: 'center' }} >Beats</h2>
            <img src={beatImg} alt="/" style={{ width: '300px', height: "200px" }} />
          </div>
        </div>
        <div style={{ float: 'left', marginLeft: '80px' }}>

          {music.map((value, i) => {
            return (
              <>
                <div style={{ margin: '10px', float: 'left', width: '400px', height: '60px' }}  >
                  <div style={{ float: 'left' }} onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}>
                    <img src={value.imageName} alt="/" style={{ width: '60px', height: '60px', borderRadius: '10px' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        width: '200px',
                        height: '60px',
                        textAlign: 'center',
                        float: 'left',
                      }}>
                      <h5 style={{ lineHeight: '30px' }}>{value.trackTitle}</h5>
                      <p>{value.tracktype}</p>
                    </div>
                  </div>
                  <IconButton
                  >
                    <DownloadIcon
                      sx={{ m: 2 }}
                      onClick={() => Download(value.id)}
                      data-bs-toggle="modal" href="#exampleModalToggle" role="button"
                    />
                  </IconButton>
                  <div className="modal fade" id="exampleModalToggle" aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel">Download</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          Download This Song
                          <IconButton>
                            <DownloadIcon
                              onClick={BuyPlan}
                              aria-label="Close"
                              data-bs-dismiss="modal"
                              sx={{ color: '#1F2D5A' }} />
                          </IconButton>
                          <a href="_ff (6).mp3" download><img src={gaana.music} alt="/" />d</a>
                        </div>
                        <div className="modal-footer">
                          <button className="btn btn-outline-info" data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
                    aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalToggleLabel2">Donate</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form >
                            <div className="form-group">
                              <label className="col-form-label">Title</label>
                              <input type="text" class="form-control" id="recipient-name"
                                name="title" value={title}
                                onChange={(e) => setTitle(e.target.value)} className="form-control"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label for="message-text" className="col-form-label">Amount</label>
                              <input id="message-text"
                                type="amount" name="amount" value={amount}
                                onChange={(e) => setAmount(e.target.value)} className="form-control"
                                required
                              ></input>
                            </div>
                            <button onClick={donation} className="btn btn-outline-success">Submit</button>

                          </form>
                        </div>
                        <div className="modal-footer">
                          <button style={{ background: "#1F2D5A" }} className="btn text-white" data-bs-target="#exampleModalToggle"
                            data-bs-toggle="modal" data-bs-dismiss="modal">Back to Download</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <div style={{ width: '100%', height: '500px' }}>
        </div>
        <div className="Apps">
          <AudioPlayer
            // style={{ width: "300px" }}
            style={{ borderRadius: "1rem", textAlign: 'center' }}
            autoPlay
            // layout="horizontal"
            // src={playingMusic.length ? playingMusic : "./_ff.mp3" }
            src={playingMusic}
            // onPlay={(e) => console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
            header={play}
          // footer="All music from: https://www.bensound.com"
          // onClickNext={handleClickNext}
          // onEnded={handleClickNext}
          // other props here
          />

        </div>
        {/* <div className="modal fade" id="exampleModalToggle" aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">Download</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Download This Song
                <IconButton>
                  <DownloadIcon
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    sx={{ color: '#1F2D5A' }} />
                </IconButton>
                <audio controls >
                  <source src={Id} type="audio/ogg" />
                </audio>
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-info" data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal" data-bs-dismiss="modal">Donate</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel2">Donate</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form >
                  <div className="form-group">
                    <label className="col-form-label">Title</label>
                    <input type="text" class="form-control" id="recipient-name"
                      name="title" value={title}
                      onChange={(e) => setTitle(e.target.value)} className="form-control"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label for="message-text" className="col-form-label">Amount</label>
                    <input id="message-text"
                      type="amount" name="amount" value={amount}
                      onChange={(e) => setAmount(e.target.value)} className="form-control"
                      required
                    ></input>
                  </div>
                  <button onClick={donation} className="btn btn-outline-success">Submit</button>

                </form>
              </div>
              <div className="modal-footer">
                <button style={{ background: "#1F2D5A" }} className="btn text-white" data-bs-target="#exampleModalToggle"
                  data-bs-toggle="modal" data-bs-dismiss="modal">Back to Download</button>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="modal fade mt-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Donate</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={Donation}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" name="title" value={donate.title}
                    onChange={show} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input type="number" className="form-control" name='amount'
                    value={donate.amount} onChange={show} required />
                  <button type="submit" className="btn btn-primary">Submit</button>

                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Download</button>
              <button type="button" className="btn btn-warning">Donate</button>

              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div> */}



        {/* <AudioPlayerControlSprite />
        <Audio
          // string - path to audio file, required
          src={playingMusic}
          // string - 'none' | 'metadata' | 'auto', default: 'auto', optional
          preload="auto"

          // duration - number, default: 0, optional
          // will updated automatically when track started or metadata loaded
          duration={100}

          // MediaMetadata - media meta data, optional
          // https://developer.mozilla.org/en-US/docs/Web/API/MediaMetadata/MediaMetadata
          // mediaMetadata={mediaMetadata}

          // string - wrapper's className name, optional, deafult: ''
          98="my-className-name"

          // callback function - called on did mount, optional, default: noop
          onDidMount={console.log}

          // string - name for download file, optional, deafult: <src>
          // downloadFileName=""

          // boolean - show repeat button, optional, deafult: false
          useRepeatButton={true}
        /> */}
      </div>

    </>
  )
}

export default Freestem

