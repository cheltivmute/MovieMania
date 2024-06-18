import React, { useState } from "react";
import { Image, Button } from "react-bootstrap";
import './css/FolderItem.css'
import { useHistory } from "react-router-dom";
import { FOLDERIN_ROUTE } from "../utils/consts";
import AcceptModal from "./modals/AcceptModal";
import { deleteAllFolderToMovie } from "../http/movieAPI";

const FolderItem = ({
        movie, 
        openChangeFolderModal,
        setFolderName,
        setFolderDescr,
        setFolderCover,
        setFolderId,
        deleteThisFolder,
        openChangeFolderMainModal,
    }) => {
    const history = useHistory();
    const [isHovered, setIsHovered] = useState(false);
    const [showAcceptModal, setAcceptShowModal] = useState(false);

    return (
        <div className="div-main-folder">
            <div className="div-image-folder">
                {isHovered ? (
                    <div className="div-description-folder" onMouseLeave={() => setIsHovered(false)} onClick={() => {history.push(`${FOLDERIN_ROUTE}/${movie.Folder_id}`)}}>
                        {movie.Description}
                    </div>
                ) : (
                    <Image
                        onClick={() => {history.push(`${FOLDERIN_ROUTE}/${movie.Folder_id}`)}}
                        onMouseEnter={() => setIsHovered(true)} 
                        className="img-folder-gang"                     
                        width={200}
                        height={300}
                        objectFit={'cover'}
                        src={"http://klyuchna9:5000/" + movie.Cover}
                    />
                )}
                <div className="div-title-folder" onClick={() => {history.push(`${FOLDERIN_ROUTE}/${movie.Folder_id}`)}} >{movie.Folder_name}</div>
                <div className="div-buttons-folder">
                    {(movie.Folder_name !== 'Избранные' && movie.Folder_name !== 'Просмотренные') ? (
                    <>
                        <Button className="div-button1-folder" variant="outline-dark" onClick={()=>{
                                openChangeFolderModal()
                                setFolderName(movie.Folder_name)
                                setFolderDescr(movie.Description)
                                setFolderCover(movie.Cover)
                                setFolderId(movie.Folder_id)
                            }}>
                            Изменить
                        </Button>
                        
                        <Button className="div-button1-folder" variant="outline-dark" onClick={() => { setAcceptShowModal(true) }}>
                            Удалить
                        </Button>
                    </>
                    ) : (
                    <>
                        <Button className="div-button1-folder " variant="outline-dark" onClick={()=>{
                            openChangeFolderMainModal()
                            setFolderName(movie.Folder_name)
                            setFolderDescr(movie.Description)
                            setFolderCover(movie.Cover)
                            setFolderId(movie.Folder_id)
                        }}>
                            Изменить
                        </Button>
                    </>
                    )}
                </div>
            </div>
            <AcceptModal
                let message={'Вы уверены, что хотите удалить эту папку?'}
                show={showAcceptModal} 
                onHide={(answer) => {
                    if(answer) {
                        deleteThisFolder(movie.Folder_id)
                        
                    } else {              
                    alert('Вы отказались от удаления папки!')

                    }                    
                    setAcceptShowModal(false);                      
                }}
            />
        </div>
        
    );
};

export default FolderItem;