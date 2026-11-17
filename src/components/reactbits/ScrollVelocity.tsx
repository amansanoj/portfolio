import {useRef,useState,useEffect} from 'react';
import {motion,useAnimationFrame,useMotionValue,useReducedMotion,useScroll,useVelocity,useSpring} from 'motion/react';

// Adapted from React Bits ScrollVelocity using the existing Motion dependency.
export function ScrollVelocity(){
 const unit=useRef<HTMLSpanElement>(null),host=useRef<HTMLDivElement>(null);
 const width=useRef(0),offset=useRef(0),visible=useRef(false);
 const [paused,setPaused]=useState(false);
 const hovered=useRef(false);
 const x=useMotionValue(0),reduce=useReducedMotion();
 const {scrollY}=useScroll();const velocity=useVelocity(scrollY);
 const smooth=useSpring(velocity,{damping:40,stiffness:180});
 useEffect(()=>{
  const resize=new ResizeObserver(()=>{width.current=unit.current?.getBoundingClientRect().width||0;});resize.observe(unit.current!);
  const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;});observer.observe(host.current!);
  return()=>{resize.disconnect();observer.disconnect();};
 },[]);
 useAnimationFrame((_,delta)=>{
  if(paused||hovered.current||reduce||!visible.current||document.hidden||!width.current)return;
  offset.current=(offset.current+(18+Math.min(Math.abs(smooth.get())*.025,75))*Math.min(delta,40)/1000)%width.current;
  x.set(-offset.current);
 });
 const labels=['Swift','TypeScript','Go','C++','ESP32','React'];
 return <div ref={host} className="technology-band">
  <div className="technology-window" role="img" aria-label={`Working with ${labels.join(', ')}`} onMouseEnter={()=>{hovered.current=true;}} onMouseLeave={()=>{hovered.current=false;}}>
   <motion.div className="technology-track" style={{x}} aria-hidden="true">{[0,1,2].map(copy=><span className="technology-copy" key={copy} ref={copy===0?unit:undefined}>{labels.map(label=><span key={label}>{label}<span className="technology-dot">/</span></span>)}</span>)}</motion.div>
  </div>
  <button className="technology-pause" type="button" aria-label={paused?'Resume technology animation':'Pause technology animation'} aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'Play':'Pause'}</button>
 </div>;
}
