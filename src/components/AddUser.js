import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const AddUser = ({addUser, currentUser, isEditingUser, setEditingUser}) => {
    const defaultFormInfo = {currentUser};
    const [user, setUser] = useState(currentUser);
    const [error, setError] = useState(false);

    const onInputChange = event => {
        const {name, value} = event.target;
        console.log("name = ", name, value);
        setUser({...user, [name]: value})
    };

    console.log("isEditingUser = ", isEditingUser);
    console.log("currentUser = ", currentUser);

    return (
        <div>
            {error && <Alert variant="warning">All fields are mandatory!</Alert>}
            <form
                onSubmit={event => {
                    event.preventDefault();
                    if (!user.firstName || !user.lastName) {
                        setError(true);
                        return;
                    }
                    console.log("asdasdasd");
                    addUser(user);
                    setUser(defaultFormInfo)
                    setError(false);
                }}
            >
                <label>First Name</label>{' '}
                <input type="text" name="firstName" value={user.firstName} onChange={onInputChange} />{' '}
                <label>Last Name</label>{' '}
                <input type="text" name="lastName" value={user.lastName} onChange={onInputChange} />{' '}
                {isEditingUser ?
                    <>
                        <Button type="submit" variant="outline-primary">Update User</Button>{' '}
                        <Button variant="outline-primary" onClick={() => setEditingUser(false)}>Cancel</Button>
                    </> :
                    <Button type="submit" variant="outline-primary">Add User</Button>}
            </form>
        </div>
    )
};

export default AddUser
