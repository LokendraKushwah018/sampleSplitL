import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import axios from 'axios';
import { PageHeader } from '../Common/Components'
import { adminblog } from '../../Api/Config';
import { useRef } from 'react';
import Container from '../../Components/Layout/Backend/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
   
        const Blogtoastupload = () => {
          toast.success("Blog Uploaded Successfully!")
        };

    let token = localStorage.getItem('logintoken')
    let [files, setImage] = useState(null);
    let [title, setTitle] = useState();
    let [description, setDescription] = useState();
    
    const ImageInput = useRef();

    const BlogApi = () => {
        let formData = new FormData();
        formData.append('image', files);
        formData.append('title', title);
        formData.append('description', description);

        axios(
            {
                url: `${adminblog}`,
                method: "post",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: formData,
            }
        ).then((response) => {
            console.log(response);
            setTitle("");
            setDescription("");
            if(response.status===201){
                Blogtoastupload()
            }
            ImageInput.current.value="";

        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <Container>
            <ToastContainer
        autoClose={2000}
        position="top-center"
        className="toast-container"
        toastClassName="dark-toast"
        theme="colored" />
        <div className="App" style={{ marginTop: '20px' }}>
      <PageHeader  title='Blog' />
            <form >
                <TextField
                    style={{ width: "200px", margin: "5px" }}
                    type="text"
                    label="Title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                /><br />

                <TextField
                    style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="Content"
                    variant="outlined"
                    multiline
                    value={description}
                    rows={10}
                    onChange={(e) => setDescription(e.target.value)}

                />
                <br />
                <Button
                    variant="contained"
                    component="label"
                    size="small"
                >
                    Upload Image&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        type="file"
                        label='show'
                        onChange={(e) => setImage(e.target.files[0])}
                        ref = {ImageInput}
                    /></Button ><br /><br />
                    {/* <Button
                    variant="contained"
                    component="label"
                >
                    Upload Video&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="file" name="file[]" className="file_multi_video" accept="video/*">
                    </input></Button ><br /><br /> */}
                <Button sx={{ml:20}}
                size="large"  variant="contained" color="primary" onClick={BlogApi}>
                    Post
                </Button>
            </form>
        </div>
                </Container>
    )
}

export default Blog