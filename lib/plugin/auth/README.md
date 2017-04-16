# auth

标准OpenStack登录组件。
只做两件事情：
1. 验证用户session，基于memcached。
2. 提供登陆和登出的API。

## 为什么需要这个插件

这个插件本身可以并到keystone里面去，但是，我们希望这个插件以后可以扩展成为可以和第三方插件对接。