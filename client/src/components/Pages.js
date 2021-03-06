import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination, Button, ButtonGroup, ToggleButton, Container} from "react-bootstrap";

const Pages = observer(() => {
    const {photo} = useContext(Context)
    const [radioValue, setRadioValue] = useState(`${photo.limit}`);

    const pageCount = Math.ceil(photo.totalCount / photo.limit)
    const pages = []
    console.log(photo.limit)
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }
    const radios = [
        { name: '15', value: '15' },
        { name: '30', value: '30' },
        { name: '50', value: '50' },
      ];
    

    return (
        <Container className="mt-3">
            <div className="mt-2">Показывать на странице по:</div>
            <ButtonGroup className="mb-1">
                    {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={(radioValue === radio.value) ? "secondary" : "outline-secondary"}
                        name="radio"
                        style={{cursor:"pointer"}}

                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => {
                            setRadioValue(e.currentTarget.value);
                            photo.setLimit(radio.value);
                            window.location.reload()
                        }}
                    >
                        {radio.name}
                    </ToggleButton>
                    ))}
            </ButtonGroup>
            <Pagination >
                    {pages.map(page =>
                    <Pagination.Item
                        key={page}
                        active={photo.page === page}
                        onClick={() => photo.setPage(page)}
                    >
                    {page}
            </Pagination.Item>
                )}
            </Pagination>
        </Container>
        
    );
});

export default Pages;
