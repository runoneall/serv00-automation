addEventListener('fetch', event => {
    const request = event.request;
    if (request.method === 'GET') {
        event.respondWith(DocHtmlPage())
    }
    if (request.method === 'POST') {
        event.respondWith(YunhuPush(request))
    }
})

async function DocHtmlPage() {
    const DocHtml = `
<meta charset="UTF-8">
<title>Api 文档</title>
<h1>此Api可用于推送消息到云湖</h1>
<h3>请求Api示例代码</h3>
<style>
    textarea {
        resize: none;
        border: 5;
        outline: none;
        overflow: hidden;
        white-space: pre;
        width: 70ch;
        height: 20em;
        background-color: transparent;
    }
</style>
<textarea readonly>
# Python3

import requests
req_data = {
    'from': '', #发送人名称 (String)
    'to': , #对方id (Int)
    'type': '', #发送给用户时为"user", 发送给群组时为"group" (String)
    'content': '' #要发送的内容 (String)
}
rep_api = '' #当前地址
rep_data = requests.post(rep_api, json=req_data)
print(rep_data.text) #输出返回, code为1时为成功
</textarea>`
    return new Response(DocHtml, {headers: {"Content-Type": "text/html; charset=utf-8"}})
}

async function YunhuPush(request) {

    // get data
    const req_data = await request.json();
    const req_from = req_data['from'].toString()
    const req_to = req_data['to'].toString()
    const req_type = req_data['type'].toString()
    const req_content = req_data['content'].toString()

    // request yhapi
    const yh_req_content = "- Send From `"+req_from+"`\n---\n"+req_content
    const yh_req_apiUrl = "https://chat-go.jwzhd.com/open-apis/v1/bot/send?token=你机器人的Token"
    const yh_req_header = {"Content-Type": "application/json; charset=utf-8", }
    const yh_req_data = {
        "recvId": req_to,
        "recvType": req_type,
        "contentType": "markdown",
        "content": {
            "text": yh_req_content
        }
    }
    const yh_rep = await fetch(
        yh_req_apiUrl, {
            method: 'POST',
            headers: yh_req_header,
            body: JSON.stringify(yh_req_data)
        }
    )

    // read response
    const yh_rep_data = await yh_rep.json()
    const yh_rep_code = yh_rep_data['code']
    let rep_state = {}
    rep_state['code'] = yh_rep_code
    if (yh_rep_code === 1) {
        rep_state['message'] = 'Send Success'
    } else {
        rep_state['message'] = 'Send Failed'
    }

    // response data
    return new Response(JSON.stringify(rep_state), {headers: {"Content-Type": "text/html; charset=utf-8"}})
}
