import {useEffect,useRef} from 'react';

// Lightweight canvas adaptation of React Bits DotGrid's pointer field.
export function DotGrid(){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current!,ctx=canvas.getContext('2d');if(!ctx)return;
  const parent=canvas.parentElement!;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  let width=0,height=0,frame=0,visible=true;
  let pointer={x:-1000,y:-1000};
  let dots:{x:number;y:number;dx:number;dy:number}[]=[];
  let base='',active='';
  const colors=()=>{const css=getComputedStyle(parent);base=css.getPropertyValue('--primary').trim();active=css.getPropertyValue('--secondary').trim();paint();};
  function paint(){
   frame=0;if(!ctx)return;ctx.clearRect(0,0,width,height);let moving=false;
   for(const dot of dots){
    const dx=dot.x-pointer.x,dy=dot.y-pointer.y,distance=Math.hypot(dx,dy);
    const force=!reduce.matches&&fine.matches?Math.max(0,1-distance/140):0;
    const tx=distance?dx/distance*force*14:0,ty=distance?dy/distance*force*14:0;
    dot.dx+=(tx-dot.dx)*.14;dot.dy+=(ty-dot.dy)*.14;
    if(Math.abs(tx-dot.dx)+Math.abs(ty-dot.dy)>.05)moving=true;
    ctx.globalAlpha=.22+force*.55;ctx.fillStyle=force>.1?active:base;
    ctx.beginPath();ctx.arc(dot.x+dot.dx,dot.y+dot.dy,1.2+force,0,Math.PI*2);ctx.fill();
   }
   if(moving&&visible&&!document.hidden)frame=requestAnimationFrame(paint);
  }
  const wake=()=>{if(!frame&&visible)frame=requestAnimationFrame(paint);};
  const resize=new ResizeObserver(()=>{
   const rect=parent.getBoundingClientRect();width=rect.width;height=rect.height;
   const dpr=Math.min(devicePixelRatio,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
   dots=[];for(let y=12;y<height;y+=24)for(let x=12;x<width;x+=24)dots.push({x,y,dx:0,dy:0});colors();
  });resize.observe(parent);
  const controller=new AbortController(),{signal}=controller;
  parent.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse')return;const r=parent.getBoundingClientRect();pointer={x:event.clientX-r.left,y:event.clientY-r.top};wake();},{signal,passive:true});
  parent.addEventListener('pointerleave',()=>{pointer={x:-1000,y:-1000};wake();},{signal});
  const theme=new MutationObserver(colors);theme.observe(document.documentElement,{attributes:true,attributeFilter:['class','data-theme']});
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)wake();else{cancelAnimationFrame(frame);frame=0;}});observer.observe(parent);
  reduce.addEventListener('change',wake,{signal});
  document.addEventListener('visibilitychange',wake,{signal});
  return()=>{cancelAnimationFrame(frame);resize.disconnect();theme.disconnect();observer.disconnect();controller.abort();};
 },[]);
 return <canvas className="hero-dot-grid" aria-hidden="true" ref={ref}/>;
}
