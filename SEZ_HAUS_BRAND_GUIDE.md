# SEZ HAUS — ブランドガイド & 実装仕様書

> 二級建築士 製図・エスキス独学プラットフォーム
> このドキュメントはClaude Codeに渡してそのまま実装に着手できるようにまとめた仕様書です。

---

## 0. プロジェクト概要

| 項目 | 内容 |
|---|---|
| サービス名 | **SEZ HAUS**（セズハウス） |
| 読み | セズハウス |
| サブタイトル | 二級建築士の製図室 |
| ターゲット | 二級建築士 製図試験の独学受験者 |
| 主要機能 | エスキス練習 / UGCコミュニティ / ポイント経済 / AI採点 |
| デザイン基調 | **バウハウス × 製図** |
| 技術スタック | フロント：任意 / Vercel / Supabase（PostgreSQL） |

---

## 1. ブランドアイデンティティ

### 1.1 命名の構造

```
BAU + HAUS  ← バウハウス（建築 + 家）
SEZ + HAUS  ← セズハウス（製図 + 家）
```

「製図の家＝学びの場・コミュニティ」というメタファー。バウハウスへのオマージュであり、文法構造的に完全パラレル。

### 1.2 表記ルール

| 用途 | 表記 |
|---|---|
| ロゴ・正式名 | **SEZ HAUS**（大文字、半角スペース区切り） |
| 本文中の表記 | SEZ HAUS |
| 略称 | SEZ |
| URL | sezhaus.com / sezhaus.jp |
| SNSハンドル | @sezhaus |
| ハッシュタグ | #sezhaus #セズハウス |
| ファイル名・変数名 | `sezhaus`（小文字、スペースなし） |
| 動詞化 | セズる（例：「今日セズった？」） |
| ユーザー呼称 | セズ民 / セズ友 |
| コミュニティ呼称 | セズ部 / セズ会 |

### 1.3 タグライン候補

```
SEZ HAUS — 二級建築士の製図室
SEZ HAUS — 二級建築士 製図・エスキス独学プラットフォーム
SEZ HAUS — エスキスを、毎日の習慣に。
```

---

## 2. デザイントークン

### 2.1 カラーパレット

```css
:root {
  /* Bauhaus primary palette */
  --bauhaus-red:    #E63946;  /* 強アクセント・CTA */
  --bauhaus-blue:   #1D3557;  /* 補助アクセント */
  --bauhaus-yellow: #F1C40F;  /* タグ・ハイライト */

  /* Neutrals */
  --bauhaus-black:  #0A0A0A;  /* テキスト・線・パネル */
  --bauhaus-white:  #F5F2EB;  /* メイン背景（ややクリーム寄り） */
  --bauhaus-cream:  #EDE7D8;  /* セカンダリ背景 */

  /* Drafting grid */
  --grid-line:      #C9C2B0;  /* 細目グリッド線 */
  --grid-major:     #A8A08C;  /* 太目グリッド線 */
}
```

#### 使用比率の目安

| 色 | 比率 | 用途 |
|---|---|---|
| white / cream | 70% | 背景 |
| black | 20% | テキスト・線・パネル |
| red | 5% | CTA・強調・アクセント |
| yellow | 3% | タグ・ハイライト |
| blue | 2% | 補助アクセント・情報帯 |

**禁則事項**：
- 純白（#FFFFFF）は使わない。必ず `--bauhaus-white` (#F5F2EB) を使う
- パステル・グラデーション・ドロップシャドウは使わない
- 半透明・ぼかし・グロー効果は使わない

### 2.2 タイポグラフィ

```css
/* Display: ロゴ・見出し */
font-family: 'Archivo Black', sans-serif;
/* Body: 本文 */
font-family: 'Noto Sans JP', sans-serif;
/* Mono: メタ情報・数値・ラベル */
font-family: 'DM Mono', monospace;
```

#### Google Fonts 読み込み

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Mono:wght@400;500&family=Noto+Sans+JP:wght@300;400;700;900&display=swap" rel="stylesheet">
```

#### タイポグラフィスケール

| トークン | サイズ | 用途 | フォント |
|---|---|---|---|
| `--text-display-xl` | 64-80px | ヒーロー見出し | Archivo Black |
| `--text-display-lg` | 48-56px | ロゴ・大見出し | Archivo Black |
| `--text-display-md` | 32-40px | セクション見出し | Archivo Black |
| `--text-heading` | 24px | 見出し | Archivo Black |
| `--text-body-lg` | 18px | リード文 | Noto Sans JP 400 |
| `--text-body` | 16px | 本文 | Noto Sans JP 400 |
| `--text-caption` | 14px | キャプション | Noto Sans JP 400 |
| `--text-meta` | 10-12px | メタ情報・ラベル | DM Mono 400 |

#### タイポグラフィルール

- 見出しは**全て大文字**（`text-transform: uppercase`）
- メタ情報の `letter-spacing` は **2-4px**（DM Monoに広めのトラッキング）
- 本文の `line-height` は **1.7**
- 見出しの `line-height` は **0.85-0.95**（タイト目）
- 数字・英字メタは必ずDM Mono

### 2.3 スペーシング

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
}
```

### 2.4 ボーダー・線

```css
:root {
  --border-thin: 1px solid var(--bauhaus-black);
  --border-medium: 2px solid var(--bauhaus-black);
  --border-thick: 3px solid var(--bauhaus-black);
}
```

**ルール**：
- 角丸は基本使わない（`border-radius: 0`）
- 例外：丸いシンボル（赤丸など）、製図記号としての円のみ
- 影は使わない（バウハウスは平面構成）

---

## 3. ロゴ仕様

### 3.1 メインロゴ：Bauhaus Grid（Sparse）

製図用紙の方眼を背景に、四隅に小さくバウハウスカラーの色ブロックを散らし、中央に **SEZ | HAUS** を白マットで配置する構成。

#### HTML構造

```html
<div class="logo">
  <div class="logo-grid">
    <!-- 10×7のグリッドセルをJSで生成 -->
  </div>
  <div class="logo-mat"></div>
  <div class="logo-wordmark">
    <span>SEZ</span>
    <span class="logo-sep"></span>
    <span>HAUS</span>
  </div>
</div>
```

#### CSS仕様

```css
.logo {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3; /* または運用に合わせて変更 */
  background: var(--bauhaus-white);
  border: var(--border-thin);
  overflow: hidden;
}

.logo-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(7, 1fr);
  z-index: 0;
}

.logo-grid > div {
  border: 1px solid var(--grid-line);
}

/* 色付きセル */
.logo-grid .cell-red    { background: var(--bauhaus-red);    border-color: var(--bauhaus-red); }
.logo-grid .cell-yellow { background: var(--bauhaus-yellow); border-color: var(--bauhaus-yellow); }
.logo-grid .cell-blue   { background: var(--bauhaus-blue);   border-color: var(--bauhaus-blue); }
.logo-grid .cell-black  { background: var(--bauhaus-black);  border-color: var(--bauhaus-black); }

/* 中央の白マット（文字背景の可読性確保） */
.logo-mat {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}
.logo-mat::before {
  content: '';
  display: block;
  width: 88%;
  height: 34%;
  background: var(--bauhaus-white);
  border-top: 1px solid var(--grid-line);
  border-bottom: 1px solid var(--grid-line);
}

/* ワードマーク */
.logo-wordmark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(32px, 6vw, 64px);
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--bauhaus-black);
  line-height: 1;
  gap: 28px;
  background: var(--bauhaus-white);
  padding: 14px 28px;
  border: var(--border-medium);
  /* wordmark本体だけwhite背景にしたい場合は追加でラッパーを切る */
}
.logo-wordmark .logo-sep {
  display: inline-block;
  width: 6px;
  height: 32px;
  background: var(--bauhaus-red);
}
```

#### 色付きセルの座標マップ

10列×7行のグリッドで、以下のセルに色を付ける（`row,col` 形式、0-indexed）：

```js
// メインロゴのカラーセル配置
const LOGO_CELLS = {
  // top-left cluster
  "0,0": "red",
  "1,1": "yellow",
  "0,3": "black",
  // top-right cluster
  "0,7": "blue",
  "1,8": "red",
  "0,9": "yellow",
  // bottom-left cluster
  "6,0": "blue",
  "5,1": "black",
  "6,2": "red",
  // bottom-right cluster
  "5,8": "yellow",
  "6,9": "black",
  "6,6": "blue",
  // mid edges
  "2,0": "yellow",
  "4,9": "red"
};
```

#### Reactコンポーネント実装例

```jsx
// components/SezHausLogo.jsx
const LOGO_CELLS = {
  "0,0": "red",   "1,1": "yellow", "0,3": "black",
  "0,7": "blue",  "1,8": "red",    "0,9": "yellow",
  "6,0": "blue",  "5,1": "black",  "6,2": "red",
  "5,8": "yellow","6,9": "black",  "6,6": "blue",
  "2,0": "yellow","4,9": "red",
};

export function SezHausLogo({ cols = 10, rows = 7, className = "" }) {
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = LOGO_CELLS[`${r},${c}`];
      cells.push(
        <div
          key={`${r}-${c}`}
          className={color ? `logo-cell-${color}` : ""}
        />
      );
    }
  }

  return (
    <div className={`sez-haus-logo ${className}`}>
      <div
        className="sez-haus-logo__grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells}
      </div>
      <div className="sez-haus-logo__mat" />
      <div className="sez-haus-logo__wordmark">
        <span>SEZ</span>
        <span className="sez-haus-logo__sep" />
        <span>HAUS</span>
      </div>
    </div>
  );
}
```

### 3.2 ロゴ運用ルール

- **最小サイズ**：横幅120px以上で使用（それ以下は3.3のシンプル版を使う）
- **余白**：ロゴの周囲に最低でも `S`（SEZのS）の半分の高さ分の余白を確保
- **背景**：原則 `--bauhaus-white` または `--bauhaus-cream`。それ以外の色背景に置く場合はモノクロ反転版を使う
- **変形禁止**：縦横比の歪み、傾き、影付け、グラデーション化はしない

### 3.3 シンプルロゴ（小サイズ用）

faviconやアプリアイコン、SNSアイコンなど、小サイズで使う場合：

```html
<div class="sez-haus-logo-mini">
  <span>SEZ</span>
  <span class="sep"></span>
  <span>HAUS</span>
</div>
```

```css
.sez-haus-logo-mini {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'Archivo Black', sans-serif;
  font-size: 24px;
  text-transform: uppercase;
  color: var(--bauhaus-black);
  background: var(--bauhaus-white);
  padding: 8px 14px;
  border: var(--border-medium);
}
.sez-haus-logo-mini .sep {
  width: 4px;
  height: 16px;
  background: var(--bauhaus-red);
}
```

---

## 4. UIコンポーネント仕様

### 4.1 ボタン

#### Primary Button（CTA）

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--bauhaus-black);
  color: var(--bauhaus-white);
  font-family: 'Archivo Black', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: var(--border-medium);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.btn-primary:hover {
  background: var(--bauhaus-red);
  border-color: var(--bauhaus-red);
}
.btn-primary::after {
  content: '→';
  margin-left: 4px;
}
```

#### Secondary Button

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: var(--bauhaus-white);
  color: var(--bauhaus-black);
  font-family: 'Archivo Black', sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: var(--border-medium);
  cursor: pointer;
}
.btn-secondary:hover {
  background: var(--bauhaus-yellow);
}
```

### 4.2 タグ・バッジ

```css
/* Yellow tag (デフォルト) */
.tag {
  display: inline-block;
  padding: 4px 10px;
  background: var(--bauhaus-yellow);
  color: var(--bauhaus-black);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 1.5px solid var(--bauhaus-black);
}

/* Red badge (強調) */
.badge-red {
  display: inline-block;
  padding: 4px 10px;
  background: var(--bauhaus-red);
  color: var(--bauhaus-white);
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
```

### 4.3 カード

```css
.card {
  background: var(--bauhaus-white);
  border: var(--border-medium);
  padding: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-thin);
  padding-bottom: 12px;
  margin-bottom: 16px;
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
```

### 4.4 セクションヘッダー

```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: var(--border-medium);
  padding-bottom: 24px;
  margin-bottom: 48px;
}
.section-header__title {
  font-family: 'Archivo Black', sans-serif;
  font-size: clamp(32px, 5vw, 56px);
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: -1px;
}
.section-header__meta {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-align: right;
  line-height: 1.6;
}
```

### 4.5 製図モチーフ要素

#### グリッド背景（製図用紙）

```css
.drafting-paper {
  background-color: var(--bauhaus-white);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
    linear-gradient(var(--grid-major) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-major) 1px, transparent 1px);
  background-size:
    20px 20px,
    20px 20px,
    100px 100px,
    100px 100px;
}
```

#### 寸法線（dimension line）

```html
<div class="dim-line">
  <span class="dim-tick-l"></span>
  <span class="dim-line-bar"></span>
  <span class="dim-label">W=210</span>
  <span class="dim-line-bar"></span>
  <span class="dim-tick-r"></span>
</div>
```

```css
.dim-line {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dim-tick-l, .dim-tick-r {
  width: 1px;
  height: 16px;
  background: var(--bauhaus-black);
}
.dim-line-bar {
  flex: 1;
  height: 1px;
  background-image: linear-gradient(90deg, var(--bauhaus-black) 70%, transparent 70%);
  background-size: 6px 1px;
  background-repeat: repeat-x;
}
.dim-label {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 1px;
}
```

#### 通り芯マーカー

```html
<div class="axis-marker">X1</div>
```

```css
.axis-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 1.5px solid var(--bauhaus-black);
  border-radius: 50%;
  background: var(--bauhaus-white);
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  font-weight: 500;
}
.axis-marker--accent {
  background: var(--bauhaus-red);
  color: var(--bauhaus-white);
  border-color: var(--bauhaus-red);
}
```

---

## 5. レイアウト原則

### 5.1 グリッドシステム

- **デスクトップ**：12カラムグリッド、最大幅 1400px、左右余白 40px
- **タブレット**：8カラムグリッド、左右余白 32px
- **モバイル**：4カラムグリッド、左右余白 20px

### 5.2 ページ構成のパターン

#### バウハウス的構成主義の原則

1. **非対称配置を恐れない**：左右対称より、意図的な重心の偏りを優先
2. **大きな空白と密度のコントラスト**：余白の大きいセクションと情報密度の高いセクションを交互に
3. **斜め線・斜めブロックの活用**：水平垂直だけでなく、たまに対角要素を入れる
4. **メタ情報の常時表示**：右上に座標、左下にスケール、フッターに「N°02 / EST. 2026」など、製図文脈の情報を要素として配置

### 5.3 ヒーローセクションの推奨構成

```
+--------------------------------------------------+
| [メタ情報: SHEET 01 / SCALE 1:1]      [N° 001]  |
|                                                  |
|        SEZ HAUS                                  |
|        ━━━━━━━━━━━━━━                            |
|        二級建築士の製図室                         |
|                                                  |
|        [CTA: 始める →]   [Secondary: 詳細を見る] |
|                                                  |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
| ● 二級建築士 製図 / EST. 2026         [スクロール↓] |
+--------------------------------------------------+
```

---

## 6. ライティング・トーン

### 6.1 文章のトーン

- **基本**：簡潔・機能的・余白を活かす（バウハウスの "Form follows function"）
- **見出し**：英大文字またはタイトルケース、無駄な装飾語を排する
- **本文**：である調ではなく **です・ます調**（学習者へのフレンドリーさ）
- **コミュニティ**：カジュアルでユーモアのあるコピーOK（ハコジムの世界観参照）

### 6.2 マイクロコピー例

| シーン | コピー例 |
|---|---|
| CTA（メイン） | 始める / 練習する / セズる |
| CTA（セカンダリ） | 詳細を見る / 課題一覧へ |
| 空状態 | まだ図面がありません。最初の一枚を描きましょう。 |
| ローディング | エスキス中... / 製図中... |
| エラー | 図面の読み込みに失敗しました。 |
| 成功 | 提出完了。お疲れさまでした。 |

### 6.3 NGワード・避けるべき表現

- 「すごい」「めちゃくちゃ」など主観的形容詞
- 「ユーザー様」「お客様各位」など堅苦しい敬称（→「あなた」「みなさん」）
- 「AI搭載」「次世代」などバズワード
- 「革命的」「画期的」など誇張表現

---

## 7. アセット・実装の優先順位

Claude Codeで実装する場合の推奨順序：

1. **`globals.css`** にCSS変数（カラー・タイポグラフィ・スペース）を定義
2. **Google Fontsの読み込み**（layout.tsx の head に追加）
3. **`<SezHausLogo />`** コンポーネントの実装（3.1 のコードを使用）
4. **共通UIコンポーネント**：Button, Tag, Card, SectionHeader
5. **製図モチーフユーティリティ**：drafting-paper, dim-line, axis-marker
6. **ヒーローセクション**：5.3 のレイアウト
7. **ページレイアウト**：ヘッダー / フッター / 共通レイアウト

---

## 8. 参考：実装チェックリスト

- [ ] CSS変数で全カラーが管理されている
- [ ] `Inter` `Roboto` `Arial` などの汎用フォントを使っていない
- [ ] 純白 `#FFFFFF` を使っていない（必ず `#F5F2EB`）
- [ ] `border-radius` が原則 `0`（例外は丸い記号のみ）
- [ ] `box-shadow` が使われていない
- [ ] グラデーションが使われていない
- [ ] 見出しが大文字 + DM Monoのメタ情報がある
- [ ] レスポンシブ対応（モバイルで `clamp()` を使ったタイポグラフィ）
- [ ] ロゴの周囲に十分な余白がある

---

## 9. ブランドの "魂"

> SEZ HAUSは、製図用紙の上に立ち上がる学びの場である。
>
> バウハウスが100年前にやったように、
> 機能と美を分離せず、装飾を排し、構造そのものを表現とする。
>
> 受験生は孤独ではない。SEZ HAUSは「製図の家」であり、
> 描き、議論し、評価し合う共同体である。

このトーンを実装の細部にまで反映してください。

---

**END OF SPEC**
