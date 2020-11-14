import React, { Component } from 'react';

class UserItem extends Component {
        state = {
            id: 'id',
            login: 'oroth8',
            avatar_url: 'https://avatars1.githubusercontent.com/u/69156111?s=60&amp;v=4',
            html_url: 'https://github.com/oroth8'
        };

    render() {
        return (
            <div className="card text-center">
                <img src={this.state.avatar_url} alt="profile pic" className="round-img" style={{
                    width: '60px'
                }}>
                </img>
                <h3>{this.state.login}</h3>

                <div>
                    <a href={this.state.html_url} className="btn btn-dark btn-sm my-1">More</a>
                </div>
            </div>
        )
    }
}

export default UserItem
