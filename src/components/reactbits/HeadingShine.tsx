import {useEffect,useState,type ReactNode} from 'react';
import {useReducedMotion} from 'motion/react';
import ShinyText from './ShinyText';
import tokens from '../../../public/assets/vendor/brand-tokens.json';

export function HeadingShine({children}:{children:ReactNode}){
 const [theme,setTheme]=useState<'dark'|'light'|null>(null);
 const reduce=useReducedMotion();
 useEffect(()=>{const update=()=>setTheme(document.documentElement.classList.contains('dark')?'dark':'light');update();const observer=new MutationObserver(update);observer.observe(document.documentElement,{attributes:true,attributeFilter:['class','data-theme']});return()=>observer.disconnect();},[]);
 if(!theme||reduce)return <>{children}</>;
 const palette=tokens.color.hex[theme].base;
 return <ShinyText color={palette.primary} shineColor={palette.secondary} trigger="loop" speed={1.6} delay={2} shineWidth={30} softness={.7}>{children}</ShinyText>;
}
