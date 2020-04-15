import React, { useState } from 'react'
import './App.css'
import UserList from './components/UserList'
import AddUser from "./components/AddUser"
import EditUser from "./components/EditUser"
import GroupList from './components/GroupList'
import AddGroup from "./components/AddGroup"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const App = () => {
    const usersData = [
        { id: 1, groups: [{value: 1, label: "Favorites"}, { value: 2, label: 'Locations'}], firstName: 'Homer', lastName: 'Simpson' },
        { id: 2, groups: [{ value: 1, label: 'Favorites'}], firstName:  'Maggie', lastName: 'Simpson' },
        { id: 3, groups: [{ value: 2, label: 'Locations'}, { value: 3, label: 'Preferred'}], firstName: 'Bart', lastName: 'Simpson' }
    ];

    const groupsData = [
        { value: 1, label: 'Favorites'},
        { value: 2, label: 'Locations'},
        { value: 3, label: 'Preferred'},
    ];

    const [users, setUsers] = useState(usersData);
    let [userIdCount, setUserIdCount] = useState(usersData.length);
    const [isEditingUser, setEditingUser] = useState(false);

    const [currentUser, setCurrentUser] = useState({id: null, firstName: '', lastName: ''});
    const [groups, setGroups] = useState(groupsData);
    let [groupIdCount, setGroupIdCount] = useState(groupsData.length);

    const addUser = user => {
        user.id = ++userIdCount;
        setUserIdCount(user.id);
        console.log("app user obj = ", user);
        setUsers([ ...users, user ]);
    };

    const editUser = id => {
        console.log("Edit user id = ", id);
        let result = users.filter(user => user.id === id);
        console.log("result = ", result[0]);
        setEditingUser(true);
        setCurrentUser(result[0])
    };

    const updateUser = (id, updatedUser) => {
        setEditingUser(false)
        setUsers(users.map(user => (user.id === id ? updatedUser : user)))
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

    const deleteGroup = id => {
        console.log('id = ', id);
        console.log("Filter! = ", users.filter(user => user.groups.filter(group => group.value !== id)))
        setUsers(users.filter(user => user.groups.filter(group => group.value !== id)));
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
                   {/* <div className="padding-1">
                        <AddUser
                            addUser={addUser}
                            currentUser={currentUser}
                            isEditingUser={isEditingUser}
                            setEditingUser={setEditingUser}
                            updateUser={updateUser}
                        />
                    </div>*/}
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
                        <AddGroup addGroup={addGroup}/>
                    </div>
                    <GroupList className="tab-content" groups={groups} deleteGroup={deleteGroup} users={users} />
                </Tab>
            </Tabs>
        </div>
    )
};

export default App
