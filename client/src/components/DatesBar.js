import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row, Container, Alert} from "react-bootstrap";
import {fetchAllDates} from "../http/photosAPI";
const date = new Date()
const DatesBar = observer(() => {
    console.log('yz dates')
    const {photo} = useContext(Context)
    useEffect(() => {
        fetchAllDates().then(data => {
            photo.setDates(data.rows)
            console.log(data.rows)
        })
    }, [])

    const dates = photo.dates.map(function (item) {
        return [...item.createdAtDate]
    })
    return (
        <Container>
            <Alert className="d-flex ml-3" variant={'warning'} style={{width:'150px'}}>
                Сгруппируйте фото по дате съёмки:
            </Alert>
            <Row className="d-flex ml-2">

                {photo.dates.map(datei =>
                    <Card
                        style={{cursor:'pointer',width:'200px', 'text-align':'center'}}
                        key={datei.createdAtDate}
                        className="p-1 mt-2 ml-2"
                        onClick={() => photo.setSelectedDate(datei.createdAtDate)}
                        border={datei.createdAtDate === photo.selectedDate ? 'primary' : 'gray'}
                    >
                        {datei.createdAtDate}
                    </Card>
                )}
            </Row>
        </Container>
        
    );
});

export default DatesBar;
