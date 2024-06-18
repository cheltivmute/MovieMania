import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "..";
import { Card, Row } from "react-bootstrap";
import "./css/CountryBar.css";

const CountryBar = observer(() => {
  const { movie } = useContext(Context);
  const [activeButton, setActiveButton] = useState(null);
  const [eshkere, setEshkere] = useState(null);

  const handleButtonClick = (selectedSort) => {
    movie.setSelectedSort(selectedSort);
    setActiveButton(selectedSort);
  };

  return (
    <Row className="row-main">
      <Card className="country-card">
        Сортировать
      </Card>
      <Card
        className={`country-card ${activeButton === 'Title' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Title')}
      >
        Название
      </Card>
      <Card
        className={`country-card ${activeButton === 'Duration' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Duration')}
      >
        Длительность
      </Card>
      <Card
        className={`country-card ${activeButton === 'Budget' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Budget')}
      >
        Бюджет
      </Card>
      <Card
        className={`country-card ${activeButton === 'Release_date' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Release_date')}
      >
        Дата выхода
      </Card>
      <Card
        className={`country-card`}
        onClick={() => {
          if (eshkere) {
            movie.setSelectedAscDesc('ASC');
            setEshkere(null);
          } else {
            movie.setSelectedAscDesc('DESC');
            setEshkere(1);
          }
        }}
      >
        {(eshkere) ? (
          <>↓</>
        ) : (
          <>↑</>
        )}
      </Card>
    </Row>
  );
});

export default CountryBar;