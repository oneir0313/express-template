# Express Template

## Initialize
```bash
cd app
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run start
```

## Usage

1. chrome -> http://localhost:9200/signin (進到測試登入頁面)
2. email/paswsowrd: admin/1qaz@WSX
3. 前端登入`POST /api/user/signin`成功 redirect /index


## 檔案結構
---

```
app/
├── config/            # db吉passport設定
├── node_modules/      # npm函式庫
├── libs/              # 共用函式庫, 中介層
├── public/            # 前端靜態資源
│   ├── image/         # 圖片
│   ├── javascript/    # js source code
│   ├── stylesheets/   # css 
├── repositories/      # ORM 終端接口
│   ├── migrations/    # DB migrations資料
│   ├── models/        # DB 模型
│   ├── seeders/       # DB 初始化資料
├── route/             # 處裡server的路由
├── server/            # 處理server框架設定
├── services/          # 處理業務邏輯
│   ├── models/        # DB 模型
│   ├── seeders/       # DB 初始化資料
├── views/             # EJS 前端頁面
├── tests/             # 單元測試
├── package.json       # npm專案管理設定檔
└── app.js             # server啟動初始化入口
```

## 命名規範
* API路徑及名稱遵循Restful，名稱以`小駝峰`
    * Example: 
        * 獲得資料     GET      /data
        * 新增資料     POST     /data
        * 刪除資料     DELETE   /data/1
        * 詳細資料     GET      /data/1/dailyDetail  
* 檔案與資料夾命名規則採`小駝峰` 
    * Example: `services/userService`

## ENV 設定

* `SERVER_TYPE`:
  * `FULLSTACK` 前端、後端一併啟動
  * `WEB` 只啟用前端`ejs`跟靜態資源
  * `API` 只啟用API服務
* `PROXY_URL`
  * 當使用`FULLSTACK`跟`WEB`模式時，可搭配使用填入此參數將`/api/*`轉導至PROXY

## Todos
- [X] Google驗證 & passport [OTP](https://blog.shahednasser.com/how-to-add-authentication-with-google-authenticator-in-node-js/)
- [ ] 單元測試範例 [mocha](https://mochajs.org/)
- [x] Optional Proxy 須測試轉導cookie
- [ ] Dockerfile

## Sequelize Migrations

### Migration & Seeder
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
### Undo Migration & Seeder

```bash
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all
```