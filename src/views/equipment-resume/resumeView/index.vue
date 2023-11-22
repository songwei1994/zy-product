<template>
  <div class="device-main">
    <resumeView ref="resumeView" />
    <resumeJump ref="resumeJump" />
  </div>
</template>
<script>
import resumeView from './defineResumeTree'
import resumeJump from './resumeJump/index'
export default {
  components: { resumeView, resumeJump }
}
</script>

<style scoped>

</style>
