"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { collections } from "./site-data";

function shopIsOpen() {
  const parts = new Intl.DateTimeFormat("en-GB", {timeZone:"Europe/Rome",weekday:"short",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
  const value = (type:string) => parts.find(part => part.type === type)?.value ?? "";
  const day = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].indexOf(value("weekday"));
  const minutes = Number(value("hour")) * 60 + Number(value("minute"));
  const windows:Record<number,[number,number][]> = {
    1:[[15*60+30,19*60+30]], 2:[[8*60+30,12*60+30],[15*60+30,19*60+30]],
    3:[[8*60+30,12*60+30],[15*60+30,19*60+30]], 4:[[8*60+30,12*60+30],[15*60+30,19*60+30]],
    5:[[8*60+30,19*60+30]], 6:[[9*60,12*60+30],[15*60+30,19*60+30]],
  };
  return (windows[day] ?? []).some(([start,end]) => minutes >= start && minutes < end);
}

export function Header(){
  const [mobileOpen,setMobileOpen]=useState(false);
  const [catalogOpen,setCatalogOpen]=useState(false);
  const [contactsOpen,setContactsOpen]=useState(false);
  const [isOpen,setIsOpen]=useState(shopIsOpen);
  useEffect(()=>{const timer=window.setInterval(()=>setIsOpen(shopIsOpen()),60000);return()=>window.clearInterval(timer)},[]);
  useEffect(()=>{
    const items=Array.from(document.querySelectorAll<HTMLElement>(".pop-in"));
    if (!("IntersectionObserver" in window)) { items.forEach(item=>item.classList.add("is-visible")); return; }
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
    }),{threshold:.12,rootMargin:"0px 0px -7% 0px"});
    items.forEach(item=>observer.observe(item));
    return()=>observer.disconnect();
  },[]);
  const close=()=>{setMobileOpen(false);setCatalogOpen(false)};
  return <>
    <div className="announcement"><Link className={isOpen?"open-status is-open":"open-status is-closed"} href="/contatti"><i/><strong>{isOpen?"Aperto ora":"Chiuso ora"}</strong><span>Consulta gli orari</span></Link></div>
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Arteidea, torna alla home"><span className="brand-mark" aria-hidden="true">🐞</span><span className="brand-name">Arteidea</span><span className="brand-place">Genova · Sampierdarena</span></Link>
      <nav className={mobileOpen?"nav open":"nav"} aria-label="Navigazione principale">
        <div className={catalogOpen?"catalog-menu is-open":"catalog-menu"}>
          <button className="catalog-trigger" onClick={()=>setCatalogOpen(!catalogOpen)} aria-expanded={catalogOpen}>Scopri Arteidea <ChevronDown/></button>
          <div className="catalog-dropdown">
            <Link className="menu-overview" href="/collezioni" onClick={close}><span>🐞</span><div><strong>Tutte le collezioni</strong><small>Uno sguardo completo al negozio</small></div></Link>
            <div className="catalog-grid">{collections.map((item,index)=><Link className={`menu-category menu-color-${index+1}`} href={`/${item.slug}`} onClick={close} key={item.slug}><span>{["🎁","🥂","💌","🧸","💎","🏡"][index]}</span><div><strong>{item.title}</strong><small>{item.eyebrow}</small></div></Link>)}</div>
          </div>
        </div>
        <Link href="/personalizzazioni" onClick={close}>Personalizzazioni</Link>
        <Link href="/contatti" onClick={close}>Il negozio</Link>
      </nav>
      <button className="menu-button" onClick={()=>setMobileOpen(!mobileOpen)} aria-label={mobileOpen?"Chiudi menu":"Apri menu"}>{mobileOpen?<X/>:<Menu/>}</button>
    </header>
    <div className={contactsOpen?"floating-contact is-open":"floating-contact"}><div className="floating-contact-menu" aria-hidden={!contactsOpen}><a className="float-action float-map" href="https://www.google.com/maps/search/?api=1&query=Arteidea+Via+Carlo+Rolando+15R+Genova" target="_blank" rel="noreferrer"><MapPin/><span>Indicazioni</span></a><a className="float-action float-phone" href="tel:+390106465261"><Phone/><span>Telefono</span></a><a className="float-action float-whatsapp" href="https://wa.me/393471526803?text=Ciao%20Arteidea%2C%20vorrei%20informazioni" target="_blank" rel="noreferrer"><MessageCircle/><span>WhatsApp</span></a></div><button className="floating-trigger" onClick={()=>setContactsOpen(!contactsOpen)} aria-expanded={contactsOpen} aria-label={contactsOpen?"Chiudi i contatti rapidi":"Apri i contatti rapidi"}><span>{contactsOpen?"Chiudi":"Parliamo?"}</span><i>{contactsOpen?"×":"🐞"}</i></button></div>
  </>;
}

const FacebookIcon=()=> <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877F2"/><path fill="#fff" d="M13.6 20v-7h2.4l.36-2.73H13.6V8.53c0-.79.22-1.33 1.39-1.33h1.48V4.77a19.9 19.9 0 0 0-2.16-.11c-2.14 0-3.61 1.31-3.61 3.71v1.9H8.58V13H11v7h2.6Z"/></svg>;
export const TripadvisorIcon=()=> <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#34E0A1"/><path fill="#111" d="M10 29c0-5 4-9 9-9 2 0 3.8.6 5 1.7A7.4 7.4 0 0 1 29 20c5 0 9 4 9 9s-4 9-9 9c-2.8 0-5.3-1.3-7-3.4A8.9 8.9 0 0 1 10 29Zm4 0a5 5 0 1 0 10 0 5 5 0 0 0-10 0Zm10 0a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"/><circle cx="19" cy="29" r="2.2" fill="#fff"/><circle cx="29" cy="29" r="2.2" fill="#fff"/></svg>;
const MatrimonioIcon=()=> <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="24" fill="#EF476F"/><path fill="#fff" d="M24 36C10 27.5 12.2 16 19.2 16c2.4 0 4 1.4 4.8 3 1-1.6 2.5-3 4.8-3 7 0 9.2 11.5-4.8 20Z"/></svg>;
const InstagramIcon=()=> <svg viewBox="0 0 48 48" aria-hidden="true"><defs><radialGradient id="ig" cx="30%" cy="100%" r="120%"><stop offset="0" stopColor="#FFD600"/><stop offset=".45" stopColor="#FF3D7F"/><stop offset="1" stopColor="#833AB4"/></radialGradient></defs><rect width="48" height="48" rx="13" fill="url(#ig)"/><rect x="11" y="11" width="26" height="26" rx="8" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="24" cy="24" r="6" fill="none" stroke="#fff" strokeWidth="3"/><circle cx="33" cy="15" r="2" fill="#fff"/></svg>;

export function Footer(){return <footer><div className="footer-brand"><span>🐞</span><strong>Arteidea</strong><small>Oggettistica, creazioni di laboratorio e idee speciali.</small><a className="footer-civ" href="https://civliguria-confesercenti.it/civ-rolandone/" target="_blank" rel="external noopener noreferrer"><small>Arteidea fa parte del</small><Image src="/arteidea/civ-il-rolandone-white.png" alt="CIV Il Rolandone, Via Rolando e vie limitrofe" width={2170} height={725}/></a></div><div><strong>Esplora</strong><Link href="/collezioni">Collezioni</Link><Link href="/personalizzazioni">Personalizzazioni</Link><Link href="/contatti">Contatti</Link></div><div className="footer-socials"><strong>Seguici e scoprici</strong><a href="https://www.instagram.com/_arteidea_genova_/" target="_blank" rel="noreferrer"><InstagramIcon/><span>Instagram</span></a><a href="https://www.facebook.com/groups/54256122997/" target="_blank" rel="noreferrer"><FacebookIcon/><span>Facebook</span></a><a href="https://www.tripadvisor.it/Attraction_Review-g187823-d11643904-Reviews-Arteidea-Genoa_Italian_Riviera_Liguria.html" target="_blank" rel="noreferrer"><TripadvisorIcon/><span>Tripadvisor</span></a><a href="https://www.matrimonio.com/bomboniere/arteidea--e361818" target="_blank" rel="noreferrer"><MatrimonioIcon/><span>Matrimonio.com</span></a></div><div><strong>Arteidea di Zaniratti Alessia</strong><a href="https://wa.me/393471526803" target="_blank" rel="noreferrer">WhatsApp +39 347 152 6803</a><a href="tel:+390106465261">Negozio 010 646 5261</a><span>Via Carlo Rolando 15R–17R, Genova</span></div><div className="footer-legal"><p>© {new Date().getFullYear()} Arteidea di Zaniratti Alessia · P. IVA 01619470998</p><a className="studio-credit" href="https://www.gcpstudio.it" target="_blank" rel="external noopener noreferrer" aria-label="Sito realizzato da GCP Studio, Gianclaudio Pontecchiani e Marco Finelli"><span>Sito realizzato da</span><img src="https://prua-al-sole.vercel.app/_assets/gcp-studio-logo.CRPWediK_rGDUF.webp" alt="" width="48" height="18" loading="lazy"/><strong>GCP Studio · Genova</strong><small>Gianclaudio Pontecchiani e Marco Finelli</small></a></div></footer>}
