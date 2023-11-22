const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.avatar,
  type: state => state.user.type,
  name: state => state.user.name
}
export default getters
