import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const TagsBar = observer(() => {
    const {photo} = useContext(Context)

    return (
        <Row className="d-flex">
            {photo.dates.map(date =>
                <Card
                    style={{cursor:'pointer'}}
                    key={date.id}
                    className="p-3"
                    onClick={() => photo.setSelectedDate(date)}
                    border={date.id === photo.selectedDate.id ? 'danger' : 'light'}
                >
                </Card>
            )}
        </Row>
    );
});

export default TagsBar;
