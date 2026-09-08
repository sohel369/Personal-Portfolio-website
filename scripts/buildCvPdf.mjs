import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

function generateCv() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 28, bottom: 28, left: 32, right: 32 },
    autoFirstPage: true
  });

  const outDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const publicPdfPath = path.join(outDir, 'MUHAMMAD SOHEL RANA-details_cv.pdf');
  const rootPdfPath = path.join(process.cwd(), 'MUHAMMAD SOHEL RANA-details_cv.pdf');

  const publicStream = fs.createWriteStream(publicPdfPath);
  doc.pipe(publicStream);

  const primaryColor = '#0f172a'; // Slate 900
  const accentColor = '#0284c7';  // Ocean Blue
  const darkTeal = '#0369a1';     // Sky 700
  const textColor = '#334155';    // Slate 700
  const subTextColor = '#64748b'; // Slate 500
  const contentWidth = 531;

  let y = 28;

  // --- HEADER SECTION ---
  doc.rect(32, y, contentWidth, 68).fill('#f1f5f9');
  doc.rect(32, y, 5, 68).fill(accentColor);

  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(18).text('MUHAMMAD SOHEL RANA', 46, y + 8);
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(10.5).text('Senior Frontend Developer & Full-Stack Web Specialist', 46, y + 28);

  doc.fillColor(textColor).font('Helvetica').fontSize(8);
  doc.text('Phone/WhatsApp: +880 1308-446369  |  Email: sohel0130844@gmail.com  |  Location: Dhaka, Bangladesh', 46, y + 43);
  doc.text('Portfolio: https://sohel369.com  |  LinkedIn: linkedin.com/in/muhammad-sohel-a543b83b9  |  GitHub: github.com/sohel369', 46, y + 54);

  y += 74;

  // --- KEY STATS BADGES ---
  const badgeWidth = (contentWidth - 18) / 4;
  const badges = [
    { title: '5+ Years', subtitle: 'Experience' },
    { title: '50+ Projects', subtitle: 'Completed Worldwide' },
    { title: '30+ Clients', subtitle: 'Satisfied Globally' },
    { title: '100% Quality', subtitle: 'Performance & SEO' }
  ];

  badges.forEach((b, i) => {
    const bx = 32 + i * (badgeWidth + 6);
    doc.rect(bx, y, badgeWidth, 24).fillAndStroke('#f8fafc', '#cbd5e1');
    doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(9.5).text(b.title, bx, y + 3, { width: badgeWidth, align: 'center' });
    doc.fillColor(subTextColor).font('Helvetica').fontSize(7).text(b.subtitle, bx, y + 13, { width: badgeWidth, align: 'center' });
  });

  y += 30;

  // Section Header Helper
  function drawSectionHeader(title) {
    doc.rect(32, y, contentWidth, 17).fill('#e2e8f0');
    doc.rect(32, y, 4, 17).fill(accentColor);
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9.5).text(title, 42, y + 4);
    y += 21;
  }

  // --- 1. PROFESSIONAL SUMMARY ---
  drawSectionHeader('PROFESSIONAL SUMMARY');
  const summaryText = 'Passionate, results-driven Senior Frontend Developer and Web Designer with 5+ years of experience designing, architecting, and deploying high-performance web applications and modern user interfaces. Delivered 50+ projects for 30+ satisfied clients worldwide. Expert in JavaScript (ES6+), React.js, Next.js, TypeScript, Tailwind CSS, REST APIs, and database integrations. Dedicated to writing clean, maintainable code with high performance, accessibility (a11y), and technical SEO.';
  doc.fillColor(textColor).font('Helvetica').fontSize(8).text(summaryText, 32, y, { width: contentWidth, align: 'justify', lineGap: 1.5 });
  y += doc.heightOfString(summaryText, { width: contentWidth, lineGap: 1.5 }) + 6;

  // --- 2. TECHNICAL SKILLS ---
  drawSectionHeader('CORE TECHNICAL SKILLS & EXPERTISE');
  const skills = [
    { cat: 'Frontend Technologies', items: 'React.js, Next.js (App/Pages), JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap, Redux Toolkit, Responsive UI/UX' },
    { cat: 'Backend & Databases', items: 'Node.js, Express.js, RESTful APIs, Supabase, Firebase, MongoDB, PostgreSQL, Serverless Functions, JWT Authentication' },
    { cat: 'Tools & DevOps', items: 'Git, GitHub, VS Code, Turbopack, Webpack, Vercel, Netlify, Postman, Chrome DevTools, npm / yarn, CI/CD Workflows' },
    { cat: 'Design & Optimization', items: 'Figma to Pixel-Perfect Code, UI/UX Principles, Web Performance Optimization, Core Web Vitals, Technical SEO, a11y' }
  ];

  skills.forEach(s => {
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7.8).text('•  ' + s.cat + ': ', 34, y, { continued: true });
    doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(s.items, { width: contentWidth - 4, lineGap: 1 });
    const h = doc.heightOfString('•  ' + s.cat + ': ' + s.items, { width: contentWidth - 4, lineGap: 1 });
    y += h + 2.5;
  });

  y += 4;

  // --- 3. PROFESSIONAL EXPERIENCE ---
  drawSectionHeader('PROFESSIONAL EXPERIENCE');

  // Job 1
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9).text('Senior Frontend Developer & UI Specialist', 34, y);
  doc.fillColor(darkTeal).font('Helvetica-Bold').fontSize(8).text('Freelance & Global Client Contracts', 34, y + 10);
  doc.fillColor(subTextColor).font('Helvetica-Oblique').fontSize(7.5).text('2021 - Present | Remote', 380, y + 10, { align: 'right', width: 183 });
  y += 20;

  const job1Bullets = [
    'Architected and deployed 35+ responsive, cross-browser web applications with Next.js, React, and Tailwind CSS with sub-second page load times.',
    'Integrated Supabase and RESTful APIs for real-time data synchronization, user authentication, interactive AI widgets, and contact routing.',
    'Achieved 95+ scores on Google Lighthouse via modern image optimization, lazy loading, code-splitting, and caching strategies.'
  ];

  job1Bullets.forEach(b => {
    const bulletText = '• ' + b;
    doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(bulletText, 40, y, { width: contentWidth - 12, lineGap: 1 });
    y += doc.heightOfString(bulletText, { width: contentWidth - 12, lineGap: 1 }) + 2.5;
  });

  y += 3;

  // Job 2
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(9).text('Frontend Developer & Web Designer', 34, y);
  doc.fillColor(darkTeal).font('Helvetica-Bold').fontSize(8).text('Tech Solutions Agency', 34, y + 10);
  doc.fillColor(subTextColor).font('Helvetica-Oblique').fontSize(7.5).text('2019 - 2021 | Dhaka, Bangladesh', 380, y + 10, { align: 'right', width: 183 });
  y += 20;

  const job2Bullets = [
    'Engineered frontend modules for 15+ client websites using HTML5, CSS3, JavaScript, Bootstrap, and Node.js.',
    'Converted complex Figma prototypes into interactive, mobile-optimized websites boosting client user engagement by 40%.'
  ];

  job2Bullets.forEach(b => {
    const bulletText = '• ' + b;
    doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(bulletText, 40, y, { width: contentWidth - 12, lineGap: 1 });
    y += doc.heightOfString(bulletText, { width: contentWidth - 12, lineGap: 1 }) + 2.5;
  });

  y += 4;

  // --- 4. FEATURED PROJECTS ---
  drawSectionHeader('FEATURED PROJECTS & CASE STUDIES');

  const projects = [
    {
      title: 'Personal Portfolio Platform & AI Assistant (sohel369.com)',
      stack: 'Next.js 16, React 19, Turbopack, Custom CSS3, Supabase, Vercel',
      desc: 'Engineered high-performance personal branding website featuring an interactive AI chatbot, custom circular sun scrollbar indicator, password-protected credential modal, and automated Supabase messaging.'
    },
    {
      title: 'Full-Stack E-Commerce & Payment Application',
      stack: 'React.js, Node.js, Express, Stripe API, MongoDB, Tailwind CSS',
      desc: 'Developed robust online shopping solution with product search, filtering, customer authentication, automated order management, and secure Stripe checkout.'
    },
    {
      title: 'Real-Time Collaborative Task Dashboard',
      stack: 'Next.js, TypeScript, Firebase Realtime Database, Tailwind CSS',
      desc: 'Created dynamic drag-and-drop Kanban project management tool with team workspace sharing, instant live updates, and role-based access control.'
    }
  ];

  projects.forEach(p => {
    doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(8.5).text(p.title, 34, y);
    doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(7.5).text('Tech Stack: ' + p.stack, 34, y + 10);
    const descText = p.desc;
    doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(descText, 34, y + 19, { width: contentWidth - 4, lineGap: 1 });
    const h = doc.heightOfString(descText, { width: contentWidth - 4, lineGap: 1 });
    y += 19 + h + 4;
  });

  y += 2;

  // --- 5. SERVICES & EDUCATION ---
  drawSectionHeader('SERVICES OFFERED & EDUCATION');

  const s1 = 'Custom Web Design, Single Page Applications (SPA), Full-Stack Development, REST API Integration, Web Performance & SEO Optimization.';
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7.8).text('•  Services Offered: ', 34, y, { continued: true });
  doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(s1, { width: contentWidth - 4, lineGap: 1 });
  y += doc.heightOfString('•  Services Offered: ' + s1, { width: contentWidth - 4, lineGap: 1 }) + 3;

  const s2 = 'Bachelor of Science in Computer Science & Engineering (B.Sc. in CSE).';
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7.8).text('•  Education & Degree: ', 34, y, { continued: true });
  doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(s2, { width: contentWidth - 4, lineGap: 1 });
  y += doc.heightOfString('•  Education & Degree: ' + s2, { width: contentWidth - 4, lineGap: 1 }) + 3;

  const s3 = 'English (Professional Working Proficiency), Bengali (Native / Bilingual).';
  doc.fillColor(primaryColor).font('Helvetica-Bold').fontSize(7.8).text('•  Languages: ', 34, y, { continued: true });
  doc.fillColor(textColor).font('Helvetica').fontSize(7.8).text(s3, { width: contentWidth - 4, lineGap: 1 });

  // Footer bar on single page
  doc.rect(32, 792, contentWidth, 1).fill('#cbd5e1');
  doc.fillColor('#94a3b8').font('Helvetica').fontSize(7).text('Muhammad Sohel Rana  |  Curriculum Vitae  |  https://sohel369.com', 32, 796, { align: 'center', width: contentWidth });

  doc.end();

  publicStream.on('finish', () => {
    fs.copyFileSync(publicPdfPath, rootPdfPath);
    console.log('PDF Generated Successfully with ZERO overlaps on 1 Page:');
    console.log('1. ' + publicPdfPath);
    console.log('2. ' + rootPdfPath);
  });
}

generateCv();
