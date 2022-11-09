
// ADMIN PANLE API'S

export const adminlogin = `http://localhost:5001/api/admin/login`;
export const adminprofile = `http://localhost:5001/api/admin/getAdminProfile`;
export const uploadmusic = `http://localhost:5001/api/admin/audioUpload`;
export const adminblog = `http://localhost:5001/api/admin/createBlog`;
export const adminlogout = `http://localhost:5001/api/admin/logOut`;
export const viewmusic = `http://localhost:5001/api/admin/getAllAudio`;
export const deletemusic = `http://localhost:5001/api/admin/deleteAudio/`;
export const editmusic = `http://localhost:5001/api/admin/editAudio/`;
export const updatemusic = `http://localhost:5001/api/admin/updateAudioById/`;
export const admindetailsedit = `http://localhost:5001/api/admin/updateProfile`;
export const toptracks = `http://localhost:5001/api/admin/topTrack`;
export const topfans = `http://localhost:5001/api/admin/getTopFans`;
export const changestatus = `http://localhost:5001/api/admin/changeStatus/`;
export const addprice = `http://localhost:5001/api/admin/AddPayment/`;
export const changepassword = `http://localhost:5001/api/admin/changePassword`
export const adminDashboard = `http://localhost:5001/api/admin/toptrackByDate?filterkey=`



// USER API'S
export const userblog = `http://localhost:5001/api/user/getBloges`;
export const userlogin = `http://localhost:5001/api/user/login`;
export const usersignup = `http://localhost:5001/api/user/singup`;
export const categoryMusic = `http://localhost:5001/api/user/getSongByTracktype`;
export const search = `http://localhost:5001/api/user/search?keyWord=`;
export const mostdiscussed = `http://localhost:5001/api/user/mostDiscuss/`;
export const usermostplayed = `http://localhost:5001/api/user/mostplayed/`;
export const userLogOut = `http://localhost:5001/api/user/logOut`;
export const fourStemps =`http://localhost:5001/api/user/getFourSteamsSong?filterKey=`
export const twoStemps = `http://localhost:5001/api/user/getTwoSteamsSong?filterKey=`
export const songsdownload = `http://localhost:5001/api/user/getDownloadSong/`;
export const samplesplitsong = `http://192.168.29.237:5001/api/user/getstemsAudio`
export const userSubscription = `http://localhost:5001/api/user/getAllSubscription`
export const userbuyplan = `http://localhost:5001/api/user/Pay/`
export const Donationpay = `http://localhost:5001/api/user/DonationPay`
export const SuccessDonation = `http://localhost:5001/api/user/successDonation?PayerID=`
export const userdownload = `http://localhost:5001/api/user/getDownloadSong/`
export const userdownloader = `http://localhost:5001/api/user/downloadedSong/`
export const getUserDetail = `http://localhost:5001/api/user/getUserDetail`