<template>
  <div>

    <!-- 评论列表 -->
      <div class="cmt-list" :class="isShowInput? 'art-cmt-container-2':'art-cmt-container-1'">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <!-- 评论的 Item 项 -->
          <div class="cmt-item" v-for="comment in commentList" :key="comment.com_id">
            <!-- 头部区域 -->
            <div class="cmt-header">
              <!-- 头部左侧 -->
              <div class="cmt-header-left">
                <img :src="comment.aut_photo" alt="" class="avatar">
                <span class="uname">{{comment.aut_name}}</span>
              </div>
              <!-- 头部右侧 -->
              <div class="cmt-header-right">
                <van-icon name="like" size="16" color="red" v-if="comment.is_liking" @click="commentClickFn(true,comment)"/>
                <van-icon name="like-o" size="16" color="gray" v-else @click="commentClickFn(false,comment)"/>
              </div>
            </div>
            <!-- 主体区域 -->
            <div class="cmt-body">
              {{comment.content}}
            </div>
            <!-- 尾部区域 -->
            <div class="cmt-footer">{{formDate(comment.pubdate)}}</div>
          </div>
        </van-list>
      </div>
    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top" v-if="isShowInput === false">
        <van-icon name="arrow-left" size="0.48rem" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="isShowInput= true">发表评论</div>
        <div class="icon-box">
            <van-badge :content="totalCount" max="99">
                <van-icon name="comment-o" size="0.53333334rem" />
            </van-badge>
            <van-icon name="star-o" size="0.53333334rem" />
            <van-icon name="share-o" size="0.53333334rem" />
        </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top" v-else>
        <textarea placeholder="友善评论、理性发言、阳光心灵" v-model.trim="commentContent" @blur="isShowInput = false"></textarea>
        <van-button type="default" :disabled="commentContent === ''" @click="addComment">发布</van-button>
    </div>
  </div>
</template>

<script>
import { getCommentsAPI, commentLikeAPI, commentDislikeAPI, addContentAPI } from '@/api'
import { timeAgo } from '@/utils/date'
export default {
  name: 'CommentList',
  data () {
    return {
      commentList: [],
      isShowInput: false,
      totalCount: '',
      commentContent: '',
      loading: false,
      finished: false,
      lastId: ''
    }
  },
  async created () {
    const res = await getCommentsAPI({
      type: 'a',
      source: this.$route.query.aid
    })
    console.log(res)
    if (res.data.data.results.length === 0) {
      this.finished = true
      return
    }
    this.commentList = res.data.data.results
    this.totalCount = res.data.data.total_count || ''
    this.lastId = res.data.data.last_id
  },
  methods: {
    formDate: timeAgo,
    commentClickFn (state, commentObj) {
      if (state) {
        commentObj.is_liking = false
        commentDislikeAPI(commentObj.com_id)
      } else {
        commentObj.is_liking = true
        commentLikeAPI(commentObj.com_id)
      }
    },
    async addComment () {
      const res = await addContentAPI({
        target: this.$route.query.aid,
        content: this.commentContent
      })
      console.log(res)
      this.commentList.unshift(res.data.data.new_obj)
      this.isShowInput = false
      this.commentContent = ''
      this.totalCount++
    },
    async onLoad () {
      if (this.commentList.length > 0) {
        const res = await getCommentsAPI({
          type: 'a',
          source: this.$route.query.aid,
          offset: this.lastId
        })
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.commentList = [...this.commentList, ...res.data.data.results]
        this.lastId = res.data.data.last_id
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  .cmt-list {
    padding: 10px;
    .cmt-item {
      padding: 15px 0;
      + .cmt-item {
        border-top: 1px solid #f8f8f8;
      }
      .cmt-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cmt-header-left {
          display: flex;
          align-items: center;
          .avatar {
            width: 40px;
            height: 40px;
            background-color: #f8f8f8;
            border-radius: 50%;
            margin-right: 15px;
          }
          .uname {
            font-size: 12px;
          }
        }
      }
      .cmt-body {
        font-size: 14px;
        line-height: 28px;
        text-indent: 2em;
        margin-top: 6px;
        word-break: break-all;
      }
      .cmt-footer {
        font-size: 12px;
        color: gray;
        margin-top: 10px;
      }
    }
  }
  /*美化 - 文章详情 - 底部的评论页面 */
  // 外层容器
  .art-cmt-container-1 {
    padding-bottom: 46px;
  }
  .art-cmt-container-2 {
    padding-bottom: 80px;
  }

  // 发布评论的盒子 - 1
  .add-cmt-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 46px;
    line-height: 46px;
    padding-left: 10px;
    .ipt-cmt-div {
      flex: 1;
      border: 1px solid #efefef;
      border-radius: 15px;
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      padding-left: 15px;
      margin-left: 10px;
      background-color: #f8f8f8;
    }
    .icon-box {
      width: 40%;
      display: flex;
      justify-content: space-evenly;
      line-height: 0;
    }
  }

  .child {
    width: 20px;
    height: 20px;
    background: #f2f3f5;
  }

  // 发布评论的盒子 - 2
  .cmt-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding-left: 10px;
    box-sizing: border-box;
    background-color: white;
    textarea {
      flex: 1;
      height: 66%;
      border: 1px solid #efefef;
      background-color: #f8f8f8;
      resize: none;
      border-radius: 6px;
      padding: 5px;
    }
    .van-button {
      height: 100%;
      border: none;
    }
  }
</style>
