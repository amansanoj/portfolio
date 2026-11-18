import {useEffect,useState,type ComponentType} from 'react';
import {siTypescript,siJavascript,siCss,siPython,siCplusplus,siSwift,siHtml5,siAstro,siSvelte,siGo,siC,siGnubash,siMdx,siDocker} from 'simple-icons';
import OriginalLogoLoop from './reactbits/LogoLoop';
const LogoLoop=OriginalLogoLoop as ComponentType<any>;
const languages=[['TypeScript',siTypescript],['JavaScript',siJavascript],['CSS',siCss],['Python',siPython],['C++',siCplusplus],['Swift',siSwift],['HTML',siHtml5],['Astro',siAstro],['Svelte',siSvelte],['Go',siGo],['C',siC],['Shell',siGnubash],['MDX',siMdx],['Dockerfile',siDocker]] as const;
const logos=languages.map(([title,icon])=>({title,node:<svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label={title}><title>{title}</title><path d={icon.path}/></svg>,hoverColor:'var(--secondary)'}));
export function LanguageLoop(){
 const [reduce,setReduce]=useState(true);
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduce(media.matches);update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 return <div className="landing-languages">{reduce?<ul className="language-static" aria-label="Languages" tabIndex={0}>{logos.map(logo=><li key={logo.title}>{logo.node}</li>)}</ul>:<LogoLoop logos={logos} speed={45} direction="left" logoHeight={30} gap={44} hoverSpeed={0} labels="none" draggable fadeOut fadeOutWidth={.06} intro={false} ariaLabel="Languages"/>}</div>;
}
