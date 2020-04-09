import React, { useState } from 'react'
import './App.css';
import UserList from './components/UserList'
import AddUser from "./components/AddUser";
import GroupList from './components/GroupList'
import AddGroup from "./components/AddGroup";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from "react-bootstrap/Button";


const App = () => {
    const usersData = [
        { id: 1, groups: [1,2], firstName: 'Homer', lastName: 'Simpson' },
        { id: 2, groups: [1], firstName:  'Maggie', lastName: 'Simpson' },
        { id: 3, groups: [2,3], firstName: 'Bart', lastName: 'Simpson' }
    ];

    const groupsData = [
        { id: 1, name: 'Favorites'},
        { id: 2, name: 'Locations'},
        { id: 3, name: 'Preferred'},
    ];

    const [users, setUsers] = useState(usersData);
    let [userIdCount, setUserIdCount] = useState(usersData.length);

    const [groups, setGroups] = useState(groupsData);
    let [groupIdCount, setGroupIdCount] = useState(groupsData.length);

    const addUser = user => {
        user.id = ++userIdCount;
        setUserIdCount(user.id);
        console.log("app user obj = ", user);
        setUsers([ ...users, user ]);
    };

    const deleteUser = id => {
        setUsers(users.filter(user => user.id !== id));
    };

    const addGroup = group => {
        group.id = ++groupIdCount;
        setGroupIdCount(group.id);
        console.log("app group obj = ", group);
        setGroups([ ...groups, group ]);
    };

    const deleteGroup = id => {
        setGroups(groups.filter(group => group.id !== id));
    };

    return (
        <div>
            <h1 className="text-center">Planned App</h1>
            <Tabs id="PageTabs" defaultActiveKey="usersList">
                <Tab eventKey="usersList" title="Users List">
                    <UserList className="tab-content" users={users} deleteUser={deleteUser} />
                </Tab>
                <Tab eventKey="addUser" title="Add User">
                    <div className="padding-1">
                        <AddUser addUser={addUser}/>
                    </div>
                    <UserList className="tab-content" users={users} deleteUser={deleteUser} />
                </Tab>
                <Tab eventKey="groupsList" title="Groups List">
                    <div className="padding-1">
                        <AddGroup addGroup={addGroup}/>
                    </div>
                    <GroupList className="tab-content" groups={groups} deleteGroup={deleteGroup} />
                </Tab>
            </Tabs>
        </div>
    )
};

export default App
