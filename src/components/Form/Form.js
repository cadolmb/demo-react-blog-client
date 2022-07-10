import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useSelector, useDispatch } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();

    const emptyPostData = {
        name: '',
        title: '',
        message: '',
        selectedFile: '',
        tags: ''
    };
    const [postData, setPostData] = useState(emptyPostData);
    const selectedPost = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedPost) setPostData(selectedPost);
    }, [selectedPost]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else {
            dispatch(createPost(postData));
        } 
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData(emptyPostData)
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId? 'Edit Post' : 'Create Post'}</Typography>
                <TextField
                    name="name"
                    variant="outlined"
                    label="name"
                    fullWidth
                    value={postData.name}
                    onChange={(event) => setPostData({ ...postData, name: event.target.value })}
                />
                <TextField
                    name="title"
                    variant="outlined"
                    label="title"
                    fullWidth
                    value={postData.title}
                    onChange={(event) => setPostData({ ...postData, title: event.target.value })}
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="message"
                    fullWidth
                    value={postData.message}
                    onChange={(event) => setPostData({ ...postData, message: event.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(event) => setPostData({ ...postData, tags: event.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;