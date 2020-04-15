import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Select from 'react-select';
import map from 'lodash/map';

const AddUser = ({addUser, groups}) => {
    const [selected, setSelected] = React.useState([]);
    const defaultFormInfo = {id: null, groups: [selected], firstName: '', lastName: ''};
    const [user, setUser] = useState(defaultFormInfo);
    const [error, setError] = useState(false);

    const handleChange = event => {
        const {name, value } = event.target;
        console.log("values = ",  value);
        setUser({...user, [name]: value});
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
                    addUser(user);
                    setUser(defaultFormInfo)
                    setSelected([]);
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
                    <Select isMulti options={groups} onChange={handleMultiSelectChange} />
                    {/*<select multiple name="groups" className="form-control" onChange={handleChange} value={groups.name}>
                        {groups.map(element => {
                            return <option value={element.id}>{element.name}</option>;
                        })}
                    </select>*/}
                </div>
                <Button type="submit" variant="outline-primary">Add User</Button>{' '}
                <Button variant="outline-primary" onClick={() => setUser(defaultFormInfo)}>Cancel</Button>
            </form>
        </div>
    )
};

export default AddUser
