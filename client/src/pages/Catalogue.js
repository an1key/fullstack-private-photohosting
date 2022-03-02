import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatesBar from "../components/DatesBar";
import PhotoList from "../components/PhotoList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchPhotos} from "../http/photosAPI";
import Pages from "../components/Pages";

const Catalogue = observer(() => {
    const {photo} = useContext(Context)

    useEffect(() => {
        fetchPhotos(null, 1, 2).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchPhotos(photo.selectedDate.id, photo.page, 2).then(data => {
            photo.setPhotos(data.rows)
            photo.setTotalCount(data.count)
        })
    }, [photo.page, photo.selectedDate])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <DatesBar/>
                </Col>
                <Col md={9}>
                    <PhotoList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Catalogue;
