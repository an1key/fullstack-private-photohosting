import {makeAutoObservable} from "mobx";

export default class PhotosStore {
    constructor() {
        this._photos = []
        this._selectedDate = {}
        this._selectedAuthor = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

  
    setPhotos(photos) {
        this._photos = photos
    }

    setSelectedDate(date) {
        this.setPage(1)
        this._selectedDate = date
    }
    setSelectedAuthor(author) {
        this.setPage(1)
        this._selectedAuthor = author
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get dates() {
        return this._photos
    }
    get authors() {
        return this._authors
    }
    get photos() {
        return this._photos
    }
    get selectedDate() {
        return this._selectedDate
    }
    get selectedAuthor() {
        return this._selectedAuthor
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
}
