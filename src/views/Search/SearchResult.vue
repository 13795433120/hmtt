<template>
    <div>
      <!-- 搜索结果页-头部导航 -->
      <div class="search-result-container">
        <!-- 点击实现后退效果 -->
        <van-nav-bar
          title="搜索结果"
          left-arrow
          @click-left="$router.go(-1)"
          fixed
        />
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <ArticleItem
          v-for="item in resultList"
          :key="item.art_id"
          :artItem="item"
          :reportShown="false"
          @click.native="getArticleDetail(item)"
        ></ArticleItem>
      </van-list>
    </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  data () {
    return {
      page: 1,
      resultList: [],
      loading: false,
      finished: false
    }
  },
  async created () {
    const res = await getSearchResultAPI({
      page: this.page,
      q: this.$route.params.kw
    })
    console.log(res)
    this.resultList = res.data.data.results
  },
  methods: {
    async onLoad () {
      this.page++
      const res = await getSearchResultAPI({
        page: this.page,
        q: this.$route.params.kw
      })
      console.log(res)
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
      this.resultList = [...this.resultList, ...res.data.data.results]
      this.loading = false
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

<style lang="less" scoped>
  .search-result-container {
    padding-top: 46px;
  }
</style>
