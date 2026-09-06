import { useState, useEffect, useRef } from 'react'

// Use regular anchor tags for smooth scroll within page
const ScrollLink = ({ href, children, className, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    if (onClick) onClick()
  }
  
  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const headerRef = useRef(null)
  const menuIconRef = useRef(null)
  const navbarRef = useRef(null)
  const lastScrollY = useRef(0)
  const isMenuOpenRef = useRef(false)

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset || window.scrollY
      const header = headerRef.current
      const prevScroll = lastScrollY.current

      if (header) {
        if (currentScroll > 30) {
          header.classList.add('sticky')
        } else {
          header.classList.remove('sticky')
        }

        // Hide on scroll down, show on scroll up (both desktop and mobile)
        if (!isMenuOpenRef.current) {
          if (currentScroll > prevScroll && currentScroll > 80) {
            // User is scrolling DOWN -> Hide header
            header.classList.add('header-hidden')
          } else if (currentScroll < prevScroll) {
            // User is scrolling UP -> Show header
            header.classList.remove('header-hidden')
          }
        } else {
          header.classList.remove('header-hidden')
        }
      }

      lastScrollY.current = currentScroll <= 0 ? 0 : currentScroll

      // Active section highlighting
      const sections = document.querySelectorAll('section')
      sections.forEach(sec => {
        const top = window.scrollY
        const offset = sec.offsetTop - 150
        const height = sec.offsetHeight
        const id = sec.getAttribute('id')
        if (top >= offset && top < offset + height) {
          setActiveSection(id || 'home')
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    if (window.innerWidth <= 991) {
      setIsMenuOpen(!isMenuOpen)
      if (navbarRef.current) {
        navbarRef.current.classList.toggle('active')
      }
      if (menuIconRef.current) {
        menuIconRef.current.classList.toggle('bx-x')
      }
      document.body.style.overflow = isMenuOpen ? '' : 'hidden'
      document.body.classList.toggle('menu-open', !isMenuOpen)
    }
  }

  const closeMenu = () => {
    if (window.innerWidth <= 991) {
      setIsMenuOpen(false)
      if (navbarRef.current) {
        navbarRef.current.classList.remove('active')
      }
      if (menuIconRef.current) {
        menuIconRef.current.classList.remove('bx-x')
      }
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }

  const handleLinkClick = () => {
    closeMenu()
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 991) {
        if (
          isMenuOpen &&
          navbarRef.current &&
          !navbarRef.current.contains(e.target) &&
          menuIconRef.current &&
          !menuIconRef.current.contains(e.target)
        ) {
          closeMenu()
        }
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className="header" ref={headerRef}>
      <ScrollLink href="#home" className="logo">
        <img src="/logoShortcutIcon.png" alt="SOHEL Developer Logo" className="logo-img" />
      </ScrollLink>

      <i 
        className='bx bx-menu' 
        id="menu-icon" 
        ref={menuIconRef}
        onClick={toggleMenu}
      />

      <nav className="navbar" ref={navbarRef}>
        <ScrollLink 
          href="#home" 
          className={activeSection === 'home' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          Home
        </ScrollLink>
        <ScrollLink 
          href="#about" 
          className={activeSection === 'about' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          About
        </ScrollLink>
        <ScrollLink 
          href="#skills" 
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          Skills
        </ScrollLink>
        <div className="dropdown">
          <ScrollLink href="#portfolio" className="dropdown-toggle">
            Portfolio <i className='bx bx-chevron-down'></i>
          </ScrollLink>
          <div className="dropdown-menu">
            <ScrollLink href="#portfolio" onClick={handleLinkClick}>All Projects</ScrollLink>
            <ScrollLink href="#portfolio" onClick={handleLinkClick}>Web Projects</ScrollLink>
            <ScrollLink href="#portfolio" onClick={handleLinkClick}>Mobile Apps</ScrollLink>
            <ScrollLink href="#portfolio" onClick={handleLinkClick}>Design Work</ScrollLink>
          </div>
        </div>
        <div className="dropdown">
          <ScrollLink href="#service" className="dropdown-toggle">
            Services <i className='bx bx-chevron-down'></i>
          </ScrollLink>
          <div className="dropdown-menu">
            <ScrollLink href="#service" onClick={handleLinkClick}>All Services</ScrollLink>
            <ScrollLink href="#service" onClick={handleLinkClick}>Web Design</ScrollLink>
            <ScrollLink href="#service" onClick={handleLinkClick}>Web Development</ScrollLink>
            <ScrollLink href="#service" onClick={handleLinkClick}>Backend Development</ScrollLink>
            <ScrollLink href="#service" onClick={handleLinkClick}>UI/UX Design</ScrollLink>
          </div>
        </div>
        <ScrollLink 
          href="#testimonials" 
          className={activeSection === 'testimonials' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          Testimonials
        </ScrollLink>
        <ScrollLink 
          href="#contact" 
          className={activeSection === 'contact' ? 'active' : ''}
          onClick={handleLinkClick}
        >
          Contact
        </ScrollLink>
      </nav>

      {/* Hire Me Button */}
      <ScrollLink 
        href="#contact" 
        className="hire-me-btn"
        onClick={handleLinkClick}
      >
        <span>Hire Me</span>
        <i className='bx bx-right-arrow-alt'></i>
      </ScrollLink>
    </header>
  )
}

