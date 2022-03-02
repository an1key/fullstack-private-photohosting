import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";

import CreatePhoto from "../components/modals/CreatePhoto";


const Admin = () => {

    const [photoVisible, setPhotoVisible] = useState(false)

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => setPhotoVisible(true)}
            >
                Добавить фото
            </Button>
            <CreatePhoto show={photoVisible} onHide={() => setPhotoVisible(false)}/>
        </Container>
    );
};

export default Admin;
