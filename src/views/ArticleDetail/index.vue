<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{article.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="article.aut_name" :label="formDate(article.pubdate)">
        <template #icon>
          <img :src="article.aut_photo" alt="" class="avatar">
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="article.is_followed" @click="followFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else @click="followFn(false)">关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="article.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="article.attitude === 1" @click="judgeAPI(true)">已点赞</van-button>
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="judgeAPI(false)">点赞</van-button>
      </div>
    </div>
    <CommentList></CommentList>
  </div>
</template>

<script>
import CommentList from './CommentList.vue'
import { getArticleDetailAPI, cancelFollowAPI, followAPI, judgeNocareAPI, judgeCareAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  name: 'ArticleDetail',
  components: {
    CommentList
  },
  data () {
    return {
      article: {}
    }
  },
  async created () {
    const res = await getArticleDetailAPI(this.$route.query.aid)
    console.log(res)
    this.article = res.data.data
  },
  methods: {
    formDate: timeAgo,
    followFn (state) {
      if (state) {
        // 取关
        this.article.is_followed = false
        cancelFollowAPI(this.article.aut_id)
      } else {
        this.article.is_followed = true
        followAPI(this.article.aut_id)
      }
    },
    judgeAPI (state) {
      if (state) {
        this.article.attitude = 0
        judgeNocareAPI(this.article.art_id)
      } else {
        this.article.attitude = 1
        judgeCareAPI(this.article.art_id)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
    /deep/ img{
      width: 100%;
    }
    /deep/ pre {
        white-space: pre-wrap;
        word-wrap: break-word;
    }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
