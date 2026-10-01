import type { Metadata } from "next";
import { Footer, Header } from "../site-shell";
import styles from "../info-pages.module.css";
import { PrivacyPreferences } from "../privacy-preferences";

export const metadata: Metadata = {
  title: "Privacy e dati personali | Arteidea Genova",
  description: "Informazioni sul trattamento dei dati personali e sui servizi esterni presenti nel sito Arteidea.",
};

export default function PrivacyPage() {
  return <main className={styles.page}><Header/>
    <section className={styles.hero}><span className={styles.eyebrow}>Informazioni e diritti</span><h1>La tua privacy,<br/><em>con chiarezza.</em></h1><p>Qui trovi quali dati possono essere trattati quando visiti il sito Arteidea o scegli di contattarci.</p></section>
    <div className={styles.content}>
      <section className={styles.card}><h2>Titolare del trattamento</h2><p>Arteidea di Zaniratti Alessia · P. IVA 01619470998<br/>Via Carlo Rolando 15R–17R, 16151 Genova<br/>Email: <a href="mailto:arteidea2005@libero.it">arteidea2005@libero.it</a> · Telefono: <a href="tel:+390106465261">010 646 5261</a></p><p>Per domande sui tuoi dati personali o per esercitare i tuoi diritti puoi scrivere all’indirizzo email indicato sopra.</p></section>
      <div className={styles.columns}>
        <section className={styles.card}><h2>Dati di navigazione</h2><p>Quando visiti il sito, Vercel, il servizio che lo ospita, può trattare dati tecnici come indirizzo IP, data e ora della richiesta, pagina richiesta e informazioni sul browser. Servono a rendere disponibili le pagine, proteggere il sito e risolvere problemi tecnici.</p><p>La base giuridica è il legittimo interesse alla sicurezza e al funzionamento del sito. I dati tecnici sono conservati secondo i tempi e le impostazioni del servizio di hosting, limitatamente a quanto necessario per queste finalità.</p></section>
        <section className={styles.card}><h2>Quando ci contatti</h2><p>Il sito non contiene moduli di contatto né richiede la creazione di un account. Se scegli di scriverci tramite email o WhatsApp, Arteidea riceve i dati che decidi di comunicare, per esempio nome, recapito e contenuto della richiesta.</p><p>Li usiamo per risponderti, preparare un preventivo o gestire un ordine. La base giuridica è l’esecuzione di misure precontrattuali o contrattuali richieste da te; quando necessario, adempiamo anche agli obblighi di legge. I messaggi sono conservati per il tempo necessario a gestire la richiesta e, in caso di acquisto, per i termini previsti dalla normativa applicabile.</p></section>
      </div>
      <section className={styles.card} id="cookie-preferences"><h2>Cookie e contenuti esterni</h2><p>Alla prima visita puoi scegliere dal banner se mostrare il feed Instagram. Qui puoi modificare la scelta in qualsiasi momento. Senza il tuo consenso il sito non carica Elfsight. Le funzioni tecniche necessarie alle pagine restano disponibili.</p><PrivacyPreferences/><h3>Feed Instagram</h3><p>I post Instagram presenti nella home sono forniti tramite Elfsight. Il contenuto viene caricato se premi “Mostra i post Instagram” oppure lo attivi qui. Il fornitore può ricevere dati tecnici sulla visita e usare i propri cookie o strumenti di tracciamento secondo la sua <a href="https://elfsight.com/privacy-policy/" target="_blank" rel="noopener noreferrer">informativa privacy</a>. Puoi disattivare il feed in questa pagina: la pagina si ricaricherà per interrompere il contenuto esterno. I cookie eventualmente già impostati da terzi possono essere eliminati dalle impostazioni del browser.</p><h3>Link ad altri siti</h3><p>I collegamenti a Instagram, Facebook, WhatsApp, Google Maps, Tripadvisor e Matrimonio.com ti portano ai rispettivi servizi. Quando li apri, si applicano le loro informative privacy.</p><h3>Memoria del browser</h3><p>Il sito usa la memoria locale del browser per ricordare la scelta sul feed Instagram e che il richiamo alle recensioni è già stato mostrato o aperto. Questi valori non contengono il tuo nome o altri dati inseriti da te.</p></section>
      <div className={styles.columns}>
        <section className={styles.card}><h2>Destinatari e conservazione</h2><p>I dati necessari al funzionamento del sito possono essere trattati da <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel</a>, che ospita le pagine. Le comunicazioni inviate tramite email o WhatsApp passano anche attraverso i rispettivi fornitori. Arteidea non vende i dati dei visitatori.</p><p>Alcuni fornitori possono trattare dati fuori dallo Spazio economico europeo secondo le garanzie previste dalle loro informative. Per informazioni su una richiesta specifica o sui relativi tempi di conservazione, puoi contattare Arteidea.</p></section>
        <section className={styles.card}><h2>I tuoi diritti</h2><p>Puoi chiedere accesso, rettifica, cancellazione o limitazione dei dati, opporti al trattamento nei casi previsti e chiedere la portabilità quando applicabile. Puoi scrivere a <a href="mailto:arteidea2005@libero.it">arteidea2005@libero.it</a>.</p><p>Se ritieni che il trattamento non sia conforme alle regole, puoi presentare un reclamo al <a href="https://www.garanteprivacy.it/i-miei-diritti" target="_blank" rel="noopener noreferrer">Garante per la protezione dei dati personali</a>.</p></section>
      </div>
      <p className={styles.small}>Ultimo aggiornamento: 1 ottobre 2026.</p>
    </div><Footer/>
  </main>;
}
