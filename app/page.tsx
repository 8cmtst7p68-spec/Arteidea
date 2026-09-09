"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, ExternalLink, Gift, Heart, MapPin, Menu, Phone, Search, Sparkles, X } from "lucide-react";

const categories = [
  { id: "tutti", label: "Tutto" }, { id: "bomboniere", label: "Bomboniere" },
  { id: "cerimonie", label: "Cerimonie" }, { id: "regali", label: "Idee regalo" },
  { id: "nascita", label: "Nascita & battesimo" }, { id: "bijoux", label: "Bijoux" }, { id: "casa", label: "Casa" },
];

const collections = [
  { id: "bomboniere", eyebrow: "Da custodire", title: "Bomboniere personalizzate", description: "Gessi profumati, calamite, cornici, vasetti, barattolini e piccoli oggetti modellati, dipinti e rifiniti a mano.", image: "/arteidea/ardesie.jpg", color: "lime" },
  { id: "cerimonie", eyebrow: "Il tuo filo conduttore", title: "Cerimonie & allestimenti", description: "Partecipazioni, tableau, segnaposto, confettate, portafedi, guest book e decorazioni coordinate per ogni evento.", image: "/arteidea/negozio-esterno.jpg", color: "berry" },
  { id: "regali", eyebrow: "Mai banale", title: "Idee regalo", description: "Pensieri originali per nascite, compleanni, maestre, feste e ricorrenze. Se non c’è, lo immaginiamo insieme.", image: "/arteidea/negozio-interno.jpg", color: "yellow" },
  { id: "nascita", eyebrow: "Un dolce benvenuto", title: "Nascita & battesimo", description: "Bomboniere, sacchetti, portaconfetti e piccoli ricordi coordinati, creati attorno al nome e alla storia di ogni bambino.", image: "/arteidea/ardesie.jpg", color: "mint" },
  { id: "bijoux", eyebrow: "Uno diverso dall’altro", title: "Bijoux artigianali", description: "Collane, bracciali e accessori creativi: pezzi unici, pieni di colore, da scegliere o personalizzare.", image: "/arteidea/negozio-interno.jpg", color: "blue" },
  { id: "casa", eyebrow: "Piccole meraviglie", title: "Casa & decorazioni", description: "Profumatori, cornici, targhe, oggetti stagionali e dettagli che rendono ogni angolo più personale.", image: "/arteidea/ardesie.jpg", color: "coral" },
];

const hours = [["Lunedì", "15:30–19:30"], ["Martedì–Giovedì", "8:30–12:30 · 15:30–19:30"], ["Venerdì", "8:30–19:30"], ["Sabato", "9:00–12:30 · 15:30–19:30"], ["Domenica", "Chiuso"]];

export default function Home() {
  const [active, setActive] = useState("tutti");
  const [menuOpen, setMenuOpen] = useState(false);
  const visible = active === "tutti" ? collections : collections.filter((item) => item.id === active);

  return (
    <main>
      <div className="announcement"><span>Dal 2007, il negozietto creativo di Sampierdarena</span><a href="tel:+390106465261">Chiama lo 010 646 5261</a></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Arteidea, torna all’inizio"><span className="brand-mark" aria-hidden="true">🐞</span><span className="brand-name">Arteidea</span><span className="brand-place">Genova · Sampierdarena</span></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Navigazione principale">
          <a href="#collezioni" onClick={() => setMenuOpen(false)}>Collezioni</a><a href="#su-misura" onClick={() => setMenuOpen(false)}>Su misura</a><a href="#negozio" onClick={() => setMenuOpen(false)}>Il negozio</a><a className="nav-cta" href="mailto:arteidea2005@libero.it?subject=Richiesta%20Arteidea">Raccontaci la tua idea</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker"><Sparkles size={16} /> Fatto a mano, fatto per te</p>
          <h1>Le tue idee,<br/><em>in una cosa bella.</em></h1>
          <p className="hero-lead">Creazioni artigianali, bomboniere e regali personalizzati. A Genova c’è un posto dove ogni dettaglio può diventare soltanto tuo.</p>
          <div className="hero-actions"><a className="button primary" href="#collezioni">Scopri le collezioni <ArrowRight size={18}/></a><a className="button text" href="#su-misura">Come lavoriamo <ChevronDown size={18}/></a></div>
          <div className="hero-proof"><strong>5,0</strong><span>★★★★★</span><small>27 recensioni · Tripadvisor</small></div>
        </div>
        <div className="hero-visual" aria-label="Una selezione delle creazioni e del negozio Arteidea">
          <figure className="hero-photo main-photo"><img src="/arteidea/negozio-interno.jpg" alt="L’interno colorato del negozio Arteidea" /></figure>
          <figure className="hero-photo detail-photo"><img src="/arteidea/ardesie.jpg" alt="Miniature personalizzate create da Arteidea" /></figure>
          <div className="hand-note">Ogni pezzo<br/><strong>racconta qualcuno</strong></div><span className="color-dot dot-one"/><span className="color-dot dot-two"/>
        </div>
      </section>

      <section className="collections-section" id="collezioni">
        <div className="section-heading"><div><p className="kicker"><Gift size={16}/> Cosa trovi da Arteidea</p><h2>Un mondo di cose<br/><em>da scoprire.</em></h2></div><p>Esplora le categorie e trova il punto di partenza. Ogni proposta può cambiare colore, tema e dettaglio insieme a te.</p></div>
        <div className="category-filter" role="group" aria-label="Filtra per categoria">{categories.map((category) => <button key={category.id} className={active === category.id ? "active" : ""} onClick={() => setActive(category.id)}>{category.label}</button>)}</div>
        <div className="collection-grid">{visible.map((item, index) => (
          <article className={`collection-card ${item.color} ${index === 0 && active === "tutti" ? "featured" : ""}`} key={item.id}>
            <div className="card-image"><img src={item.image} alt="" /></div><div className="card-content"><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.description}</p><a href={`mailto:arteidea2005@libero.it?subject=${encodeURIComponent(item.title)}`}>Chiedi informazioni <ArrowRight size={17}/></a></div>
          </article>
        ))}</div>
        <p className="catalog-note"><Search size={16}/> Il catalogo è sempre in movimento: per novità e disponibilità, passa in negozio o contattaci.</p>
      </section>

      <section className="bespoke" id="su-misura">
        <div className="bespoke-sticky"><p className="kicker light"><Heart size={16}/> La parte più bella</p><h2>Non scegli soltanto.<br/><em>Crei insieme a noi.</em></h2><p>Che sia una bomboniera, un regalo o l’allestimento di una giornata importante, si parte sempre dalla tua storia.</p><a className="button cream" href="mailto:arteidea2005@libero.it?subject=Vorrei%20creare%20qualcosa%20su%20misura">Inizia da un’idea <ArrowRight size={18}/></a></div>
        <ol className="steps"><li><span>01</span><div><h3>Raccontaci l’occasione</h3><p>Un tema, un colore, una persona, anche solo una sensazione: ascoltiamo ciò che vuoi rendere speciale.</p></div></li><li><span>02</span><div><h3>Diamo forma ai dettagli</h3><p>Alessia ti consiglia materiali, abbinamenti e soluzioni, fino a trovare il filo conduttore giusto.</p></div></li><li><span>03</span><div><h3>Nasce il tuo pezzo unico</h3><p>Ogni creazione viene composta e rifinita a mano con pazienza, precisione e un tocco inconfondibile.</p></div></li></ol>
      </section>

      <section className="shop-section" id="negozio">
        <div className="shop-image"><img src="/arteidea/negozio-esterno.jpg" alt="L’ingresso del negozio Arteidea a Sampierdarena" /><span>Il negozietto</span></div>
        <div className="shop-info"><p className="kicker"><MapPin size={16}/> Vieni a trovarci</p><h2>Nel cuore di<br/><em>Sampierdarena.</em></h2><p className="address">Via Carlo Rolando 15R–17R<br/>16151 Genova</p><a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Arteidea+Via+Carlo+Rolando+15R+Genova" target="_blank" rel="noreferrer">Apri su Google Maps <ExternalLink size={16}/></a><div className="hours">{hours.map(([day, time]) => <div key={day}><span>{day}</span><strong>{time}</strong></div>)}</div><div className="contact-row"><a href="tel:+390106465261"><Phone size={18}/> 010 646 5261</a><a href="mailto:arteidea2005@libero.it">Scrivici una mail</a></div></div>
      </section>

      <section className="closing-cta"><span aria-hidden="true">✦</span><p>Hai già qualcosa in mente?</p><h2>Facciamola diventare<br/><em>una piccola meraviglia.</em></h2><a className="button primary" href="mailto:arteidea2005@libero.it?subject=La%20mia%20idea%20per%20Arteidea">Raccontaci la tua idea <ArrowRight size={18}/></a></section>
      <footer><div className="footer-brand"><span>🐞</span><strong>Arteidea</strong><small>Artigianato, emozioni e pezzi unici.</small></div><div><strong>Esplora</strong><a href="#collezioni">Collezioni</a><a href="#su-misura">Su misura</a><a href="#negozio">Contatti</a></div><div><strong>Seguici</strong><a href="https://www.facebook.com/groups/54256122997/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.matrimonio.com/bomboniere/arteidea--e361818" target="_blank" rel="noreferrer">Matrimonio.com</a></div><div><strong>Arteidea di Zaniratti Alessia</strong><span>P. IVA 01619470998</span><span>Via Carlo Rolando 15R–17R, Genova</span></div><p className="copyright">© {new Date().getFullYear()} Arteidea. Tutti i diritti riservati.</p></footer>
    </main>
  );
}
