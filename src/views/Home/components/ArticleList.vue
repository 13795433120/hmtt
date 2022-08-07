<template>
  <div>
    <ArticleItem
      v-for="item in list"
      :key="item.art_id"
      :artItem="item"
    ></ArticleItem>
  </div>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    list: {
      type: Array
    }
  }
}
</script>

<style>

</style>
