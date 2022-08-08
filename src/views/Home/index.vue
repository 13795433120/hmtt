<template>
  <div>
    <div>
      <van-nav-bar fixed>
        <template #left>
          <img src="@/assets/toutiao_logo.png" alt="" class="logo">
        </template>
        <template #right>
          <van-icon name="search" size="0.48rem" color="#fff"/>
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
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      activeId: 0,
      userChannelList: []
    }
  },
  async created () {
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels
  }
}
</script>

<style>
  .logo {
    width: 100px;
    height: 30px;
  }
  .main {
    padding-top: 46px;
  }
</style>
