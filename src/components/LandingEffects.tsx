import {useEffect,useState,type CSSProperties,type ReactNode} from 'react';
import ScrollVelocity from './reactbits/ScrollVelocity';
import SpotlightCard from './reactbits/SpotlightCard';
import tokens from '../../public/assets/vendor/brand-tokens.json';

export function useLandingMotion(){
 const [enabled,setEnabled]=useState(false);
 useEffect(()=>{const media=matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');const update=()=>setEnabled(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 return enabled;
}
export function ProjectSurface({children,className=''}:{children:ReactNode;className?:string}){
 const enabled=useLandingMotion();
 return enabled?<SpotlightCard className={`feature-surface ${className}`} spotlightColor="var(--primary)" intensity={.12} borderGlow={.3} flare={false} proximity={0} style={{'--spotlight-card-surface':'var(--muted)','--spotlight-card-border':'var(--border)','--spotlight-card-shadow':'none'} as CSSProperties}>{children}</SpotlightCard>:<div className={`feature-surface ${className}`}>{children}</div>;
}
export function TechnologyBand(){
 const enabled=useLandingMotion();
 const [theme,setTheme]=useState<'dark'|'light'>('light');
 useEffect(()=>{const update=()=>setTheme(document.documentElement.classList.contains('dark')?'dark':'light');update();const observer=new MutationObserver(update);observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});return()=>observer.disconnect();},[]);
 return <div className="landing-technologies">
  <p className="section-eyebrow">The Tools Behind the Work</p>
  {enabled?<div aria-hidden="true"><ScrollVelocity texts={['Swift · TypeScript · Go · C++ · ESP32 · React ·']} velocity={18} fontSize="clamp(28px,4vw,48px)" fontWeight={500} color={tokens.color.hex[theme].base.primary} gap={28} numCopies={3} pauseOnHover fadeEdges skewWithVelocity={0} scaleWithVelocity={0}/></div>:<p className="technology-static">Swift · TypeScript · Go · C++ · ESP32 · React</p>}
  <span className="visually-hidden">Swift, TypeScript, Go, C++, ESP32, React</span>
 </div>;
}
