import React, { useState } from 'react'
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const AddGroup = ({addGroup}) => {

    const defaultFormInfo = {value: null, label: ''};
    const [group, setGroup] = useState(defaultFormInfo);
    const [error, setError] = useState(false);

    const onInputChange = event => {
        const {name, value} = event.target;
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
                    addGroup(group);
                    setGroup(defaultFormInfo);
                    setError(false);
                }}
            >
                <label>Group Name</label>{' '}
                <input type="text" name="label" value={group.label} onChange={onInputChange} />{' '}
                <Button type="submit" variant="outline-primary">Add Group</Button>
            </form>
        </div>
    )
};

AddGroup.propTypes = {
    addGroup: PropTypes.func,
};

export default AddGroup
