"use client";

import { useEffect, useState } from "react";
import { externalContentAllowed, externalContentEvent, setExternalContentAllowed } from "./external-content-consent";
import styles from "./privacy-preferences.module.css";

export function PrivacyPreferences() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => setAllowed(externalContentAllowed());
    sync();
    window.addEventListener(externalContentEvent, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(externalContentEvent, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const changePreference = () => {
    if (allowed === null) return;
    const next = !allowed;
    setExternalContentAllowed(next);
    setAllowed(next);
    if (!next) window.location.reload();
  };

  return <div className={styles.preferences}>
    <div><strong>Feed Instagram (Elfsight)</strong><p>Il contenuto esterno si carica soltanto se lo autorizzi. Puoi cambiare questa scelta in qualsiasi momento.</p><span className={allowed ? styles.active : styles.inactive} role="status">{allowed === null ? "Verifica della preferenza…" : allowed ? "Attivo" : "Disattivato"}</span></div>
    <button type="button" onClick={changePreference} disabled={allowed === null}>{allowed ? "Disattiva il feed" : "Attiva il feed"}</button>
  </div>;
}
