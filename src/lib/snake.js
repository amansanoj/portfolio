export function initGame(root) {
 const controller=new AbortController();
 const on=(el,event,fn)=>el.addEventListener(event,fn,{signal:controller.signal});
 const court=root.querySelector('#game-court'),body=root.querySelector('#snake-body'),food=root.querySelector('#snake-food'),button=root.querySelector('#game-start'),status=root.querySelector('#game-status');
 const vectors={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
 let snake,dir,queue,apple,score,running=false,over=false,timer;
 function spawn(){const free=[];for(let y=0;y<20;y++)for(let x=0;x<20;x++)if(!snake.some(p=>p.x===x&&p.y===y))free.push({x,y});apple=free[Math.floor(Math.random()*free.length)];}
 function draw(){
  while(body.children.length<snake.length){const r=document.createElementNS('http://www.w3.org/2000/svg','rect');for(const [k,v]of Object.entries({width:18,height:18,rx:6}))r.setAttribute(k,v);body.append(r);}
  while(body.children.length>snake.length)body.lastChild.remove();
  snake.forEach((p,i)=>{const r=body.children[i];r.style.transform=`translate(${p.x*20+1}px,${p.y*20+1}px)`;r.style.opacity=i===0?'1':'.75';});
  if(apple){food.setAttribute('cx',apple.x*20+10);food.setAttribute('cy',apple.y*20+10);}
 }
 function reset(){snake=[{x:5,y:10},{x:4,y:10},{x:3,y:10}];dir='right';queue=[];score=0;over=false;spawn();draw();}
 function pause(){if(!running)return;running=false;clearTimeout(timer);button.textContent='Resume';status.textContent=`Paused. Score: ${score}`;}
 function turn(next){const last=queue.at(-1)||dir;const [x,y]=vectors[next], [a,b]=vectors[last];if(queue.length<2&&next!==last&&(x+a!==0||y+b!==0))queue.push(next);}
 function tick(){if(!running)return;dir=queue.shift()||dir;const [dx,dy]=vectors[dir],head={x:snake[0].x+dx,y:snake[0].y+dy};const eating=head.x===apple.x&&head.y===apple.y;
  if(head.x<0||head.x>=20||head.y<0||head.y>=20||(eating?snake:snake.slice(0,-1)).some(p=>p.x===head.x&&p.y===head.y)){running=false;over=true;button.textContent='Play Again';status.textContent=`Game over. Score: ${score}`;return;}
  snake.unshift(head);if(!eating)snake.pop();else{score++;spawn();status.textContent=`Score: ${score}`;}draw();
  if(!apple){running=false;over=true;button.textContent='Play Again';status.textContent=`You won! Score: ${score}`;return;}timer=setTimeout(tick,Math.max(95,160-score*2));
 }
 on(button,'click',()=>{if(running){pause();return;}if(over)reset();running=true;button.textContent='Pause';status.textContent=`Score: ${score}`;court.focus({preventScroll:true});timer=setTimeout(tick,160);});
 on(court,'keydown',e=>{const key={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'}[e.key];if(key){e.preventDefault();turn(key);}if(e.key==='Escape')pause();});
 root.querySelectorAll('[data-direction]').forEach(b=>on(b,'click',()=>turn(b.dataset.direction)));
 let start;
 on(court,'pointerdown',e=>{start={x:e.clientX,y:e.clientY};court.setPointerCapture(e.pointerId);});
 on(court,'pointermove',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.max(Math.abs(dx),Math.abs(dy))<18)return;turn(Math.abs(dx)>Math.abs(dy)?dx>0?'right':'left':dy>0?'down':'up');start={x:e.clientX,y:e.clientY};});
 on(court,'pointerup',()=>{start=null;});on(court,'pointercancel',()=>{start=null;});on(root,'toggle',()=>{if(!root.open)pause();});on(window,'blur',pause);on(document,'visibilitychange',()=>{if(document.hidden)pause();});
 reset();return()=>{clearTimeout(timer);controller.abort();};
}
