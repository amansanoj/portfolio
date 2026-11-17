import {useRef,type ReactNode} from 'react';
import {motion,useMotionValue,useSpring,useReducedMotion} from 'motion/react';

// React Bits TiltedCard adapted to preserve the image viewer's native button.
export function TiltedPreview({children}:{children:ReactNode}){
 const ref=useRef<HTMLDivElement>(null),reduce=useReducedMotion();
 const rx=useMotionValue(0),ry=useMotionValue(0);
 const rotateX=useSpring(rx,{stiffness:200,damping:26}),rotateY=useSpring(ry,{stiffness:200,damping:26});
 const reset=()=>{rx.set(0);ry.set(0);};
 return <motion.div ref={ref} className="tilted-preview" style={{rotateX:reduce?0:rotateX,rotateY:reduce?0:rotateY,transformPerspective:900}} onPointerMove={event=>{
  if(reduce||event.pointerType!=='mouse'||!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  const r=ref.current!.getBoundingClientRect();rx.set(-(event.clientY-r.top-r.height/2)/r.height*10);ry.set((event.clientX-r.left-r.width/2)/r.width*10);
 }} onPointerLeave={reset} onBlur={reset}>{children}</motion.div>;
}
