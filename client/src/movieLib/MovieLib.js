import { makeAutoObservable } from 'mobx';

export default class MovieLib {
    constructor() {
        this._genres = []
        this._secondGenres = []
        this._countries = []
        this._movies = []
        this._accMovies = []
        this._newMovies = []
        this._sameMovies = []
        this._pickMovies = []
        this._reviews = []
        this._folders = []
        this._movieFolders = []
        this._actorMovies = []
        this._movieActors = []
        this._users = []
        this._selectedGenre = {}
        this._selectedFakeGenre = {}
        this._selectedSecondGenre = {}
        this._selectedFakeSecondGenre = {}
        this._selectedCountry = {}
        this._selectedFakeCountry = {}
        this._selectedFirstDuration = {}
        this._selectedLastDuration = {}
        this._selectedFirstBudget = {}
        this._selectedLasttBudget = {}
        this._selectedFirstYear = {}
        this._selectedLastYear = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 10
        this._searchTitle = null
        this._searchDuration = null
        this._searchBudget = null
        this._searchYear = null
        this._selectedSort = null
        this._selectedAscDesc = null

        makeAutoObservable(this)
    }

    setGenres(genres) {
        this._genres = genres 
    }
    setSelectedSort(sort) {
        this._selectedSort = sort 
    }
    setSelectedAscDesc(ascdesc) {
        this._selectedAscDesc = ascdesc 
    }
    setSecondGenres(secondGenres) {
        this._secondGenres = secondGenres 
    }
    setCountries(countries) {
        this._countries = countries
    }
    setMovies(movies) {
        this._movies = movies
    }
    setAccMovies(accMovies) {
        this._accMovies = accMovies
    }
    setNewMovies(newMovies) {
        this._newMovies = newMovies
    }
    setSameMovies(sameMovies) {
        this._sameMovies = sameMovies
    }
    setPickMovies(pickMovies) {
        this._pickMovies = pickMovies
    }
    setSelectedGenre(genre) {
        this.setPage(1)
        this._selectedGenre = genre
    }
    setSelectedFakeGenre(genre) {
        this.setPage(1)
        this._selectedFakeGenre = genre
    }
    setSelectedSecondGenre(secondGenre) {
        this.setPage(1)
        this._selectedSecondGenre = secondGenre
    }
    setSelectedFakeSecondGenre(fakeSecondGenre) {
        this.setPage(1)
        this._selectedFakeSecondGenre = fakeSecondGenre
    }
    setSelectedCountry(country) {
        this.setPage(1)
        this._selectedCountry = country
    }
    setSelectedFakeCountry(country) {
        this.setPage(1)
        this._selectedFakeCountry = country
    }
    setSelectedFirstDuration(dur) {
        this.setPage(1)
        this._selectedFirstDuration = dur
    }
    setSelectedLastDuration(dur) {
        this.setPage(1)
        this._selectedLastDuration = dur
    }
    setSelectedFirstBudget(budget) {
        this.setPage(1)
        this._selectedFirstBudget = budget
    }
    setSelectedLastBudget(budget) {
        this.setPage(1)
        this._selectedLastBudget = budget
    }
    setSelectedFirstYear(year) {
        this.setPage(1)
        this._selectedFirstYear = year
    }
    setSelectedLastYear(year) {
        this.setPage(1)
        this._selectedLastYear = year
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setSearchTitle(title) {
        this.setPage(1)
        this._searchTitle = title
    }
    setSearchDuration(duration) {
        this.setPage(1)
        this._searchDuration = duration
    }
    setSearchBudget(budget) {
        this.setPage(1)
        this._searchBudget = budget
    }
    setSearchYear(year) {
        this.setPage(1)
        this._searchYear = year
    }
    setReviews(reviews) {
        this._reviews = reviews
    }    
    setFolders(folders) {
        this._folders = folders
    }
    setMovieFolders(movieFolders) {
        this._movieFolders = movieFolders
    }
    setActorMovies(actorMovies) {
        this._actorMovies = actorMovies
    }
    setMovieActors(movieActors) {
        this._movieActors = movieActors
    }
    setUsers(users) {
        this._users = users
    }

    get genres() {
        return this._genres
    }
    get selectedSort() {
        return this._selectedSort
    }
    get selectedAscDesc() {
        return this._selectedAscDesc
    }
    get secondGenres() {
        return this._secondGenres
    }
    get countries() {
        return this._countries
    }
    get movies() {
        return this._movies
    }
    get accMovies() {
        return this._accMovies
    }
    get newMovies() {
        return this._newMovies
    }
    get sameMovies() {
        return this._sameMovies
    }
    get pickMovies() {
        return this._pickMovies
    }
    get selectedGenre() {
        return this._selectedGenre
    }
    get selectedFakeGenre() {
        return this._selectedFakeGenre
    }
    get selectedSecondGenre() {
        return this._selectedSecondGenre
    }
    get selectedFakeSecondGenre() {
        return this._selectedFakeSecondGenre
    }
    get selectedCountry() {
        return this._selectedCountry
    }
    get selectedFirstDuration() {
        return this._selectedFirstDuration
    }
    get selectedLastDuration() {
        return this._selectedLastDuration
    }
    get selectedFirstBudget() {
        return this._selectedFirstBudget
    }
    get selectedLastBudget() {
        return this._selectedLastBudget
    }
    get selectedFirstYear() {
        return this._selectedFirstYear
    }
    get selectedLastYear() {
        return this._selectedLastYear
    }
    get selectedFakeCountry() {
        return this._selectedFakeCountry
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get searchTitle() {
        return this._searchTitle
    }
    get searchDuration() {
        return this._searchDuration
    }
    get searchBudget() {
        return this._searchBudget
    }
    get searchYear() {
        return this._searchYear
    }
    get reviews() {
        return this._reviews
    }
    get folders() {
        return this._folders
    }
    get movieFolders() {
        return this._movieFolders
    }
    get actorMovies() {
        return this._actorMovies
    }
    get movieActors() {
        return this._movieActors
    }
    get users() {
        return this._users
    }
}
