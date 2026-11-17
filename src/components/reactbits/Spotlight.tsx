import {useEffect,useRef} from 'react';

// React Bits SpotlightCard, adapted as a lightweight surface inside an
// existing semantic list item, with brand tokens and no separate card frame.
export function Spotlight(){
 const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{
  const light=ref.current,parent=light?.parentElement;
  if(!light||!parent)return;
  const controller=new AbortController(),{signal}=controller;
  const media=matchMedia('(hover: hover) and (pointer: fine)');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,x=0,y=0;
  const paint=()=>{frame=0;const box=parent.getBoundingClientRect();light.style.setProperty('--spot-x',`${x-box.left}px`);light.style.setProperty('--spot-y',`${y-box.top}px`);};
  parent.addEventListener('pointermove',event=>{
   if(!media.matches||reduce.matches||event.pointerType!=='mouse')return;
   x=event.clientX;y=event.clientY;if(!frame)frame=requestAnimationFrame(paint);
  },{signal,passive:true});
  return()=>{controller.abort();cancelAnimationFrame(frame);};
 },[]);
 return <span className="project-spotlight" aria-hidden="true" ref={ref}/>;
}
