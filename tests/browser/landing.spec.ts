import {test,expect} from '@playwright/test';

test('landing page has complete project stories, working image controls and static mobile motion',async({browser})=>{
 for(const width of [320,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<900,isMobile:width<900});
  const page=await context.newPage();await page.goto('/');
  await expect(page.locator('.hero-swap-card')).toHaveCount(3);
  await expect(page.locator('.landing-feature')).toHaveCount(3);
  await expect(page.locator('.landing-posts article')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeGreaterThan(3000);
  for(const feature of await page.locator('.landing-feature').all()){
   const image=feature.locator('img');await image.scrollIntoViewIfNeeded();await image.evaluate(async(i:HTMLImageElement)=>i.decode());
   const dimensions=await image.evaluate((i:HTMLImageElement)=>{const r=i.getBoundingClientRect();return {rendered:r.width/r.height,original:i.naturalWidth/i.naturalHeight};});
   expect(Math.abs(dimensions.rendered-dimensions.original)).toBeLessThan(.02);
  }
  if(width<900)await expect(page.locator('.spotlight-card')).toHaveCount(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  await context.close();
 }
});

test('landing effects follow the reduced motion media query without a toggle',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 await expect(page.locator('.tilted-card')).toHaveCount(0);
 await expect(page.locator('.spotlight-card')).toHaveCount(3);
 await expect(page.getByRole('button',{name:/Pause Motion|Resume Motion/})).toHaveCount(0);
 await expect(page.locator('.landing-languages .logoloop')).toBeVisible();
 await expect(page.getByText('The Tools Behind the Work',{exact:true})).toHaveCount(0);
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.spotlight-card,.landing-languages .logoloop')).toHaveCount(0);
 await expect(page.locator('.language-static li')).toHaveCount(14);
 await page.getByRole('button',{name:'Next project preview'}).click();
 await expect(page.getByRole('button',{name:'View Tether',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Previous project preview'}).click();
 await expect(page.getByRole('button',{name:'View Macro Pad',exact:true})).toBeVisible();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('.tilted-card')).toHaveCount(0);
 await expect(page.locator('.landing-languages .logoloop')).toBeAttached();
 await page.getByRole('button',{name:'View Macro Pad',exact:true}).click();
 await expect(page).toHaveURL(/\/projects\/macro-pad\/$/);
});

test('hero cards navigate from their padding and their images',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const target of ['.hero-swap-label','.hero-swap-image','.hero-swap-card']){
  await page.goto('/');
  const card=page.locator('.card-swap-slot[data-front]');
  await expect(card).toBeVisible();
  const image=card.locator('img');await image.evaluate(async(i:HTMLImageElement)=>i.decode());
  const ratio=await image.evaluate(i=>{const r=i.getBoundingClientRect();return r.width/r.height;});
  expect(ratio).toBeCloseTo(4/3,2);
  await card.locator(target).click(target==='.hero-swap-card'?{position:{x:5,y:5}}:{});
  await expect(page).toHaveURL(/\/projects\/macro-pad\/$/);
 }
});

test('hero card exits right and settles behind without widening the page',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.clock.install();await page.goto('/');
 await page.clock.runFor(100);
 const leaving=page.locator('.card-swap-slot[data-swap-index="0"]');
 await page.getByRole('button',{name:'Next project preview'}).click();
 await page.clock.runFor(100);
 const position=()=>leaving.evaluate(el=>{const t=new DOMMatrix(getComputedStyle(el).transform);return {x:t.m41,y:t.m42,z:t.m43};});
 const exiting=await position();expect(exiting.x).toBeGreaterThan(10);expect(Math.abs(exiting.y)).toBeLessThan(1);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 await page.clock.runFor(1500);
 const returned=await position();expect(returned.z).toBeLessThan(-100);expect(returned.x).toBeLessThan(exiting.x);
 await expect(page.locator('.card-swap-slot[data-front]')).toHaveAttribute('data-swap-index','1');
});

test('cards drag in every direction without navigating after release',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 for(const [dx,dy] of [[200,0],[-200,0],[0,-200],[0,200]]){
  await page.goto('/');await page.waitForTimeout(150);
  const card=page.locator('.card-swap-slot[data-front]');await expect(card).toBeVisible();
  const r=(await card.boundingBox())!;const x=r.x+r.width/2,y=r.y+r.height/2;
  await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x+dx,y+dy,{steps:12});await page.mouse.up();
  await expect(page.getByRole('button',{name:'View Tether',exact:true})).toBeVisible();
  await page.waitForTimeout(200);await expect(page).toHaveURL(/\/$/);
 }
});

test('language icons swipe on mobile and remain scrollable with reduced motion',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});
 const page=await context.newPage();await page.goto('/');
 const loop=page.locator('.logoloop');await loop.scrollIntoViewIfNeeded();
 await expect(loop.locator('.logoloop__label')).toHaveCount(0);
 await expect(loop.getByRole('img',{name:'TypeScript',exact:true})).toHaveCount(1);
 const box=(await loop.boundingBox())!,x=box.x+box.width*.8,y=box.y+box.height/2;
 const session=await context.newCDPSession(page);
 await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
 for(let i=1;i<=8;i++)await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*20,y}]});
 await expect(loop).toHaveAttribute('data-dragging','');
 await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await expect(loop).not.toHaveAttribute('data-dragging','');
 await page.emulateMedia({reducedMotion:'reduce'});
 const list=page.locator('.language-static');await expect(list.locator('li')).toHaveCount(14);
 expect(await list.evaluate(el=>el.scrollWidth>el.clientWidth)).toBe(true);
 await list.evaluate(el=>el.scrollLeft=150);expect(await list.evaluate(el=>el.scrollLeft)).toBeGreaterThan(100);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
 await context.close();
});
