// import axios from "axios";
// import { useSelector } from "react-redux";

// export const API = axios.create({
    
//     // const token = useSelector(state=>state.auth.userlogintoken),

//     baseURL: "http://localhost:5001/api/user/",
//     method: 'get',
//     // headers: {
//     //     "Authorization" : `Bearer ${token}`
        
//     // }
    
// })
export const userbaseurl = `http://43.205.187.52:5001/api/user/`
export const adminbaseurl = `http://43.205.187.52:5001/api/admin/`

// export const AdminAPI = axios.create ({
//     baseURL: 'http://localhost:5001/api/admin/',
//     method: "get",
// http://43.205.187.52:5001/
// })

// axios.defaults.baseURL = "http://localhost:5001/api/user/"
// axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';


// ADMIN PANLE API'S


export const adminlogout = `logOut`;
export const adminDashboard = `toptrackByDate?filterkey=`
// export const viewmusic = `getAllAudio`;
// export const deletemusic = `deleteAudio/`;
// export const editmusic = `editAudio/`;
// export const updatemusic = `updateAudioById/`;
// export const admindetailsedit = `updateProfile`;
// export const toptracks = `topTrack`;
// export const topfans = `getTopFans`;
// export const changestatus = `changeStatus/`;
// export const addprice = `AddPayment/`;
// export const changepassword = `changePassword`
// export const totalAmmount = `getTotalSubAmount`
// export const loginAdmin = `login`;
// export const adminprofile = `getAdminProfile`;
// export const uploadmusic = `audioUpload`;
// export const adminblog = `createBlog`;

// USER API'S

export const categoryMusic = `getSongByTracktype`;
export const userLogOut = `logOut`;
export const samplesplitsong = `http://192.168.29.237:5001/api/user/getstemsAudio`
// export const search = `search?keyWord=`;
// export const mostdiscussed = `mostDiscuss/`;
// export const usermostplayed = `mostplayed/`;
// export const fourStemps =`getFourSteamsSong?filterKey=`
// export const twoStemps = `getTwoSteamsSong?filterKey=`
// export const songsdownload = `getDownloadSong/`;
// export const userSubscription = `getAllSubscription`
// export const userbuyplan = `Pay/`
// export const Donationpay = `DonationPay`
// export const SuccessDonation = `successDonation?PayerID=`
// export const userdownload = `getDownloadSong/`
// export const userdownloader = `downloadedSong/`
// export const getUserDetail = `getUserDetail`
// export const SuccessPayment = `paymentSuccess/`
// export const getUserDetail = `getUserDetail`
// export const tokenUser = `token`
// export const userblog = `getBloges`;
// export const userlogin = `login`;
// export const usersignup = `singup`;