import React, { useState } from 'react'
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const EditGroup= ({currentGroup, setEditingGroup, updateGroup}) => {

    const [group, setGroup] = useState({...currentGroup});
    const [error, setError] = useState(false);

    const onInputChange = event => {
        const {name, value} = event.target;
        console.log("name = ", name, value);
        setGroup({...group, [name]: value})
    };

    return (
        <div>
            {error && <Alert variant="warning">All fields are mandatory!</Alert>}
            <form
                onSubmit={event => {
                    event.preventDefault();
                    if (!group.label) {
                        setError(true);
                        return;
                    }
                    updateGroup(group.value, group);
                    setError(false);
                }}
            >
                <label>Group Name</label>{' '}
                <input type="text" name="label" value={group.label} onChange={onInputChange} />{' '}
                <Button type="submit" variant="outline-primary">Update Group</Button>{' '}
                <Button variant="outline-primary" onClick={() => setEditingGroup(false)}>Cancel</Button>
            </form>
        </div>
    )
};

EditGroup.propTypes = {
    currentGroup: PropTypes.func,
    setEditingGroup: PropTypes.func,
    updateGroup: PropTypes.func,
};

export default EditGroup
