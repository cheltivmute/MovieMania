import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { ListGroup, Form } from "react-bootstrap";
import { getOneMovieToFolder } from "../http/movieAPI";


const FolderBar = observer(({ goFromFolder, goToFolder, actveFolders }) => {
  const { movie } = useContext(Context);

  const foldersToRender = Array.isArray(movie.folders) ? movie.folders : [];

  const [hoveredFolder, setHoveredFolder] = useState(null);

  // Создаем массив состояний для чекбоксов
  const [checkboxStates, setCheckboxStates] = useState(
    foldersToRender.map((folder) => actveFolders.includes(folder.Folder_id))
  );

  useEffect(() => {
    // Обновляем состояние чекбоксов при изменении списка активных папок
    setCheckboxStates(
      foldersToRender.map((folder) => actveFolders.includes(folder.Folder_id))
    );
  }, [actveFolders, foldersToRender]);

  const handleMouseEnter = (folderId) => {
    setHoveredFolder(folderId);
  };

  const handleMouseLeave = () => {
    setHoveredFolder(null);
  };

  const handleCheckboxChange = (folderId) => {
    const updatedStates = checkboxStates.map((state, index) =>
      index === folderId ? !state : state
    );
    setCheckboxStates(updatedStates);

    if (actveFolders.includes(folderId)) {
      goFromFolder(folderId);
    } else {
      goToFolder(folderId);
    }
  };

  return (
    <ListGroup>
      {foldersToRender.map((folder, index) => (
        <ListGroup.Item
          style={{
  
            backgroundColor:
              hoveredFolder === folder.Folder_id ? "#e2e2e2" : "transparent",
          }}
          key={folder.Genre_id}
          onMouseEnter={() => handleMouseEnter(folder.Folder_id)}
          onMouseLeave={handleMouseLeave}
        >
          <Form.Check 
            checked={checkboxStates[index]}
            type="checkbox"
            id={`check-${folder.Folder_id}`}
            label={folder.Folder_name}
            onChange={() => handleCheckboxChange(folder.Folder_id)}
          />
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default FolderBar;



            //padding: '0px',   


            //className="checkbox-movie-item"
            //style={{
             // cursor: "pointer",
             // width: '200px',
             // height: '40px',
             // display: 'flex',
             // alignItems: 'center',
            //}}   