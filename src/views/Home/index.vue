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
      <van-tabs v-model="active" sticky animated offset-top="46px">
        <van-tab
          v-for = "item in userChannelList"
          :key="item.id"
          :title="item.name"
        >
          <ArticleList :list="articleList"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getUserChannelsAPI, getArticleListAPI } from '@/api'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 2,
      userChannelList: [],
      articleList: []
    }
  },
  async created () {
    const res = await getUserChannelsAPI()
    console.log(res)
    this.userChannelList = res.data.data.channels
    const res2 = await getArticleListAPI({
      channel_id: 0,
      timestamp: (new Date()).getTime()
    })
    console.log(res2)
    this.articleList = res2.data.data.results
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
