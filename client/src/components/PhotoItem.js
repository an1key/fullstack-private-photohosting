import React from 'react';
import {Card, Col} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import {PHOTO_ROUTE} from "../utils/consts";

const PhotoItem = ({photo}) => {
    const history = useHistory()
    return (
        <Col xs={12} sm={12} md={8} lg={6} xl={4} className={"mt-3"} onClick={() => history.push(PHOTO_ROUTE + '/' + photo.id)}>
            <Card style={{width: "300px", height: "300px", cursor: 'pointer'}}>
                <Image style={{width: "100%", height:"100%", 'object-fit': 'cover'}} thumbnail={true} src={process.env.REACT_APP_API_URL +'thumb/'+ photo.hash + photo.ext}/>

            </Card>
        </Col>
    );
};

export default PhotoItem;
