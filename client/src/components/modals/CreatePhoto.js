import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col, Alert} from "react-bootstrap";
import {Context} from "../../index";
import {createPhoto, fetchPhotos} from "../../http/photosAPI";
import {observer} from "mobx-react-lite";

const CreatePhoto = observer(({show, onHide}) => {
    const {photo} = useContext(Context)
    const [files, setFiles] = useState(null)
    const [isLoading, setLoading] = useState(false);

    const selectFiles = e => {
        setFiles(e.target.files)
    }
    var alert = null;
    const addPhoto = () => {
        var formData = new FormData;
        var img = [];
        for (let i = 0; i < files.length; i++) {
            img[i] = files[i]
            formData.append(`img`, files[i])
        }
        console.log(formData)
        createPhoto(formData).then(data => {
            console.log(data)
            setLoading(false);
            onHide();
            if(data.status == 1111)
            {
                console.log('alert')
                alert = (
                    <Alert variant="success">
                        {data.message}
                        <Button onClick={() => onHide()} variant="outline-success">
                            Close me y'all!
                        </Button>
                    </Alert>
                )
            }
        });
    }


        
      
    useEffect(() => {
        if (isLoading) {
        addPhoto();
        }
    }, [isLoading]);
      
      const handleClick = () => setLoading(true);
      
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
                        accept=".jpg,.jpeg,.png"
                    />
                    <hr/>
                    
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" disabled={isLoading} onClick={!isLoading ? handleClick : null}>{isLoading ? 'Загрузка...' : 'Добавить'}</Button>
                {alert}
            </Modal.Footer>
        </Modal>
    );

    
});

export default CreatePhoto;
