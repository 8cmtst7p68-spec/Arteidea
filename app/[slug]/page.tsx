import Link from "next/link";
import { notFound } from "next/navigation";
import { collections } from "../site-data";
import { Footer, Header } from "../site-shell";

const special={
  collezioni:{eyebrow:"Tutto il mondo Arteidea",title:"Le collezioni",lead:"Sei modi diversi per trovare la cosa giusta, o per iniziare a immaginarla.",intro:"Esplora, scegli, personalizza.",description:"Dalle bomboniere ai bijoux, dagli allestimenti ai piccoli dettagli per la casa: ogni categoria raccoglie ispirazioni e possibilità.",image:"/arteidea-gallery/702.jpg",features:collections.map(x=>x.title)},
  personalizzazioni:{eyebrow:"Quando vuoi qualcosa di tuo",title:"Personalizzazioni",lead:"Su articoli e lavorazioni selezionate, nomi, colori e dettagli possono prendere una forma personale.",intro:"Cosa si può personalizzare?",description:"Non tutti i prodotti presenti in negozio sono modificabili. Alessia valuta ogni richiesta in base al tipo di articolo, ai materiali, alle quantità e ai tempi. Accanto alle personalizzazioni, nel laboratorio nascono anche composizioni e creazioni direttamente realizzate da lei.",image:"/arteidea-gallery/705.jpg",features:["Nomi e messaggi","Colori e confezioni","Composizioni coordinate","Creazioni di laboratorio"]},
};

export default async function DetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=collections.find(x=>x.slug===slug)??special[slug as keyof typeof special];
  if(!item)notFound();
  const related=collections.filter(x=>x.slug!==slug).slice(0,3);
  return <main><Header/>
    <section className="inner-hero"><div className="inner-hero-copy pop-in"><nav className="breadcrumbs"><Link href="/">Home</Link>{slug!=="collezioni"&&<><span>·</span><Link href="/collezioni">Collezioni</Link></>}</nav><p className="kicker">{item.eyebrow}</p><h1>{item.title}</h1><p className="hero-lead">{item.lead}</p><div className="page-actions"><Link className="button primary" href="/contatti">Parliamone</Link>{slug!=="collezioni"&&<Link className="button secondary" href="/collezioni">Tutte le collezioni</Link>}</div></div><div className="inner-hero-media pop-in delay-1"><img src={item.image} alt={item.title}/><span className="photo-pop">fatto con amore ♡</span></div></section>
    <section className="inner-intro"><div className="pop-in"><p className="kicker">Fatto a mano, fatto per te</p><h2>{item.intro}</h2></div><div className="inner-copy pop-in delay-1"><p>{item.description}</p><div className="feature-list">{item.features.map(feature=><div className="feature-pill" key={feature}>{feature}</div>)}</div></div></section>
    <section className="related"><p className="kicker">Continua a scoprire</p><h2>Potrebbe piacerti<br/><em>anche questo.</em></h2><div className="related-grid">{related.map(x=><Link className="related-card" href={`/${x.slug}`} key={x.slug}><span>{x.eyebrow}</span><h3>{x.title}</h3><b>Esplora</b></Link>)}</div></section>
    <section className="closing-cta"><span className="twinkle">✦</span><p>Vuoi qualcosa che parli di te?</p><h2>Raccontaci la tua idea.<br/><em>Al resto pensiamo insieme.</em></h2><a className="button primary" href="tel:+390106465261">Chiama Arteidea</a></section><Footer/>
  </main>;
}
