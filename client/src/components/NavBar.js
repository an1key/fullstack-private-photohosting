import React, {useContext, useState} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, ADD_PHOTO_ROUTE, LOGIN_ROUTE, CATALOGUE_ROUTE} from "../utils/consts";
import {Button, NavDropdown} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import jwt_decode from "jwt-decode";
import CreatePhoto from "../components/modals/CreatePhoto";
import logo from './public/in100gram.png'
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const [photoVisible, setPhotoVisible] = useState(false)
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }
    if(user.isAuth){
        var decoded = jwt_decode(localStorage.token);
    }
    return (
        <Navbar bg="light" variant="dark" sticky="top" expand={'lg'}>
            <Container>
                <Navbar.Brand style={{color:'white'}} href="/api/photos">
                    <Image src={logo} height={42} md={4} sm={3} type="image/png" alt="In100gram">
                    </Image>
                </Navbar.Brand>
               
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {(["MODER", "ADMIN"].includes(decoded.role))
                        ?
                            <Button
                                variant={"outline-dark"}
                                onClick={() => setPhotoVisible(true)}
                                className="mt-1"
                            >
                                Добавить фото
                            </Button>
                        :
                            ""
                        }
                        {(decoded.role == "ADMIN")
                        ?
                            <Button
                                variant={"outline-dark"}
                                onClick={() => history.push(ADMIN_ROUTE)}
                                className="ml-2 mt-1"
                            >
                                Админ панель
                            </Button>
                        :
                            ""

                        }
                        
                        <Button
                            variant={"outline-dark"}
                            onClick={() => logOut()}
                            className="ml-2 mt-1"
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-dark"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
                <CreatePhoto show={photoVisible} onHide={() => setPhotoVisible(false)}/>
            </Container>
        </Navbar>

    );
});

export default NavBar;
