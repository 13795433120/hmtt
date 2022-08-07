<template>
    <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{artItem.title}}</span>
      </div>
    </template>
    <!-- label 区域的插槽 -->
    <template #label>
      <div class="label-box">
        <div>
          <span>{{artItem.aut_name}}</span>
          <span>{{artItem.comm_count}}评论</span>
          <span>{{artItem.pubdate}}个月前</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    artItem: {
      type: Object
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
</style>
