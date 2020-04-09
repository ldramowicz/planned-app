import React from 'react'
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const GroupList = ({groups, deleteGroup})  => (
    <Table bordered size="md">
        <thead className="thead-light">
            <tr>
                <th>#</th>
                <th>Group Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        {groups.map((group, index) => (
            <tbody key={index}>
                <tr>
                    <td>{index + 1}</td>
                    <td>{group.name}</td>
                    <td>
                        <Button variant="outline-primary" onClick={() => deleteGroup(group.id)}>Delete</Button>
                    </td>
                </tr>
            </tbody>
        ))}
    </Table>
);

GroupList.propTypes = {
    groups: PropTypes.array,
    onSelectFile: PropTypes.func,
};

export default GroupList
