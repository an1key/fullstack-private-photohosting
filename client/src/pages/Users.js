import React, {useState, useEffect} from 'react';
import {Button, Container, Alert, DropdownButton, Dropdown} from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchAllUsers, modifyUser} from "../http/userAPI";
import jwt_decode from "jwt-decode";

const Users = observer(() => {
    const [users, setUsers] = useState([]);
    const decoded = jwt_decode(localStorage.token)
    useEffect(() => {
        fetchAllUsers().then(data => setUsers(data.rows))
    }, [])
    console.log(users)
    return (
        <Container className="d-flex flex-column">
            {(decoded.role != "ADMIN")
            ?
                <Alert variant="warning" >
                    <h1 style={{'font-family':"'Montserrat', sans-serif","color":'black'}}>
                        У вас нет доступа к данной странице
                    </h1>
                </Alert>
            :
                 <Container border="1px" className="d-flex flex-column">
                    <Row>
                        <Col xs={1} md={1}>
                            <Alert variant="warning" >
                                    Id
                            </Alert>    
                        </Col>
                        <Col xs={3} md={2}>
                            <Alert variant="warning" >
                                    Nick
                            </Alert>  
                        </Col>
                        <Col xs={5} md={6}>
                            <Alert variant="warning" >
                                    Comment

                            </Alert>                               
                        </Col>
                        <Col xs={1} md={2}>
                             <Alert variant="warning" >
                                    Role
                            </Alert>   
                        </Col>
                    </Row>
                    {users.map(user =>
                        <Row>
                            <Col xs={1} md={1}>{user.id}</Col>
                            <Col xs={3} md={2}>{user.nick}</Col>
                            <Col xs={5} md={6}>{user.comment}</Col>
                            <Col xs={1} md={2}>
                                <DropdownButton
                                    as={'ButtonsGroup'}
                                    key={user.id}
                                    id={`dropdown-button-drop-${user.id}`}
                                    size="sm"
                                    drop="start"
                                    variant="warning"
                                    title={user.role}
                                >
                                    <Dropdown.Item onClick={()=> {modifyUser(user.id, "GUEST").then(()=>window.location.reload())}} eventKey="GUEST">GUEST</Dropdown.Item>
                                    <Dropdown.Item onClick={()=> {modifyUser(user.id, "MEMBER").then(()=>window.location.reload())}} eventKey="MEMBER">MEMBER</Dropdown.Item>
                                    <Dropdown.Item onClick={()=> {modifyUser(user.id, "MODER").then(()=>window.location.reload())}} eventKey="MODER">MODER</Dropdown.Item>
                                    <Dropdown.Item onClick={()=> {modifyUser(user.id, "ADMIN").then(()=>window.location.reload())}} eventKey="ADMIN">ADMIN</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                     )}
                </Container>
            }      

        </Container>
    );
})

export default Users;
