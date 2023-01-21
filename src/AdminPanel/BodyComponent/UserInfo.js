import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Container from '../../Components/Adminlayout/Container';
import { PageHeader } from '../Common/Components'
// import styled from '@emotion/styled';
import '../css/userInfo.css'
import ReactPaginate from 'react-paginate';


// const Wrapper = styled.div`
// Width: 1050px;

// @media only screen and (max-width: 600px){
//    max-width: 400px;
//    display: grid;
    
// }
// `;


const UserInfo = () => {
    const [user, setUser] = useState([])
    const [total, setTotal] = useState(0)
    const [usertotal, setusertotal] = useState('')

    const token = useSelector(state => state.admin.adminlogintoken)
    const data = (id) => {
        axios({
            url: `http://43.205.187.52:5001/api/admin/getAlluser/${1}`,
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            setUser(response.data.user_list.rows)
            setusertotal(response.data.user_list.count)
            const Count = response.data.user_list.count
            console.log(Count)
             setTotal(Math.ceil(Count / 10));
        }).catch((error) => {
            console.log(error)
        })
    }
   

    const paginate = async (CurrentPage) => {
        const res = await fetch(`http://43.205.187.52:5001/api/admin/getAlluser/${CurrentPage}`,{
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        }
       );
       const data = await res.json();
       console.log(data)
       const d = data.user_list.rows;
       return d;
   }
   const Click = async (d) => {
       window.scrollTo(0, 0);
       var CurrentPage = d.selected + 1;
       const Comments = await paginate(CurrentPage);
       setUser(Comments)
   };  

    useEffect(() => {
        data()
    }, [])

    return (
        <Container>
             <PageHeader title='User Information'></PageHeader>
             <ReactPaginate
                    style={{ background: 'red' }}
                    previousLabel={"← Previous"}
                    nextLabel={'Next →'}
                    breakLabel={"..."}
                    pageCount={total}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange={Click}
                    containerClassName={'pagination justify-content-left'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={"page-item"}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
             {/* <button className="userbtn">Users {total.count}</button> */}
             <table className="table table-hover" >
                <thead className='bg-dark'>
                    <tr>
                        <th>#</th>
                        {/* <th>ID</th> */}
                        <th>Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Date</th>
                    </tr>
                </thead>
                {user.map((data, index) => {
                    return (
                        <tbody key={index}>
                            <tr>
                                <th>{index+1}.</th>
                                {/* <td>{data.id}</td> */}
                                <td>{data.username}</td>
                                <td>{data.email}</td>
                                <td>{data.country}</td>
                                <td>{data.Date}</td>
                            </tr>
                        </tbody>
                    )
                })}

            </table>
            
          <br />
        </Container>
    )
}


export default UserInfo;