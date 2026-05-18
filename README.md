# 報表系統

個人報表、小組報表、趨勢圖的一頁式管理工具。

---

## 為什麼需要用 http-server 開啟？

Chrome 在以 `file://` 直接開啟 HTML 時會封鎖 `localStorage`，導致：

- 趨勢紀錄無法儲存
- 小組成員設定消失
- 使用者名稱每次重置

改用本機 HTTP 伺服器後，`localStorage` 正常運作，數據可以跨次保存。

---

## 快速啟動（Windows）

### 1. 安裝 http-server（只需做一次）

```
npm install -g http-server
```

> 需要先安裝 [Node.js](https://nodejs.org/)

### 2. 啟動伺服器

在 `index.html` 所在資料夾開啟命令提示字元（或 PowerShell），執行：

```
http-server -p 8080 --cors
```

### 3. 開啟網頁

電腦瀏覽器輸入：

```
http://localhost:8080
```

---

## 手機連線（區域網路）

1. 確保手機與電腦連接同一個 Wi-Fi
2. 在電腦上查詢本機 IP（PowerShell 執行 `ipconfig`，找 IPv4 位址，例如 `192.168.1.100`）
3. 手機瀏覽器輸入：

```
http://192.168.1.100:8080
```

---

## 功能說明

| 分頁 | 功能 |
|------|------|
| 個人報表 | 填入當日數據，自動計算 PROJ / %數 / Daily need，產生可複製的報表文字 |
| 小組報表 | 貼入前次小組報表，自動更新你的三行並重算小組總計 |
| 趨勢圖 → 個人趨勢 | 折線圖顯示個人 MTD / 目標 / 當日業績與課堂歷史趨勢 |
| 趨勢圖 → 小組趨勢 | 各成員業績 / 完課堂 / 已約課堂的多線疊圖 |
| 趨勢圖 → 成員管理 | 新增 / 刪除成員，手動輸入每日數據 |

### 資料儲存 key

| Key | 說明 |
|-----|------|
| `leo_report_username` | 我的名字設定 |
| `leo_report_hist` | 個人趨勢歷史紀錄 |
| `team_members` | 小組成員清單 |
| `team_data` | 各成員每日數據 |

---

## 備份數據

所有數據存在瀏覽器的 `localStorage`，清除瀏覽器資料會一併刪除。
如需備份，開啟 DevTools（F12）→ Application → Local Storage → 手動複製各 key 的 JSON 值。
