"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { externalContentEvent, getExternalContentChoice, setExternalContentAllowed } from "./external-content-consent";
import styles from "./cookie-banner.module.css";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const sync = () => setShow(getExternalContentChoice() === null);
    sync();
    window.addEventListener(externalContentEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(externalContentEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (!show) return null;

  return <section className={styles.banner} aria-label="Scelta sui cookie e contenuti esterni">
    <div className={styles.mark} aria-hidden="true">🐞</div>
    <div className={styles.copy}><strong>La tua scelta conta.</strong><p>Usiamo solo le funzioni necessarie per il sito. Con il tuo consenso possiamo mostrare i post Instagram tramite Elfsight, che potrebbe usare cookie o altri strumenti di tracciamento. Puoi cambiare idea quando vuoi.</p><Link href="/privacy#cookie-preferences">Privacy e preferenze cookie</Link></div>
    <div className={styles.actions}><button type="button" className={styles.reject} onClick={() => setExternalContentAllowed(false)}>Continua senza feed</button><button type="button" className={styles.accept} onClick={() => setExternalContentAllowed(true)}>Mostra il feed</button></div>
  </section>;
}
