import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Row } from "react-bootstrap"
import FolderItem from "./FolderItem";

const FodlerList = observer(({
        openChangeFolderModal,
        setFolderName,
        setFolderDescr,
        setFolderCover,
        setFolderId,
        deleteThisFolder,
        openChangeFolderMainModal,
    }) => {
    const {movie} = useContext(Context);

    const foldersToRender = Array.isArray(movie.folders) ? movie.folders : [];

    return (
        <Row className="d-flex justify-content-center" style={{}}>
            {foldersToRender.map(folderq =>
                <FolderItem
                    openChangeFolderMainModal={openChangeFolderMainModal}
                    deleteThisFolder={deleteThisFolder}
                    setFolderName={setFolderName}
                    setFolderDescr={setFolderDescr}
                    setFolderCover={setFolderCover}
                    setFolderId={setFolderId}
                    openChangeFolderModal={openChangeFolderModal}
                    key={folderq.Folder_id}
                    movie={folderq}
                />
            )}
        </Row>
    )
});

export default FodlerList;