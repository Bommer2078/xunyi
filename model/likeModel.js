import {Http} from "../utils/http";


function getLikeData(type,index,fn){
    let http = new Http()
    let url = `classic/${type}/${index}/favor`
    let promise = http.request({url})
    promise.then((res)=>fn(res))
}


export { getLikeData }