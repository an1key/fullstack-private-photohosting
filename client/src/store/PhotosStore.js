import {makeAutoObservable} from "mobx";

export default class PhotosStore {
    constructor() {
        this._photos = []
        this._selectedDate = null
        this._selectedAuthor = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        this._dates = []
        makeAutoObservable(this)
    }

  
    setPhotos(photos) {
        this._photos = photos
    }
    setDates(dates) {
        this._dates = dates;
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
        window.scrollTo(0,0)
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setLimit(limit) {
        this.setPage(1)
        this._limit = limit
        localStorage.limit = limit
    }

    get dates() {
        return this._dates
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
        return localStorage.limit
    }
}
