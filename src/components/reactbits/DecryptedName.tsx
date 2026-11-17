import {useEffect,useRef} from 'react';

// Adapted from React Bits DecryptedText: fixed character widths and an
// accessible original keep the hover effect from changing layout or speech.
export function DecryptedName({text}:{text:string}) {
 const ref=useRef<HTMLSpanElement>(null);
 const frame=useRef(0);
 const active=useRef(false);
 const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
 const restore=()=>{cancelAnimationFrame(frame.current);active.current=false;ref.current?.querySelectorAll<HTMLElement>('[data-glyph]').forEach((el,i)=>{el.textContent=text[i];});};
 useEffect(()=>restore,[]);
 function play(){
  if(active.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  active.current=true;
  const start=performance.now();let last=-1;
  const tick=(now:number)=>{
   const elapsed=now-start;
   if(elapsed>=480){restore();return;}
   const step=Math.floor(elapsed/45);
   if(step!==last){last=step;ref.current?.querySelectorAll<HTMLElement>('[data-glyph]').forEach((el,i)=>{
    el.textContent=text[i]===' '||i/text.length<elapsed/400?text[i]:letters[Math.floor(Math.random()*letters.length)];
   });}
   frame.current=requestAnimationFrame(tick);
  };
  frame.current=requestAnimationFrame(tick);
 }
 return <span ref={ref} className="decrypted-name" tabIndex={0} aria-label={text} onMouseEnter={play} onMouseLeave={restore} onFocus={play} onBlur={restore}>
  <span aria-hidden="true">{[...text].map((letter,i)=><span className="decode-cell" key={i}><span className="decode-measure">{letter===' '?'\u00a0':letter}</span><span data-glyph>{letter}</span></span>)}</span>
 </span>;
}
