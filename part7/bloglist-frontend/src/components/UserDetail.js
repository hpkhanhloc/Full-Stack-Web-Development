import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { handleLogged } from '../reducers/userReducer'
import { findUser } from '../reducers/userListReducer'

const UserDetail = (props) => {
    useEffect(() => {
        props.handleLogged()
        props.findUser()
    }, [])

    if (props.user === null) {
        return null
    } else if (props.userlist.blogs.length === 0){
        return (
            <div>
                <h2>{props.user.name}</h2>
                <p>User has no blog.</p>
            </div>
        )
    } else {
        return (
            <div>
                <h2>{props.user.name}</h2>
                <h3>Added blogs.</h3>
                <ul>
                    {props.user.blogs.map(blog => {
                        <li key={blog.id}>{blog.title}</li>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        userlist: state.userlist
    }
}

export default connect(mapStateToProps, {handleLogged})(UserDetail)