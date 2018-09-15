import {Http} from "../utils/http";

const bookMolde = {
    getBooksData(){
        const http = new Http()
        return http.request({
            url:'/book/hot_list'
        })
    },

    getShortComment(id){
        const http = new Http()
        return http.request({
            url:`/book/${id}/short_comment`
        })
    },

    getBooksDetail(id){
        const http = new Http()
        return http.request({
            url:`/book/${id}/detail`
        })
    },

    getBooksFavor(id){
        const http = new Http()
        return http.request({
            url:`/book/${id}/favor`
        })
    },
}

export default bookMolde