import {test,expect} from '@playwright/test';

test('landing page has complete project stories, working image controls and static mobile motion',async({browser})=>{
 for(const width of [320,390,768,1440]){
  const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<900,isMobile:width<900});
  const page=await context.newPage();await page.goto('/');
  await expect(page.locator('.hero-piece')).toHaveCount(3);
  await expect(page.locator('.landing-feature')).toHaveCount(3);
  await expect(page.locator('.landing-posts article')).toHaveCount(3);
  expect(await page.evaluate(()=>document.documentElement.scrollHeight)).toBeGreaterThan(3000);
  for(const feature of await page.locator('.landing-feature').all()){
   const image=feature.locator('img');await image.scrollIntoViewIfNeeded();await image.evaluate(async(i:HTMLImageElement)=>i.decode());
   const dimensions=await image.evaluate((i:HTMLImageElement)=>{const r=i.getBoundingClientRect();return {rendered:r.width/r.height,original:i.naturalWidth/i.naturalHeight};});
   expect(Math.abs(dimensions.rendered-dimensions.original)).toBeLessThan(.02);
  }
  if(width<900){await expect(page.locator('.tilted-card,.spotlight-card,.landing-technologies .scroller')).toHaveCount(0);await expect(page.locator('.technology-static')).toBeVisible();}
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  await context.close();
 }
});

test('landing effects follow the reduced motion media query without a toggle',async({page})=>{
 await page.setViewportSize({width:1440,height:1000});await page.goto('/');
 await expect(page.locator('.tilted-card')).toBeVisible();
 await expect(page.locator('.spotlight-card')).toHaveCount(3);
 await expect(page.getByRole('button',{name:/Pause Motion|Resume Motion/})).toHaveCount(0);
 await expect(page.locator('.landing-technologies .scroller')).toBeVisible();
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(page.locator('.tilted-card,.spotlight-card,.landing-technologies .scroller')).toHaveCount(0);
 await expect(page.locator('.technology-static')).toBeVisible();
 await page.emulateMedia({reducedMotion:'no-preference'});
 await expect(page.locator('.tilted-card')).toBeVisible();
 await expect(page.locator('.landing-technologies .scroller')).toBeAttached();
 await page.locator('.hero-piece').first().getByRole('button').click();
 await expect(page.getByRole('dialog')).toBeVisible();
 await page.keyboard.press('Escape');
});
