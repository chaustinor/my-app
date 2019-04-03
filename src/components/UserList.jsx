import React, { Component } from 'react';
import { connect } from "react-redux";
import { addUser, getUsers, removeUser } from "../redux" 

const User = props => {
  const user = props.user

  return <li>
    <span>{user.name}</span>
    <span>{user.age}</span>
    <span>
      <button onClick={() => props.dispatch(removeUser(user._id))}>Remove</button>
    </span>
  </li>
}

const UserCon = connect(null, mapDispatchToProps)(User);

function UserList(props){
  const users = props.users;
  const filter = props.filter;
  
  return (
    <ul className="App-user-list">
    {
      users.map((user, index) => {
        if (!filter || user.name.indexOf(filter) > -1){
          return <UserCon key={user._id}
            user={user} />
        }
      })
    }
    </ul>
  )
}

class UserListChris extends Component {

  constructor(props){
    super(props)

    this.state = { 
      name: "", 
      searchValue: "", 
      age: ""
    }
  }

  handleChange(event){
    this.setState({ name: event.target.value })
  }

  handleAgeChange(event){
    this.setState({ age: event.target.value })
  }

  handleSearh(event){
    this.setState({ searchValue: event.target.value })
  }

  componentDidMount(){
    this.props.getUsers()
  }

  handleSubmit(event){
    event.preventDefault()
    if (!this.state.name || !this.state.age)
      return

    this.props.addUser({name: this.state.name, age: this.state.age})
    this.setState({ name: '' })
    this.setState({ age: '' })
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <span>Search:</span>
            <input
              type="text"
              value={this.state.searchValue}
              onChange={(e) => this.handleSearh(e)}
              />
          </div>
          <UserList users={this.props.users} filter={this.state.searchValue} />
        </div>
        <form onSubmit={ e => this.handleSubmit(e)}>
          <div>
            <div>
              <span>Name:</span>
              <input
                type="text"
                value={this.state.name}
                onChange={(e) => this.handleChange(e)}
                />
            </div>
            <div>
              <span>Age:</span>
              <input
                type="text"
                value={this.state.age}
                onChange={(e) => this.handleAgeChange(e)}
                />
            </div>
            <input type="submit" value="Submit" />
          </div>  
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = {
  getUsers,
  removeUser,
  addUser
}

const Chris = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListChris);

export default Chris;




