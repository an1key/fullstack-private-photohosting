import React, {useState, useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAllUsers} from "../http/userAPI";


const Users = observer(() => {
    const [users, setUsers] = useState();
    useEffect(() => {
        fetchAllUsers().then(data => {
            setUsers(data.rows)
            console.log(users)
        })
    }, [])
    return (
        <Container className="d-flex flex-column">
                <Row>
                    <Col>id</Col>
                    <Col>nick</Col>
                    <Col>comment</Col>
                    <Col>role</Col>
                </Row>
                <Row>{toString(users)}</Row>

            )

            

        </Container>
    );
});

export default Users;
