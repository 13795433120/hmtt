<template>
  <div>
    <van-cell>
    <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{artItem.title}}</span>
          <img v-if="artItem.cover.type === 1" class="thumb" :src="artItem.cover.images[0]" alt="">
        </div>
        <div class="thumb-box" v-if="artItem.cover.type > 1">
          <img class="thumb"
            v-for="(item, index) in artItem.cover.images"
            :key="index"
            :src="item" alt="">
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{artItem.aut_name}}</span>
            <span>{{artItem.comm_count}}评论</span>
            <span>{{changeDate(artItem.pubdate)}}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click="show = true"/>
        </div>
      </template>
    </van-cell>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
      @cancel="onCancel"
      @close="onClose"
      :cancel-text="cancelText"
      get-container="body"
      />
  </div>
</template>

<script>
import { firstActions, secondActions } from '@/api/report.js'
import { timeAgo } from '@/utils/date.js'
export default {
  name: 'ArticleItem',
  props: {
    artItem: {
      type: Object
    }
  },
  data () {
    return {
      show: false,
      actions: firstActions,
      cancelText: '取消'
    }
  },
  methods: {
    changeDate: timeAgo,
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // this.show = false
      if (item.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.cancelText = '返回'
      } else if (item.name === '不感兴趣') {
        this.$emit('dislike', this.artItem.art_id)
        this.show = false
      } else {
        this.$emit('report', this.artItem.art_id, item.value)
        this.show = false
      }
    },
    onCancel () {
      if (this.cancelText === '返回') {
        this.show = true
        this.actions = firstActions
        this.cancelText = '取消'
      } else {
        this.show = false
      }
    },
    onClose () {
      this.actions = firstActions
      this.cancelText = '取消'
    }
  }
}
</script>

<style lang="less" scoped>
  /* 标题样式 */
  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  /* label描述样式 */
  .label-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* 文章信息span */
  .label-box span{
      margin: 0 3px;
      &:first-child{
          margin-left: 0;
      }
  }
    /* 图片的样式, 矩形黄金比例：0.618 */
  .thumb {
    width: 113px;
    height: 70px;
    background-color: #f8f8f8;
    object-fit: cover;
  }

  /* 三图, 图片容器 */
  .thumb-box {
    display: flex;
    justify-content: space-between;
  }
</style>
