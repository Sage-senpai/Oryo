
// Location: src/pages/AuthScreen.tsx


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrivy } from '@privy-io/react-auth';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame } from 'lucide-react';

type AuthStep = 'input' | 'otp';

export function AuthScreen() {
  const navigate = useNavigate();
  const { login, ready } = usePrivy();
  const [step, setStep] = useState<AuthStep>('input');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle phone/email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual Privy login
      // For now, simulate OTP send
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send code');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when complete
    if (index === 5 && value) {
      handleOtpSubmit(newOtp.join(''));
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = async (code: string) => {
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual Privy OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success - navigate to app
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'Invalid code');
      setOtp(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      {/* Background pattern */}
      <div className="auth-screen__bg">
        <div className="pattern-orb pattern-orb--1" />
        <div className="pattern-orb pattern-orb--2" />
      </div>

      {/* Content */}
      <div className="auth-screen__content">
        {/* Back button */}
        <button 
          className="auth-screen__back"
          onClick={() => step === 'otp' ? setStep('input') : navigate('/')}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Emblem */}
        <motion.div 
          className="auth-screen__emblem"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Flame className="w-12 h-12" />
        </motion.div>

        {/* Title */}
        <h1 className="auth-screen__title">
          {step === 'input' ? 'Welcome to Ekene' : 'Enter Code'}
        </h1>
        <p className="auth-screen__subtitle">
          {step === 'input' 
            ? 'Your presence enriches the village'
            : `Code sent to ${phoneOrEmail}`
          }
        </p>

        {/* Form */}
        {step === 'input' ? (
          <form onSubmit={handleSubmit} className="auth-screen__form">
            <div className="form-group">
              <label htmlFor="contact" className="form-label">
                Phone or Email
              </label>
              <input
                id="contact"
                type="text"
                className="form-input"
                placeholder="+234 800 000 0000"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="auth-screen__error">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn btn-primary btn-lg w-full"
              disabled={isLoading || !phoneOrEmail}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner" />
                  Sending...
                </>
              ) : (
                'Continue'
              )}
            </button>
          </form>
        ) : (
          <div className="auth-screen__otp">
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]"
                  maxLength={1}
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      const prevInput = document.getElementById(`otp-${index - 1}`);
                      prevInput?.focus();
                    }
                  }}
                  disabled={isLoading}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <div className="auth-screen__error">
                {error}
              </div>
            )}

            <button 
              className="auth-screen__resend"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Resend Code
            </button>
          </div>
        )}

        {/* Cultural icons */}
        <div className="auth-screen__icons">
          <span>🥁</span>
          <span>🌍</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
}
