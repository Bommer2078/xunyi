import {Http} from "../utils/http";


function getLikeData(type,index,fn){
    let http = new Http()
    let url = `classic/${type}/${index}/favor`
    http.request({
        url,
        success:(res)=>{
            fn(res)
        }
    })
}


export { getLikeData }