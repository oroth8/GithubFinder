import React, { Component } from 'react';
import UserItem from './UserItem';

export class Users extends Component {
    state = {
        users: [
        {
            id: '1',
            login: 'Owen',
            avatar_url: 'https://avatars1.githubusercontent.com/u/69156111?s=60&amp;v=4',
            html_url: 'https://github.com/oroth8'
        },
        {
            id: '2',
            login: 'Dean',
            avatar_url: 'https://avatars1.githubusercontent.com/u/69156111?s=60&amp;v=4',
            html_url: 'https://github.com/oroth8'
        },
        {
            id: '3',
            login: 'Mike T',
            avatar_url: 'https://avatars1.githubusercontent.com/u/69156111?s=60&amp;v=4',
            html_url: 'https://github.com/oroth8'
        },
        ]
    }
    render() {
        return (
            <div style={userStyle}>
                {this.state.users.map(user => (
                    <UserItem key={user.id} user={user}/>
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: '1rem'
}

export default Users
