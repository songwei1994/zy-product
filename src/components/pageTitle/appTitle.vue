<template>
  <div class="title">
    <span>
      <svg-icon icon-class="manage" />
      {{ title }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'AppTitle',
  data() {
    return {
      title: '1111111'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        // console.log(route)
        // console.log(route.matched[route.matched.length - 2])
        this.title = route.matched[route.matched.length - 2].meta.title + '>' + route.meta.title
      },
      immediate: true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.title{
  background: white;
  height: 94%;

  span{
    color: #20a0ff;
    fill:#20a0ff;
    font-size: 20px;
  }
}
</style>
