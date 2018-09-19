var arr = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


function random (num){
    var resolve = '';
    for(var i=0;i<num;i++){
        var str = arr[Math.ceil(Math.random()*35)];
        resolve = resolve + str;
    }
    return resolve
}

export {random}