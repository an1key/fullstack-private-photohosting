import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatesBar from "../components/DatesBar";
import TagsBar from "../components/TagsBar";
import PhotoList from "../components/PhotoList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchPhotos} from "../http/photosAPI";
import Pages from "../components/Pages";
import jwt_decode from "jwt-decode";

const Catalogue = observer(() => {
    const {photo} = useContext(Context)
    const decoded = jwt_decode(localStorage.token)
    useEffect(() => {
        fetchPhotos(null, 1, photo.limit).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)

        })
    }, [])

    useEffect(() => {
        fetchPhotos(photo.selectedDate.id, photo.page, photo.limit).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)

        })
    }, [photo.page, photo.selectedDate])


    return (
        <Container>
            {(decoded.role == "GUEST")
            ?
                <Container style={{width:'100%',height:'100%','background-color':'black'}}>
                    <h1 style={{color:'white'}}>
                        У вас нет прав!
                    </h1>
                </Container>
            :
                <Container>
                    <Row>
                        <Col xs={1} md={2}>

                        </Col>
                        <Col md={10}>
                            <PhotoList/>
                            <Pages/>
                        </Col>
                    </Row>         
                </Container>


            }
        </Container>
        
    );
});

export default Catalogue;
