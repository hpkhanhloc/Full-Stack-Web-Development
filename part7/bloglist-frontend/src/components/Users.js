import React, { useEffect } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { initializeUserList } from '../reducers/userListReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import UserDetail from './UserDetail'
import { bindActionCreators } from 'redux'

const Users = (props) => {
    useEffect(() => {
        props.initializeUserList()
    }, [])

    const Userbyid = (id) => {
        console.log(`from users`, props.userlist.find(user => user.id === id))
        return props.userlist.find(user => user.id === id)   
    }

    const blogCount =  (users, id) => {
        const result = users.find(item => item.id ===id)
        if (result.blogs !== undefined) {
            return result.blogs.length
        } else {
            return 0
        }
    }

    if (props.userlist === null){
        return null
    }

    return(
        <div>
            <h2>Users</h2>
            <Router>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>created</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.userlist.map(u => 
                        <tr key={u.id}>
                            <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                            <td>{blogCount(props.userlist, u.id)}</td>
                        </tr>    
                        )}
                    </tbody>
                </table>
            </Router>
        </div>     
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        userlist: state.userlist
    }
}

const mapDispatchToProps = {
    initializeUserList
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)