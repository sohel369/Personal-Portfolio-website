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
  const [showCvModal, setShowCvModal] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const textRef = useRef(null)
  const passwordInputRef = useRef(null)

  const words = ["Web Designer", "Frontend Designer", "Web Developer", "Frontend Developer", "Software Designer"]

  useEffect(() => {
    if (showCvModal && passwordInputRef.current) {
      setTimeout(() => {
        passwordInputRef.current?.focus()
      }, 100)
    }
  }, [showCvModal])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showCvModal) {
        setShowCvModal(false)
        setErrorMsg('')
        setPasswordInput('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showCvModal])

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    const cleaned = passwordInput.trim().toLowerCase()
    
    if (!cleaned) {
      setErrorMsg('Please enter the password.')
      return
    }

    if (cleaned === 'sohel') {
      setIsSuccess(true)
      setErrorMsg('')

      // Trigger CV download
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '/MUHAMMAD SOHEL RANA-details_cv.pdf'
        link.download = 'MUHAMMAD SOHEL RANA-details_cv.pdf'
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }, 500)

      setTimeout(() => {
        setShowCvModal(false)
        setIsSuccess(false)
        setPasswordInput('')
      }, 2200)
    } else {
      setErrorMsg('Incorrect password! Please try again.')
    }
  }

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
      {/* Background YouTube Video Layer */}
      <div className="hero-video-bg">
        <iframe
          src="https://www.youtube.com/embed/QiPce31_FKg?autoplay=1&mute=1&loop=1&playlist=QiPce31_FKg&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1&enablejsapi=1"
          title="Hero Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          tabIndex="-1"
          aria-hidden="true"
        />
        <div className="hero-video-overlay"></div>
      </div>

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
          <a href="https://www.linkedin.com/in/muhammad-sohel-a543b83b9/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <i className='bx bxl-linkedin-square'></i>
          </a>
          <a href="https://github.com/sohel369" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <i className='bx bxl-github'></i>
          </a>
          <a href="https://wa.me/8801308446369" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
            <i className='bx bxl-whatsapp'></i>
          </a>
          <a href="https://www.facebook.com/profile.php?id=100082254065747" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
            <i className='bx bxl-facebook-circle'></i>
          </a>
          <button 
            type="button" 
            onClick={() => setShowCvModal(true)} 
            className="social-link cv-social-btn" 
            title="Download CV (Password Protected)"
            aria-label="Download CV"
          >
            <i className='bx bxs-file-pdf'></i>
            <span className="cv-social-label">CV</span>
          </button>
        </div>

        <div className="btn_group">
          <div className="btn_row_top">
            <ScrollLink href="#contact" className="btn btn-primary">
              <span style={{ color: '#000' }}>Hire Me</span>
              <i className='bx bx-right-arrow-alt'></i>
            </ScrollLink>
            <button 
              type="button" 
              onClick={() => setShowCvModal(true)} 
              className="btn btn-cv-cta"
            >
              <i className='bx bx-lock-alt'></i>
              <span>Get CV</span>
            </button>
          </div>
          <ScrollLink href="#portfolio" className="btn btn-secondary btn-portfolio-full">
            <span>View Portfolio</span>
            <i className='bx bx-down-arrow-alt'></i>
          </ScrollLink>
        </div>
      </div>

      <div className="home-img">
        <div className="img-wrapper">
          <div className="img-glow"></div>
          <img
            src="/sohel-rana.jpg"
            alt="Muhammad Sohel - Frontend Developer"
          />
          <div className="img-border"></div>
        </div>
        <div className="floating-badge">
          <i className='bx bx-code-alt'></i>
          <span>Available for Work</span>
        </div>
      </div>

      {/* Password Protected CV Modal */}
      {showCvModal && (
        <div className="cv-modal-overlay" onClick={() => !isSuccess && setShowCvModal(false)}>
          <div className="cv-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              type="button"
              className="cv-modal-close" 
              onClick={() => {
                setShowCvModal(false)
                setErrorMsg('')
                setPasswordInput('')
              }}
              aria-label="Close modal"
            >
              <i className='bx bx-x'></i>
            </button>

            <div className={`cv-modal-icon-wrap ${isSuccess ? 'success' : ''}`}>
              <i className={isSuccess ? 'bx bxs-check-shield' : 'bx bxs-lock-alt'}></i>
            </div>

            <h3 className="cv-modal-title">Protected CV Access</h3>
            <p className="cv-modal-desc">
              Please enter the access password to view & download <strong>Muhammad Sohel's</strong> CV.
            </p>

            <form onSubmit={handlePasswordSubmit} className="cv-modal-form">
              <div className={`cv-input-box ${errorMsg ? 'error-border' : ''}`}>
                <i className='bx bx-key input-icon'></i>
                <input
                  ref={passwordInputRef}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password (e.g. sohel)"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value)
                    if (errorMsg) setErrorMsg('')
                  }}
                  className="cv-input-element"
                  disabled={isSuccess}
                />
                <button
                  type="button"
                  className="cv-eye-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  <i className={showPassword ? 'bx bx-hide' : 'bx bx-show'}></i>
                </button>
              </div>

              {errorMsg && (
                <div className="cv-error-alert">
                  <i className='bx bx-error-circle'></i>
                  <span>{errorMsg}</span>
                </div>
              )}

              {isSuccess && (
                <div className="cv-success-alert">
                  <i className='bx bx-check-circle'></i>
                  <span>Password verified! Downloading CV...</span>
                </div>
              )}

              <button 
                type="submit" 
                className={`cv-submit-btn ${isSuccess ? 'success-btn' : ''}`}
                disabled={isSuccess}
              >
                {isSuccess ? (
                  <>
                    <i className='bx bx-check'></i>
                    <span>Access Granted!</span>
                  </>
                ) : (
                  <>
                    <i className='bx bx-lock-open-alt'></i>
                    <span>Unlock & Download CV</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

