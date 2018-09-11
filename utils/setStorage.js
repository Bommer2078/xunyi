

function getStorage (index){
    let storageData = wx.getStorageSync('classic'+ index)
    if(!storageData){
        return false
    }
    else{
        return storageData
    }
}

function setStorage (index,data){
    wx.setStorageSync('classic' + index , data)
}

export {setStorage ,getStorage}