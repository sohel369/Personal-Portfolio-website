import { useEffect, useRef, useState } from 'react'

// Use regular anchor tags for smooth scroll within page
const ScrollLink = ({ href, children, className }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const textRef = useRef(null)

  const words = ["Web Designer", "Frontend Designer", "Web Developer", "Frontend Developer", "Software Designer"]

  useEffect(() => {
    let typingInterval

    const typeWord = () => {
      setCharIndex(prev => {
        const newIndex = prev + 1
        if (newIndex <= words[currentIndex].length) {
          setDisplayText(words[currentIndex].substring(0, newIndex))
          return newIndex
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            setIsDeleting(true)
            typingInterval = setInterval(deleteWord, 100)
          }, 1000)
          return prev
        }
      })
    }

    const deleteWord = () => {
      setCharIndex(prev => {
        if (prev > 0) {
          const newIndex = prev - 1
          setDisplayText(words[currentIndex].substring(0, newIndex))
          return newIndex
        } else {
          clearInterval(typingInterval)
          setIsDeleting(false)
          setCurrentIndex(prevIndex => (prevIndex + 1) % words.length)
          setCharIndex(0)
          setTimeout(() => {
            typingInterval = setInterval(typeWord, 150)
          }, 400)
          return 0
        }
      })
    }

    if (!isDeleting && charIndex < words[currentIndex].length) {
      typingInterval = setInterval(typeWord, 150)
    } else if (isDeleting && charIndex > 0) {
      typingInterval = setInterval(deleteWord, 100)
    }

    return () => {
      if (typingInterval) clearInterval(typingInterval)
    }
  }, [charIndex, currentIndex, isDeleting, words])

  return (
    <section className="home" id="home" data-title="Home - Muhammad Sohel">
      {/* Animated Background Elements */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <div className="home-content">
        <div className="greeting-text"></div>
        <h1 className="hero-title">
          <span className="title-line">SOHEL</span>
          <span className="title-accent">Frontend Developer</span>
        </h1>
        <h3 className="hero-subtitle">
          I'm a <span className="text-animation" ref={textRef}>{displayText}</span>
        </h3>
        <p className="hero-description">
          Passionate developer crafting exceptional digital experiences. 
          Transforming ideas into innovative solutions with cutting-edge technology and creative design.
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">30+</span>
            <span className="stat-label">Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years</span>
          </div>
        </div>

        <div className="social-icons">
          <a href="#" className="social-link" aria-label="LinkedIn">
            <i className='bx bxl-linkedin-square'></i>
          </a>
          <a href="#" className="social-link" aria-label="GitHub">
            <i className='bx bxl-github'></i>
          </a>
          <a href="#" className="social-link" aria-label="Instagram">
            <i className='bx bxl-instagram-alt'></i>
          </a>
          <a href="#" className="social-link" aria-label="Twitter">
            <i className='bx bxl-twitter'></i>
          </a>
        </div>
        
        <div className="btn_group">
          <ScrollLink href="#contact" className="btn btn-primary">
            <span style={{ color: '#000' }}>Hire Me</span>
            <i className='bx bx-right-arrow-alt'></i>
          </ScrollLink>
          <ScrollLink href="#portfolio" className="btn btn-secondary">
            <span>View Portfolio</span>
            <i className='bx bx-down-arrow-alt'></i>
          </ScrollLink>
        </div>
      </div>
      
      <div className="home-img">
        <div className="img-wrapper">
          <div className="img-glow"></div>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn4zpMIKUbgJpiQ73yJbL48o2OsBW4DfvHD0dV1vtm31MVeyOiTjtvl-gVlbGkTuvcSy0&usqp=CAU"
            alt="SOHEL Developer"
          />
          <div className="img-border"></div>
        </div>
        <div className="floating-badge">
          <i className='bx bx-code-alt'></i>
          <span>Available for Work</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll Down</div>
      </div>
    </section>
  )
}

