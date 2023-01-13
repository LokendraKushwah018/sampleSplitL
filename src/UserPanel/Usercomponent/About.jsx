import React from 'react';
import Navbar from '../Userlayout/Navbar'
// import '../css/about.css'

const About = () => {
 
    const styles = {
        card: {
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            margin: '8px',           
          },        
           container: {
            padding: '0 16px',
          },
          'about-section': {
            padding: '30px',
            textAlign: 'center',
            // backgroundColor: '#474e5d',
            // Color: 'white',
            color:'white'           
          },
          button: {
            border: 'none',
            outline: 0,
            display: 'inline-block',
            padding: '8px',
            color: 'white',
            backgroundColor: '#000',
            textAlign: 'center',
            cursor: 'pointer',
            width: '100%',
           
          },
          
          'button:hover': {
            backgroundColor: '#555'
          } 
       
    }

    return (
        <>
            <Navbar />
           <div >
  <div style={styles['about-section']}>
    <h1><b>About - SampleSplit.Com</b></h1>
    <p>We are providing you best song quality experiance.</p>
    <p>Now you can play the Track and also split song from your Musiclist</p>
  </div>
  <h2 style={{textAlign: 'center' , color:'white'}}><u>Our Team</u></h2>
  <div style={styles.card}>
    <div className="column">
      <div className="card">
        <img src="./team1.jpg" alt="Jane" style={{width: '100%', height:'50%'}} />
        <div className="container">
          <h2>Jane Doe</h2>
          <p className="title">CEO &amp; Founder</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>jane@example.com</p>
          <p><button style={styles.button}>Contact</button></p>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src="./team2.jpg" alt="Mike" style={{width: '100%', height:'50%'}} />
        <div className="container">
          <h2>Mike Ross</h2>
          <p className="title">Art Director</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>mike@example.com</p>
          <p><button style={styles.button}>Contact</button></p>
        </div>
      </div>
    </div>
    <div className="column">
      <div className="card">
        <img src="./team3.jpg" alt="John" style={{width: '100%', height:'50%'}} />
        <div className="container">
          <h2>John Doe</h2>
          <p className="title">Designer</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
          <p>john@example.com</p>
          <p><button style={styles.button}>Contact</button></p>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
    );
}

export default About;



