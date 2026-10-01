"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";
import styles from "./review-invite.module.css";

const seenKey = "arteidea-review-invite-seen";

const reviewLinks = [
  { label: "Partecipazioni e bomboniere", place: "Matrimonio.com", icon: "💌", href: "https://www.matrimonio.com/shared/rate/361818" },
  { label: "Allestimento della location", place: "Matrimonio.com", icon: "💒", href: "https://www.matrimonio.com/shared/rate/361828" },
  { label: "Recensione su Google", place: "Google", icon: "⭐", href: "https://maps.app.goo.gl/XuBQqYRyGKmHhXQR6" },
  { label: "Recensione su Facebook", place: "Facebook", icon: "📘", href: "https://www.facebook.com/share/1QKzKATUKF/" },
];

function Ladybug({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 72 82" role="img" aria-label="Coccinella a forma di cuore">
    <path d="M27 19C26 12 22 8 17 6M45 19c1-7 5-11 10-13" fill="none" stroke="#27151d" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="16" cy="6" r="5" fill="#27151d"/><circle cx="56" cy="6" r="5" fill="#27151d"/>
    <path d="M12 31c1-14 11-20 24-20s23 6 24 20" fill="#27151d"/>
    <path d="M36 75C18 63 4 50 4 36c0-10 7-17 16-17 7 0 12 4 16 10 4-6 9-10 16-10 9 0 16 7 16 17 0 14-14 27-32 39Z" fill="#ed2e3f" stroke="#27151d" strokeWidth="2"/>
    <path d="M36 29v46" stroke="#27151d" strokeWidth="2"/><path d="M36 36c-3-5-9-3-9 2 0 3 4 6 9 10 5-4 9-7 9-10 0-5-6-7-9-2Z" fill="#27151d"/>
    <path d="M19 35c-3-4-8-2-8 2 0 3 4 6 8 9 4-3 8-6 8-9 0-4-5-6-8-2Zm34 0c-3-4-8-2-8 2 0 3 4 6 8 9 4-3 8-6 8-9 0-4-5-6-8-2ZM21 55c-3-4-8-2-8 2 0 3 4 6 8 9 4-3 8-6 8-9 0-4-5-6-8-2Zm30 0c-3-4-8-2-8 2 0 3 4 6 8 9 4-3 8-6 8-9 0-4-5-6-8-2Z" fill="#27151d"/>
  </svg>;
}

export function ReviewInvite() {
  const [open, setOpen] = useState(false);
  const usedManually = useRef(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(seenKey)) return;
    } catch { /* Il richiamo manuale resta disponibile. */ }

    let elapsed = false;
    let explored = false;
    const showIfReady = () => {
      if (!elapsed || !explored || usedManually.current) return;
      setOpen(true);
      try { window.localStorage.setItem(seenKey, "1"); } catch { /* Storage opzionale. */ }
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      explored = window.scrollY > 280;
      showIfReady();
    };
    const timer = window.setTimeout(() => { elapsed = true; showIfReady(); }, 25000);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { window.clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggle = () => {
    usedManually.current = true;
    setOpen(value => !value);
    try { window.localStorage.setItem(seenKey, "1"); } catch { /* Storage opzionale. */ }
  };

  return <div className={styles.root}>
    <button className={styles.trigger} type="button" onClick={toggle} aria-expanded={open} aria-controls="review-invite-panel" aria-label="Lascia una recensione ad Arteidea">
      <Ladybug className={styles.triggerBug}/><span>Lascia una recensione</span>
    </button>
    {open && <section className={styles.panel} id="review-invite-panel" role="dialog" aria-modal="false" aria-labelledby="review-invite-title">
      <div className={styles.panelHero}>
        <button className={styles.close} type="button" onClick={() => setOpen(false)} aria-label="Chiudi il pannello recensioni"><X size={20}/></button>
        <Ladybug className={styles.heroBug}/>
        <span className={styles.kicker}>Un piccolo favore, di cuore</span>
        <h2 id="review-invite-title">La tua esperienza<br/><em>vale tanto.</em></h2>
      </div>
      <div className={styles.panelBody}>
        <p>Hai scelto Arteidea per la tua cerimonia? Raccontaci com’è andata: la tua recensione aiuta altre coppie a conoscerci. Grazie! 💛</p>
        <strong className={styles.question}>Dove vuoi lasciare la recensione?</strong>
        <div className={styles.links}>{reviewLinks.map(link => <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label}, si apre in una nuova scheda`}>
        <span className={styles.linkIcon} aria-hidden="true">{link.icon}</span><span className={styles.linkCopy}><strong>{link.label}</strong><small>{link.place}</small></span><ExternalLink size={17} aria-hidden="true"/>
      </a>)}</div>
      </div>
    </section>}
  </div>;
}
