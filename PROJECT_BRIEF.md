# PROJECT_BRIEF.md

> Claude Code 引き継ぎドキュメント
> 最終更新: 2026-04-20
> 新しいセッションを開始したら、まずこのファイルを読んでください。
> コードは書かず、まず現状を把握してから作業に入ってください。

---

## 1. プロジェクト概要

**二級建築士 製図試験特化の独学者向けポータルサイト**

- 対象: 二級建築士試験の独学受験者
- 軸: 学科ではなく **製図試験に特化**
- 仕組み: エスキス練習 → 保存 → システムチェック → （将来）投稿・相互アドバイス → ポイント経済
- マネタイズ: 初期は無料。UGC が蓄積したら合格者エスキス閲覧をポイント/課金制に

---

## 2. ファイル構成（現在）

```
/Users/satoufumiaki/Documents/制作物/アプリテスト/
├── index.html          — 学習ポータルトップページ（バウハウスデザイン）
├── app.html            — エスキス描画ツール本体（約4150行）
├── problems.json       — 課題データ（5問）
├── manifest.json       — PWA用
├── mockup-bauhaus.jsx  — デザイン参照（React, 全5画面のモックアップ）
├── PROJECT_BRIEF.md    — このファイル
└── docs/               — 機能設計ドキュメント
    ├── feature-flashcard.md
    ├── feature-tips.md
    ├── feature-calc-training.md
    ├── feature-law.md
    └── feature-detail-drawing.md
```

**配信**: Vercel（本番） https://jukentaisaku.vercel.app  
**ローカル開発**: Python `http.server` でポート8080起動  
**GitHub**: https://github.com/SatoFumiaki1256/jukentaisaku  
**デプロイ手順**: `git push` → Vercel自動デプロイ（または `vercel --prod`）

---

## 3. 実装済み機能（app.html）

### キャンバス描画
- 455mm グリッドスナップ（グリッドは敷地上にも表示）
- **部屋ツール**: ドラッグで矩形作成 → タイプ選択パネル → テンプレートサイズから選択可
- **壁ツール**: 2点間の直線
- **移動ツール（pan）**: ダブルタップ/長押しで選択→ドラッグ移動。単タップで選択、選択済みを再タップでモーダル
- **編集ツール（select）**: タップで部屋の編集モーダルを開く（名前・タイプ・サイズ・メモ変更）
- **削除ツール（erase）**: タップで削除。ドラッグしてツールバーへドロップ→吸い込みアニメーション削除
- ピンチズーム（最小〜10%）、パンスクロール
- アンドゥ/リドゥ（最大60ステップ）

### 敷地・条件
- 敷地形状: 矩形 / 隅切り / 台形
- **敷地サイズ入力**: 幅(mm)・奥行(mm)を直接入力（表示項目）
- 課題条件パネル: 敷地サイズ・建蔽率・容積率・隣地種別・要求室・外構条件
- **延床面積**: 最小・最大を個別指定（システムチェックで範囲判定）
- 課題選択時は条件パネルをロック表示
- **課題保存機能**: 自分で作った課題条件を localStorage に保存・ロード（最大10件）
- 条件パネル / 要求室ドロワーに閉じる✕ボタン追加

### 敷地周辺図（ミニSVG）
- 各方位の隣地種別・幅員を色付きで表示
- 台形・隅切りの実形状を正確に描画
- 道路の **対面（公園・水面等）も表示**（施行令134条 公園緩和用）
- 敷地サイズや形状の入力変更時にリアルタイム更新

### キャンバス寸法表示
- 敷地全4辺の寸法ラベル（常時表示）
- SVG図内にも4辺の寸法ラベル

### 道路斜線制限チェック（補助有りモード）
- 各方位の道路幅員をもとに道路斜線をオーバーレイ表示
- **公園緩和（施行令134条）**: 対面が公園・広場・水面の場合、その幅を加算して制限を緩和

### 要求室チェックリスト（右端ドロワー）
- 右端タブ or ✕ボタンで開閉
- 課題の要求室をフロア別（1F/2F/外構）にグループ表示
- キャンバス上の部屋名と自動照合（`normalizeRoomName()` でNFKC正規化）
- 未配置室数のバッジ表示（赤/緑）

### システムチェック
- ① 要求室・外構の配置確認
- ② 面積要件チェック（㎡/畳/坪/寸法指定、上限・下限を判定）
- ③ 敷地内収まりチェック
- 建蔽率・容積率・延床面積（min/max範囲）をチェック

### 保存/ロード（localStorageベース）
- **エスキス保存**: 名前をつけて保存（最大20件）、ロード、削除
- **課題保存**: 課題条件を保存（最大10件）、ロード、削除
- 画像として書き出し
- `index.html` の「マイエスキス」セクションに最新5件を表示

### 課題選択（index.html）
- `problems.json` をfetchして動的にカード表示
- 5問（基礎2問、応用3問）
- 試験日カウントダウン（2026/09/20）を動的表示

### 学習ポータル（index.html）
- 6カードグリッド（バウハウスデザイン）
  - ✅ エスキス練習（実装済み）
  - 🔲 フラッシュカード（準備中）
  - 🔲 解き方Tips（準備中）
  - 🔲 計算トレーニング（準備中）
  - 🔲 法規コラム（準備中）
  - 🔲 詳細図トレーニング（準備中）

---

## 4. 技術仕様

### 座標系
- グリッド単位: `GRID = 455mm`
- `state.view = {ox, oy, scale}` で座標変換
- `mmToScreen()` / `screenToMm()` で変換
- 敷地は1F・2Fを横並びに配置
  - `ADJ_BAND = 3000mm`（敷地周囲の隣地帯）
  - `FLOOR2_GAP = 2730mm`（1F敷地東端〜2F敷地）
  - `get2Fx()` で2F敷地のX座標を計算

### 状態管理
```javascript
state = {
  rooms: [{id, x, y, w, h, type, name, note}],  // mm座標
  walls: [{id, x1, y1, x2, y2}],                 // mm座標
  site:  {x, y, w, h, cornerCuts, trapShortH, trapShortSide},
  view:  {ox, oy, scale},
  tool:  'pan'|'room'|'wall'|'erase'|'select',
  selected: {kind:'room'|'wall', id} | null,
  history: [...], histIdx: -1,
  guides: [{id, y}],
}
```

### 保存データ形式（localStorage）
**エスキス保存** (`'eskisu_saves'`):
```javascript
{
  id: "1713123456789",
  title: "2F住宅 練習1",
  savedAt: "2026-04-16T10:00:00.000Z",
  problemId: 1,
  problemTitle: "木造2階建専用住宅",
  rooms: [...],
  walls: [...],
  site: {...}
}
```

**課題保存** (`'jukentaisaku_problem_saves'`):
```javascript
{
  id: "1713123456789",
  title: "オリジナル課題1",
  savedAt: "2026-04-20T10:00:00.000Z",
  data: {
    title, structure, zoning, siteW, siteH,
    coverage, far, floorAreaMin, floorAreaMax,
    notes, siteAdj, reqRooms, exteriorConds
  }
}
```

### problems.json のフィールド
```javascript
{
  id, title, difficulty, structure, zoning, zoningSlope,
  siteW, siteH,
  coverage, far,
  floorAreaMin,   // 新: 延床面積の下限 m²
  floorAreaMax,   // 新: 延床面積の上限 m²
  floorArea,      // 旧: 後方互換のため残存
  siteAdj: { N:{type,width,opposite,oppositeWidth}, S:..., E:..., W:... },
  reqRooms: [{name, floor, area, notes:[]}],
  exteriorConds: [{type, note}]
}
```

### 定数（app.html 冒頭に定義済み）
```javascript
const GRID           = 455;
const ADJ_BAND       = 3000;
const FLOOR2_GAP     = 2730;
const WALL_WIDTH_MM  = 120;
const TRASH_ZONE_H   = 72;
const DOUBLE_TAP_MS  = 400;
const LONG_PRESS_MS  = 450;
const DRAG_THRESHOLD_PX = 8;
const TATAMI_M2      = 1.65;
const TSUBO_M2       = 3.306;
const MAX_SAVES      = 20;
const MAX_PROBLEM_SAVES = 10;
```

---

## 5. デザイン方針（バウハウス）

### カラーパレット
```css
/* index.html（ライトテーマ） */
--bg:      #ebe7dc;
--surface: #faf7f0;
--ink:     #1a1a1a;
--inkSoft: #555555;
--rule:    #d4cfc0;
--red:     #d3312a;
--blue:    #2952c8;
--yellow:  #f5c518;

/* app.html（ダークテーマ・描画ツール向け） */
--bg:     #1a1a1a;
--panel:  #242424;
--border: #3a3a3a;
--accent: #2952c8;
--danger: #d3312a;
--yellow: #f5c518;
--text:   #f0ede6;
--paper:  #f5f0e8;
```

### フォント
```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&family=Noto+Sans+JP:wght@400;700;900&display=swap" rel="stylesheet">
```
- 見出し: `'Archivo', 'Noto Sans JP'` weight 900
- 本文: `'Noto Sans JP'`
- 英語ラベル: `'Archivo'` 大文字 + letter-spacing

### デザイン原則
- シャープな角（border-radius は最小限）
- 太い黒ボーダー（2〜3px solid）
- 幾何学装飾（円・正方形・三角形）
- セクション番号（01, 02, 03...）+ 水平ルールライン
- グラデーション・影は使わない

---

## 6. セキュリティルール（必ず守ること）

```javascript
function escHtml(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
```

- **ルール1**: `innerHTML` にユーザー入力・localStorage由来のデータを入れる前は必ず `escHtml()` を通す
- **ルール2**: 動的生成HTMLのボタンに `onclick="..."` 直書き禁止
  - NG: `<button onclick="loadSavedWork('${s.id}')">`
  - OK: `<button data-action="load" data-id="${escHtml(s.id)}">` + delegated listener
- **ルール3**: `showSnack()` は `textContent` を使うので安全
- **ルール4**: `problems.json` 由来のデータも `escHtml()` でエスケープ

---

## 7. サービスの3本柱（将来計画）

### 柱1: エスキス練習ツール（実装済み・継続発展）
- ✅ キャンバス描画
- ✅ 保存/ロード（localStorage）
- ✅ システムチェック（4項目）
- ✅ 道路斜線・公園緩和チェック
- ✅ 課題保存（自作課題）
- 🔲 エスキスの公開・投稿導線
- 🔲 SNSシェア（Xへの画像投稿）

### 柱2: 学習コンテンツ（一部実装・拡張中）
- ✅ エスキス練習（app.html）
- 🔲 フラッシュカード（`docs/feature-flashcard.md` 参照）
- 🔲 解き方Tips（`docs/feature-tips.md` 参照）
- 🔲 計算トレーニング（`docs/feature-calc-training.md` 参照）
- 🔲 法規コラム（`docs/feature-law.md` 参照）
- 🔲 詳細図トレーニング（`docs/feature-detail-drawing.md` 参照）

### 柱3: UGCコミュニティ（未実装）
- エスキス投稿ギャラリー
- 掲示板3種
- プレミアムコンテンツ（合格者エスキスアーカイブ）

---

## 8. ポイント経済（将来計画）

| 獲得アクション | 付与量 |
|---|---|
| エスキス完成品を提出 | 大 |
| 他ユーザーにアドバイス | 中 |
| 掲示板に投稿 | 中 |
| いいね・リアクション | 小 |

| 消費先 | 備考 |
|---|---|
| システムチェック | 30pt 目安 |
| 合格者エスキス閲覧 | プレミアムコンテンツ |
| ランキング掲載・称号 | 自動判定 |

---

## 9. 年間サイクル

| 時期 | フェーズ |
|---|---|
| 7〜9月 | 製図メインシーズン |
| 10〜12月 | 合格発表後の合格者エスキス投稿キャンペーン |
| 1〜3月 | 早期学習者向けコンテンツ消費 |
| 4〜6月 | 学科勉強中の人への予習コンテンツ |

---

## 10. コールドスタート戦略

1. **自前シーディング** — 運営者・合格者に模範エスキス5〜10件を初期投稿
2. **合格報告ブースト** — 試験後〜合格発表期にポイント5〜10倍キャンペーン
3. **AI添削で初期価値** — システムチェックがユーザーゼロ期の使用理由
4. **SNS連携** — エスキス画像をXにワンタップでシェア

---

## 11. UI / 画面構成（目標）

| 画面 | 状態 | 役割 |
|---|---|---|
| index.html | ✅ 実装済み | 学習ポータル・課題選択・マイエスキス |
| app.html | ✅ 実装済み | エスキス描画ツール本体 |
| flashcard.html | 🔲 未実装 | フラッシュカード学習 |
| tips.html | 🔲 未実装 | 解き方Tips閲覧 |
| gallery.html | 🔲 未実装 | 投稿エスキス一覧 |
| board.html | 🔲 未実装 | 掲示板（3タブ） |
| mypage.html | 🔲 未実装 | プロフィール・ポイント・実績 |

---

## 12. 開発方針

### 実装前に必ず確認すること
- 大きな変更は計画を提示し、確認を取ってから実装する
- `mockup-bauhaus.jsx` のカラー・タイポグラフィを参照してデザインを合わせる
- セキュリティルール（`escHtml()`、delegated listener）を必ず守る
- 既存コードを大きく書き換える場合は事前に申告する

### 判断を仰ぐべき事項
- データ保存方式（現状: localStorage → 将来: サーバー移行のタイミング）
- ポイント経済の具体的な数値設定
- 認証・ユーザー管理の導入時期と方式

### サブエージェントへの引き継ぎ方
```
/Users/satoufumiaki/Documents/制作物/アプリテスト/PROJECT_BRIEF.md を読んで
現状を把握してください。コードは書かず、まず把握だけしてから報告してください。
```

---

## 13. 既知の課題・TODO

### 優先度高
- [ ] problems.json の `floorAreaMin` / `floorAreaMax` への移行（現在 `floorArea` 単値のみ）
- [ ] サーバーサイド保存（現状はlocalStorageのみ）

### 中期
- [ ] ユーザー認証・アカウント管理
- [ ] エスキスの公開・ギャラリー機能
- [ ] 掲示板機能
- [ ] SNSシェア（エスキス画像をXへ）

### 学習コンテンツ（各 docs/*.md 参照）
- [ ] フラッシュカード実装
- [ ] 解き方Tips実装
- [ ] 計算トレーニング実装
- [ ] 法規コラム実装
- [ ] 詳細図トレーニング実装

### その他
- [ ] ポイント経済の実装
- [ ] 学科一問一答ドリル
- [ ] 本年度試験課題タブ（試験後解放）
- [ ] problems.json の課題追加（現状5問）

---

以上。よろしくお願いします。
