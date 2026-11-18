import {lazy,Suspense,useEffect,useState} from 'react';
const FuzzyText=lazy(()=>import('./reactbits/FuzzyText'));

export function NotFound(){
 const [animate,setAnimate]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setAnimate(!media.matches&&!document.hidden);update();media.addEventListener('change',update);document.addEventListener('visibilitychange',update);
  return()=>{media.removeEventListener('change',update);document.removeEventListener('visibilitychange',update);};
 },[]);
 return <section className="intro not-found">
  <div className="fuzzy-error" aria-hidden="true">
   <span className="fuzzy-fallback">404</span>
   {animate&&<Suspense fallback={null}><FuzzyText fontSize="clamp(100px, 22vw, 220px)" fontWeight={600} baseIntensity={.12} hoverIntensity={.38} fuzzRange={24} fps={30} intro={false} colorSplit={0} className="fuzzy-canvas">404</FuzzyText></Suspense>}
  </div>
  <h1>Page Not Found</h1>
  <p>This page may have moved or been removed.</p>
  <div className="links"><a href="/">Home</a><a href="/projects/">Projects</a><a href="/blog/">Blog</a></div>
 </section>;
}
