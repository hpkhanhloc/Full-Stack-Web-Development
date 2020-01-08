import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = (props) => {
    const [author, setAuthor] = useState({})
    const [born, setBorn] = useState('')

    if (!props.show || !props.authors){
        return null
    }

    const options = props.authors.map(a => {
        return {value: a.name, label: a.name}
    })

    const handleOption = (author) => {
        setAuthor(author)
    }

    const submit = async (e) => {
        e.preventDefault()

        await props.editAuthor({
        variables: { name: author.value , born }
        })

        setAuthor('')
        setBorn('')
    }

    return(
        <div>
        <h2>Set birthyear</h2>
        <div>
        <form onSubmit={submit}>
          <Select value={author} onChange={handleOption} options={options}/>
          <div>
            born <input
            value={born}
            onChange={({target}) => setBorn(Number(target.value))}
            />
          </div>
          <button type='submit'>Update Author</button>
        </form>
      </div>
      </div>
    )
}

export default EditAuthor