import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Select from 'react-select';

const EditUser = ({currentUser, isEditingUser, setEditingUser, updateUser, groups}) => {
    const [user, setUser] = useState({...currentUser});
    const [error, setError] = useState(false);
    const [selected, setSelected] = React.useState([]);

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
                    <Select isMulti defaultValue={user.groups} options={groups} onChange={handleMultiSelectChange} />
                </div>
                <Button type="submit" variant="outline-primary">Update User</Button>{' '}
                <Button variant="outline-primary" onClick={() => setEditingUser(false)}>Cancel</Button>
            </form>
        </div>
    )
};

export default EditUser
