import store from '@/store'

// 校验权限指令
function checkPermission(el, binding) {
  const { value } = binding
  const roleType = store.getters && store.getters.type

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = permissionRoles.includes(roleType)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`没有浏览权限!`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
