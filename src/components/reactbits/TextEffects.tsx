import {useEffect} from 'react';

// React Bits ShinyText adapted to existing semantic page headings.
// A single sweep changes the ink only; text never fades out or moves on load.
export function useHeadingShine(){
 useEffect(()=>{
  const headings=[...document.querySelectorAll<HTMLElement>('main h1,main h2')];
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;observer.unobserve(entry.target);if(!media.matches)entry.target.classList.add('heading-shine');}},{threshold:.2});
  headings.forEach(heading=>{if(!heading.closest('.not-found'))observer.observe(heading);});
  return()=>{observer.disconnect();headings.forEach(h=>h.classList.remove('heading-shine'));};
 },[]);
}

// React Bits SplitText hover lift, using words to preserve natural wrapping.
export function SplitText({children}:{children:string}){
 return <span className="split-text">{children.split(/(\s+)/).map((word,i)=>/^\s+$/.test(word)?word:<span className="split-word" key={i} style={{'--word-delay':`${Math.min(i*18,100)}ms`} as React.CSSProperties}>{word}</span>)}</span>;
}
