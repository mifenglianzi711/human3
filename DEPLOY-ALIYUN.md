# Human 3.0 · 阿里云上线（实际执行版）

> 更新时间：2026-10-03
> 状态：**已上线 → https://h3.mifenglianzi.com**

## 一、线上现在是什么样

| 项 | 值 |
|---|---|
| 正式地址 | `https://h3.mifenglianzi.com` |
| 服务器 | 阿里云轻量应用服务器 `47.106.219.207`（Ubuntu 22.04） |
| 站点目录 | `/var/www/human3` |
| 版本备份 | `/var/www/human3-releases/v_20261003-164638` |
| nginx 配置 | `/etc/nginx/conf.d/human3.conf`（独立文件，不碰官网、公众号工作台和 life 站点） |
| DNS | `h3.mifenglianzi.com` → A → `47.106.219.207` |
| 证书 | Let's Encrypt，DNS 校验签发，有效期到 **2027-01-01** |

## 二、为什么最终没走 OSS

原方案是「OSS 桶 + 静态网站托管 + CNAME + 证书」。实际执行改成「轻量服务器 + nginx」：

1. OSS 自定义域名要上 HTTPS，得再走 CDN 或证书托管，链路长、排查麻烦。
2. 服务器上已经有 nginx + certbot，`life.mifenglianzi.com` 就是这套，维护成本最低。

## 三、日常更新怎么发

本机改完 `/Users/mac/human3-public` 后，重新上传到服务器即可：

```bash
cd /Users/mac/human3-public
STAMP=$(date +%Y%m%d-%H%M%S)
COPYFILE_DISABLE=1 tar --exclude='./.git' --exclude='./README.md' --exclude='./DEPLOY-ALIYUN.md' -czf - . \
  | ssh -i ~/.ssh/mifenglianzi_deploy root@47.106.219.207 \
    "mkdir -p /var/www/human3-releases/v_$STAMP && tar -xzf - -C /var/www/human3-releases/v_$STAMP && cp -r /var/www/human3-releases/v_$STAMP/. /var/www/human3/"
```

发完用浏览器开一次 `https://h3.mifenglianzi.com` 验证即可。

## 四、两个必须知道的坑

1. **80 端口被阿里云备案拦截。**
   外网访问 `http://h3.mifenglianzi.com` 会返回 403 `Non-compliance ICP Filing`（`life.mifenglianzi.com` 同样）。
   服务器本机和 HTTPS 都正常，所以分享一律用 `https://` 链接。
   彻底解决要王老师本人在阿里云办 `mifenglianzi.com` 的备案接入。

2. **证书不会自动续期。**
   因为 80 端口被封，HTTP-01 校验走不通，只能用 DNS 校验手动签发。
   到期时间 **2027-01-01**，需要在 2026-12 前重新签发，或补一套带域名解析凭据的自动续期。

## 五、隐私边界（保持不变）

公开版只包含测试、报告、AI 追问提示词和公开方法论。
不包含个人评估、个人执行计划、小钱实验和个人档案；不要上传 `/Users/mac/human3-plan`。
