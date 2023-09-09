function Post({ blog, loadEditForm, onHandleDelete }) {
    return (
        <>
            <h3>Blog</h3>
            {blog.length > 0 &&
                blog.map((post, idx) => (
                    <div key={idx}>
                        <div style={{ fontWeight: 'bold' }}>{post[0]}</div>
                        <div>{post[1]}</div>
                        <button
                            type='button'
                            onClick={(e) => loadEditForm(e, post[0])}
                        >
                            Edit
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <button
                            type='submit'
                            onClick={(e) => onHandleDelete(e, post[0])}
                        >
                            Delete
                        </button>
                        <br />
                        <br />
                    </div>
                ))}
        </>
    );
}

export default Post;
