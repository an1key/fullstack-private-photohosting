import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Container from "react-bootstrap/Container";
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import jwt_decode from "jwt-decode"
const AppRouter = observer(() => {
    const {user} = useContext(Context)
    if(localStorage.token){
        var decoded = jwt_decode(localStorage.token)
    }
    console.log(user)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user.isAuth && (decoded.role == "GUEST") && authRoutes.map(({path, Component}) =>
                <Container style={{width:'100%',height:'100%','background-color':'black'}}>
                    <h1 style={{color:'white'}}>
                        У вас нет прав!
                    </h1>
                </Container>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={LOGIN_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;
