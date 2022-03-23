import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Image, Row} from "react-bootstrap";

import {useParams} from 'react-router-dom'
import {fetchOnePhoto} from "../http/photosAPI";

const PhotoPage = () => {
    const [photo, setPhotos] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOnePhoto(id).then(data => setPhotos(data))
    }, [])

    return (

        <Container className="mt-3">
            {photo ?
            <Row>
                <Col md={8} xs={10}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{border: '5px solid lightgray'}}
                    >
                        <Image style={{width:'100%'}} thumbnail={false} src={process.env.REACT_APP_API_URL + photo.hash + photo.ext}/>
                    </Card>
                </Col>
            </Row>
            : <Alert variant="warning">
                Такого фото нет :(
            </Alert>
            }
            
            
        </Container>
    );
};

export default PhotoPage;


/*
<Row className="d-flex flex-column m-3">
                <h1>Теги</h1>
                {photo.tags.map((tag, index) =>
                    <Row key={tag.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.name}
                    </Row>
                )}
            </Row>   это будут хэштеги фотки
*/