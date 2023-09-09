import axios from 'axios';

import { useEffect, useState } from 'react';

import CreatePost from './CreatePost';
import Post from './Post';

function Blog() {
    const [blog, setBlog] = useState([]);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const getBlog = async () => {
            const response = await axios.get('http://127.0.0.1:8000/blog');
            const dataArr = Object.keys(response.data).map((key) => [
                key,
                response.data[key],
            ]);
            setBlog(dataArr);
        };

        getBlog();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            title: title,
            content: content,
        };
        if (isEdit) {
            axios
                .post('http://127.0.0.1:8000/blog/update', postData)
                .then(() => {
                    setTitle('');
                    setContent('');
                    setIsEdit(false);
                    window.location.reload();
                });
        } else
            axios.post('http://127.0.0.1:8000/blog/new', postData).then(() => {
                setBlog((existingPost) => [...existingPost, [title, content]]);
                setTitle('');
                setContent('');
            });
    };

    const loadEditForm = async (e, selectedTitle) => {
        const response = await axios.get(
            `http://127.0.0.1:8000/blog/${selectedTitle}`
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setIsEdit(true);
    };

    const handleDelete = async (e, selectedTitle) => {
        e.preventDefault();
        const postData = {
            title: selectedTitle,
        };
        await axios.post('http://127.0.0.1:8000/blog/delete', postData);
        window.location.reload();
    };

    return (
        <>
            <CreatePost
                onHandleSubmit={handleSubmit}
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
            />
            <br />
            <Post
                blog={blog}
                loadEditForm={loadEditForm}
                onHandleDelete={handleDelete}
            />
        </>
    );
}

export default Blog;
