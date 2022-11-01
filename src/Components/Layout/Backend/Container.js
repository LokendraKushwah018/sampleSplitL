import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
// import Footer from './Footer'
function Container({children}) {
  return (
    <div>
      <div className ="wrapper">
      <Sidebar/>
      <Header/>  
      
      <div className="content-wrapper">
      <div className="col-lg-7 connectedSortable">
         {children} 
 </div>
 </div>
      {/* <Footer/> */}
    </div>
    </div>
  )
}

export default Container