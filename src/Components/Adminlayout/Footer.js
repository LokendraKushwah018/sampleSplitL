import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Footer() {
  return (
    <>
    <footer className="main-footer bg-dark " 
    style={{marginBottom: "-24px" }}>
    <strong>Copyright &copy; 2021-2022 SampleSplit.Com  </strong>
       All rights reserved.
    <div className="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.2.0
    </div>
  </footer>
  </>    
  )
}

export default Footer
