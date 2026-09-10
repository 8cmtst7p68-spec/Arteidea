import { TripadvisorIcon } from "./site-shell";

const tripadvisorUrl = "https://www.tripadvisor.it/Attraction_Review-g187823-d11643904-Reviews-Arteidea-Genoa_Italian_Riviera_Liguria.html";

const reviews = [
  {quote:"Ha curato ogni minimo dettaglio.",title:"Prima comunione",author:"Andrea C",date:"agosto 2026"},
  {quote:"Ogni volta che entro comprerei di tutto.",title:"Buone idee",author:"Maria M",date:"agosto 2021"},
  {quote:"Un angolo incantato.",title:"Originalità e gentilezza",author:"Martina A",date:"luglio 2019"},
  {quote:"Un piccolo locale ricchissimo di oggetti.",title:"Una sorpresa",author:"Matteo Z",date:"aprile 2017"},
];

export function ReviewsCarousel(){
  return <section className="reviews-section" aria-labelledby="reviews-title">
    <div className="reviews-heading pop-in">
      <div><p className="kicker"><TripadvisorIcon/> Recensioni vere</p><h2 id="reviews-title">Le parole di chi<br/><em>è già entrato.</em></h2></div>
      <a className="reviews-score" href={tripadvisorUrl} target="_blank" rel="noreferrer" aria-label="Arteidea: punteggio 5 su 5 su Tripadvisor"><TripadvisorIcon/><span><strong>5,0</strong><small>27 recensioni su Tripadvisor</small></span><b>★★★★★</b></a>
    </div>
    <div className="reviews-rail pop-in" aria-label="Recensioni Tripadvisor">{reviews.map((review,index)=><article className="review-mini-card" key={review.author}><span className="review-card-flower" aria-hidden="true">{index%2===0?"✿":"🐞"}</span><span className="review-label">{review.title}</span><blockquote>“{review.quote}”</blockquote><p><strong>{review.author}</strong><span>{review.date}</span></p></article>)}</div>
    <a className="button review-link" href={tripadvisorUrl} target="_blank" rel="noreferrer">Leggi tutte su Tripadvisor</a>
  </section>;
}
