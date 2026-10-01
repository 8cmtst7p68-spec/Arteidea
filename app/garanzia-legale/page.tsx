import type { Metadata } from "next";
import Image from "next/image";
import { Footer, Header } from "../site-shell";
import styles from "../info-pages.module.css";

const euGuide = "https://europa.eu/youreurope/citizens/consumers/shopping/guarantees/index_it.htm";

export const metadata: Metadata = {
  title: "Garanzia legale | Arteidea Genova",
  description: "Diritti dei consumatori sulla garanzia legale di conformità dei beni acquistati da Arteidea e avviso ufficiale dell’Unione europea.",
};

export default function GuaranteePage() {
  return <main className={styles.page}><Header/>
    <section className={styles.hero}><span className={styles.eyebrow}>Informazioni e diritti</span><h1>Garanzia legale,<br/><em>senza dubbi.</em></h1><p>I tuoi diritti sui beni acquistati in negozio, spiegati in modo semplice e con l’avviso ufficiale dell’Unione europea.</p></section>
    <div className={styles.content}>
      <section className={styles.card}><h2>La tutela prevista dalla legge</h2><p>Se un bene acquistato da un venditore professionista presenta un difetto di conformità, non corrisponde alla descrizione o non funziona come previsto, hai diritto alla garanzia legale. Nell’Unione europea la durata minima è di <strong>due anni dalla consegna</strong>.</p><p>Il venditore deve, nei casi previsti dalla legge, riparare o sostituire il bene senza spese. Se queste soluzioni non sono possibili o non vengono attuate nei termini dovuti, puoi avere diritto a una riduzione del prezzo o alla risoluzione del contratto con rimborso. Una garanzia commerciale eventualmente offerta dal produttore si aggiunge a questi diritti e non li sostituisce.</p></section>
      <div className={styles.columns}>
        <section className={styles.card}><h2>Se riscontri un problema</h2><ol><li>Contatta Arteidea appena possibile e descrivi il difetto.</li><li>Porta il bene e una prova d’acquisto, come lo scontrino, la fattura o un altro documento utile.</li><li>Valuteremo il caso e la soluzione prevista dalla garanzia legale.</li></ol><p>Puoi scrivere a <a href="mailto:arteidea2005@libero.it">arteidea2005@libero.it</a>, chiamare lo <a href="tel:+390106465261">010 646 5261</a> o passare in Via Carlo Rolando 15R–17R, Genova.</p></section>
        <section className={styles.card}><h2>Per saperne di più</h2><p>Le condizioni possono dipendere dal tipo di bene e dalle norme applicabili. Il portale ufficiale Your Europe spiega la garanzia legale, le tutele per i beni usati e la differenza rispetto alle garanzie commerciali.</p><p><a href={euGuide} target="_blank" rel="noopener noreferrer">Leggi la guida ufficiale dell’Unione europea</a>.</p><p>Queste informazioni riguardano la vendita di beni di consumo. Per un servizio o un lavoro su commissione si applicano le condizioni e le norme pertinenti al caso.</p></section>
      </div>
      <section className={`${styles.card} ${styles.noticeCard}`}><h2>Avviso ufficiale UE</h2><p>Qui sotto trovi l’avviso armonizzato in italiano, in versione a colori e con il codice QR originale. Puoi aprirlo a piena risoluzione o scaricarlo.</p><Image className={styles.noticeImage} src="/arteidea/garanzia-legale-ue-it.svg" alt="Avviso ufficiale dell’Unione europea sulla garanzia legale minima di due anni, con istruzioni per il consumatore e codice QR" width={595} height={842} unoptimized/><div className={styles.noticeActions}><a href="/arteidea/garanzia-legale-ue-it.svg" target="_blank" rel="noopener noreferrer">Apri l’avviso completo</a><a href="/arteidea/garanzia-legale-ue-it.svg" download>Scarica l’avviso</a></div><p className={styles.small}>Fonte: <a href="https://commission.europa.eu/publications/practical-guidelines-and-high-resolution-vector-files-eu-notice-and-label-product-guarantees_en" target="_blank" rel="noopener noreferrer">Commissione europea, avviso armonizzato sulla garanzia legale</a>. Il riferimento all’etichetta GARAN nell’avviso spiega una possibile garanzia commerciale del produttore; non indica che tutti i prodotti Arteidea ne siano coperti.</p></section>
    </div><Footer/>
  </main>;
}
