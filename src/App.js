import React, { useState } from 'react'
import UserList from './components/UserList'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from "react-bootstrap/Button";

import './App.css';

const App = () => {
    const usersData = [
        { id: 1, firstName: 'Homer', lastName: 'Simpson' },
        { id: 2, firstName: 'Maggie', lastName: 'Simpson' },
        { id: 3, firstName: 'Bart', lastName: 'Simpson' }
    ]

  const [users, setUsers] = useState(usersData);

    const deleteUser = id => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h1 className="text-center">Planned App</h1>
            <Tabs defaultActiveKey="usersList" id="uncontrolled-tab-example">
                <Tab eventKey="usersList" title="Users List">
                    <UserList className="users-list" users={users} deleteUser={deleteUser} />
                    <Button variant="outline-primary">Add User</Button>
                </Tab>
                <Tab eventKey="groupsList" title="Groups List">
                </Tab>
            </Tabs>
        </div>
    )
};

export default App
