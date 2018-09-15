// pages/book-detail/bookDetail.js
import bookMolde from '../../model/book'
import {handleLikeClick} from "../../model/likeModel";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookInfo:{},
        favor:{},
        shortComment:[],
        isInput:false,
        inputContent:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setBooksData(options)
    },

    like(data){
        handleLikeClick({
            data,
            art_id:this.data.bookInfo.id,
            type:400
        })
    },

    setBooksData(options){
        wx.showLoading()
        const bookId = options.bookId
        const bookInfo = bookMolde.getBooksDetail(bookId)
        const favor = bookMolde.getBooksFavor(bookId)
        const shortComment = bookMolde.getShortComment(bookId)

        Promise.all([bookInfo,favor,shortComment])
            .then(res=>{
                console.log(res)
                this.setData({
                    bookInfo:res[0],
                    favor:res[1],
                    shortComment:res[2].comments
                })
                wx.hideLoading()
            })
    },

    changeIsInput() {
        this.setData({
            isInput:false,
            inputContent:''
        })
    },


// 添加短评
    handleTap(ev){
        const content = ev.detail.content||ev.detail.value
        if(content.length > 12){
            wx.showToast({
                title:'超过字数，请重新输入',
                icon:'none'
            })
            this.changeIsInput()
            return
        }
        this.addToShortComment(content)
        this.postComment(this.data.bookInfo.id,content)
        this.changeIsInput()
    },

    handleTapFake(){
        this.setData({
            isInput:true
        })
    },

    postComment(id,content){
        let promise = bookMolde.addComment({
            book_id:id,
            content
        })
        promise.then(res=>{
            wx.showToast({
                title:'评论已增加',
                icon:'success'
            })
        })
    },

    addToShortComment(content){
        let arr = this.data.shortComment
        arr.unshift({
            content,
            nums:1
        })
        this.setData({
            shortComment:arr
        })
    }

})