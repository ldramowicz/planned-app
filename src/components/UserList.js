import React from 'react'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const UserList = ({users, deleteUser})  => (
    <Table striped bordered hover size="sm">
        <tr>
            <th>#</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Actions</th>
        </tr>
        {users.map((user, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>
                    <Button variant="outline-primary" onClick={() => deleteUser(user.id)}>Delete</Button>
                </td>
            </tr>
        ))}
    </Table>
);

UserList.propTypes = {
    users: PropTypes.array,
    onSelectFile: PropTypes.func,
};

export default UserList
