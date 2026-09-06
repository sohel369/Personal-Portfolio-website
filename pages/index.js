import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Process from '../components/Process'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ChatWidget from '../components/ChatWidget'
import DynamicTitle from '../components/DynamicTitle'
import ScrollToTop from '../components/ScrollToTop'

export default function Home() {
  return (
    <>
      <Head>
        <title>Muhammad Sohel - Portfolio | Frontend Developer & Designer</title>
        <meta name="description" content="Portfolio website of Muhammad Sohel - Frontend Developer, Web Designer, crafting high-performance digital experiences." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logoShortcutIcon.png" />
        <link rel="canonical" href="https://www.sohel369.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sohel369.com/" />
        <meta property="og:title" content="Muhammad Sohel - Portfolio | Frontend Developer" />
        <meta property="og:description" content="Passionate developer crafting exceptional digital experiences with cutting-edge technology." />
        <meta property="og:image" content="https://www.sohel369.com/sohel-rana.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.sohel369.com/" />
        <meta name="twitter:title" content="Muhammad Sohel - Portfolio" />
        <meta name="twitter:description" content="Passionate developer crafting exceptional digital experiences." />
        <meta name="twitter:image" content="https://www.sohel369.com/sohel-rana.jpg" />

        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </Head>
      <DynamicTitle defaultTitle="Muhammad Sohel - Portfolio" />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
      <ScrollToTop />
    </>
  )
}

