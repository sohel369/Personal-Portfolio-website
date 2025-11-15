const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')

const PDF_DIR = path.join(process.cwd(), 'out', 'pdfs')
const PORT = process.env.PORT || 3000
const BASE_URL = `http://localhost:${PORT}`

async function generatePDF(page, name, options = {}) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle2' })
  
  // Wait for animations to complete
  await page.waitForTimeout(2000)
  
  const pdfPath = path.join(PDF_DIR, `${name}.pdf`)
  await page.pdf({
    path: pdfPath,
    format: options.format || 'A4',
    printBackground: true,
    margin: options.margin || {
      top: '20mm',
      right: '20mm',
      bottom: '20mm',
      left: '20mm'
    }
  })
  
  console.log(`✓ PDF generated: ${pdfPath}`)
}

async function main() {
  // Create PDF directory
  if (!fs.existsSync(PDF_DIR)) {
    fs.mkdirSync(PDF_DIR, { recursive: true })
  }

  console.log('Starting PDF generation...')
  console.log(`Target URL: ${BASE_URL}`)
  console.log('Make sure the dev server is running: npm run dev\n')

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })

    // Generate main portfolio PDF
    console.log('Generating portfolio PDF...')
    await generatePDF(page, 'portfolio', {
      format: 'A4',
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm'
      }
    })

    console.log('\n✓ PDF generation completed!')
    console.log(`PDFs saved to: ${PDF_DIR}`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()

