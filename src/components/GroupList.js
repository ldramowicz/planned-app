import React from 'react'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const _ = require('lodash');

const GroupList = ({groups, deleteGroup, editGroup, users})  => {

    const sortedGroups = _.sortBy(groups, ['label']);

    return <Table bordered size="md">
        <thead className="thead-light">
        <tr>
            <th>#</th>
            <th>Group Name</th>
            <th>Users</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            {sortedGroups.map((group, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{group.label}</td>
                    <td>{users.map((user, index) => {
                        return _.includes(user.groups, group.value) ?
                            <div key={index}>{user.lastName + ' ' + user.firstName}</div> : null
                    })}
                    </td>
                    <td>
                        <Button variant="outline-primary" onClick={() => deleteGroup(group.value)}>Delete
                            Group</Button>{' '}
                        <Button variant="outline-primary" onClick={() => editGroup(group.value)}>Edit Group</Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
};

GroupList.propTypes = {
    groups: PropTypes.array,
    deleteGroup: PropTypes.func,
    editGroup: PropTypes.func,
    users: PropTypes.array
};

export default GroupList
