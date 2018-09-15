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
        isInput:false
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

    inputTap(data){
        this.setData({
            isInput:data.detail.isInput
        })
    },

    setBooksData(options){
        const bookId = options.bookId
        const bookInfo = bookMolde.getBooksDetail(bookId)
        const favor = bookMolde.getBooksFavor(bookId)
        const shortComment = bookMolde.getShortComment(bookId)

        bookInfo.then(res=>{
            this.setData({
                bookInfo:res
            })
            console.log(res)
        })
        favor.then(res=>{
            this.setData({
                favor:res
            })
            console.log(res)
        })
        shortComment.then(res=>{
            this.setData({
                shortComment:res.comments
            })
            console.log(res)
        })
    },

    changeIsInput() {
        this.setData({
            isInput:false
        })
    },

    handleTapEnter(){
        this.changeIsInput()
    },

    handleTapTag(){
        this.changeIsInput()
    },

    handleTapInput(){
        this.setData({
            isInput:true
        })
    }


})