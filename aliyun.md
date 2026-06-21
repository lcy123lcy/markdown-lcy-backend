1. 登陆 ssh root@<服务器IP>  ssh root@<服务器IP>  ssh root@47.110.128.229 ip需要共公网ip 然后输入密码登陆 密码在Mac备忘录里
   
2. 查看根目录下的系统文件夹：
    ls -F
3. cd /home （进入根目录下的 home）
   cd deployer
   cd markdown-lcy-app/backend
   tab快捷键

   观察你输入命令的那行开头：
    如果结尾是 #：代表你是 root 用户（超级管理员）。
    如果结尾是 $：代表你是 普通用户（如 deployer）。
    如果你想从现在的 root 切换到 deployer 用户：
    su - deployer

   关闭当前的 deployer 会话，直接退回到之前的 root 身份
    直接输入：exit
    或者快捷键：Ctrl + D


    