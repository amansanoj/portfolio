import {test,expect} from '@playwright/test';

for(const mobile of [false,true])test(`Snake continuous movement, turns and pause (${mobile?'touch':'keyboard'})`,async({browser})=>{
 const context=await browser.newContext({viewport:{width:mobile?390:1440,height:900},isMobile:mobile,hasTouch:mobile});
 const page=await context.newPage();
 await page.clock.install();
 await page.goto('http://127.0.0.1:4173/404.html');
 await page.getByText('Play a Game',{exact:true}).click();
 const path=page.locator('#snake-body path');
 await expect(path).toHaveAttribute('d','M110,210 L90,210 L70,210');
 await page.locator('#game-start').click();
 await page.clock.runFor(240);
 const before=await path.getAttribute('d');
 await page.clock.runFor(32);
 expect(await path.getAttribute('d')).not.toBe(before);
 if(mobile){
  const box=(await page.locator('#game-court').boundingBox())!;
  const session=await context.newCDPSession(page);
  const x=box.x+box.width/2,y=box.y+box.height/2;
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-50}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 }else await page.locator('#game-court').press('ArrowUp');
 await page.clock.runFor(160);
 const d=(await path.getAttribute('d'))!;
 const points=[...d.matchAll(/[ML]([\d.]+),([\d.]+)/g)].map(m=>[Number(m[1]),Number(m[2])]);
 expect(points[0][1]).toBeLessThan(210);
 // Every part of the body follows horizontal/vertical edges through a turn.
 for(let i=1;i<points.length;i++)expect(points[i][0]===points[i-1][0]||points[i][1]===points[i-1][1]).toBe(true);
 await page.locator('#game-start').click();
 const paused=await path.getAttribute('d');
 await page.clock.runFor(1000);expect(await path.getAttribute('d')).toBe(paused);
 await page.locator('#game-start').click();
 await page.clock.runFor(4000);
 await expect(page.locator('#game-status')).toContainText('Game over');
 await page.locator('#game-start').click();
 await expect(path).toHaveAttribute('d','M110,210 L90,210 L70,210');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 await context.close();
});
