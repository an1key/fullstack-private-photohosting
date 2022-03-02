import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createPhoto, fetchPhotos} from "../../http/photosAPI";
import {observer} from "mobx-react-lite";

const CreatePhoto = observer(({show, onHide}) => {
    const {photo} = useContext(Context)
    const [files, setFiles] = useState(null)


    const selectFiles = e => {
        setFiles(e.target.files)
    }

    const addPhoto = () => {
        var formData = new FormData;
        var img = [];
        for (let i = 0; i < files.length; i++) {
            img[i] = files[i]
            formData.append(`img`, files[i])
        }
        console.log(formData)
        createPhoto(formData).then(data => onHide())
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить фото
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        multiple
                        onChange={selectFiles}
                    />
                    <hr/>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPhoto}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreatePhoto;
