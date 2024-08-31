import os
import paramiko
import requests
import ast

# get env
SSH_INFO = ast.literal_eval(os.getenv('SSH_INFO', '[]'))
COMMAND = ast.literal_eval(os.getenv('COMMAND', '[]'))
PUSHURL = os.getenv('PUSHURL', '')
USERID = os.getenv('USERID', '')
USERTYPE = os.getenv('USERTYPE', '')

# ssh login
SSHClient = paramiko.SSHClient()
SSHClient.set_missing_host_key_policy(paramiko.AutoAddPolicy())
Log = str()
for Item in SSH_INFO:
    print('Connect Server ...')
    Log += f"---\nConnect Server: `{Item['hostname']}`\n"
    SSHClient.connect(Item['hostname'], username=Item['username'], password=Item['password'])
    print('Run Command ...')
    for Line in COMMAND:
        Log += f'Run Command: `{Line}`\n'
        stdin, stdout, stderr = SSHClient.exec_command(Line)
        output = stdout.read().decode('utf-8')
        error = stderr.read().decode('utf-8')
        if output:
            Log += f'Output: \n```\n{output}\n```\n'
        if error:
            Log += f'Error: \n```\n{error}\n```\n'

# yunhu push
print('Push Response ...')
req_data = {
    'from': 'Github Serv00 Auto Login Action',
    'to': USERID,
    'type': USERTYPE,
    'content': f'Auto Login Response\n{Log}'
}
rep_data = requests.post(PUSHURL, json=req_data)
rep_data = rep_data.json()
print(rep_data['message'])
