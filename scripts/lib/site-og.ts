import sharp, {type OverlayOptions} from 'sharp';
import path from 'node:path';
import {mkdir} from 'node:fs/promises';
import tokens from '../../public/assets/vendor/brand-tokens.json';

// Shared social cover using the website's brand palette and typography.
export async function prepareSiteOg(){
 const palette=tokens.color.hex.dark;
 const {background,text,primary,secondary,accent}=palette.base;
 const muted=palette.text['300'];
 const layout=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
 <rect width="1200" height="630" fill="${background}"/>
 <rect x="0" y="0" width="16" height="630" fill="${primary}"/>
 <circle cx="1090" cy="105" r="190" fill="none" stroke="${primary}" stroke-width="44"/>
 <circle cx="1090" cy="105" r="116" fill="none" stroke="${secondary}" stroke-width="16"/>
 <circle cx="1090" cy="105" r="62" fill="${accent}"/>
 <path d="M80 498H1120" stroke="${palette.primary['800']}" stroke-width="2"/>
 </svg>`;
 const escape=(text:string)=>text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 const overlays:OverlayOptions[]=[];
 async function label(text:string,left:number,top:number,size:number,color:string,display=false,bold=false){
  const family=(display?tokens.typography.family.display:tokens.typography.family.body).split(',')[0]!.replace(/'/g,'');
  const image=await sharp({text:{text:`<span foreground="${color}"${bold?' weight="600"':''}>${escape(text)}</span>`,font:`${family} ${size}`,fontfile:path.resolve(`public/assets/fonts/${display?'InstrumentSans':'Geist'}.ttf`),rgba:true,dpi:72}}).png().toBuffer();
  overlays.push({input:image,left,top});
 }
 await label('Aman Sanoj',76,208,104,primary,true,true);
 await label('Software, electronics, and the work behind them.',80,352,30,text);
 await label('amansanoj.com',80,540,27,secondary);
 await label('Projects / Writing / About',782,547,20,muted);
 await mkdir('public/assets/og',{recursive:true});
 await sharp(Buffer.from(layout)).composite(overlays).jpeg({quality:92,chromaSubsampling:'4:4:4'}).toFile('public/assets/og/site.jpg');
}
