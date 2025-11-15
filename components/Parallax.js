import { useEffect, useRef } from 'react'

/**
 * Parallax Component
 * Adds smooth parallax scrolling effect to elements
 * 
 * Usage:
 * <Parallax speed={0.5}>
 *   <div>Your content</div>
 * </Parallax>
 */
export default function Parallax({ children, speed = 0.5, className = '' }) {
  const elementRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return

      const scrolled = window.pageYOffset
      const rate = scrolled * speed
      
      elementRef.current.style.transform = `translateY(${rate}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed])

  return (
    <div ref={elementRef} className={`parallax-element ${className}`}>
      {children}
    </div>
  )
}

