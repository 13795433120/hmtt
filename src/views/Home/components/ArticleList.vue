<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="500"
      >
        <ArticleItem
          v-for="item in list"
          :key="item.art_id"
          :artItem="item"
          @dislike="dislikeArticle"
          @report="reportArticle"
          @click.native="getArticleDetail(item)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channelId: {
      type: Number
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      theTime: (new Date()).getTime()
    }
  },
  async created () {
    const res = await getArticleListAPI({
      channel_id: this.channelId,
      timestamp: this.theTime
    })
    console.log(res)
    this.list = res.data.data.results
    this.theTime = res.data.data.pre_timestamp
  },
  methods: {
    async onLoad () {
      const res = await getArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = [...this.list, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp
      this.loading = false
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      }
    },
    async onRefresh () {
      this.list = []
      const res = await getArticleListAPI({
        channel_id: this.channelId,
        timestamp: (new Date()).getTime()
      })
      console.log(res)
      this.list = res.data.data.results
      this.theTime = res.data.data.pre_timestamp
      this.refreshing = false
    },
    async dislikeArticle (id) {
      const res = await dislikeArticleAPI(id)
      console.log(res)
    },
    async reportArticle (id, type) {
      const res = await reportArticleAPI(id, type)
      console.log(res)
    },
    getArticleDetail (articleObj) {
      this.$router.push({
        name: 'ArticleDetail',
        query: {
          aid: articleObj.art_id
        }
      })
    }
  }
}
</script>

<style>

</style>
