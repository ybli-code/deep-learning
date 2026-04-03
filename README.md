# 深度学习资源库

## 环境配置
1. 安装nodejs https://nodejs.org/zh-cn/download
2. 安装依赖 npm install
3. 运行项目 npm run dev

## 推送代码
1. 添加到暂存区 git add .
2. 提交代码 git commit -m "本次提交的描述"
3. 推送代码 git push

## 如何贡献代码
1. Fork代码
2. 将代码下载到本地
3. 使用TRAE打开
4. 修改代码并提交
5. 申请PR

## 常见错误
- npm:无法加载***.ps1，因为系统禁止...
    - 在Power Shell（管理员）中运行：Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
- 无法将‘npm’识别为...
    - 原因1：没有安装nodejs，或者没有加入环境变量
        - 重新安装nodejs
    - 原因2：先打开了TRAE，后安装的nodejs
        - 重启TRAE