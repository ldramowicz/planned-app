import React from 'react'
import PropTypes from 'prop-types'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import sortBy from 'lodash/sortBy';

const UserList = ({users, deleteUser, editUser, isEditingUser, groups})  => {
    console.log("user.groups = ", users)
/*    let groupIDs = groups.map(element => element.id);
    console.log("groupIDs = " + groupIDs);*/
    //console.log("get lodash = ", get(groups[0], 'id'))


    return <Table bordered size="md">
        <thead className="thead-light">
        <tr>
            <th>#</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Groups</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user, index) => {
            const userGroups = user.groups
            return (<tr key={index}>
                <td>{index + 1}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{userGroups.map(userGroup => {
                    return <div>{groups.find(group => userGroup.value === group.value).label}</div>;
                })}</td>

{/*                <td>{groups.map(element => {
                    return <div>{element.name}</div>;
                })}</td>*/}
                {/*<td>{get(groups[0], 'id')}/td>*/}
                <td>
                    <Button variant="outline-primary" onClick={() => deleteUser(user.id)}>Delete User</Button>{' '}
                    <Button variant="outline-primary" onClick={() => editUser(user.id)}>Edit User</Button>
                </td>
            </tr>)
        })}
        </tbody>
    </Table>
};

UserList.propTypes = {
    users: PropTypes.array,
    onSelectFile: PropTypes.func,
};

export default UserList
