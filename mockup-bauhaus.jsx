import { useState } from "react";

/* ═══════════════════════════════════════════════════════
   BAUHAUS — 原色 × 幾何学 × 機能主義
   赤 / 青 / 黄 + 黒白  /  円・三角・正方形
   ═══════════════════════════════════════════════════════ */

const C = {
  bg: "#ebe7dc",           // ライトベージュ（ドイツ工房の紙）
  surface: "#faf7f0",
  ink: "#1a1a1a",
  inkSoft: "#555555",
  rule: "#d4cfc0",
  red: "#d3312a",          // バウハウス赤
  blue: "#2952c8",         // バウハウス青
  yellow: "#f5c518",       // バウハウス黄
  redSoft: "#e88078",
  blueSoft: "#7c93d9",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;900&family=Noto+Sans+JP:wght@400;500;700;900&display=swap');
`;

const SANS = "'Archivo', 'Noto Sans JP', sans-serif";
const JP = "'Noto Sans JP', sans-serif";

/* 幾何学プリミティブ */
const Circle = ({size=12, color=C.red, style={}}) => (
  <div style={{
    width:size, height:size, borderRadius:"50%",
    background:color, flexShrink:0, ...style
  }}/>
);

const Square = ({size=12, color=C.blue, style={}}) => (
  <div style={{
    width:size, height:size,
    background:color, flexShrink:0, ...style
  }}/>
);

const Triangle = ({size=12, color=C.yellow, style={}}) => (
  <div style={{
    width:0, height:0,
    borderLeft:`${size/2}px solid transparent`,
    borderRight:`${size/2}px solid transparent`,
    borderBottom:`${size}px solid ${color}`,
    flexShrink:0,
    ...style
  }}/>
);

/* セクション見出し — 番号 + 太いタイトル + 水平ルール */
const SectionHead = ({num, title, shape}) => (
  <div style={{marginBottom:"16px"}}>
    <div style={{display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px"}}>
      {shape}
      <span style={{
        fontFamily:SANS, fontSize:"11px", fontWeight:700,
        color:C.ink, letterSpacing:"0.15em"
      }}>
        {String(num).padStart(2,"0")}
      </span>
      <div style={{flex:1, height:"2px", background:C.ink}}/>
    </div>
    <div style={{
      fontFamily:JP, fontSize:"22px", fontWeight:900,
      color:C.ink, letterSpacing:"0.02em", lineHeight:1.1
    }}>{title}</div>
  </div>
);

const Avatar = ({name, size=28, color=C.ink}) => (
  <div style={{
    width:size, height:size, borderRadius:"50%",
    background:color, color:C.surface,
    display:"flex", alignItems:"center", justifyContent:"center",
    fontFamily:SANS, fontSize:size*0.42, fontWeight:700,
    flexShrink:0,
  }}>{name[0]}</div>
);

/* ─────────── HOME ─────────── */
const HomeScreen = ({setScreen}) => (
  <div style={{display:"flex", flexDirection:"column", gap:"28px"}}>

    {/* カウントダウン — 黒正方形 + 黄色円 */}
    <div style={{position:"relative"}}>
      <div style={{
        background:C.ink, color:C.surface,
        padding:"24px 20px",
        position:"relative", overflow:"hidden"
      }}>
        {/* 装飾幾何学 */}
        <div style={{
          position:"absolute", top:"-20px", right:"-20px",
          width:"80px", height:"80px", borderRadius:"50%",
          background:C.yellow
        }}/>
        <div style={{
          position:"absolute", bottom:"-10px", right:"40px",
          width:"30px", height:"30px",
          background:C.red
        }}/>

        <div style={{position:"relative"}}>
          <div style={{
            fontFamily:SANS, fontSize:"10px", fontWeight:700,
            color:C.yellow, letterSpacing:"0.2em", marginBottom:"6px"
          }}>
            COUNTDOWN
          </div>
          <div style={{fontFamily:JP, fontSize:"11px", color:"#999", marginBottom:"8px"}}>
            令和八年度 製図試験まで
          </div>
          <div style={{display:"flex", alignItems:"baseline", gap:"4px"}}>
            <span style={{
              fontFamily:SANS, fontSize:"72px", fontWeight:900,
              lineHeight:1, letterSpacing:"-0.04em"
            }}>156</span>
            <span style={{fontFamily:JP, fontSize:"18px", fontWeight:500, color:"#ccc", marginLeft:"6px"}}>日</span>
          </div>
          <div style={{
            fontFamily:SANS, fontSize:"11px", fontWeight:500,
            color:"#999", marginTop:"6px", letterSpacing:"0.05em"
          }}>
            2026 / 09 / 20 日曜日
          </div>
        </div>
      </div>
    </div>

    {/* 3メトリクス — プライマリカラーのブロック */}
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"6px"}}>
      {[
        {label:"ポイント", value:"1,280", color:C.yellow, textColor:C.ink},
        {label:"提出", value:"12", color:C.red, textColor:C.surface},
        {label:"順位", value:"34", color:C.blue, textColor:C.surface},
      ].map((s,i) => (
        <div key={i} style={{
          background:s.color, color:s.textColor,
          padding:"14px 12px",
        }}>
          <div style={{
            fontFamily:JP, fontSize:"11px", fontWeight:700,
            letterSpacing:"0.05em", marginBottom:"6px", opacity:0.85
          }}>
            {s.label}
          </div>
          <div style={{
            fontFamily:SANS, fontSize:"24px", fontWeight:900,
            lineHeight:1, letterSpacing:"-0.03em"
          }}>{s.value}</div>
        </div>
      ))}
    </div>

    {/* 課題リスト */}
    <div>
      <SectionHead num={1} title="本日の演習" shape={<Circle size={14} color={C.red}/>}/>

      <div style={{display:"flex", flexDirection:"column"}}>
        {[
          {n:"01", title:"専用住宅", sub:"木造2階建て", diff:3, subs:48, tag:"標準", tagColor:C.blue},
          {n:"02", title:"併用住宅", sub:"木造2階建て", diff:4, subs:31, tag:"応用", tagColor:C.red},
          {n:"03", title:"二世帯住宅", sub:"木造2階建て", diff:4, subs:22, tag:"応用", tagColor:C.red},
        ].map((p,i) => (
          <div key={i} onClick={()=>setScreen(1)} style={{
            display:"grid",
            gridTemplateColumns:"42px 1fr auto",
            gap:"14px",
            padding:"14px 0",
            borderBottom:`1px solid ${C.rule}`,
            cursor:"pointer", alignItems:"center",
          }}>
            {/* 番号ブロック */}
            <div style={{
              width:"42px", height:"42px",
              background:C.ink, color:C.yellow,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:SANS, fontSize:"16px", fontWeight:700,
            }}>{p.n}</div>

            <div>
              <div style={{display:"flex", alignItems:"center", gap:"8px", marginBottom:"4px"}}>
                <span style={{
                  background:p.tagColor, color:C.surface,
                  fontFamily:JP, fontSize:"10px", fontWeight:700,
                  padding:"2px 8px", letterSpacing:"0.08em"
                }}>{p.tag}</span>
                <div style={{display:"flex", gap:"3px"}}>
                  {[...Array(5)].map((_,j)=>(
                    <div key={j} style={{
                      width:"6px", height:"6px", borderRadius:"50%",
                      background:j<p.diff?C.ink:C.rule
                    }}/>
                  ))}
                </div>
              </div>
              <div style={{fontFamily:JP, fontSize:"15px", fontWeight:700, color:C.ink}}>
                {p.title}
              </div>
              <div style={{fontFamily:JP, fontSize:"11px", color:C.inkSoft, marginTop:"1px"}}>
                {p.sub}
              </div>
            </div>

            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:SANS, fontSize:"18px", fontWeight:700, color:C.ink, lineHeight:1}}>
                {p.subs}
              </div>
              <div style={{fontFamily:JP, fontSize:"9px", color:C.inkSoft, marginTop:"3px"}}>
                件の提出
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* アクティビティ */}
    <div>
      <SectionHead num={2} title="仲間の動き" shape={<Square size={12} color={C.blue}/>}/>

      <div style={{display:"flex", flexDirection:"column", gap:"4px"}}>
        {[
          {time:"5分前",  user:"田中", action:"エスキスを提出",  target:"課題01",          shape:"circle", color:C.red},
          {time:"12分前", user:"鈴木", action:"アドバイス投稿",  target:"山田さんへ",       shape:"square", color:C.blue},
          {time:"1時間前", user:"山田", action:"掲示板に投稿",    target:"実試験2026",       shape:"triangle", color:C.yellow},
          {time:"2時間前", user:"佐々木", action:"いいねしました", target:"田中さんの図面",   shape:"circle", color:C.ink},
        ].map((a,i) => (
          <div key={i} style={{
            display:"grid", gridTemplateColumns:"16px 1fr auto",
            gap:"12px", padding:"10px 0",
            borderBottom:`1px solid ${C.rule}`, alignItems:"center"
          }}>
            {a.shape==="circle" && <Circle size={10} color={a.color}/>}
            {a.shape==="square" && <Square size={10} color={a.color}/>}
            {a.shape==="triangle" && <Triangle size={10} color={a.color}/>}

            <div style={{fontFamily:JP, fontSize:"12px", color:C.ink, lineHeight:1.5}}>
              <span style={{fontWeight:700}}>{a.user}</span>
              <span style={{color:C.inkSoft}}>さんが{a.action}</span>
              <span style={{color:a.color, fontWeight:700, marginLeft:"4px"}}>{a.target}</span>
            </div>

            <span style={{fontFamily:SANS, fontSize:"10px", color:C.inkSoft, fontWeight:500}}>
              {a.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────── EXERCISES ─────────── */
const ExerciseScreen = () => {
  const [tab, setTab] = useState(0);
  const problems = [
    {id:"01", title:"専用住宅", sub:"木造2階建て", meta:"南道路 / 延床120㎡以内 / 4人家族", diff:3, tag:"標準", tagColor:C.blue, subs:48, rooms:4, accentColor:C.yellow},
    {id:"02", title:"併用住宅", sub:"木造2階建て", meta:"角地 / 1F店舗+2F住居 / バリアフリー", diff:4, tag:"応用", tagColor:C.red, subs:31, rooms:6, accentColor:C.red},
    {id:"03", title:"二世帯住宅", sub:"木造2階建て", meta:"東道路 / 共用玄関型 / 6人家族", diff:4, tag:"応用", tagColor:C.red, subs:22, rooms:7, accentColor:C.blue},
    {id:"04", title:"事務所併用", sub:"木造2階建て", meta:"西道路 / バリアフリー / 3人家族", diff:4, tag:"応用", tagColor:C.red, subs:15, rooms:5, accentColor:C.yellow},
    {id:"05", title:"共同住宅", sub:"木造2階建て", meta:"北道路 / 2住戸 / 独立型", diff:3, tag:"標準", tagColor:C.blue, subs:38, rooms:6, accentColor:C.red},
  ];

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"22px"}}>
      <SectionHead num="A" title="演習課題" shape={<Triangle size={14} color={C.yellow}/>}/>

      {/* タブ */}
      <div style={{display:"flex", gap:"0", background:C.ink, padding:"3px"}}>
        {["演習課題","本試験"].map((t,i) => (
          <button key={i} onClick={()=>setTab(i)} style={{
            flex:1, padding:"8px 0", border:"none",
            background: tab===i ? C.yellow : "transparent",
            color: tab===i ? C.ink : C.surface,
            fontFamily:JP, fontSize:"12px", fontWeight:700,
            letterSpacing:"0.08em", cursor:"pointer",
          }}>{t}</button>
        ))}
      </div>

      {tab===0 ? (
        <div style={{display:"flex", flexDirection:"column", gap:"0"}}>
          {problems.map((p,idx) => (
            <div key={p.id} style={{
              position:"relative",
              padding:"18px 0",
              borderBottom: idx<problems.length-1 ? `2px solid ${C.ink}` : "none",
              cursor:"pointer"
            }}>
              {/* 大番号 + アクセント図形 */}
              <div style={{display:"flex", gap:"14px", marginBottom:"14px"}}>
                <div style={{position:"relative", flexShrink:0}}>
                  <div style={{
                    width:"60px", height:"60px",
                    background:C.ink, color:C.surface,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontFamily:SANS, fontSize:"26px", fontWeight:900,
                    letterSpacing:"-0.02em"
                  }}>{p.id}</div>
                  {/* 装飾円 */}
                  <div style={{
                    position:"absolute", top:"-6px", right:"-6px",
                    width:"18px", height:"18px", borderRadius:"50%",
                    background:p.accentColor
                  }}/>
                </div>

                <div style={{flex:1}}>
                  <div style={{display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px"}}>
                    <span style={{
                      background:p.tagColor, color:C.surface,
                      fontFamily:JP, fontSize:"10px", fontWeight:700,
                      padding:"2px 8px", letterSpacing:"0.08em"
                    }}>{p.tag}</span>
                    <div style={{display:"flex", gap:"3px"}}>
                      {[...Array(5)].map((_,j)=>(
                        <div key={j} style={{
                          width:"6px", height:"6px", borderRadius:"50%",
                          background:j<p.diff?C.ink:C.rule
                        }}/>
                      ))}
                    </div>
                  </div>
                  <div style={{fontFamily:JP, fontSize:"20px", fontWeight:900, color:C.ink, lineHeight:1.2}}>
                    {p.title}
                  </div>
                  <div style={{fontFamily:JP, fontSize:"12px", color:C.inkSoft, marginTop:"2px"}}>
                    {p.sub}
                  </div>
                </div>
              </div>

              {/* メタ情報 */}
              <div style={{
                fontFamily:JP, fontSize:"11px", color:C.inkSoft,
                marginBottom:"12px", paddingLeft:"2px",
                borderLeft:`3px solid ${p.accentColor}`, paddingLeft:"10px"
              }}>
                {p.meta}
              </div>

              {/* フッター */}
              <div style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                paddingTop:"10px", borderTop:`1px solid ${C.rule}`
              }}>
                <div style={{display:"flex", gap:"20px", fontFamily:SANS}}>
                  <div>
                    <div style={{fontSize:"9px", color:C.inkSoft, fontFamily:JP, fontWeight:500}}>要求室</div>
                    <div style={{fontSize:"16px", fontWeight:700, color:C.ink}}>{p.rooms}</div>
                  </div>
                  <div>
                    <div style={{fontSize:"9px", color:C.inkSoft, fontFamily:JP, fontWeight:500}}>提出数</div>
                    <div style={{fontSize:"16px", fontWeight:700, color:C.ink}}>{p.subs}</div>
                  </div>
                </div>
                <button style={{
                  background:C.ink, color:C.surface,
                  border:"none", padding:"10px 18px",
                  fontFamily:JP, fontSize:"12px", fontWeight:700,
                  letterSpacing:"0.08em", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:"8px"
                }}>
                  演習を始める
                  <Triangle size={8} color={C.yellow} style={{transform:"rotate(90deg)"}}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{padding:"50px 20px", textAlign:"center", position:"relative"}}>
          <div style={{
            width:"80px", height:"80px", margin:"0 auto 20px",
            background:C.red, borderRadius:"50%", position:"relative"
          }}>
            <div style={{
              position:"absolute", top:"50%", left:"50%",
              transform:"translate(-50%,-50%)",
              fontFamily:JP, fontSize:"26px", fontWeight:900, color:C.surface
            }}>封</div>
          </div>
          <div style={{fontFamily:JP, fontSize:"18px", fontWeight:900, color:C.ink, marginBottom:"8px"}}>
            令和八年度 本試験課題
          </div>
          <div style={{fontFamily:JP, fontSize:"12px", color:C.inkSoft, marginBottom:"16px"}}>
            試験終了後に公開されます
          </div>
          <div style={{
            display:"inline-block", background:C.yellow, color:C.ink,
            fontFamily:SANS, fontSize:"12px", fontWeight:700,
            padding:"6px 14px", letterSpacing:"0.1em"
          }}>2026 / 09 / 20 公開</div>
        </div>
      )}
    </div>
  );
};

/* ─────────── GALLERY ─────────── */
const GalleryScreen = () => {
  const [filter, setFilter] = useState("すべて");
  const works = [
    {user:"田中", course:"課題01", time:"2時間前", likes:8,  comments:3,  checked:true,  score:92, bg:C.yellow},
    {user:"鈴木", course:"課題03", time:"5時間前", likes:15, comments:7,  checked:true,  score:87, bg:C.blueSoft},
    {user:"山田", course:"課題02", time:"1日前",  likes:4,  comments:1,  checked:false, score:null, bg:C.redSoft},
    {user:"佐々木", course:"課題01", time:"2日前", likes:22, comments:12, checked:true,  score:95, bg:C.yellow},
  ];

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"22px"}}>
      <SectionHead num="B" title="展示室" shape={<Circle size={14} color={C.blue}/>}/>

      {/* フィルター */}
      <div style={{display:"flex", gap:"6px", flexWrap:"wrap"}}>
        {["すべて","課題01","課題02","課題03"].map(f => (
          <button key={f} onClick={()=>setFilter(f)} style={{
            padding:"6px 12px",
            background: filter===f ? C.ink : "transparent",
            color: filter===f ? C.surface : C.ink,
            border:`2px solid ${C.ink}`,
            fontFamily:JP, fontSize:"11px", fontWeight:700,
            letterSpacing:"0.05em", cursor:"pointer",
          }}>{f}</button>
        ))}
      </div>

      <div style={{display:"flex", flexDirection:"column", gap:"24px"}}>
        {works.map((w,i) => (
          <div key={i}>
            {/* ヘッダー */}
            <div style={{
              display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px"
            }}>
              <Avatar name={w.user} size={36} color={[C.red,C.blue,C.yellow,C.ink][i%4]}/>
              <div style={{flex:1}}>
                <div style={{fontFamily:JP, fontSize:"14px", fontWeight:700, color:C.ink}}>
                  {w.user}
                </div>
                <div style={{fontFamily:JP, fontSize:"10px", color:C.inkSoft, marginTop:"1px"}}>
                  {w.course}　·　{w.time}
                </div>
              </div>
              {w.checked && (
                <div style={{
                  display:"flex", alignItems:"center", gap:"5px",
                  background:C.blue, color:C.surface,
                  fontFamily:JP, fontSize:"10px", fontWeight:700,
                  padding:"3px 8px", letterSpacing:"0.08em"
                }}>
                  <Circle size={6} color={C.surface}/>
                  検査済
                </div>
              )}
            </div>

            {/* 図面プレビュー */}
            <div style={{
              background:w.bg, position:"relative",
              border:`2px solid ${C.ink}`,
              aspectRatio:"5/3", padding:"14px",
              overflow:"hidden"
            }}>
              {/* 装飾図形（バウハウス的） */}
              <div style={{
                position:"absolute", top:"-15px", left:"-15px",
                width:"40px", height:"40px", borderRadius:"50%",
                background:C.red, opacity:0.9
              }}/>

              <svg viewBox="0 0 200 120" style={{width:"100%", height:"100%", position:"relative"}}>
                <rect x="10" y="10" width="80" height="50" fill={C.surface} stroke={C.ink} strokeWidth="1.5"/>
                <rect x="90" y="10" width="100" height="50" fill={C.surface} stroke={C.ink} strokeWidth="1.5"/>
                <rect x="10" y="60" width="60" height="50" fill={C.surface} stroke={C.ink} strokeWidth="1.5"/>
                <rect x="70" y="60" width="120" height="50" fill={C.surface} stroke={C.ink} strokeWidth="1.5"/>
                <text x="50" y="38" textAnchor="middle" fontSize="8" fill={C.ink} fontFamily={JP} fontWeight="700">和室</text>
                <text x="140" y="40" textAnchor="middle" fontSize="9" fill={C.ink} fontFamily={JP} fontWeight="700">LDK</text>
                <text x="40" y="90" textAnchor="middle" fontSize="7" fill={C.ink} fontFamily={JP} fontWeight="700">玄関</text>
                <text x="130" y="90" textAnchor="middle" fontSize="8" fill={C.ink} fontFamily={JP} fontWeight="700">水廻り</text>
              </svg>

              {w.score && (
                <div style={{
                  position:"absolute", bottom:"8px", right:"8px",
                  background:C.ink, color:C.yellow,
                  fontFamily:SANS, fontSize:"12px", fontWeight:700,
                  padding:"4px 8px", letterSpacing:"0.05em"
                }}>{w.score}/100</div>
              )}
            </div>

            {/* リアクション */}
            <div style={{
              display:"flex", gap:"16px", alignItems:"center",
              paddingTop:"12px", fontFamily:SANS
            }}>
              <button style={{
                display:"flex", alignItems:"center", gap:"6px",
                background:"transparent", border:"none", cursor:"pointer",
                fontFamily:JP, fontSize:"12px", fontWeight:700, color:C.ink
              }}>
                <Circle size={10} color={C.red}/>
                <span>{w.likes}</span>
              </button>
              <button style={{
                display:"flex", alignItems:"center", gap:"6px",
                background:"transparent", border:"none", cursor:"pointer",
                fontFamily:JP, fontSize:"12px", fontWeight:700, color:C.ink
              }}>
                <Square size={10} color={C.blue}/>
                <span>{w.comments}</span>
              </button>
              <span style={{
                marginLeft:"auto",
                fontFamily:SANS, fontSize:"11px", fontWeight:700,
                color:C.ink,
                background:C.yellow, padding:"3px 8px"
              }}>+50pt</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─────────── BOARD ─────────── */
const BoardScreen = () => {
  const [tab, setTab] = useState(1);
  const tabs = [
    {label:"本試験", color:C.red, shape:"circle"},
    {label:"演習課題", color:C.blue, shape:"square"},
    {label:"提出図面", color:C.yellow, shape:"triangle"},
  ];
  const threads = {
    0: [],
    1: [
      {title:"課題01：南側の採光の取り方について", user:"田中", replies:12, time:"3時間前"},
      {title:"課題03：共用玄関の動線で迷っています", user:"木村", replies:8,  time:"6時間前"},
      {title:"課題02：店舗部分の面積配分のコツ", user:"鈴木", replies:15, time:"1日前"},
      {title:"課題01：駐車場2台の配置パターン", user:"高橋", replies:6,  time:"2日前"},
    ],
    2: [
      {title:"田中さんの課題01へのアドバイス求む", user:"田中", replies:7, time:"2時間前"},
      {title:"鈴木さんの課題03 階段位置の改善案", user:"山田", replies:4, time:"8時間前"},
      {title:"初投稿です！課題01やってみました", user:"佐々木", replies:11, time:"1日前"},
    ],
  };

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"22px"}}>
      <SectionHead num="C" title="掲示板" shape={<Square size={14} color={C.red}/>}/>

      {/* タブ — 3色幾何学 */}
      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"3px"}}>
        {tabs.map((t,i) => (
          <button key={i} onClick={()=>setTab(i)} style={{
            padding:"12px 8px", border:"none",
            background: tab===i ? t.color : C.surface,
            color: tab===i ? (t.color===C.yellow?C.ink:C.surface) : C.ink,
            cursor:"pointer", textAlign:"left",
            borderTop:`3px solid ${t.color}`,
            fontFamily:JP
          }}>
            <div style={{marginBottom:"4px"}}>
              {t.shape==="circle" && <Circle size={8} color={tab===i ? (t.color===C.yellow?C.ink:C.surface) : t.color}/>}
              {t.shape==="square" && <Square size={8} color={tab===i ? (t.color===C.yellow?C.ink:C.surface) : t.color}/>}
              {t.shape==="triangle" && <Triangle size={8} color={tab===i ? (t.color===C.yellow?C.ink:C.surface) : t.color}/>}
            </div>
            <div style={{fontSize:"13px", fontWeight:700, letterSpacing:"0.02em"}}>{t.label}</div>
          </button>
        ))}
      </div>

      {tab===0 && (
        <div style={{padding:"40px 20px", textAlign:"center"}}>
          <div style={{
            width:"60px", height:"60px", margin:"0 auto 16px",
            borderRadius:"50%", background:C.red,
            display:"flex", alignItems:"center", justifyContent:"center"
          }}>
            <div style={{width:"20px", height:"20px", background:C.surface}}/>
          </div>
          <div style={{fontFamily:JP, fontSize:"14px", fontWeight:700, color:C.ink, marginBottom:"6px"}}>
            本試験 掲示板
          </div>
          <div style={{fontFamily:JP, fontSize:"11px", color:C.inkSoft}}>
            試験終了後に解放されます（2026/09/20）
          </div>
        </div>
      )}

      {tab!==0 && (
        <div style={{display:"flex", flexDirection:"column"}}>
          {(threads[tab]||[]).map((t,i,arr) => (
            <div key={i} style={{
              display:"grid",
              gridTemplateColumns:"auto 1fr auto",
              gap:"12px",
              padding:"14px 0",
              borderBottom: i<arr.length-1 ? `1px solid ${C.rule}` : "none",
              alignItems:"center", cursor:"pointer"
            }}>
              <div style={{
                width:"28px", height:"28px",
                background:C.ink, color:C.yellow,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:SANS, fontSize:"10px", fontWeight:700,
              }}>{String(i+1).padStart(2,"0")}</div>

              <div>
                <div style={{fontFamily:JP, fontSize:"13px", fontWeight:700, color:C.ink, lineHeight:1.4, marginBottom:"4px"}}>
                  {t.title}
                </div>
                <div style={{display:"flex", gap:"10px", fontFamily:JP, fontSize:"10px", color:C.inkSoft}}>
                  <span>{t.user}</span>
                  <span>·</span>
                  <span style={{color:tabs[tab].color, fontWeight:700}}>返信{t.replies}</span>
                  <span>·</span>
                  <span>{t.time}</span>
                </div>
              </div>
            </div>
          ))}

          <button style={{
            marginTop:"16px",
            padding:"14px",
            background:C.yellow, color:C.ink,
            border:"none",
            fontFamily:JP, fontSize:"12px", fontWeight:700,
            letterSpacing:"0.08em", cursor:"pointer",
          }}>
            ＋ 新しいスレッドを立てる
          </button>
        </div>
      )}
    </div>
  );
};

/* ─────────── PROFILE ─────────── */
const ProfileScreen = () => {
  const [checkOpen, setCheckOpen] = useState(false);

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"28px"}}>

      {/* プロフィール */}
      <div style={{
        background:C.ink, color:C.surface,
        padding:"22px 20px",
        position:"relative", overflow:"hidden"
      }}>
        <div style={{
          position:"absolute", top:"-30px", right:"-30px",
          width:"100px", height:"100px", borderRadius:"50%",
          background:C.yellow
        }}/>
        <div style={{
          position:"absolute", bottom:"-20px", right:"30px",
          width:"40px", height:"40px",
          background:C.red
        }}/>

        <div style={{position:"relative", display:"flex", alignItems:"center", gap:"14px", marginBottom:"20px"}}>
          <div style={{
            width:"60px", height:"60px", background:C.surface, color:C.ink,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:JP, fontSize:"26px", fontWeight:900
          }}>佐</div>
          <div>
            <div style={{fontFamily:SANS, fontSize:"10px", color:C.yellow, fontWeight:700, letterSpacing:"0.2em"}}>
              MEMBER 00342
            </div>
            <div style={{fontFamily:JP, fontSize:"20px", fontWeight:900, color:C.surface, marginTop:"2px"}}>
              佐藤 ユウキ
            </div>
            <div style={{display:"flex", gap:"8px", marginTop:"4px", alignItems:"center"}}>
              <div style={{width:"10px", height:"10px", background:C.yellow}}/>
              <span style={{fontFamily:JP, fontSize:"11px", color:"#ccc"}}>シルバー会員 · 2026年4月〜</span>
            </div>
          </div>
        </div>

        <div style={{position:"relative", display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px"}}>
          {[
            {label:"ポイント", value:"1,280", color:C.yellow},
            {label:"提出数", value:"12", color:C.red},
            {label:"助言数", value:"8", color:C.blue},
          ].map((s,i) => (
            <div key={i}>
              <div style={{width:"12px", height:"12px", background:s.color, marginBottom:"8px"}}/>
              <div style={{fontFamily:JP, fontSize:"10px", color:"#bbb", fontWeight:500, marginBottom:"2px"}}>{s.label}</div>
              <div style={{fontFamily:SANS, fontSize:"22px", fontWeight:900, color:C.surface, lineHeight:1}}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ポイント履歴 */}
      <div>
        <SectionHead num="D" title="ポイント履歴" shape={<Circle size={12} color={C.yellow}/>}/>

        <div style={{display:"flex", flexDirection:"column"}}>
          {[
            {action:"エスキス提出", note:"課題01", time:"2時間前", pts:"+50", plus:true},
            {action:"システム検査を利用", note:"課題01", time:"2時間前", pts:"-30", plus:false},
            {action:"アドバイス投稿", note:"鈴木さんへ", time:"1日前", pts:"+20", plus:true},
            {action:"いいねを獲得", note:"田中さんから", time:"1日前", pts:"+2", plus:true},
            {action:"合格図面を閲覧", note:"2025年 A-07", time:"3日前", pts:"-50", plus:false},
          ].map((h,i,arr) => (
            <div key={i} style={{
              display:"grid", gridTemplateColumns:"12px 1fr auto",
              gap:"12px", padding:"12px 0",
              borderBottom: i<arr.length-1 ? `1px solid ${C.rule}` : "none",
              alignItems:"center"
            }}>
              <div style={{
                width:"10px", height:"10px",
                background: h.plus ? C.blue : C.red,
                borderRadius: h.plus ? "50%" : "0"
              }}/>
              <div>
                <div style={{fontFamily:JP, fontSize:"13px", fontWeight:700, color:C.ink}}>{h.action}</div>
                <div style={{fontFamily:JP, fontSize:"10px", color:C.inkSoft, marginTop:"2px"}}>{h.note}　·　{h.time}</div>
              </div>
              <div style={{
                fontFamily:SANS, fontSize:"16px", fontWeight:900,
                color: h.plus ? C.blue : C.red,
                minWidth:"48px", textAlign:"right"
              }}>{h.pts}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 提出図面 */}
      <div>
        <SectionHead num="E" title="提出した図面" shape={<Square size={12} color={C.red}/>}/>

        <div style={{display:"flex", flexDirection:"column", gap:"8px"}}>
          {[
            {course:"課題01", time:"2時間前", likes:3, checked:true, color:C.yellow},
            {course:"課題03", time:"3日前", likes:7, checked:true, color:C.blue},
            {course:"課題01", time:"5日前", likes:1, checked:false, color:C.red},
          ].map((e,i) => (
            <div key={i} style={{
              display:"grid", gridTemplateColumns:"50px 1fr auto",
              gap:"12px", padding:"12px",
              background: C.surface,
              border:`2px solid ${C.ink}`,
              alignItems:"center"
            }}>
              <div style={{
                width:"50px", height:"36px",
                background:e.color, position:"relative",
                display:"flex", alignItems:"center", justifyContent:"center"
              }}>
                <svg viewBox="0 0 30 20" style={{width:"75%", height:"75%"}}>
                  <rect x="1" y="1" width="12" height="8" fill={C.surface} stroke={C.ink} strokeWidth="0.5"/>
                  <rect x="13" y="1" width="16" height="8" fill={C.surface} stroke={C.ink} strokeWidth="0.5"/>
                  <rect x="1" y="9" width="10" height="10" fill={C.surface} stroke={C.ink} strokeWidth="0.5"/>
                  <rect x="11" y="9" width="18" height="10" fill={C.surface} stroke={C.ink} strokeWidth="0.5"/>
                </svg>
              </div>

              <div>
                <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                  <span style={{fontFamily:JP, fontSize:"13px", fontWeight:700, color:C.ink}}>{e.course}</span>
                  <span style={{fontFamily:JP, fontSize:"10px", color:C.inkSoft}}>{e.time}</span>
                </div>
                <div style={{fontFamily:JP, fontSize:"10px", color:C.inkSoft, marginTop:"2px"}}>
                  ♡ {e.likes}件
                </div>
              </div>

              {e.checked ? (
                <span style={{
                  background:C.blue, color:C.surface,
                  fontFamily:JP, fontSize:"10px", fontWeight:700,
                  padding:"4px 8px", letterSpacing:"0.05em"
                }}>検査済</span>
              ) : (
                <button onClick={()=>setCheckOpen(!checkOpen)} style={{
                  background:C.red, color:C.surface, border:"none",
                  padding:"6px 10px", fontFamily:JP, fontSize:"11px", fontWeight:700,
                  cursor:"pointer", letterSpacing:"0.05em"
                }}>検査する 30pt</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 検査レポート */}
      {checkOpen && (
        <div style={{
          border:`3px solid ${C.ink}`, background:C.surface,
          padding:"18px", position:"relative"
        }}>
          <div style={{
            position:"absolute", top:"-3px", right:"-3px",
            width:"24px", height:"24px", background:C.yellow
          }}/>

          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"flex-start",
            marginBottom:"16px", paddingBottom:"12px",
            borderBottom:`2px solid ${C.ink}`
          }}>
            <div>
              <div style={{
                fontFamily:SANS, fontSize:"10px", fontWeight:700,
                color:C.red, letterSpacing:"0.2em", marginBottom:"4px"
              }}>INSPECTION REPORT</div>
              <div style={{fontFamily:JP, fontSize:"18px", fontWeight:900, color:C.ink}}>
                検査結果
              </div>
            </div>
            <div style={{
              background:C.blue, color:C.surface,
              padding:"4px 10px", transform:"rotate(-3deg)",
              fontFamily:JP, fontSize:"12px", fontWeight:900, letterSpacing:"0.1em"
            }}>合格</div>
          </div>

          <div style={{display:"flex", flexDirection:"column", gap:"4px"}}>
            {[
              {item:"要求室の設置", status:"pass", detail:"全要求室を確認"},
              {item:"外構の設置", status:"pass", detail:"駐車場・アプローチ OK"},
              {item:"延床面積", status:"pass", detail:"118.3㎡ / 上限120㎡"},
              {item:"各階面積バランス", status:"warn", detail:"2F / 1F = 82%（やや大）"},
              {item:"隣地境界からの離隔", status:"fail", detail:"北側 780mm / 要910mm"},
              {item:"道路境界からの離隔", status:"pass", detail:"南側 2,000mm"},
            ].map((c,i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"28px 1fr auto",
                gap:"10px", alignItems:"center",
                padding:"10px 8px",
                background: c.status==="fail"?"#fce8e6" : c.status==="warn"?"#fef4d6" : "#e5ecf8"
              }}>
                <div style={{
                  width:"24px", height:"24px",
                  background: c.status==="fail"?C.red : c.status==="warn"?C.yellow : C.blue,
                  color: c.status==="warn"?C.ink:C.surface,
                  borderRadius: c.status==="pass"?"50%":"0",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:SANS, fontSize:"13px", fontWeight:900
                }}>
                  {c.status==="pass"?"✓":c.status==="warn"?"!":"×"}
                </div>
                <div style={{fontFamily:JP, fontSize:"12px", fontWeight:700, color:C.ink}}>
                  {c.item}
                </div>
                <div style={{fontFamily:JP, fontSize:"10px", color:C.inkSoft, textAlign:"right"}}>
                  {c.detail}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop:"14px", paddingTop:"12px",
            borderTop:`2px solid ${C.ink}`,
            display:"flex", justifyContent:"space-between", alignItems:"center"
          }}>
            <span style={{fontFamily:JP, fontSize:"10px", color:C.inkSoft, fontWeight:500}}>
              30pt 消費　·　残 1,250pt
            </span>
            <span style={{fontFamily:JP, fontSize:"10px", color:C.red, fontWeight:700}}>
              検査員AI
            </span>
          </div>
        </div>
      )}

      {/* 称号 */}
      <div>
        <SectionHead num="F" title="称号・バッジ" shape={<Triangle size={12} color={C.blue}/>}/>

        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px"}}>
          {[
            {label:"初投稿", earned:true, shape:"circle", color:C.red},
            {label:"助言者", earned:true, shape:"square", color:C.blue},
            {label:"十連投", earned:true, shape:"triangle", color:C.yellow},
            {label:"人気図面", earned:false, shape:"circle", color:C.rule},
            {label:"合格者", earned:false, shape:"square", color:C.rule},
            {label:"50いいね", earned:false, shape:"triangle", color:C.rule},
          ].map((b,i) => (
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:"10px",
              padding:"12px", background:C.surface,
              border: b.earned ? `2px solid ${C.ink}` : `2px solid ${C.rule}`,
              opacity: b.earned ? 1 : 0.5,
            }}>
              {b.shape==="circle" && <Circle size={16} color={b.color}/>}
              {b.shape==="square" && <Square size={16} color={b.color}/>}
              {b.shape==="triangle" && <Triangle size={16} color={b.color}/>}
              <span style={{fontFamily:JP, fontSize:"12px", fontWeight:700, color:C.ink}}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────── NAV ─────────── */
const BottomNav = ({screen, setScreen}) => {
  const items = [
    {label:"ホーム", shape:"circle", color:C.red},
    {label:"演習", shape:"square", color:C.blue},
    {label:"展示", shape:"triangle", color:C.yellow},
    {label:"掲示板", shape:"circle", color:C.blue},
    {label:"自分", shape:"square", color:C.red},
  ];
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"repeat(5, 1fr)",
      background:C.ink,
    }}>
      {items.map((n,i) => (
        <button key={i} onClick={()=>setScreen(i)} style={{
          padding:"12px 4px 10px",
          background: screen===i ? n.color : "transparent",
          color: screen===i ? (n.color===C.yellow?C.ink:C.surface) : C.surface,
          border:"none",
          cursor:"pointer",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"4px",
        }}>
          {n.shape==="circle" && <Circle size={10} color={screen===i ? (n.color===C.yellow?C.ink:C.surface) : n.color}/>}
          {n.shape==="square" && <Square size={10} color={screen===i ? (n.color===C.yellow?C.ink:C.surface) : n.color}/>}
          {n.shape==="triangle" && <Triangle size={10} color={screen===i ? (n.color===C.yellow?C.ink:C.surface) : n.color}/>}
          <span style={{
            fontFamily:JP, fontSize:"10px", fontWeight:700,
            letterSpacing:"0.02em"
          }}>{n.label}</span>
        </button>
      ))}
    </div>
  );
};

export default function App() {
  const [screen, setScreen] = useState(0);

  return (
    <>
      <style>{FONTS}</style>
      <div style={{
        minHeight:"100vh",
        background: C.bg,
        padding:"24px 12px",
        fontFamily:JP,
        color:C.ink,
        position:"relative",
        overflow:"hidden"
      }}>

        <div style={{
          maxWidth:"400px", margin:"0 auto",
          background: C.surface,
          border:`3px solid ${C.ink}`,
          boxShadow:`8px 8px 0 ${C.ink}`,
          position:"relative",
        }}>

          {/* ヘッダー */}
          <div style={{
            padding:"14px 18px",
            borderBottom:`3px solid ${C.ink}`,
            background:C.surface,
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
              {/* ロゴ：3色3形の組み合わせ */}
              <div style={{display:"flex", alignItems:"center", gap:"3px"}}>
                <Circle size={12} color={C.red}/>
                <Square size={12} color={C.blue}/>
                <Triangle size={12} color={C.yellow}/>
              </div>
              <div>
                <div style={{
                  fontFamily:JP, fontSize:"15px", fontWeight:900,
                  color:C.ink, letterSpacing:"0.05em", lineHeight:1
                }}>
                  製図学舎
                </div>
                <div style={{
                  fontFamily:SANS, fontSize:"8px", color:C.inkSoft,
                  letterSpacing:"0.2em", marginTop:"3px", fontWeight:700
                }}>
                  BAUHAUS EDITION
                </div>
              </div>
            </div>
            <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
              <div style={{
                background:C.yellow, padding:"4px 8px",
                fontFamily:SANS, fontSize:"11px", color:C.ink, fontWeight:700
              }}>1,280</div>
              <Avatar name="佐" size={28} color={C.red}/>
            </div>
          </div>

          {/* コンテンツ */}
          <div style={{
            height:"620px", overflowY:"auto",
            padding:"22px 20px",
            background:C.surface,
          }}>
            {screen===0 && <HomeScreen setScreen={setScreen}/>}
            {screen===1 && <ExerciseScreen/>}
            {screen===2 && <GalleryScreen/>}
            {screen===3 && <BoardScreen/>}
            {screen===4 && <ProfileScreen/>}
          </div>

          <BottomNav screen={screen} setScreen={setScreen}/>
        </div>

        <div style={{
          textAlign:"center", marginTop:"18px",
          fontFamily:SANS, fontSize:"9px", color:C.inkSoft,
          letterSpacing:"0.3em", fontWeight:700
        }}>
          MOCKUP · 2026·04
        </div>
      </div>
    </>
  );
}
