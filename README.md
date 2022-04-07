# secondhand-market 校园二手市场 

## 前端技术栈

前端采用vue，vue-router，vuex，控件库使用ant design

## 后端技术栈

express，redis， sequelize 

## 系统截图

登录页

![1.jpg](https://s2.loli.net/2022/03/25/r9mLBHSk5fvNZXg.jpg)

注册

![2.jpg](https://s2.loli.net/2022/03/25/JVFQri4BGogt8vl.jpg)

主页

![3.jpg](https://s2.loli.net/2022/03/25/mfiN6vP2p5Q3JzB.jpg)

![4.jpg](https://s2.loli.net/2022/03/25/xIRwml3Sq6KsAig.jpg)

商品页

![5.jpg](https://s2.loli.net/2022/03/25/hxKqVGreAkCdDFg.jpg)

求购信息页

![6.jpg](https://s2.loli.net/2022/03/25/2tleGXFSijrvUZb.jpg)

个人主页

![个人主页.jpg](https://s2.loli.net/2022/03/25/FsOyXVkAhfb4ZrI.jpg)

我的商品

![我的商品.jpg](https://s2.loli.net/2022/03/25/NwthUfmIHTRBiXO.jpg)

## Project setup
```bash
安装前端依赖
npm install
```

```bash
进入到server文件夹
cd server
```

```bash
安装server端依赖
npm install
```



### Compiles and hot-reloads for development

```bash
启动前端代码
npm run serve
启动后端代码(另外打开一个命令行工具)
cd server
npm run start
```

### Compiles and minifies for production
```bash
前端代码构建
npm run build
```

### Lints and fixes files
```bash
npm run lint
```

### 数据库及相关配置

```javascript
//db.js
//redis配置
REDIS_CONF = {
  port: 6379,
  host: "127.0.0.1",
};
//mysql配置
MYSQL_CONF = {
  database: "school_second_hand_market",
  username: "root",
  password: "root",
  host: "localhost",
  port: 3306,
};
//mysql脚本位置  server/school_second_hand_market.sql

```

