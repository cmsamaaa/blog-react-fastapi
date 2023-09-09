function CreatePost({ onHandleSubmit, title, setTitle, content, setContent }) {
    return (
        <>
            <h3>New Post</h3>
            <form onSubmit={onHandleSubmit}>
                <input
                    type='text'
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <br />
                <textarea
                    type='text'
                    rows='4'
                    cols='50'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default CreatePost;
