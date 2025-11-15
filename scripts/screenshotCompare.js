const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const SCREENSHOT_DIR = path.join(process.cwd(), 'out', 'screenshots')
const PORT = process.env.PORT || 3000
const BASE_URL = `http://localhost:${PORT}`

async function takeScreenshot(page, name, viewport) {
  await page.setViewport(viewport)
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' })
  
  // Wait for animations to complete
  await page.waitForTimeout(2000)
  
  const screenshotPath = path.join(SCREENSHOT_DIR, `${name}.png`)
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  })
  
  console.log(`✓ Screenshot saved: ${screenshotPath}`)
}

async function main() {
  // Create screenshots directory
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true })
  }

  console.log('Starting screenshot capture...')
  console.log(`Target URL: ${BASE_URL}`)
  console.log('Make sure the dev server is running: npm run dev\n')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()

    // Desktop screenshot
    console.log('Taking desktop screenshot...')
    await takeScreenshot(page, 'desktop', {
      width: 1920,
      height: 1080
    })

    // Tablet screenshot
    console.log('Taking tablet screenshot...')
    await takeScreenshot(page, 'tablet', {
      width: 768,
      height: 1024
    })

    // Mobile screenshot
    console.log('Taking mobile screenshot...')
    await takeScreenshot(page, 'mobile', {
      width: 375,
      height: 667
    })

    console.log('\n✓ All screenshots captured successfully!')
    console.log(`Screenshots saved to: ${SCREENSHOT_DIR}`)
  } catch (error) {
    console.error('Error taking screenshots:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()

