# Human 3.0 公开测试页

这是一个可公开发布的静态网页版本，只包含 Human 3.0 测试、报告、AI 追问提示词和公开方法论。

不包含个人评估、个人执行计划、小钱实验和个人档案。

## 正式地址

```text
https://h3.mifenglianzi.com
```

阿里云部署与更新方式见 `DEPLOY-ALIYUN.md`。

## 本地预览

```bash
python3 -m http.server 4173
```

打开：

```text
http://localhost:4173
```

## 功能

- 不需要登录。
- 不需要服务器。
- 不上传答案。
- 每次只显示一个问题。
- 本地生成四象限报告。
- 复制报告和 AI 追问提示词。
- 打开 ChatGPT 或 Claude 继续分析。
- 打印或保存 PDF。
- 导出和导入测试记录 JSON。
- PWA 离线缓存。

## GitHub Pages

1. 新建公开仓库。
2. 上传本文件夹内的所有文件。
3. 打开 `Settings`。
4. 进入 `Pages`。
5. Source 选择 `Deploy from a branch`。
6. Branch 选择 `main`。
7. Folder 选择 `/root`。
8. 保存后等待 GitHub 生成网址。

## 隐私说明

答案默认只保留在用户自己的浏览器中。只有用户主动复制、下载、导入或导出时，内容才会离开当前网页。

二维码功能只有在用户主动点击时，才会向二维码生成服务发送当前页面链接。不会发送测试答案。
