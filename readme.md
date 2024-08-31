# serv00-automation

## 使用方法
1. fork本仓库
2. 在 `secrets and variables` - `Actions` - `Repository secrets` 里填入
   - `COMMAND` 要运行的命令
   - `PUSHURL` 云湖推送Url
   - `SSH_INFO` 服务器信息
   - `USERID` 推送人Id
   - `USERTYPE` 要推送给个人就填 `user`, 要推送给群组就填 `group`
3. 因为云湖的服务器对非大陆来说非常不友好, 所以得自行搭建反代来提供推送Api
   1. 进入Cloudflare
   2. 新建Worker
   3. 替换内容为 `worker.js` 文件的内容
