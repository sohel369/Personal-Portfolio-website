import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top scroll behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
      <i className='bx bx-up-arrow-alt'></i>
      <style jsx>{`
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 45px;
          height: 45px;
          background: #2563eb;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 2px solid transparent;
        }

        .scroll-to-top:hover {
          background: #1d4ed8;
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .scroll-to-top.visible {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  )
}
