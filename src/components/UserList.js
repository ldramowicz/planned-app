import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

const _ = require('lodash');

const UserList = ({users, deleteUser, editUser, groups})  => {

    const sortedUsers = _.sortBy(users, ['lastName', 'firstName']);

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
            {sortedUsers.map((user, index) => {
                const userGroups = user.groups;
                return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>{userGroups.map((userGroup, index) => {
                        return <div key={index}>{_.find(groups, {'value':  userGroup}).label}</div>;
                    })}</td>
                    <td>
                        <Button variant="outline-primary" onClick={() => deleteUser(user.id)}>Delete User</Button>{' '}
                        <Button variant="outline-primary" onClick={() => editUser(user.id)}>Edit User</Button>
                    </td>
                </tr>
            })}
        </tbody>
    </Table>
};

UserList.propTypes = {
    users: PropTypes.array,
    deleteUser: PropTypes.func,
    editUser: PropTypes.func,
    groups: PropTypes.array,
};

export default UserList
