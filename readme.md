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

1. chrome -> http://localhost:9200/test (進到測試登入頁面)
2. email/paswsowrd: admin/1qaz@WSX
3. 前端登入`POST /api/user/signin`成功 redirect /index

## Three-Tier layer
* 表現層 (routes)
    * 用於顯示資訊和接收用戶輸入的資料，為用戶提供一種交互式操作的介面
* 商業邏輯層 (services)
    * 商業邏輯層在體系架構中的位置很關鍵，它處於資料存取層與表現層中，起到了數據交換中承上啟下的作用。由於層是一種弱耦合結構，層與層之間的依賴是向下的，底層對於上層而言是「無知」的，改變上層的設計對於其調用的底層而言沒有任何影響
* 資料存取層 (repositories)
    * 其功能主要是負責資料庫的訪問，可以訪問資料庫系統、二進位文件、文本文檔或是 XML 文檔。簡單說法就是實現對資料表的查詢、新增、刪除與修改的操作。



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
├── routes.js          # npm專案管理設定檔
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

## Todos
- [ ] Google驗證 & passport [OTP](https://blog.shahednasser.com/how-to-add-authentication-with-google-authenticator-in-node-js/)
- [ ] 單元測試範例 [mocha](https://mochajs.org/)
- [x] Optional Proxy 須測試轉導cookie
- [ ] Dockerfile


## Undo Migration & Seeder

```bash
npx sequelize-cli db:seed:undo:all
npx sequelize-cli db:migrate:undo:all
```