import { makeAutoObservable } from 'mobx';

export default class UserLib {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        this._userID = null
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool 
    }
    setIsAdmin(bool) {
        this._isAdmin = bool 
    }
    setUser(user) {
        this._user = user
    }
    setUserID(userID) {
        this._userID = userID
    }

    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }
    get userID() {
        return this._userID
    }
}