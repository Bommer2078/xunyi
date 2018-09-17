// components/books/index.js
import booksModel from '../../model/book'
Component({

    properties: {
        book:Object
    },

    methods: {
        handleBookTap(){
            wx.navigateTo({
                url:`../../pages/book-detail/bookDetail?bookId=${this.properties.book.id}`
            })
        }

    }
})
