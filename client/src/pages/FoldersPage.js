import React, { useContext, useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import FolderList from "../components/FolderList";
import CreateFolder from '../components/modals/CreateFolder'
import ChangeFolder from '../components/modals/ChangeFolder'
import { delFolder, fetchFolder, deleteAllFolderToMovie } from '../http/movieAPI'
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import ChangeFolderMain from "../components/modals/ChangeFolderMain";
//import ChangeGenre from '../components/modals/ChangeGenre'
//import DeleteGenre from '../components/modals/DeleteGenre'

const FoldersPage = observer(() => {
  const [createFolderVisible, setCreateFolderVisible] = useState(false)
  const [changeFolderVisible, setChangeFolderVisible] = useState(false)
  const [changeFolderMainVisible, setChangeFolderMainVisible] = useState(false)
  //const [deleteGenreVisible, setDeleteGenreVisible] = useState(false)
  
  const {movie} = useContext(Context)
  const {user} = useContext(Context)

  const [folderName, setFolderName] = useState('');
  const [folderDescr, setFolderDescr] = useState('');
  const [folderCover, setFolderCover] = useState(null);
  const [folderId, setFolderId] = useState(null);

  const openChangeFolderModal = () => {
    setChangeFolderVisible(true);
  };

  const openChangeFolderMainModal = () => {
    setChangeFolderMainVisible(true);
  };

  const deleteThisFolder = (folId) => {
    
      delFolder(folId).then(() => {
        fetchFolder(user.userID).then(data => {
          alert('Вы успешно удалил папку!')
          movie.setFolders(data.rows)
        })  
      })     
  }

  useEffect( () => {
    fetchFolder(user.userID).then(data => {
      movie.setFolders(data.rows)
    })    
  }, [movie, user])

  return (
    <Container className="d-flex flex-column">
      
      <Button 
        variant={'outline-dark'}
        className="mt-2"
        onClick={() => setCreateFolderVisible(true)}
      >
        Добавить папку
      </Button>

      <FolderList
        openChangeFolderModal={openChangeFolderModal}
        openChangeFolderMainModal={openChangeFolderMainModal}
        setFolderName={setFolderName}
        setFolderDescr={setFolderDescr}
        setFolderCover={setFolderCover}
        setFolderId={setFolderId}
        deleteThisFolder={deleteThisFolder}
      />

      <CreateFolder show={createFolderVisible} onHide={() => {
        setCreateFolderVisible(false)
        fetchFolder(user.userID).then(data => {
          movie.setFolders(data.rows)
        })  
      }}/>
      <ChangeFolder
        show={changeFolderVisible}
        folderName={folderName}
        folderDescr={folderDescr}
        folderCover={folderCover}
        folderId={folderId}
        setFolderName={setFolderName}
        setFolderDescr={setFolderDescr}
        setFolderCover={setFolderCover}
        setFolderId={setFolderId}
        onHide={() => {
          setChangeFolderVisible(false)
          fetchFolder(user.userID).then(data => {
            movie.setFolders(data.rows)
          })  
        }}/>

        <ChangeFolderMain
          show={changeFolderMainVisible}
          folderName={folderName}
          folderDescr={folderDescr}
          folderCover={folderCover}
          folderId={folderId}
          setFolderName={setFolderName}
          setFolderDescr={setFolderDescr}
          setFolderCover={setFolderCover}
          setFolderId={setFolderId}
          onHide={() => {
            setChangeFolderMainVisible(false)
            fetchFolder(user.userID).then(data => {
              movie.setFolders(data.rows)
            })  
          }}/>        
    </Container>

  )
});

export default FoldersPage;

