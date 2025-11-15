# Portfolio Next.js - Production Ready

This is a production-ready Next.js conversion of the SOHEL Portfolio website, maintaining pixel-perfect fidelity with the original design.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Edit .env.local with your SMTP credentials (optional)
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio-next/
├── components/          # React components
│   ├── Header.js
│   ├── Hero.js
│   ├── About.js
│   ├── Skills.js
│   ├── Portfolio.js
│   ├── Services.js
│   ├── Testimonials.js
│   ├── Process.js
│   ├── Contact.js
│   ├── Footer.js
│   └── ChatWidget.js
├── pages/
│   ├── _app.js         # App wrapper
│   ├── _document.js    # Custom document
│   ├── index.js        # Home page
│   └── api/
│       └── contact.js  # Contact form API
├── public/             # Static assets
│   └── logoShortcutIcon.png
├── styles/
│   └── globals.css     # All CSS (preserved from original)
├── scripts/
│   ├── screenshotCompare.js
│   └── generatePdf.js
└── next.config.js
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# SMTP Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
TO_EMAIL=your-email@gmail.com
```

### Contact Form Options

**Option 1: Use Nodemailer (Recommended)**
- Configure SMTP settings in `.env.local`
- The API route at `/api/contact` will handle email sending

**Option 2: Use Formspree (No Backend)**
- Update the form action in `components/Contact.js`:
  ```jsx
  <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ```
- Remove or comment out the `onSubmit` handler

## 📧 Contact Form API

The contact form API route (`/api/contact`) handles form submissions with:

- Input validation and sanitization
- Email sending via Nodemailer
- Error handling
- Rate limiting ready (add your implementation)

### Testing the API

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

**Using Postman:**
1. Method: POST
2. URL: `http://localhost:3000/api/contact`
3. Body (form-data or JSON):
   - name: Test User
   - email: test@example.com
   - message: Test message

## 🧪 Testing & Validation

### Screenshot Comparison

Capture screenshots for visual comparison:

```bash
# Start dev server in one terminal
npm run dev

# In another terminal, run screenshot script
npm run screenshot
```

Screenshots will be saved to `out/screenshots/`:
- `desktop.png` (1920x1080)
- `tablet.png` (768x1024)
- `mobile.png` (375x667)

### PDF Generation

Generate PDF of the portfolio:

```bash
# Start dev server
npm run dev

# Generate PDF
npm run pdf
```

PDF will be saved to `out/pdfs/portfolio.pdf`

## 🎨 Design Fidelity

All original design elements are preserved:
- ✅ Exact CSS styles (moved to `styles/globals.css`)
- ✅ All animations and transitions
- ✅ Color schemes and gradients
- ✅ Typography and spacing
- ✅ Responsive breakpoints
- ✅ Interactive behaviors

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Configure environment variables on your hosting platform

## 🔒 Security Notes

- SMTP credentials are stored in `.env.local` (never commit this file)
- Input sanitization is implemented in the contact API
- Consider adding rate limiting for production
- Use HTTPS in production

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run screenshot` - Capture screenshots
- `npm run pdf` - Generate PDF
- `npm run zip` - Create deliverable zip

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Use a different port
PORT=3001 npm run dev
```

**SMTP not working:**
- Check your SMTP credentials
- For Gmail, use an App Password (not your regular password)
- Check firewall/network settings

**Styles not loading:**
- Ensure `styles/globals.css` exists
- Check that `_app.js` imports the CSS file

## 📄 License

All rights reserved - SOHEL Developer

## 🤝 Support

For issues or questions, please contact: sohel@example.com
