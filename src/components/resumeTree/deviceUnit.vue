<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      :default-checked-keys="defaultData"
      :default-expanded-keys="defaultData"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script>
export default {
  name: 'DeviceUnitVue',
  data() {
    return {
      defaultData: [113],
      data: [{
        id: 1,
        label: '宝钢股份',
        children: [{
          id: 11,
          label: '焦化厂',
          children: [
            {
              id: 111,
              label: 'L101',
              children: [
                {
                  id: 1111,
                  label: '1#电机'
                },
                {
                  id: 1112,
                  label: '1#减速器'
                },
                {
                  id: 1113,
                  label: '2#电机'
                },
                {
                  id: 1114,
                  label: '2#减速器'
                },
                {
                  id: 1115,
                  label: '改向滚筒'
                }]
            },
            {
              id: 112,
              label: 'L102',
              children: [
                {
                  id: 1121,
                  label: '1#电机'
                }, {
                  id: 1122,
                  label: '1#减速器'
                }, {
                  id: 1123,
                  label: '2#电机'
                }, {
                  id: 1124,
                  label: '2#减速器'
                }, {
                  id: 1125,
                  label: '改向滚筒'
                }]
            },
            {
              id: 113,
              label: 'L103'
            },
            {
              id: 114,
              label: 'L104'
            },
            {
              id: 115,
              label: 'L105'
            }]
        },
        {
          id: 12,
          label: '炼钢厂',
          children: [{
            id: 121,
            label: '三级 1-1-1'
          }]
        },
        {
          id: 13,
          label: '热轧厂',
          children: [{
            id: 131,
            label: '三级 1-1-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }}
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
