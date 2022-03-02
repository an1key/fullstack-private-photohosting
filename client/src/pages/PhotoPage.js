import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";

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
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + photo.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{background: `url() no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
                        >
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                    </Card>
                </Col>
            </Row>
            
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