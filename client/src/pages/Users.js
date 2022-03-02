import React, {useState, useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAllUsers} from "../http/userAPI";


const Users = observer(() => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        fetchAllUsers(null, 1, 2).then(data => {
            setUsers(data)
            console.log(`data:\n ${data}`)
        })
    }, [])
    console.log(users);
    return (
        <Container className="d-flex flex-column">
            {users.rows.map(row =>
                <Row className="d-flex">`${row}`</Row>    
            )}
            

        </Container>
    );
});

export default Users;
