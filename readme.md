# serv00-automation

## 使用方法
1. fork本仓库
2. 在 `secrets and variables` - `Actions` - `Repository secrets` 里填入
   - `COMMAND` 要运行的命令
   - `PUSHURL` 云湖推送Url
   - `SSH_INFO` 服务器信息
   - `USERID` 推送人Id
   - `USERTYPE` 推送对象类型
3. 因为云湖的服务器对非大陆来说非常不友好, 所以得自行搭建反代来提供推送Api
   1. 进入Cloudflare
   2. 新建Worker
   3. 替换内容为 `worker.js` 文件的内容

## 填写示例
- COMMAND (一行一个, 遵行Python3.x语法)
  ```
   [
     "~/.npm-global/bin/pm2 list",
     "~/.npm-global/bin/pm2 resurrect"
   ]
  ```
- PUSHURL (直接填入你的Worker地址)
- SSH_INFO (一行一个, 遵行Python3.x语法)
  ```
   [
     {"hostname": "地址1", "username": "用户名", "password": "密码"},
     {"hostname": "地址2", "username": "用户名", "password": "密码"},
   ]
  ```
- USERID (直接填入你的用户Id)
- USERTYPE (要推送给个人就填 `user`, 要推送给群组就填 `group`)
