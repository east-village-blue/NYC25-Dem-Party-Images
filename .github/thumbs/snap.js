const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
  fs.mkdirSync('thumbs', { recursive: true });

  for (const file of files) {
    const path = `file://${process.cwd()}/${file}`;
    console.log(`Generating thumbnail for ${file}`);
    await page.goto(path, { waitUntil: 'networkidle2' });
    await page.screenshot({
      path: `thumbs/${file.replace('.html', '.png')}`,
      fullPage: true
    });
  }

  await browser.close();
})();
