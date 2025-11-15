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

export default function Home() {
  return (
    <>
      <Head>
        <title>Muhammad Sohel - Portfolio</title>
        <meta name="description" content="Portfolio website of Muhammad Sohel - Frontend Designer, Web Developer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logoShortcutIcon.png" />
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
    </>
  )
}

