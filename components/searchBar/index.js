// components/searchBar/index.js
import bookMolde from '../../model/book'
import {getStorage,setStorage} from '../../utils/setStorage'
Component({
  properties: {
      hotList:Array
  },

  data: {
      showSearch:false,
      searchResolveList:[],
      inputValue:'',
      showNothing:false,
      history:[]
  },

  ready(){
      let historyData = getStorage('searchHistory')
      this.setData({
          history:historyData
      })
  },

  methods: {
      searchTap(){
          this.setData({
              showSearch:!this.data.showSearch
          })
          this.triggerEvent('isSearch',{
              showSearch:this.data.showSearch
        },{})
          this._restoreSearch()
      },

      handleSearch(event){
          const searchWord = event.detail.content||event.detail.value
          if(!searchWord){
              wx.showToast({
                  title:'请输入书名',
                  icon:'none'
              })
              return
          }

          this.addHistory(searchWord)

          wx.showLoading()

          // const searchWord = event.detail.value
          this._restoreSearch(searchWord)

          bookMolde.search(searchWord)
              .then(res=>{
                  if(res.count == 0){
                      this.showNoFind(true)
                      wx.hideLoading()
                      return
                  }

                  this.setData({
                      searchResolveList:res.books
                  })

                  wx.hideLoading()
              })
      },

      restoreSearch(){
          this._restoreSearch()
      },


      _restoreSearch(inputValue){
          if(!inputValue){
              inputValue = ''
          }
          this.setData({
              searchResolveList:[],
              inputValue:inputValue,
              showNothing:false
          })
      },

      showNoFind(){
          this.setData({
              showNothing:true
          })
      },

      tapTag(event){
          this.handleSearch(event)
      },

      addHistory(searchWord){
          let boolean = this.data.history.some(item=>{
              if(searchWord === item){
                  return true
              }
          })

          if(boolean){
              return
          }


          let arr = this.data.history
          arr.unshift(searchWord)
          this.setData({
              history:arr
          })

          setStorage('searchHistory',arr)

      }
  }


})
