import React, { useState } from 'react'
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import includes from 'lodash/includes'

const _ = require('lodash');


const EditUser = ({currentUser, setEditingUser, updateUser, groups}) => {

    const [user, setUser] = useState({...currentUser});
    const [error, setError] = useState(false);
    const [selected, setSelected] = React.useState(user.groups);

    const onInputChange = event => {
        const {name, value} = event.target;
        console.log("name = ", name, value);
        setUser({...user, [name]: value})
    };

    const handleMultiSelectChange = selectedOptions => {
        console.log("selectedOptions = ",  selectedOptions);
        //setUser({...user, 'groups': selectedOptions});
        setUser({...user, 'groups': _.map(selectedOptions, 'value')});
        setSelected(selectedOptions)
    };

/*    for (let i in groups) {
        console.log("loop", groups[i].value, user.groups[i])
        if (user.groups[i].includes(groups[i].value)) {
            console.log(groups[i]); // {a: 5, b: 6}
        }
    };*/

    const filtered = groups.filter(group => {
        return _.includes(user.groups, group.value);
    })

    console.log("filtered = ", filtered)

/*    const userGroups = user.groups
    userGroups.map((userGroup, index) => {
        console.log(groups.filter(group => group.value === userGroup))
    })*/
/*    console.log("Edit user", groups.map(group => (_.includes(user.groups, group.value) ? setSelected(...selected, group) : setSelected(selected))))*/

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
                    <Select isMulti value={filtered} options={groups} onChange={handleMultiSelectChange} />
                </div>
                <Button type="submit" variant="outline-primary">Update User</Button>{' '}
                <Button variant="outline-primary" onClick={() => setEditingUser(false)}>Cancel</Button>
            </form>
        </div>
    )
};

EditUser.propTypes = {
    currentUser: PropTypes.object,
    setEditingUser: PropTypes.func,
    updateUser: PropTypes.bool,
    groups: PropTypes.array,
};

export default EditUser
