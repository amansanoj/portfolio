import {useEffect,useRef,useState} from 'react';

// React Bits DotGrid adapted as a shared, content-aware viewport background.
export function DotGrid(){
 const [enabled,setEnabled]=useState(false);
 useEffect(()=>{
  const media=matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
  const update=()=>setEnabled(media.matches);
  update();media.addEventListener('change',update);
  return()=>media.removeEventListener('change',update);
 },[]);
 return enabled?<DotGridCanvas/>:null;
}
function DotGridCanvas(){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=ref.current!,ctx=canvas.getContext('2d');if(!ctx)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  const shell=document.querySelector('.site-shell')!;
  const controller=new AbortController(),{signal}=controller;
  let width=0,height=0,frame=0,measureFrame=0,lastTime=0;
  let pointer={x:-1000,y:-1000};
  let dots:{x:number;y:number;dx:number;dy:number;strength:number}[]=[];
  let base='',active='';
  const wake=()=>{if(!frame&&!document.hidden)frame=requestAnimationFrame(paint);};
  function paint(time:number){
   frame=0;if(!ctx)return;
   const blend=1-Math.exp(-Math.min(time-lastTime||16,40)/85);lastTime=time;
   ctx.clearRect(0,0,width,height);let moving=false;
   const interactive=!reduce.matches&&fine.matches&&!document.querySelector('dialog[open]');
   for(const dot of dots){
    const dx=dot.x-pointer.x,dy=dot.y-pointer.y,distance=Math.hypot(dx,dy);
    const near=interactive?Math.max(0,1-distance/130):0;
    const force=near*near*(3-2*near)*dot.strength;
    const tx=distance?dx/distance*force*10:0,ty=distance?dy/distance*force*10:0;
    dot.dx+=(tx-dot.dx)*blend;dot.dy+=(ty-dot.dy)*blend;
    if(Math.abs(tx-dot.dx)+Math.abs(ty-dot.dy)>.025)moving=true;
    ctx.globalAlpha=.025+.2*dot.strength+force*.3;
    ctx.fillStyle=force>.12?active:base;
    ctx.beginPath();ctx.arc(dot.x+dot.dx,dot.y+dot.dy,1+force*.8,0,Math.PI*2);ctx.fill();
   }
   if(moving)wake();
  }
  function measure(){
   measureFrame=0;
   // Measure only after scroll/layout changes, never once per dot or frame.
   const rects=[...shell.querySelectorAll('h1,h2,h3,p,header,nav,footer,img,pre,table,button,.links,.about-links,.project-directory-links')]
    .flatMap(el=>[...el.getClientRects()])
    .filter(r=>r.bottom>-40&&r.top<height+40&&r.width&&r.height);
   for(const dot of dots){
    let strength=1;
    for(const r of rects){
     const gap=Math.hypot(Math.max(r.left-dot.x,0,dot.x-r.right),Math.max(r.top-dot.y,0,dot.y-r.bottom));
     if(gap>=40)continue;
     const t=gap/40;strength=Math.min(strength,t*t*(3-2*t));
     if(!strength)break;
    }
    dot.strength=strength;
   }
   wake();
  }
  const scheduleMeasure=()=>{if(!measureFrame)measureFrame=requestAnimationFrame(measure);};
  function resize(){
   width=innerWidth;height=innerHeight;
   const dpr=Math.min(devicePixelRatio,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx!.setTransform(dpr,0,0,dpr,0,0);
   dots=[];for(let y=14;y<height;y+=28)for(let x=14;x<width;x+=28)dots.push({x,y,dx:0,dy:0,strength:0});
   scheduleMeasure();
  }
  function colors(){const css=getComputedStyle(document.documentElement);base=css.getPropertyValue('--primary').trim();active=css.getPropertyValue('--secondary').trim();wake();}
  document.addEventListener('pointermove',event=>{if(event.pointerType!=='mouse'||!fine.matches||reduce.matches)return;pointer={x:event.clientX,y:event.clientY};wake();},{signal,passive:true});
  document.documentElement.addEventListener('pointerleave',()=>{pointer={x:-1000,y:-1000};wake();},{signal});
  window.addEventListener('blur',()=>{pointer={x:-1000,y:-1000};wake();},{signal});
  window.addEventListener('resize',resize,{signal,passive:true});
  window.addEventListener('scroll',scheduleMeasure,{signal,passive:true});
  document.addEventListener('load',scheduleMeasure,{signal,capture:true});
  const theme=new MutationObserver(()=>{colors();scheduleMeasure();});theme.observe(document.documentElement,{attributes:true,attributeFilter:['class','data-theme']});
  const layout=new ResizeObserver(scheduleMeasure);layout.observe(shell);
  const motionChange=()=>{pointer={x:-1000,y:-1000};wake();};
  reduce.addEventListener('change',motionChange,{signal});fine.addEventListener('change',motionChange,{signal});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else{lastTime=0;wake();}},{signal});
  let alive=true;document.fonts.ready.then(()=>{if(alive)scheduleMeasure();});
  colors();resize();
  return()=>{alive=false;cancelAnimationFrame(frame);cancelAnimationFrame(measureFrame);theme.disconnect();layout.disconnect();controller.abort();};
 },[]);
 return <canvas className="site-dot-grid" aria-hidden="true" ref={ref}/>;
}
