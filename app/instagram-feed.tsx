"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./instagram-feed.module.css";
import { externalContentAllowed, externalContentEvent, setExternalContentAllowed } from "./external-content-consent";

function InstagramMark({ size = 30 }: { size?: number }) {
  return <svg className={styles.instagramMark} width={size} height={size} viewBox="0 0 48 48" aria-hidden="true"><defs><radialGradient id={`instagram-feed-gradient-${size}`} cx="30%" cy="100%" r="120%"><stop offset="0" stopColor="#ffd73f"/><stop offset=".48" stopColor="#ef4774"/><stop offset="1" stopColor="#7b3db5"/></radialGradient></defs><rect width="48" height="48" rx="14" fill={`url(#instagram-feed-gradient-${size})`}/><rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="24" cy="24" r="6" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="33" cy="15" r="2" fill="#fff"/></svg>;
}

export function InstagramFeed() {
  const elfsightAppId = "d9af3ad5-560d-44c0-be3e-f8dd7a7172e7";
  const widgetFrameRef = useRef<HTMLDivElement>(null);
  const initialFeedHeightRef = useRef<number | null>(null);
  const hasLoadedMoreRef = useRef(false);
  const [feedExpanded, setFeedExpanded] = useState(false);
  const [feedToggleAvailable, setFeedToggleAvailable] = useState(false);
  const [feedEnabled, setFeedEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setFeedEnabled(externalContentAllowed());
    sync();
    window.addEventListener(externalContentEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(externalContentEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!feedEnabled) return;
    const frame = widgetFrameRef.current;
    if (!frame) return;

    const stretchWidget = () => {
      frame.querySelectorAll<HTMLElement>(".es-embed-root").forEach((root) => {
        const shadowRoot = root.shadowRoot;
        if (!shadowRoot) return;

        let widthOverride = shadowRoot.querySelector<HTMLStyleElement>("style[data-arteidea-full-width]");
        if (!widthOverride) {
          widthOverride = document.createElement("style");
          widthOverride.dataset.arteideaFullWidth = "true";
          shadowRoot.append(widthOverride);
        }
        widthOverride.textContent = ":host{width:100% !important;max-width:none !important}.es-load-more-button-container{position:absolute !important;width:1px !important;height:1px !important;overflow:hidden !important;clip-path:inset(50%) !important;pointer-events:none !important}a[href*='elfsight.com']{border:1px solid rgba(58,24,37,.12) !important;border-radius:999px !important;background:rgba(255,253,247,.82) !important;color:#745865 !important;box-shadow:0 5px 14px rgba(58,24,37,.1) !important;opacity:.82 !important;transform:scale(.9) !important;transform-origin:center !important}";

        const masonry = shadowRoot.querySelector<HTMLElement>(".es-masonry-layout");
        const loadMore = shadowRoot.querySelector<HTMLButtonElement>(".es-load-more-button");
        const itemCount = shadowRoot.querySelectorAll(".es-masonry-layout-item").length;
        if (masonry && loadMore && itemCount >= 4) {
          if (initialFeedHeightRef.current === null) initialFeedHeightRef.current = masonry.getBoundingClientRect().height;
          setFeedToggleAvailable(true);
        }
      });
    };

    let retryTimer: number | null = null;

    const beginStretching = () => {
      stretchWidget();
      if (retryTimer !== null) return;

      let attempts = 0;
      retryTimer = window.setInterval(() => {
        stretchWidget();
        attempts += 1;
        if (attempts < 60) return;
        window.clearInterval(retryTimer!);
        retryTimer = null;
      }, 250);
    };

    const observer = new MutationObserver(beginStretching);
    observer.observe(frame, { childList: true, subtree: true });
    beginStretching();

    return () => {
      observer.disconnect();
      if (retryTimer !== null) window.clearInterval(retryTimer);
    };
  }, [feedEnabled]);

  const toggleFeed = () => {
    const frame = widgetFrameRef.current;
    const root = frame?.querySelector<HTMLElement>(".es-embed-root");
    const shadowRoot = root?.shadowRoot;
    const masonry = shadowRoot?.querySelector<HTMLElement>(".es-masonry-layout");
    const nativeLoadMore = shadowRoot?.querySelector<HTMLButtonElement>(".es-load-more-button");
    if (!frame || !masonry) return;

    if (feedExpanded) {
      const initialHeight = initialFeedHeightRef.current;
      if (initialHeight !== null) {
        masonry.style.setProperty("max-height", `${initialHeight}px`, "important");
        masonry.style.setProperty("overflow", "hidden", "important");
      }
      setFeedExpanded(false);
      window.setTimeout(() => frame.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      return;
    }

    masonry.style.removeProperty("max-height");
    masonry.style.removeProperty("overflow");
    if (!hasLoadedMoreRef.current && nativeLoadMore) {
      nativeLoadMore.click();
      hasLoadedMoreRef.current = true;
    }
    setFeedExpanded(true);
  };

  return <section className={styles.section} aria-labelledby="instagram-feed-title">
    <div className={styles.heading}>
      <span className={`${styles.headingDecoration} ${styles.headingLadybug}`} aria-hidden="true">🐞</span>
      <span className={`${styles.headingDecoration} ${styles.headingFlower}`} aria-hidden="true">✿</span>
      <div><p className={`kicker ${styles.kicker}`}><InstagramMark/> Dal profilo Instagram</p><h2 className={styles.title} id="instagram-feed-title">Arteidea cambia,<br/><em>ogni giorno.</em></h2></div>
      <div className={styles.intro}><p>Nuovi arrivi, idee nate in laboratorio, dettagli per le feste e scorci del negozietto: qui troverai gli aggiornamenti pubblicati da Arteidea.</p><a href="https://www.instagram.com/_arteidea_genova_/" target="_blank" rel="noreferrer"><InstagramMark size={24}/> Segui Arteidea</a></div>
    </div>
    <div ref={widgetFrameRef} className={styles.liveWidget} aria-label="Ultimi contenuti Instagram di Arteidea">
      {feedEnabled ? <><Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" /><div className={`elfsight-app-${elfsightAppId}`} data-elfsight-app-lazy /></> : <div className={styles.consentPlaceholder}><InstagramMark size={47}/><h3>Uno sguardo al profilo Instagram</h3><p>Per mostrare i post, questo sito deve caricare il servizio esterno Elfsight. Se scegli di visualizzarli, il servizio potrà ricevere dati sulla tua visita.</p><button type="button" onClick={() => { setExternalContentAllowed(true); setFeedEnabled(true); }}>Mostra i post Instagram</button><Link href="/privacy">Come usiamo i dati</Link></div>}
      <span className={`${styles.widgetDecoration} ${styles.widgetFlower}`} aria-hidden="true">✿</span>
      <span className={`${styles.widgetDecoration} ${styles.widgetLadybug}`} aria-hidden="true">🐞</span>
      {feedToggleAvailable && <button className={styles.feedToggle} type="button" onClick={toggleFeed} aria-expanded={feedExpanded}>{feedExpanded ? "Mostra meno" : "Vedi altri post"}</button>}
    </div>
  </section>;
}
