import { HeadingShine } from './reactbits/HeadingShine';
import parse, { attributesToProps, domToReact, Element, type DOMNode, type HTMLReactParserOptions } from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { ViewableImage } from './ImageViewer';
import { Highlighter } from './magicui/highlighter';
function Emphasis({children}:{children:React.ReactNode}) {
  const reduce=useReducedMotion();const [ready,setReady]=useState(false);
  useEffect(()=>{let alive=true;document.fonts.ready.then(()=>{if(alive)setReady(true);});return()=>{alive=false;};},[]);
  return ready?<Highlighter color="var(--highlight-color)" iterations={1} animationDuration={500} isView={!reduce} animate={!reduce} multiline><strong>{children}</strong></Highlighter>:<strong>{children}</strong>;
}
export function HtmlContent({html,blog=false,highlight=blog}:{html:string;blog?:boolean;highlight?:boolean}) {
 const options:HTMLReactParserOptions={replace(node){
  if(!(node instanceof Element))return;
  if(['h2','h3'].includes(node.name)){const Tag=node.name as 'h2'|'h3';return <Tag {...attributesToProps(node.attribs)}><HeadingShine>{domToReact(node.children as DOMNode[],options)}</HeadingShine></Tag>;}
  if(highlight&&node.name==='strong')return <Emphasis>{domToReact(node.children as DOMNode[],options)}</Emphasis>;
  if(blog&&node.name==='img')return <ViewableImage {...attributesToProps(node.attribs)}/>;
  if(blog&&node.name==='pre')return <pre tabIndex={0} aria-label="Code example">{domToReact(node.children as DOMNode[],options)}</pre>;
 }};
 return <>{parse(html,options)}</>;
}
