import {Routes , Route} from 'react-router-dom'
// import Home from '../Pages/Dashboard';
import BlogPost from '../AdminPanel/BodyComponent/UploadMusic.'
import ViewMusic from '../AdminPanel/BodyComponent/Viewmusic'
import Blog from '../AdminPanel/BodyComponent/Blog'
import AdminDetails from '../AdminPanel/BodyComponent/Admindetails'
import Analytics from '../AdminPanel/BodyComponent/Analytics'
import BlogGraph from '../AdminPanel/BodyComponent/Admindashboard'
import AdminlogIn from '../Pages/Dashboard/AdminAuth/Login'
import Usersignup from '../Pages/Dashboard/UserAuth/Usersignup/usersignup'
import UserLogIn from '../Pages/Dashboard/UserAuth/Userlogin/userlogin'
import About from '../UserPanel/Usercomponent/About'
import Home from '../UserPanel/Usercomponent/Home'
import Freestem from '../UserPanel/Usercomponent/Freestem'
import UserBlog from '../UserPanel/Usercomponent/UserBlog'
import Contact from '../UserPanel/Usercomponent/Contact'
import Search from '../UserPanel/Usercomponent/Search'
import Privateroutes from '../Pages/Dashboard/Privateroute'
import AdminPrivateroutes from '../Pages/Dashboard/AdminPrivateroutes'

// import Api from './Table'
// import Login from './Login';
const Index = () => {
  return <div>   
 <Routes> 
 
 <Route path="/adminlogin" element={<AdminlogIn/>} />
 <Route element={<AdminPrivateroutes />}>
  <Route path='/dashboard'  element={<BlogGraph/>}/>
  <Route path='/BlogPost'  element={<BlogPost/>}/>
  <Route path='/ViewMusic'  element={<ViewMusic/>}/>
  <Route path='/Blog'  element={<Blog/>}/>
  <Route path='/AdminDetails' element={<AdminDetails/>}/>
  <Route path='/Analytics' element={<Analytics/>}/>
  </Route>
  {/* User Routing */}
  <Route path='/' element={<Usersignup/>}/>
  <Route path='/UserLogIn' element={<UserLogIn/>}/>
  <Route element={<Privateroutes />} >

  <Route path='/About' element={<About/>}/>
 <Route path='/Home' element={<Home/>}/>
 <Route path='/Search' element={<Search/>}/>
 <Route path='/Freestem' element={<Freestem/>}/>
 <Route path='/Contact' element={<Contact/>}/>
 <Route path='/UserBlog' element={<UserBlog/>}/> 
 </Route> 
   </Routes>
    </div>    
}
export default Index;
