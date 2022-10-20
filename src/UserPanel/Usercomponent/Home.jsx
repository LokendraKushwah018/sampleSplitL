import axios from 'axios'
import React, { useState } from 'react'
// import { useEffect } from 'react'
//  import { Link } from 'react-router-dom'
import Navbar from '../UserBackend/Navbar'

const Home = () => {
  const [stem, setStem] = useState([]);

  const models = (c) => {
    axios(
      {
        url: `http://localhost:5001/api/user/getTwoSteamsSong?filterKey=${c}`,
        method: 'get',
        headers: {
          "Content-type": "multipart/form-data",
        }
      }).then((response) => {
        console.log(response);
        setStem(response.data.getSong);
      }).catch((err) => {
        console.log(err);
      })
  }

  const fourmodels = (s) => {
    axios({
      url: `http://localhost:5001/api/user/getFourSteamsSong?filterKey=${s}`,
      method: 'get',
      header: {
        "Content-type": "multipart/form-data",
      }
    }).then((response) => {
      console.log(response);
      setStem(response.data.getSong)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (

    <div>
      <Navbar />
      <div className="dropdown m-5" style={{ display: 'inline'}} >
        <button className="btn btn-secondary dropdown-toggle" type="button"
          id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          2 Stems
        </button>
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li><p className="dropdown-item" onClick={() => models("Vocals")} >Vocals</p></li>
          <li><p className="dropdown-item" onClick={() => models("Accompaniment")} >Accompaniment</p></li>
        </ul>
      </div>
      <div className="dropdown m-5" style={{ display: 'inline' }}>
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
          4 Stems
        </button>
        <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
          <li><p className="dropdown-item " onClick={() => fourmodels("Vocals")}>Vocals</p></li>
          <li><p className="dropdown-item" onClick={() => fourmodels("Drums")} >Drums</p></li>
          <li><p className="dropdown-item" onClick={() => fourmodels("Bass")} >Bass</p></li>
          <li><p className="dropdown-item" onClick={() => fourmodels("Other")}>Other</p></li>
        </ul>
      </div>
      <div style={{ overflow: 'hidden' }}>
        {stem.map((value, index) => {
          return (
            <>
              <div style={{ width: '800px', height: '54px', background: 'cyan ', margin: '10px', float: 'left' }}>
                <div key={index}>
                  <img src={value.imageName} alt="/" style={{ width: '100px', height: '54px', float: 'left' }} />
                </div>
                <div style={{ height: '55px', float: 'left', borderRadius: "0px" }}>
                  <audio controls style={{ backgroundColor: "#C8C8C8" }}>
                    <source src={value.music} type="audio/ogg" />
                  </audio>
                </div >
                <div style={{ float: 'left', width: '200px', height: '54px' }}>
                  <h5 style={{ textAlign: 'center', lineHeight: '54px' }} >{value.trackTitle}</h5>
                </div>
                <div style={{ float: 'left', textAlign: 'center', lineHeight: "54px", width: '200px', height: '54px' }}>
                  <p>{value.trackType}</p>
                </div>
              </div>
            </>
          )
        })}</div>
    </div>
  )
}

export default Home
