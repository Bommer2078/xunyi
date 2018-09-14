// components/books/index.js
import booksModel from '../../model/book'
Component({

    properties: {
        book:Object
    },

    data: {
        shortCommentNum:0
    },

    ready() {
        const id = this.properties.book.id
        const promise =  booksModel.getShortComment(id)
        promise.then(res=>{
            this.setData({
                shortCommentNum:res.comments.length
            })
        })
    },

    methods: {
        handleBookTap(){
            wx.navigateTo({
                url:`../../pages/book-detail/bookDetail?bookId=${this.properties.book.id}`
            })
        }

    }
})
