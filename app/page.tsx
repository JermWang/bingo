"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const heads = [
  "01","02","03","04","05","06","07","08","09","10","11","12","13",
  "14","15","16","17","18","19","20","21","22","23","24","26","27",
];
const things = ["1","2","4","5","6","7","8","9","10","11","12","13","14","15"];
const colors = ["#ead1b1", "#a77859", "#30272e"];

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tab, setTab] = useState<"head" | "thing" | "text">("head");
  const [head, setHead] = useState<string | null>(null);
  const [thing, setThing] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [ink, setInk] = useState("#000000");
  const [copied, setCopied] = useState(false);

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, 500, 500);
    const base = await loadImage("/characters/base-monkey.png");
    ctx.drawImage(base, 0, 0, 500, 500);
    if (head) ctx.drawImage(await loadImage(`/characters/heads/head-${head}.png`), 0, 0, 500, 500);
    if (thing) ctx.drawImage(await loadImage(`/characters/things/thing-${thing}.png`), 0, 0, 500, 500);
    if (caption.trim()) {
      ctx.font = "40px 'Courier New', Courier, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = ink;
      ctx.fillText(caption.trim().slice(0, 28), 250, 20, 455);
    }
  }, [head, thing, caption, ink]);

  useEffect(() => { void render(); }, [render]);

  const download = () => {
    const a = document.createElement("a");
    a.download = "bingo-pfp.png";
    a.href = canvasRef.current?.toDataURL("image/png") ?? "";
    a.click();
  };

  const copy = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !navigator.clipboard || typeof ClipboardItem === "undefined") return;
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) return;
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const reset = () => { setHead(null); setThing(null); setCaption(""); };
  const shuffle = () => {
    setHead(heads[Math.floor(Math.random() * heads.length)]);
    setThing(things[Math.floor(Math.random() * things.length)]);
  };

  return (
    <main className="site-shell" id="top">
      <section className="brand-panel" aria-label="Bingo">
        <div className="brand-copy">
          <h1>bingo&nbsp; <span>the</span>&nbsp; monkey</h1>
          <div className="swatches" aria-hidden="true">
            {colors.map((color) => <i key={color} style={{ background: color }} />)}
          </div>
        </div>
        <p className="kicker">PFP GENERATOR</p>
      </section>

      <section className="generator">
        <div className="workspace">
          <div className="preview-wrap">
            <span className="preview-label">LIVE PREVIEW</span>
            <canvas ref={canvasRef} width={500} height={500} aria-label="Your Bingo profile picture preview" />
            <span className="corner tl">+</span><span className="corner tr">+</span>
            <span className="corner bl">+</span><span className="corner br">+</span>
          </div>
          <div className="actions">
            <button className="primary" onClick={download}>Download PNG ↓</button>
            <button onClick={() => void copy()}>{copied ? "Copied!" : "Copy"}</button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>

        <div className="customizer">
          <nav aria-label="Customizer categories">
            <button className={tab === "head" ? "active" : ""} onClick={() => setTab("head")}>Head</button>
            <button className={tab === "thing" ? "active" : ""} onClick={() => setTab("thing")}>Thing</button>
            <button className={tab === "text" ? "active" : ""} onClick={() => setTab("text")}>Text</button>
            <button className="shuffle" onClick={shuffle}>↻ Shuffle</button>
          </nav>
          {tab === "head" && (
            <div className="asset-grid">
              {heads.map((id) => (
                <button key={id} className={head === id ? "selected" : ""} onClick={() => setHead(head === id ? null : id)} aria-label={`Bingo head ${id}`}>
                  <span className="trait-preview">
                    <img src="/characters/base-monkey.png" alt="" />
                    <img src={`/characters/heads/head-${id}.png`} alt="" />
                  </span>
                </button>
              ))}
            </div>
          )}
          {tab === "thing" && (
            <div className="asset-grid">
              {things.map((id) => (
                <button key={id} className={thing === id ? "selected" : ""} onClick={() => setThing(thing === id ? null : id)} aria-label={`Bingo accessory ${id}`}>
                  <span className="trait-preview">
                    <img src="/characters/base-monkey.png" alt="" />
                    <img src={`/characters/things/thing-${id}.png`} alt="" />
                  </span>
                </button>
              ))}
            </div>
          )}
          {tab === "text" && (
            <div className="text-tools">
              <label>Say something<input value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={28} placeholder="BINGO!" /></label>
              <label className="color-picker">
                Text color
                <span>
                  <input type="color" value={ink} onChange={(e) => setInk(e.target.value)} aria-label="Choose any text color" />
                  <code>{ink}</code>
                </span>
              </label>
            </div>
          )}
        </div>
      </section>

      <aside className="rail">
        <div className="rail-cards">
          <div className="rail-card">
            <i className="rail-icon"><img src="/characters/base-monkey.png" alt="" /><img src="/characters/heads/head-01.png" alt="" /></i>
            <span>DexScreener</span>
          </div>
          <div className="rail-card">
            <i className="rail-icon"><img src="/characters/base-monkey.png" alt="" /><img src="/characters/heads/head-05.png" alt="" /></i>
            <span>gmgn.ai</span>
          </div>
          <div className="rail-card">
            <i className="rail-icon"><img src="/characters/base-monkey.png" alt="" /><img src="/characters/heads/head-12.png" alt="" /></i>
            <span>Twitter / X</span>
          </div>
        </div>
        <div className="links">
          <label>Contract Address:</label>
          <div className="contract-row"><code>Coming soon</code><button onClick={() => void navigator.clipboard?.writeText("Coming soon")}>Copy</button></div>
        </div>
      </aside>
    </main>
  );
}
