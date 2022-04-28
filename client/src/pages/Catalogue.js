import React, {useContext, useEffect} from 'react';
import {Container, Image, Alert} from "react-bootstrap";
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
import smile from "../public/grust.png"
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
        fetchPhotos((photo.selectedDate === null ? null : photo.selectedDate), photo.page, photo.limit).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)

        })
    }, [photo.page, photo.selectedDate])


    return (
        <Container>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
            </style>
            {(decoded.role == "GUEST")
            ?
                <Alert variant="warning" >
                    <h1 style={{'font-family':"'Montserrat', sans-serif","color":'black'}}>
                        На данный момент ваша заявка на регистрацию находится на рассмотрении. Когда она будет одобрена, вы получите доступ к каталогу фотографий.
                    </h1>
                    <Image class='mt-3' src={smile} style={{padding:'5%',width:'25%'}}>

                    </Image>
                </Alert>
            :
                <Container className={'mt-3'}>
                    <Row>
                        <Col xs={0} md={0} lg={3} xl={2}>
                            <DatesBar/>
                        </Col>
                        <Col xs={12} md={12} lg={9} xl={10}>
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
