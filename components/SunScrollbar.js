import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function SunScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('idle'); // 'down' | 'up' | 'idle'
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  const updateScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (scrollHeight > 0) {
      const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
      setScrollProgress(progress);
    }

    const diff = scrollTop - lastScrollYRef.current;
    if (Math.abs(diff) > 2) {
      if (diff > 0) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollDirection('idle');
      }, 350);
    }

    lastScrollYRef.current = scrollTop;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [updateScroll]);

  // Handle Dragging / Clicking on track
  const handleDrag = useCallback((clientY) => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    
    const thumbSize = 22;
    const trackHeight = window.innerHeight - thumbSize;
    const boundedY = Math.max(0, Math.min(clientY - thumbSize / 2, trackHeight));
    const targetProgress = boundedY / trackHeight;
    const targetScrollY = targetProgress * scrollHeight;

    const diff = targetScrollY - lastScrollYRef.current;
    if (Math.abs(diff) > 1) {
      setScrollDirection(diff > 0 ? 'down' : 'up');
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setScrollDirection('idle');
      }, 350);
    }
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'auto'
    });
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    handleDrag(e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      isDraggingRef.current = true;
      handleDrag(e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        handleDrag(e.clientY);
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        setIsDragging(false);
        isDraggingRef.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setScrollDirection('idle');
        }, 200);
      }
    };

    const handleTouchMove = (e) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        handleDrag(e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      if (isDraggingRef.current) {
        setIsDragging(false);
        isDraggingRef.current = false;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setScrollDirection('idle');
        }, 200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleDrag]);

  // Calculate thumb top position in viewport
  const thumbSize = 22;
  const maxTravel = typeof window !== 'undefined' ? window.innerHeight - thumbSize : 800;
  const topPos = scrollProgress * maxTravel;

  return (
    <div 
      className={`sun-scrollbar-track ${isHovered || isDragging ? 'active' : ''}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Fiery Sun Scrollbar"
    >
      <div 
        className={`sun-scrollbar-thumb ${isDragging ? 'dragging' : ''} direction-${scrollDirection}`}
        style={{
          transform: `translate3d(0, ${topPos}px, 0)`
        }}
      >
        {/* Upward Fiery Light Headlight Beam (when scrolling UP) */}
        <div className={`sun-light-beam beam-up ${scrollDirection === 'up' ? 'active' : ''}`}>
          <div className="beam-cone"></div>
          <div className="beam-glow"></div>
          <div className="beam-sparks"></div>
        </div>

        {/* Downward Fiery Light Headlight Beam (when scrolling DOWN) */}
        <div className={`sun-light-beam beam-down ${scrollDirection === 'down' ? 'active' : ''}`}>
          <div className="beam-cone"></div>
          <div className="beam-glow"></div>
          <div className="beam-sparks"></div>
        </div>

        {/* Ambient Halo & Corona */}
        <div className="sun-thumb-corona"></div>
        <div className="sun-thumb-flare"></div>
        <div className="sun-thumb-core"></div>
      </div>
    </div>
  );
}
