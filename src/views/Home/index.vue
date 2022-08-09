<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/toutiao_logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff" @click="$router.push('/search')"/>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <van-tabs v-model="activeId" sticky animated offset-top="1.226667rem">
        <van-tab
          v-for = "item in userChannelList"
          :key="item.id"
          :title="item.name"
          :name="item.id"
        >
          <ArticleList :channelId="activeId"></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="showFn"/>
    </div>
    <van-popup v-model="show" get-container="body">
      <ChannelEdit
        :userChannelList = "userChannelList"
        @addUserChannel ="addChannelFn"
        @removeUserChannel ="removeChannelFn"
        @changeActive="changeActiveFn"
        @endEdit ="show = false"
      >
      </ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, setUserChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      activeId: 0,
      userChannelList: [],
      show: false
    }
  },
  async created () {
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels
  },
  methods: {
    showFn () {
      this.show = true
    },
    addChannelFn (channelObj) {
      this.userChannelList.push(channelObj)
      console.log(this.userChannelList)
      const newArr = this.userChannelList.map((item, index) => {
        const newObj = { ...item }
        delete newObj.name
        newObj.seq = index + 1
        return newObj
      })
      console.log(newArr)
      setUserChannelsAPI(newArr)
    },
    removeChannelFn (channelObj) {
      const index = this.userChannelList.findIndex(item => item.id === channelObj.id)
      this.userChannelList.splice(index, 1)
      console.log(this.userChannelList)
      const newArr = this.userChannelList.map((item, index) => {
        const newObj = { ...item }
        delete newObj.name
        newObj.seq = index + 1
        return newObj
      })
      console.log(newArr)
      setUserChannelsAPI(newArr)
    },
    changeActiveFn (channelObj) {
      this.activeId = channelObj.id
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
  .logo {
    width: 100px;
    height: 30px;
  }
  .main {
    padding-top: 46px;
  }
  .moreChannels {
    position: fixed;
    top: 62px;
    right: 8px;
    z-index: 999;
  }
  /deep/ .van-tabs__wrap {
    padding-right: 30px;
    background-color: #fff;
  }
  .van-popup {
    width: 100vw;
    height: 100vh;
  }
</style>
