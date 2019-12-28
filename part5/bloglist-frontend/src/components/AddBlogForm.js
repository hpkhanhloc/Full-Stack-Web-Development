import React from 'react'

const AddBlogForm = ({
    handleCreate,
    newtitle,
    setTitle,
    newauthor,
    setAuthor,
    newurl,
    setURL
    }) => {
    return (
        <div>
        <h1>Create new</h1>
        <form onSubmit={handleCreate}>
          <div>
            title<input
            type='text'
            value={newtitle}
            name='Title'
            onChange={( {target} ) => setTitle(target.value)}
            />
          </div>
          <div>
            author<input
            type='text'
            value={newauthor}
            name='Author'
            onChange={( {target} ) => setAuthor(target.value)}
            />
          </div>
          <div>
            url<input
            type='text'
            value={newurl}
            name='URL'
            onChange={( {target} ) => setURL(target.value)}
            />
          </div>
          <button type='submit'>Create</button>
        </form>
      </div>
    )
}

export default AddBlogForm