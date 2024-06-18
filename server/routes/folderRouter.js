const Router = require('express')
const router = new Router()
const folderController = require('../controllers/folderController')


router.post('/', folderController.create)
router.get('/check/:User_id', folderController.getAll)
router.put('/change/', folderController.change)
router.delete('/delete/:Folder_id', folderController.del)
router.post('/movieToFolder/:Folder_id/:Movie_id', folderController.addMovieToFolder)
router.get('/:User_id/:Folder_name', folderController.getOne)
router.get('/:Folder_id', folderController.getOneId)
router.get('/movieToFolder/find/:Folder_id', folderController.fetchMovieToFolder)
router.get('/movieToFolder/find/folders/:Movie_id', folderController.fetchFolderToMovie)
router.get('/movieToFolder/:Folder_id/:Movie_id', folderController.fetchOneMovieToFolder)
router.delete('/movieToFolder/delete/:Folder_id/:Movie_id', folderController.deleteOneMovieToFolder)
router.delete('/movieToFolder/delete/:Movie_id', folderController.deleteAllMovieToFolder)
router.delete('/movieToFolder/delfol/:Folder_id', folderController.deleteAllFolderToMovie)

module.exports = router