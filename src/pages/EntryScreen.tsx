/**
 * ============================================================================
 * Ekene - Entry Screen (Gateway)
 * ============================================================================
 * Location: src/pages/EntryScreen.tsx
 * 
 * First screen users see - warm, welcoming, Afrocentric
 * Animated textile background with pulsing calabash emblem
 * ============================================================================
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function EntryScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Animated background canvas effect
  useEffect(() => {
    const canvas = document.getElementById('ekene-bg-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Animation variables
    let animationFrame: number;
    let offset = 0;

    // Draw animated Adinkra-inspired pattern
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#E5A039'); // Sunrise gold
      gradient.addColorStop(0.5, '#2B6E3E'); // Palm green
      gradient.addColorStop(1, '#D96B3C'); // Terracotta clay

      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.05;

      // Draw moving circular patterns (like woven cloth)
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 5) * i + Math.sin(offset + i) * 20;
        const y = canvas.height / 2 + Math.cos(offset + i) * 50;
        const radius = 100 + Math.sin(offset + i * 0.5) * 20;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      offset += 0.01;
      animationFrame = requestAnimationFrame(drawPattern);
    };

    drawPattern();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleEnter = async () => {
    setIsLoading(true);
    // TODO: Check if user is authenticated
    // If yes, go to home feed
    // If no, go to auth screen
    navigate('/auth');
  };

  const handleGuest = () => {
    // TODO: Set guest mode flag
    navigate('/feed');
  };

  return (
    <div className="entry-screen">
      {/* Animated Background Canvas */}
      <canvas 
        id="ekene-bg-canvas" 
        className="entry-screen__bg-canvas"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="entry-screen__content">
        {/* Pulsing Calabash Emblem */}
        <motion.div 
          className="entry-screen__emblem"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Calabash SVG Icon */}
          <svg 
            width="120" 
            height="120" 
            viewBox="0 0 120 120" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer circle - calabash outline */}
            <circle 
              cx="60" 
              cy="60" 
              r="50" 
              stroke="#E5A039" 
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
            
            {/* Inner pattern - cowrie shells */}
            <circle cx="60" cy="35" r="6" fill="#D96B3C" />
            <circle cx="80" cy="50" r="6" fill="#D96B3C" />
            <circle cx="75" cy="75" r="6" fill="#D96B3C" />
            <circle cx="45" cy="75" r="6" fill="#D96B3C" />
            <circle cx="40" cy="50" r="6" fill="#D96B3C" />
            
            {/* Center ember */}
            <circle 
              cx="60" 
              cy="60" 
              r="15" 
              fill="url(#emblem-gradient)"
            />
            
            <defs>
              <linearGradient id="emblem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E5A039" />
                <stop offset="100%" stopColor="#D96B3C" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Welcome Text */}
        <motion.div 
          className="entry-screen__text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="entry-screen__title">
            Welcome to Ekene
          </h1>
          <p className="entry-screen__subtitle">
            The Art of Appreciation
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="entry-screen__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <button 
            className="btn btn-primary btn-lg entry-screen__btn-enter"
            onClick={handleEnter}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner" />
                Entering...
              </>
            ) : (
              'Enter Ekene'
            )}
          </button>

          <button 
            className="btn btn-outline btn-lg entry-screen__btn-guest"
            onClick={handleGuest}
            disabled={isLoading}
          >
            Continue as Guest
          </button>
        </motion.div>

        {/* Cultural Note */}
        <motion.p 
          className="entry-screen__note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          "Ekene" means <em>gratitude</em> in Igbo
        </motion.p>
      </div>
    </div>
  );
}
