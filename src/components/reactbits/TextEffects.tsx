// React Bits SplitText hover lift, using words to preserve natural wrapping.
export function SplitText({children}:{children:string}){
 return <span className="split-text">{children.split(/(\s+)/).map((word,i)=>/^\s+$/.test(word)?word:<span className="split-word" key={i} style={{'--word-delay':`${Math.min(i*18,100)}ms`} as React.CSSProperties}>{word}</span>)}</span>;
}
