import React from 'react'

const Recommendation = (props) => {
    if(!props.show){
        return null
    }

    const filter = props.books.filter(b => b.genres.includes(props.me.favoriteGenre))
    return (
        <div>
            <h1>Recommendations</h1>
            <p>Book in your favorite genre <b>{props.me.favoriteGenre}</b></p>
            <table>
                <tbody>
                    <tr>
                        <th>title</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {filter.map(b => 
                    <tr key={filter.indexOf(b)}>
                        <td>{b.title}</td>
                        <td>{b.author.name}</td>
                        <td>{b.published}</td>
                    </tr>
                        )}
                </tbody>
            </table>

        </div>
    )
}

export default Recommendation