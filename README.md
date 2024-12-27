# BeltConveyors-web 倾向化管理

English | [简体中文](./README-zh.md)

## Build Setup

```bash
# clone the project
git clone https://gitee.com/shanghai-yuanyu-intelligent/SIEmpower-web.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```
// 查询版本号
git reflog 
// 重置仓库
git reset 版本号
// 推送gitee
git push origin HEAD --force