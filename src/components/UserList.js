import React from 'react'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const UserList = ({users, deleteUser, editUser, isEditingUser})  => (
    <Table bordered size="md">
            <thead className="thead-light">
            <tr>
                <th>#</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user, index) => (
                <tr key={index} isEditingUser>
                    <td>{index + 1}</td>
                    <td>{user.lastName}</td>
                    <td>{user.firstName}</td>
                    <td>
                        <Button variant="outline-primary" onClick={() => deleteUser(user.id)}>Delete</Button>{' '}
                        <Button variant="outline-primary" onClick={() => editUser(user.id)}>Edit</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

UserList.propTypes = {
    users: PropTypes.array,
    onSelectFile: PropTypes.func,
};

export default UserList
