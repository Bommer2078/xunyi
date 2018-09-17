import {Http} from "../utils/http";

const favor = {
    getFavorItem(){
        const http = new Http()
        return http.request({
            url:'/classic/favor'
        })
    },

    getFavorBookNum(){
        const http = new Http()
        return http.request({
            url:'/book/favor/count'
        })
    }
}

export default favor