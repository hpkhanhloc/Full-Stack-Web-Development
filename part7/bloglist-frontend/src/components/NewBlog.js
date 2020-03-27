import React, { useState } from 'react'

const NewBlog = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = (event) => {
        event.preventDefault()

        createBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create New</h2>
            <form className="form-horizontal" onSubmit={handleNewBlog}>
                <div className="form-group">
                    <label className="control-label col-sm-2">Author:</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                            id='author'
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>       
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2">Title:</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                            id='title'
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="control-label col-sm-2">URL:</label>
                    <div className="col-sm-10">
                        <input className="form-control"
                            id='url'
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                </div>
                <button className="btn btn-primary" id="create">create</button>
            </form>
        </div>
    )
}

export default NewBlog