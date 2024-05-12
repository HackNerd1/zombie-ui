<!--
 * @Descripttion:
 * @version:
 * @Author: Hansel
 * @Date: 2020-08-01 18:17:30
 * @LastEditors: Hansel
 * @LastEditTime: 2024-05-12 16:07:56
-->

# 僵尸企业网站使用说明

## 成品

<video id="video" controls="" preload="none" poster="封面">
      <source id="mp4" src="./resources/僵尸企业成品.mp4" type="video/mp4">
</video>

## 使用

1. 访问网址，点击"get start"按钮，弹出对话框
2. 对话框中有两个标签页，分别对应 "csv 上传" "结果预览" `说明：结果预览在文件预测完成之后才会渲染数据`
3. 上传文件---->按住 Ctrl 选择四份需要预测的文件，上传的 csv 大于 4 份开放`预测按钮`
4. 预测结果---->点击`预测`按钮，开始预测，大概等待 1~2 分钟，预测完成---->此时开放下载按钮，结果预览页渲染数据
5. 点击下载按钮---->将预测好的数据下载到本地
6. 结束

## 待完善

1. 数据查询功能---->结果预览页查询功能还未做
2. 文件删除功能---->点上传文件后的文件列表中的删除按钮，目前只有前端的回调，后台数据并不会被删除
3. 文件分类---->目前上传后的文件都放置于相同的文件夹中，未按用户进行分类储存，多人同时操作时，脚本会读取到别人的数据。也就是并不支持多人同时操作
4. 文件限制---->目前做到了仅限用户上传 csv，但未对其上传的 csv 进行检查，也就是说上传了预测集以外的数据时，脚本也会执行

## 安装依赖

```
npm run pre || yarn install || cnpm install || npm install --registry https://registry.npm.taobao.org
```

### 本地运行

```
npm run start || cnpm run start || yarn run start
```

### 网页部署

#### 1.打包静态文件

```
npm run build
```

#### 2.配置 nginx

内网配置:

```
    server {
	   listen 80;
	   server_name zombie.inforsecur.cn;
        root /usr/share/nginx/html/Zombie-UI/build;
	   index index.html;
	   client_max_body_size 20m;
        location ^~ /apis {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'OPTION, POST, GET';
            add_header 'Access-Control-Allow-Headers' 'X-Requested-With, Content-Type';
            proxy_read_timeout 600;
            proxy_pass https://inforsecur.cn:4430;
        }
    }
```

外网配置:

```
    server {
        listen 80;
        server_name  zombie.wublubdubda.cn;
        proxy_set_header Host "zombie.inforsecur.cn";
        location / {
            proxy_pass http://localhost:7000/; # 路由模式history的修改
        }
    }
```

#### 3.配置 frp

```
[zombie]
type = http
local_port = 80
custom_domains = zombie.inforsecur.cn
```
