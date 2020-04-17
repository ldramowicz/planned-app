import React, { useState } from 'react'
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Select from 'react-select';

const _ = require('lodash');

const EditUser = ({currentUser, isEditingUser, setEditingUser, updateUser, groups}) => {

    const [user, setUser] = useState({...currentUser});
    const [error, setError] = useState(false);
    const [selected, setSelected] = React.useState(_.pullAllBy(groups, user.groups));

    const onInputChange = event => {
        const {name, value} = event.target;
        console.log("name = ", name, value);
        setUser({...user, [name]: value})
    };

    const handleMultiSelectChange = selectedOptions => {
        console.log("selectedOptions = ",  selectedOptions);
        setUser({...user, 'groups': selectedOptions});
        //setUser({...user, 'groups': map(selectedOptions, 'value')});
        //setSelected(selectedOptions)
    };

    console.log("Edit user", _.pullAllBy(groups, user.groups))

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
                    updateUser(user.id, user);
                    setError(false);
                }}
            >
                <div>
                    <label>First Name</label>{' '}
                    <input type="text" name="firstName" value={user.firstName} onChange={onInputChange} />
                </div>
                <div>
                    <label>Last Name</label>{' '}
                    <input type="text" name="lastName" value={user.lastName} onChange={onInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect2">Select groups this user belongs to</label>
                    <Select isMulti value={selected} options={groups} onChange={handleMultiSelectChange} />
                </div>
                <Button type="submit" variant="outline-primary">Update User</Button>{' '}
                <Button variant="outline-primary" onClick={() => setEditingUser(false)}>Cancel</Button>
            </form>
        </div>
    )
};

EditUser.propTypes = {
    currentUser: PropTypes.object,
    isEditingUser: PropTypes.bool,
    setEditingUser: PropTypes.func,
    updateUser: PropTypes.bool,
    groups: PropTypes.array,
};

export default EditUser
