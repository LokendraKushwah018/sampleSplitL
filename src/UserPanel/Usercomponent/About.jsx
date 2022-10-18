import React from 'react';
// import '../css/About.scss'
import Navbar from '../UserBackend/Navbar'
// import Attribution from "../components/fragment/Attribution";
// import logo from './samplelogo.png'
const About = () => {
    return (
      <>
        <Navbar />
            <div className={"About"}>
                <div style={{ float: 'left' }}>
                    <div style={{ float: 'left', width: '400px', margin: '20px' }}>
                        <h3>About</h3>
                        <h1 style={{ marginTop: '20px' }}><span style={{ color: '#4169e1' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sample Split</span></h1>
                        <p style={{ color: '#2F76DB', marginTop: '10px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo aut at perspiciatis velit ut expedita placeat tenetur excepturi deserunt incidunt repellat eum quo illum, reprehenderit id quis corporis odio tempora!
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                        </p>
                    </div>
                    <div style={{ float: 'left' }}>
                        {/* <img src={logo} alt='/' style={{ width: '500px', height: '400px', margin: '50px' }}></img> */}
                    </div>
                </div>
            </div>
            {/* <Attribution/> */}
            </>
   
    );
}

export default About;

