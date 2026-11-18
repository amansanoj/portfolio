import {ProjectDeck} from './ProjectDeck';
import {ArrowRight,GithubLogo,LinkedinLogo} from '@phosphor-icons/react';
import { HeadingShine } from './reactbits/HeadingShine';
import {ViewableImage} from './ImageViewer';
import {ProjectSurface,TechnologyBand} from './LandingEffects';
import type { Project,Post } from '../types';

const stories=[
 {slug:'macro-pad',body:'A four-switch Bluetooth controller and a native macOS app. Application-specific profiles let the same switches launch apps, run shortcuts, or perform different actions depending on the active application.'},
 {slug:'tether',body:'A watch-party server with synchronized playback, chat, and host controls. A shared server clock coordinates participants, while the dashboard shows playback drift, latency, and buffering.'},
 {slug:'neon-os',body:'An ESP32 bridge that connects a Bluetooth RGB light to Apple Home. It includes OLED status, local button controls, persistent settings, and a signed firmware updater.'},
];

function Cover({project,large=false,eager=false}:{project:Project;large?:boolean;eager?:boolean}){
 const thumbnail=`/projects/${project.slug}/thumbnail.webp`,original=`/projects/${project.slug}/${project.cover}`;
 return <ViewableImage thumbnail className="landing-cover" src={thumbnail} srcSet={large?`${thumbnail} ${project.dimensions?.thumbnailWidth}w, ${original} ${project.dimensions?.width}w`:undefined} sizes={large?'(max-width: 700px) 90vw, 650px':undefined} fullSrc={original} width={project.dimensions?.thumbnailWidth} height={project.dimensions?.thumbnailHeight} alt={`${project.title} - cover image`} loading={eager?'eager':large?'lazy':'eager'}/>;
}
export function Home({projects,posts}:{projects:Project[];posts:Post[]}){
 const featured=stories.map(story=>({...story,project:projects.find(p=>p.slug===story.slug)!})).filter(s=>s.project);
 return <div className="landing">
  <section className="landing-hero" aria-labelledby="name">
   <div className="landing-hero-copy">
    <h1 id="name"><HeadingShine>Aman Sanoj</HeadingShine></h1>
    <p className="landing-lead">I write software and build things with electronics.</p>
    <p className="landing-introduction">Native apps, web services, and the hardware they connect to.</p>
    <div className="landing-actions"><a className="landing-action" href="#projects">Explore Projects </a><a href="/about/">About Me </a></div>
    <div className="landing-socials"><a href="https://github.com/amansanoj" aria-label="GitHub"><GithubLogo weight="duotone"/>GitHub</a><a href="https://www.linkedin.com/in/amansanoj" aria-label="LinkedIn"><LinkedinLogo weight="duotone"/>LinkedIn</a></div>
   </div>
   <div className="hero-art"><ProjectDeck projects={featured.map(item=>item.project)}/></div>
  </section>
  <TechnologyBand/>
  <section id="projects" className="landing-work" aria-labelledby="projects-title">
   <div className="landing-section-heading"><h2 id="projects-title">Projects</h2></div>
   <div className="landing-projects">{featured.map(({project,body})=><article className={`landing-feature feature-${project.slug}`} key={project.slug}>
    <div className="feature-copy"><h3><a href={`/projects/${project.slug}/`}>{project.title}</a></h3><p>{body}</p><a className="feature-read" href={`/projects/${project.slug}/`}>View Project </a></div>
    <div className="feature-visual"><ProjectSurface className={`surface-${project.slug}`}><Cover project={project} large/></ProjectSurface></div>
   </article>)}</div>
   <a className="all-projects-link" href="/projects/">All Projects <ArrowRight weight="duotone" aria-hidden="true"/></a>
  </section>
  <section className="landing-background" aria-labelledby="background-title"><p className="section-eyebrow">A Bit of Background</p><div><h2 id="background-title">From Kerala.<br/>Based in the UAE.</h2><p>I started programming at 12 with websites. These days I’m studying Cyber Security at the University of Wollongong in Dubai and building across software and electronics.</p><a href="/about/">More About Me </a></div></section>
  <section className="landing-writing" aria-labelledby="writing-title"><div className="landing-section-heading"><div><h2 id="writing-title">Writing</h2></div><a href="/blog/">All Posts <ArrowRight weight="duotone" aria-hidden="true"/></a></div><div className="landing-posts">{posts.slice(0,3).map(post=><article key={post.slug}><time dateTime={post.date}>{new Intl.DateTimeFormat('en-GB',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(post.date))}</time><h3><a href={`/blog/${post.slug}/`}>{post.title}</a></h3><p>{post.summary.length>180?post.summary.slice(0,177).replace(/\s+\S*$/,'')+'…':post.summary}</p></article>)}</div></section>
  <section id="contact" className="landing-contact" aria-labelledby="contact-title"><h2 id="contact-title">Contact</h2><a className="contact-email" href="mailto:me@amansanoj.com">me@amansanoj.com </a><div className="landing-socials"><a href="https://github.com/amansanoj"><GithubLogo weight="duotone" aria-hidden="true"/>GitHub</a><a href="https://www.linkedin.com/in/amansanoj"><LinkedinLogo weight="duotone" aria-hidden="true"/>LinkedIn</a></div></section>
 </div>;
}
