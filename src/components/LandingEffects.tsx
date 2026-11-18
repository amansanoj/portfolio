import {useEffect,useState,type CSSProperties,type ReactNode} from 'react';
export {LanguageLoop as TechnologyBand} from './LanguageLoop';
import SpotlightCard from './reactbits/SpotlightCard';

export function useLandingMotion(){
 const [enabled,setEnabled]=useState(false);
 useEffect(()=>{const media=matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');const update=()=>setEnabled(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 return enabled;
}
export function ProjectSurface({children,className=''}:{children:ReactNode;className?:string}){
 const enabled=useLandingMotion();
 return enabled?<SpotlightCard className={`feature-surface ${className}`} spotlightColor="var(--primary)" intensity={.12} borderGlow={.3} flare={false} proximity={0} style={{'--spotlight-card-surface':'var(--muted)','--spotlight-card-border':'var(--border)','--spotlight-card-shadow':'none'} as CSSProperties}>{children}</SpotlightCard>:<div className={`feature-surface ${className}`}>{children}</div>;
}
