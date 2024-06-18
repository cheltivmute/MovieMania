import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Form } from "react-bootstrap";
import "./css/CountryBar.css"; // Импорт пользовательского CSS файла

const SearchTitleBar = observer(() => {
    
    const { movie } = useContext(Context);
    return (
        <Form className="search-bar">
            <Form.Control
                style={{border: '1px solid black'}}
                type="search"
                placeholder="Search"
                onChange={e => {movie.setSearchTitle(e.target.value);}}
                className="me-2"
                aria-label="Search"
            />
        </Form>
    );
});

export default SearchTitleBar;