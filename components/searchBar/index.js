// components/searchBar/index.js
import bookMolde from '../../model/book'
Component({
  properties: {
      hotList:Array
  },

  data: {
      showSearch:false,
      searchResolveList:[]
  },

  methods: {
      searchTap(){
          this.setData({
              showSearch:!this.data.showSearch
          })
          this.triggerEvent('isSearch',{
              showSearch:this.data.showSearch
        },{})
          console.log(this.properties.hotList)
      },

      handleSearch(event){
          if(!event){
              wx.showToast({
                  text:'请输入书名',
                  icon:'none'
              })
              return
          }
          // const searchWord = event.detail.content||event.detail.value
          const searchWord = event.detail.value
          bookMolde.search(searchWord)
              .then(res=>{
                  console.log(this.data.searchResolveList)
                  this.setData({
                      searchResolveList:res.books
                  })
                  console.log(this.data.searchResolveList)
              })

      }
  }
})
