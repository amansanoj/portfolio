import {useRef,useState,useEffect,type ComponentType} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight} from '@phosphor-icons/react';
import OriginalCardSwap,{Card as OriginalCard} from './reactbits/CardSwap';
import {useImageViewer} from './ImageViewer';
import type {Project} from '../types';
// Typed integration boundary; upstream JavaScript is kept verbatim.
const CardSwap=OriginalCardSwap as ComponentType<any>;
const Card=OriginalCard as ComponentType<any>;
export function ProjectDeck({projects}:{projects:Project[]}){
 const api=useRef<{next:()=>void;prev:()=>void}|null>(null);
 const opener=useRef<HTMLButtonElement>(null);
 const [active,setActive]=useState(0),[reduce,setReduce]=useState(true);
 const open=useImageViewer();
 useEffect(()=>{const media=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{setReduce(media.matches);setActive(0);};update();media.addEventListener('change',update);return()=>media.removeEventListener('change',update);},[]);
 function view(index:number){const project=projects[index];if(project)open(`/projects/${project.slug}/${project.cover}`,`${project.title} - cover image`,opener.current!);}
 return <div className="hero-project-deck">
  <CardSwap key={String(reduce)} ref={api} width={460} height={360} cardDistance={30} verticalDistance={34} depth={60} skewAmount={2} visibleCards={3} delay={5000} autoplay={!reduce} pauseOnHover draggable={!reduce} bounce={.12} parallax={0} hoverSpread={0} intro={false} cardRadius={12} onChange={setActive} onCardClick={view} className="project-card-swap">
   {projects.map((project,index)=><Card key={project.slug} className="hero-swap-card">
    <div className="hero-swap-label"><span>{String(index+1).padStart(2,'0')} / {project.title}</span><ArrowUpRight weight="duotone" aria-hidden="true"/></div>
    <img className="hero-swap-image" src={`/projects/${project.slug}/thumbnail.webp`} srcSet={`/projects/${project.slug}/thumbnail.webp ${project.dimensions?.thumbnailWidth}w, /projects/${project.slug}/${project.cover} ${project.dimensions?.width}w`} sizes="(max-width: 700px) 80vw, 460px" width={project.dimensions?.width} height={project.dimensions?.height} alt={`${project.title} - cover image`} draggable={false}/>
   </Card>)}
  </CardSwap>
  <div className="deck-controls"><button type="button" aria-label="Previous project preview" onClick={()=>api.current?.prev()}><ArrowLeft weight="duotone"/></button><button ref={opener} type="button" className="deck-view" onClick={()=>view(active)}>View {projects[active]?.title}<ArrowUpRight weight="duotone" aria-hidden="true"/></button><button type="button" aria-label="Next project preview" onClick={()=>api.current?.next()}><ArrowRight weight="duotone"/></button></div>
 </div>;
}
