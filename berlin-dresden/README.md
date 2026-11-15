# 柏林＋德勒斯登 2026 參訪地圖（PWA）

這是可安裝到 iPhone／Android 主畫面的離線網頁 App。保留了兩座城市的手冊底圖、行程、餐廳、路線順序編輯、Google Maps 連結與線上向量地圖切換。

## 內含檔案
- `index.html`：主程式和已嵌入的兩座城市離線街道底圖。
- `manifest.webmanifest`：手機安裝設定。
- `sw.js`：Service Worker，首次連線時快取 App 基本檔案。
- `icons/`：主畫面圖示。

## 最簡單部署：GitHub Pages
1. 在 GitHub 建立新儲存庫，例如 `berlin-dresden-map`，設成 Public（或使用你有權部署 Pages 的儲存庫）。
2. 將 ZIP 解壓縮後，**把裡面的所有檔案與 icons 資料夾一併放在儲存庫根目錄**；不要只傳 `index.html`，也不要多包一層資料夾。
3. 至 GitHub 儲存庫 `Settings` → `Pages`，選 `Deploy from a branch`、`main`、`/(root)` 並儲存。
4. 網址格式：`https://<你的 GitHub 帳號>.github.io/berlin-dresden-map/`。以 GitHub Pages 實際產生的 URL 為準。
5. 在 iPhone 以 **Safari** 開啟網址，首次保持網路連線，確認頂端出現「✓ 離線已就緒」。
6. 點 Safari「分享」→「加入主畫面」→「加入」。之後主畫面圖示可直接開啟 PWA。
7. 測試：把手機切成飛航模式後，從主畫面圖示重新開啟；切換柏林／德勒斯登與日期、查看離線地圖與餐廳。

## 功能與限制
- **不需要網路**（首次成功載入並快取之後）：離線底圖、景點與餐廳、每日行程、路線直線連接、編輯順序。
- 路線順序調整**儲存在此裝置／此網站的瀏覽器儲存空間**。清除網站資料或卸載 App 可能讓它消失，不會跨手機同步。
- **需要網路**：OpenFreeMap 向量地圖、Google Maps 真實道路導航、餐廳外部網站。
- 離線底圖是手冊的內嵌圖像；放大程度有限。直線連線只表示站點順序，不是道路導航。
- 首次必須使用 HTTPS（例如 GitHub Pages）讓 Service Worker 正式快取。**直接用檔案 App 開啟 HTML 不是 PWA**。
- App 的更新採版本化快取。更新 GitHub 網站後，若舊版仍顯示，請重新開啟網頁／關閉再開 App；必要時清除該網站資料後重新載入，但這會清除本機路線編輯。
- iPhone 不保證永遠保留快取，應在出發前與出國期間偶爾連線檢查，並可另外保存 HTML 作為備援。

## 網頁安全
- 不含登入、追蹤或自動背景定位。
- Service Worker 只快取同源 App 檔案，不快取第三方圖磚，也不攔截 Google Maps。
