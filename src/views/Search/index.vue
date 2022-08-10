<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left" color="white" size="0.48rem" class="goback" @click="$router.back()"/>
      <!-- 搜索组件 -->
      <van-search
        v-model="kw"
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
        @input="getSuggestion"
        @search="acticleSearch"
         />
    </div>
    <div>
      <div class="sugg-list" v-if="kw.length !== 0">
        <div
          v-for="(item,index) in suggestionList"
          :key="index"
          class="sugg-item"
          v-html="change(item,kw)"
          @click="acticleSuggestPick(item)">
        </div>
      </div>
      <div class="search-history" v-else>
      <!-- 标题 -->
        <van-cell title="搜索历史">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="delete" class="search-icon" />
          </template>
        </van-cell>

        <!-- 历史列表 -->
        <div class="history-list">
          <span
            v-for="(item,index) in history"
            :key="index"
            class="history-item"
            @click="$router.push(`/search/${item}`)"
          >{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      timer: null,
      suggestionList: [],
      history: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    getSuggestion () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (this.kw.length !== 0) {
          const res = await getSearchSuggestionAPI(this.kw)
          console.log(res)
          this.suggestionList = res.data.data.options
        }
      }, 500)
    },
    change (content, target) {
      return content.replace(target, `<span style="color:red">${target}</span>`)
    },
    acticleSearch () {
      this.history.push(this.kw)
      const newSet = new Set(this.history)
      const newArr = Array.from(newSet)
      localStorage.setItem('history', JSON.stringify(newArr))
      this.$router.push(`/search/${this.kw}`)
    },
    acticleSuggestPick (str) {
      this.history.push(str)
      const newSet = new Set(this.history)
      const newArr = Array.from(newSet)
      localStorage.setItem('history', JSON.stringify(newArr))
      this.$router.push(`/search/${this.kw}`)
    }
  }
}
</script>
<style scoped lang="less">
  .search-header {
    height: 46px;
    display: flex;
    align-items: center;
    background-color: #007bff;
    overflow: hidden;
    /*后退按钮*/
    .goback {
      padding-left: 14px;
    }
    /*搜索组件*/
    .van-search {
      flex: 1;
    }
  }
  .sugg-list {
    .sugg-item {
      padding: 0 15px;
      border-bottom: 1px solid #f8f8f8;
      font-size: 14px;
      line-height: 50px;
      // 实现省略号的三行代码
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }

  .history-list {
    padding: 0 10px;
    .history-item {
      display: inline-block;
      font-size: 12px;
      padding: 8px 14px;
      background-color: #efefef;
      margin: 10px 8px 0px 8px;
      border-radius: 10px;
    }
  }
</style>
