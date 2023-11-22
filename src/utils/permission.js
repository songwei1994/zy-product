import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    // const permissions = store.getters && store.getters.permissions
    if (value && value instanceof Array) {
      if (value.length > 0) {
        const permissionRoles = value

        // const hasPermission = permissions.some(role => {
        //   return permissionRoles.includes(role)
        // })

        return permissionRoles.includes(store.getters.type)
      }
    } else {
      throw new Error(`没有浏览权限!`)
    }
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
