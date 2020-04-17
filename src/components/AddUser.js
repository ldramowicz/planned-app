import React, { useState } from 'react'
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import map from 'lodash/map';

const AddUser = ({addUser, groups}) => {

    const [selected, setSelected] = React.useState([]);
    const defaultFormInfo = {id: null, groups: [], firstName: '', lastName: ''};
    const [user, setUser] = useState(defaultFormInfo);
    const [error, setError] = useState(false);

    const handleChange = event => {
        const {name, value } = event.target;
        console.log("values = ",  value);
        setUser({...user, [name]: value});
    };

    const handleMultiSelectChange = selectedOptions => {
        console.log("selectedOptions = ",  selectedOptions);
        //setUser({...user, 'groups': selectedOptions});
        setUser({...user, 'groups': map(selectedOptions, 'value')});
        console.log("user = ",  user);
        //setSelected(selectedOptions)
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
                    setSelected([]);
                    //setUser(defaultFormInfo)
                    addUser(user);
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
                    <Select isMulti value={[]} options={groups} onChange={handleMultiSelectChange} />
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
