import React, { Component } from 'react'
import NaviBar from './PrimarySearchAppBar';

export class Profile extends Component {
    render() {
        return (
            <div>
                <NaviBar />
                <h1>This is profile</h1>
            </div>
        )
    }
}

export default Profile
