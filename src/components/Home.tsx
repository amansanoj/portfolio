import {ArrowDown,ArrowUpRight,ArrowRight,GithubLogo,LinkedinLogo,Cpu,AppWindow,Browser} from '@phosphor-icons/react';
import { HeadingShine } from './reactbits/HeadingShine';
import {ViewableImage} from './ImageViewer';
import {HeroTilt,ProjectSurface,TechnologyBand} from './LandingEffects';
import type { Project,Post } from '../types';

const stories=[
 {slug:'macro-pad',number:'01',label:'Software Meets Hardware',headline:'Four switches. A different setup for every app.',body:'A Bluetooth controller is only as useful as what it controls. Macro Pad keeps the configuration on the Mac, so the same four switches can launch apps, run shortcuts, or change jobs with your active application.',details:['Application-specific profiles','Native SwiftUI configuration','BLE input with duplicate suppression'],Icon:AppWindow},
 {slug:'tether',number:'02',label:'A Shared Playback Clock',headline:'Different screens. One watch party.',body:'Tether keeps a room on a shared timeline. The server coordinates playback, while a host dashboard makes drift, latency, and buffering visible instead of leaving everyone guessing.',details:['Authoritative server clock','WebSocket chat and host controls','HLS, YouTube, and Vimeo sources'],Icon:Browser},
 {slug:'neon-os',number:'03',label:'Firmware, With an Interface',headline:'A Bluetooth light, connected to Apple Home.',body:'NeonOS bridges Wi-Fi and BLE on an ESP32. An OLED and a single button provide local controls; persistent settings and a signed updater handle the work behind the interface.',details:['Apple Home through HomeSpan','OLED status and local controls','Signed OTA design with rollback'],Icon:Cpu},
];

function Cover({project,large=false}:{project:Project;large?:boolean}){
 const thumbnail=`/projects/${project.slug}/thumbnail.webp`,original=`/projects/${project.slug}/${project.cover}`;
 return <ViewableImage thumbnail className="landing-cover" src={thumbnail} srcSet={large?`${thumbnail} ${project.dimensions?.thumbnailWidth}w, ${original} ${project.dimensions?.width}w`:undefined} sizes={large?'(max-width: 700px) 90vw, 650px':undefined} fullSrc={original} width={project.dimensions?.thumbnailWidth} height={project.dimensions?.thumbnailHeight} alt={`${project.title} - cover image`} loading={large?'lazy':'eager'}/>;
}
export function Home({projects,posts}:{projects:Project[];posts:Post[]}){
 const featured=stories.map(story=>({...story,project:projects.find(p=>p.slug===story.slug)!})).filter(s=>s.project);
 return <div className="landing">
  <section className="landing-hero" aria-labelledby="name">
   <div className="landing-hero-copy">
    <p className="section-eyebrow"><span className="location-mark"/>Software & Embedded Systems · Dubai</p>
    <h1 id="name"><HeadingShine>Aman Sanoj</HeadingShine></h1>
    <p className="landing-lead">I write software and build things with electronics.</p>
    <p className="landing-introduction">Native apps, web services, and the hardware they connect to. Here’s what I’ve been building.</p>
    <div className="landing-actions"><a className="landing-action" href="#projects">Explore Projects <ArrowDown weight="duotone" aria-hidden="true"/></a><a href="/about/">About Me <ArrowUpRight weight="duotone" aria-hidden="true"/></a></div>
    <div className="landing-socials"><a href="https://github.com/amansanoj" aria-label="GitHub"><GithubLogo weight="duotone"/>GitHub</a><a href="https://www.linkedin.com/in/amansanoj" aria-label="LinkedIn"><LinkedinLogo weight="duotone"/>LinkedIn</a></div>
   </div>
   <div className="hero-art"><HeroTilt><div className="hero-composition">
    {featured.map(({project,number},i)=><figure className={`hero-piece hero-piece-${i}`} key={project.slug}><div className="hero-piece-label"><span>{number} / {project.title}</span><ArrowUpRight weight="duotone" aria-hidden="true"/></div><Cover project={project}/></figure>)}
   </div></HeroTilt></div>
   <div className="hero-bottom"><span>Apps. Web. Firmware.</span><a href="#projects">Scroll to the Work <ArrowDown weight="duotone" aria-hidden="true"/></a></div>
  </section>
  <TechnologyBand/>
  <section id="projects" className="landing-work" aria-labelledby="projects-title">
   <div className="landing-section-heading"><div><p className="section-eyebrow">A Closer Look</p><h2 id="projects-title">Projects</h2></div><p>From the interface to the electronics underneath.</p></div>
   <div className="landing-projects">{featured.map(({project,number,label,headline,body,details,Icon})=><article className={`landing-feature feature-${project.slug}`} key={project.slug}>
    <div className="feature-copy"><p className="feature-index">{number} <span>/ {label}</span></p><h3><a href={`/projects/${project.slug}/`}>{project.title}<ArrowUpRight weight="duotone" aria-hidden="true"/></a></h3><p className="feature-headline">{headline}</p><p>{body}</p><ul className="feature-details">{details.map(detail=><li key={detail}><span/>{detail}</li>)}</ul><div className="feature-stack">{project.stack.slice(0,4).join(' / ')}</div><a className="feature-read" href={`/projects/${project.slug}/`}>Inside the Project <ArrowRight weight="duotone" aria-hidden="true"/></a></div>
    <div className="feature-visual"><ProjectSurface className={`surface-${project.slug}`}><div className="feature-surface-label"><Icon weight="duotone" aria-hidden="true"/><span>{project.kind}</span></div><Cover project={project} large/><div className="feature-surface-caption"><span>{project.title}</span><span>Click to Explore the Image <ArrowUpRight weight="duotone" aria-hidden="true"/></span></div></ProjectSurface></div>
   </article>)}</div>
   <a className="all-projects-link" href="/projects/">All Projects <ArrowUpRight weight="duotone" aria-hidden="true"/></a>
  </section>
  <section className="landing-background" aria-labelledby="background-title"><p className="section-eyebrow">A Bit of Background</p><div><h2 id="background-title">From Kerala.<br/>Based in the UAE.</h2><p>I started programming at 12 with websites. These days I’m studying Cyber Security at the University of Wollongong in Dubai and building across software and electronics.</p><a href="/about/">More About Me <ArrowUpRight weight="duotone" aria-hidden="true"/></a></div></section>
  <section className="landing-writing" aria-labelledby="writing-title"><div className="landing-section-heading"><div><p className="section-eyebrow">Notes From the Work</p><h2 id="writing-title">Writing</h2></div><a href="/blog/">All Posts <ArrowUpRight weight="duotone" aria-hidden="true"/></a></div><div className="landing-posts">{posts.slice(0,3).map(post=><article key={post.slug}><time dateTime={post.date}>{new Intl.DateTimeFormat('en-GB',{month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(post.date))}</time><h3><a href={`/blog/${post.slug}/`}>{post.title}<ArrowUpRight weight="duotone" aria-hidden="true"/></a></h3><p>{post.summary.length>180?post.summary.slice(0,177).replace(/\s+\S*$/,'')+'…':post.summary}</p></article>)}</div></section>
  <section id="contact" className="landing-contact" aria-labelledby="contact-title"><p className="section-eyebrow">Get in Touch</p><h2 id="contact-title">Have something<br/>in mind?</h2><a className="contact-email" href="mailto:me@amansanoj.com">me@amansanoj.com <ArrowUpRight weight="duotone" aria-hidden="true"/></a><div className="landing-socials"><a href="https://github.com/amansanoj"><GithubLogo weight="duotone" aria-hidden="true"/>GitHub</a><a href="https://www.linkedin.com/in/amansanoj"><LinkedinLogo weight="duotone" aria-hidden="true"/>LinkedIn</a></div></section>
 </div>;
}
