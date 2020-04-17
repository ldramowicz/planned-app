import React, { useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"
import GroupList from './components/GroupList'
import AddGroup from "./components/AddGroup"
import EditGroup from "./components/EditGroup"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

const _ = require('lodash');


const App = () => {
    const usersData = [
        { id: 1, groups: [1, 2], firstName: 'Homer', lastName: 'Simpson' },
        { id: 2, groups: [1], firstName:  'Maggie', lastName: 'Simpson' },
        { id: 3, groups: [2, 3], firstName: 'Bart', lastName: 'Simpson' }
    ];

    const groupsData = [
        { value: 1, label: 'Spanish'},
        { value: 2, label: 'English'},
        { value: 3, label: 'French'}
    ];

    const [users, setUsers] = useState(usersData);
    const [currentUser, setCurrentUser] = useState({id: null, groups:[], firstName: '', lastName: ''});
    const [isEditingUser, setEditingUser] = useState(false);
    let [userIdCount, setUserIdCount] = useState(usersData.length);

    const [groups, setGroups] = useState(groupsData);
    const [currentGroup, setCurrentGroup] = useState({value: null, label:''});
    const [isEditingGroup, setEditingGroup] = useState(false);
    let [groupIdCount, setGroupIdCount] = useState(groupsData.length);

    const addUser = user => {
        user.id = ++userIdCount;
        setUserIdCount(user.id);
        console.log("app user obj = ", user);
        setUsers([ ...users, user ]);
    };

    const editUser = id => {
        console.log("Edit user id = ", id);
        let result = users.find(user => user.id === id);
        console.log("result = ", result);
        setEditingUser(true);
        setCurrentUser(result);
    };

    const updateUser = (id, updatedUser) => {
        setEditingUser(false);
        setUsers(users.map(user => (user.id === id ? updatedUser : user)));
    };

    const deleteUser = id => {
        setUsers(users.filter(user => user.id !== id));
    };

    const addGroup = group => {
        group.value = ++groupIdCount;
        setGroupIdCount(group.value);
        console.log("app group obj = ", group);
        setGroups([ ...groups, group ]);
    };

    const editGroup = id => {
        console.log("Edit group id = ", id);
        let result = groups.find(group => group.value === id);
        console.log("result = ", result);
        setEditingGroup(true);
        setCurrentGroup(result);
    };

    const updateGroup = (id, updatedGroup) => {
        setEditingGroup(false);
        setGroups(groups.map(group => (group.value === id ? updatedGroup : group)));
    };

    const deleteGroup = id => {
        console.log('id = ', id);
        //console.log("Filter! = ", users.filter(user => user.groups['value'].includes(id)))
        //let mediumFilter = id => users.filter(item => item.groups.value.includes(id));
        console.log("aaa = ", users.map(user => (_.without(user.groups, id))))
        setGroups(groups.filter(group => group.value !== id));
    };

    return (
        <div>
            <h1 className="text-center">Planned App</h1>
            <Tabs id="PageTabs" defaultActiveKey="users">
                <Tab eventKey="users" title="Manage Users">
                    <div className="padding-1">
                        {isEditingUser ?
                            <EditUser
                                currentUser={currentUser}
                                isEditingUser={isEditingUser}
                                setEditingUser={setEditingUser}
                                updateUser={updateUser}
                                groups={groups}
                            /> :
                            <AddUser addUser={addUser} groups={groups}/>
                        }
                    </div>
                    <UserList className="tab-content"
                              users={users}
                              editUser={editUser}
                              deleteUser={deleteUser}
                              isEditingUser={isEditingUser}
                              groups={groups}
                    />
                </Tab>
                <Tab eventKey="groupsList" title="Manage Groups">
                    <div className="padding-1">
                        {isEditingGroup ?
                            <EditGroup
                                currentGroup={currentGroup}
                                isEditingGroup={isEditingGroup}
                                setEditingGroup={setEditingGroup}
                                updateGroup={updateGroup}
                                groups={groups}
                            /> :
                            <AddGroup addGroup={addGroup} groups={groups}/>
                        }
                    </div>
                    <GroupList className="tab-content"
                        groups={groups}
                        editGroup={editGroup}
                        deleteGroup={deleteGroup}
                        users={users}
                    />
                </Tab>
            </Tabs>
        </div>
    )
};

export default App
