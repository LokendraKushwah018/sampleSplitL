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
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
// import Footer from '../UserBackend/Footer'

const Freestem = () => {

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
        console.log(response);
        setSongs(response.data.getSong);
        console.log(response.data.getSong);
        console.log(Id , state)
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
      console.log(response);
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
        // console.log(MostPlayed)
      })
  }
  useEffect(() => {
    handleClick("public");
      MostPlayed();
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
      <div>
        <div className='wrap'>
          <input className='search_bar mt-1'
            style={{ borderRadius: '50px' }}
            type="text"
            value={input}
            onKeyPress={searchApi}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search Any Songs and Listen'
          />
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
          float: 'left', margin: '0px 0px 0px 70px'
        }}>
          <div 
          style={{float:'left' , margin:10}}
          onClick={() => handleClick('Drums')}>
            <h2 style={{ textAlign: 'center' }} >Drums</h2>
            <img src={drumsImg} alt="/" style={{ width: '250px', height: "200px" }} />
          </div>
          &nbsp;
          <div 
          style={{float:'left' , margin:10}}
          onClick={() => handleClick('Vocals')}>
            <h2 style={{ textAlign: 'center' }} >Vocals</h2>
            <img src={vocalImg} alt="/" style={{ width: '250px', height: "200px" }} />
          </div>
          &nbsp;
          <div 
          style={{float:'left' , margin:10}}
          onClick={() => handleClick('Samples')}>
            <h2 style={{ textAlign: 'center' }} >Sample</h2>
            <img src={sampleImg} alt="/" style={{ width: '250px', height: "200px" }} />
          </div>
          &nbsp;
          <div 
          style={{float:'left' , margin:10}}
          onClick={() => handleClick('Beats')}>
            <h2 style={{ textAlign: 'center' }} >Beats</h2>
            <img src={beatImg} alt="/" style={{ width: '250px', height: "200px" }} />
          </div>
        </div>
        <div style={{ float: 'left', marginLeft: '80px', marginBottom: "50px" }}>

          {music.map((value , index) => {
            return (
            
                <div style={{ margin: '10px', float: 'left', width: '400px', height: '60px' }}
                key={index}>
                  <div
                    className="img-div"
                    style={{ float: 'left' }} onClick={() => Bottom(value.id, value.music, value.trackTitle, value.imageName)}>
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
                      <h5 style={{ lineHeight: '30px' ,whiteSpace: "nowrap",overflow: "hidden",  textOverflow: "ellipsis"}}>{value.trackTitle}</h5>
                      <p>{value.tracktype}</p>
                    </div>
                  </div>
                  
                    <DownloadIcon
                      sx={{ m: 2 }}
                      onClick={() => Download(value.id)}
                      data-bs-toggle="modal" href="#exampleModalToggle" role="button"
                    />
                  
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
                      
                            <DownloadIcon
                              onClick={BuyPlan}
                              aria-label="Close"
                              data-bs-dismiss="modal"
                              sx={{ color: '#1F2D5A' }} />
                      
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
                              <input type="text" className="form-control" id="recipient-name"
                                name="title" value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="message-text" className="col-form-label">Amount</label>
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
              
            )
          })}
        </div>
        <div className="Apps">
          <AudioPlayer
            style={{ height: '80px', textAlign: 'center', background: "black", color: 'white' }}
            autoPlay={false}
            layout="horizontal"
            controls={false}
            src={playingMusic}
            showJumpControls={false}
            header={play}
          />
        </div>
        {/* <Footer />    */}
      </div>
    </>
  )
}

export default Freestem

