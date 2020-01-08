import React, { useState } from 'react'

const Books = (props) => {
  
  const [genre, setGenre] = useState('all')
  console.log('genre', genre)
  if (!props.show) {
    return null
  } 

  const filter = genre === 'all' ? props.books : props.books.filter(b => b.genres.includes(genre))


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filter.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <button onClick={() => setGenre('crime')}>crime</button>
        <button onClick={() => setGenre('refactoring')}>refactoring</button>
        <button onClick={() => setGenre('agile')}>agile</button>
        <button onClick={() => setGenre('design')}>design</button>
        <button onClick={() => setGenre('all')}>all</button>
      </div>
    </div>
  )
}

export default Books