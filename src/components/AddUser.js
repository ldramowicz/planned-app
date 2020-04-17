import React, { useState } from 'react'
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Select from 'react-select';
const _ = require('lodash');

const AddUser = ({addUser, groups}) => {

    const [selected, setSelected] = React.useState([]);
    const defaultFormInfo = {id: null, groups: [], firstName: '', lastName: ''};
    const [user, setUser] = useState(defaultFormInfo);
    const [error, setError] = useState(false);

    const handleChange = event => {
        const {name, value } = event.target;
        setUser({...user, [name]: value});
    };

    const handleMultiSelectChange = selectedOptions => {
        setUser({...user, 'groups': _.map(selectedOptions, 'value')});
        setSelected(selectedOptions)
    };

    return (
        <div>
            {error && <Alert variant="warning">All fields are mandatory!</Alert>}
            <form
                onSubmit={event => {
                    event.preventDefault();
                    if (!user.firstName || !user.lastName || !user.groups) {
                        setError(true);
                        return;
                    }
                    addUser(user);
                    setSelected([])
                    setUser(defaultFormInfo)
                    setError(false);
                }}
            >
                <div>
                    <label>First Name</label>{' '}
                    <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
                </div>
                <div>
                    <label>Last Name</label>{' '}
                    <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Select groups this user belongs to</label>
                    <Select isMulti value={selected} options={_.sortBy(groups, ['label'])} onChange={handleMultiSelectChange} />
                </div>
                <Button type="submit" variant="outline-primary">Add User</Button>{' '}
                <Button variant="outline-primary" onClick={() => setUser(defaultFormInfo)}>Cancel</Button>
            </form>
        </div>
    )
};

AddUser.propTypes = {
    addUser: PropTypes.func,
    groups: PropTypes.array,
};

export default AddUser
