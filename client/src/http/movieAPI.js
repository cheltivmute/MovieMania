import { $authHost, $host } from "./index";

export const createGenre = async (Genre_name) => {
    const {data} = await $authHost.post('api/genre', Genre_name)  
    return data
}

export async function deleteGenre(Genre_id, Genre_second_id) {  
    const {data} = await $authHost.delete('api/genre/delete/' + Genre_id + '/' + Genre_second_id)
    return data
}

export const changeGenre = async (genre) => {
    const {data} = await $authHost.put('api/genre/', genre)    
    return data
}

export const fetchGenre = async () => {
    const {data} = await $host.get('api/genre')
    return data
}

export const fetchSecondGenre = async () => {
    const {data} = await $host.get('api/genre/sec')
    return data
}

export const createCountry = async (Country_name) => {
    const {data} = await $authHost.post('api/country', Country_name)    
    return data
}

export async function deleteCountry(Country_id) {  
    const {data} = await $authHost.delete('api/country/delete/' + Country_id)
    return data
}

export const changeCountry = async (country) => {
    const {data} = await $authHost.put('api/country', country)    
    return data
}

export const fetchCountry = async () => {
    const {data} = await $host.get('api/country')
    return data
}

export const createMovie = async (movie) => {
    const {data} = await $authHost.post('api/movie', movie)    
    return data
}

export const deleteMovie = async (Movie_id) => {    
    const {data} = await $authHost.delete('api/movie/delete/' + Movie_id)    
    return data
}

export const fetchMovie = async (Title, Genre_id, Genre_second_id, Country_id, firstDuration, lastDuration, firstBudget, lastBudget, firstYear, lastYear, sortby, ascdesc, page, limit = 4) => {
    const {data} = await $host.get('api/movie', {params : {
        Title, Genre_id, Genre_second_id, Country_id, firstDuration, lastDuration, firstBudget, lastBudget, firstYear, lastYear, sortby, ascdesc, page, limit
    }})
    
    return data
}

export const fetchOneMovie = async (Movie_id) => {
    const {data} = await $host.get('api/movie/id/' + Movie_id)
    return data
}

export const fetchOneGenre = async (Genre_id) => {
    const {data} = await $host.get('api/genre/' + Genre_id)
    return data
}

export const createRating = async (User_id, Movie_id, Rating_value) => {
    const {data} = await $authHost.post('api/rating', {User_id, Movie_id, Rating_value})  
    return data
}

export const changeRating = async (User_id, Movie_id, Rating_value) => {
    const {data} = await $authHost.put('api/rating', {User_id, Movie_id, Rating_value})   
    return data
}

export const deleteRating = async (User_id, Movie_id) => {
    
    const {data} = await $authHost.delete('api/rating/delete/' + User_id + '/' + Movie_id)
    return data
}

export const deleteAllRating = async (Movie_id) => {
    
    const {data} = await $authHost.delete('api/rating/delete/' + Movie_id)
    return data
}

export const checkRating = async (User_id, Movie_id) => {
    
    const {data} = await $authHost.get('api/rating/check/' + User_id + '/' + Movie_id)
    return data
}

export const getAllRating = async (User_id) => {
    
    const {data} = await $authHost.get('api/rating/check/' + User_id)
    return data
}

export const getAvgRating = async (Movie_id) => {
    
    const {data} = await $host.get('api/rating/avg/'+ Movie_id)
    return data
}

export const createReview = async (User_id, Movie_id, Content) => {
    const {data} = await $authHost.post('api/review', {User_id, Movie_id, Content})  
    return data
}

export const changeReview = async (Review_id, Content) => {
    const {data} = await $authHost.put('api/review', {Review_id, Content})   
    return data
}

export const delReview = async (Review_id) => {
    const {data} = await $authHost.delete('api/review/delete/' + Review_id)   
    return data
}

export const delAllReview = async (Movie_id) => {
    const {data} = await $authHost.delete('api/review/deleteAll/' + Movie_id)   
    return data
}

export const fetchReview = async (Movie_id) => {
    const {data} = await $host.get('api/review/check/' + Movie_id)
    return data
}

export const createFolder = async (folder) => {
    const {data} = await $authHost.post('api/folder', folder)    
    return data
}

export const fetchFolder = async (User_id) => {
    const {data} = await $authHost.get('api/folder/check/' + User_id)
    return data
}

export const changeFolder = async (folder) => {
    const {data} = await $authHost.put('api/folder/change/', folder)   
    return data
}

export const delFolder = async (Folder_id) => {
    const {data} = await $authHost.delete('api/folder/delete/' + Folder_id)   
    return data
}

export const createMovieToFolder = async (Folder_id, Movie_id) => {
    const {data} = await $authHost.post('api/folder/movieToFolder/' + Folder_id + '/' + Movie_id)   
    return data
}

export const getOneFolder= async (User_id, Folder_name) => {
    const {data} = await $authHost.get('api/folder/' + User_id + '/' + Folder_name)   
    return data
}

export const getOneFolderId= async (Folder_id) => {
    const {data} = await $authHost.get('api/folder/' + Folder_id)   
    return data
}

export const getMovieToFolder= async (Folder_id) => {
   
    const {data} = await $authHost.get('api/folder/movieToFolder/find/' + Folder_id)   
    return data
}

export const getFolderToMovie= async (Movie_id) => {
   
    const {data} = await $authHost.get('api/folder/movieToFolder/find/folders/' + Movie_id)   
    return data
}

export const getOneMovieToFolder= async (Folder_id, Movie_id) => {
    const {data} = await $authHost.get('api/folder/movieToFolder/' + Folder_id + '/' + Movie_id)   
    return data
}

export const deleteMovieToFolder= async (Folder_id, Movie_id) => {
    const {data} = await $authHost.delete('api/folder/movieToFolder/delete/' + Folder_id + '/' + Movie_id)   
    return data
}

export const deleteAllMovieToFolder= async (Movie_id) => {
    const {data} = await $authHost.delete('api/folder/movieToFolder/delete/' + Movie_id)   
    return data
}

export const deleteAllFolderToMovie= async (Folder_id) => {
    const {data} = await $authHost.delete('api/folder/movieToFolder/delfol/' + Folder_id)
    console.log(data)
    return data
}

export const getOneUser= async (User_id) => {
    const {data} = await $authHost.get('api/account/' + User_id )   
    return data
}

export const getAllUsers= async () => {
    const {data} = await $authHost.get('api/account/')   
    return data
}

export const changeUser = async (user) => {
    const {data} = await $authHost.put('api/account/change/', user)   
    return data
}

export const changeMovie = async (movie) => {
    const {data} = await $authHost.put('api/movie/change/', movie)   
    return data
}

export const changeUserRole = async (User_id, Role) => {
    const {data} = await $authHost.put('api/account/change/role', {User_id, Role})   
    return data
}

export const changeUserIsBlock = async (User_id, Is_blocked) => {
    const {data} = await $authHost.put('api/account/change/isblock', {User_id, Is_blocked})   
    return data
}