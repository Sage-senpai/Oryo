import React, { useState } from 'react';
import { Sparkles, Mail, Phone, Wallet, Check, ArrowRight, Shield } from 'lucide-react';

const EkeneAuth = () => {
  const [step, setStep] = useState('welcome'); // welcome, input, otp, wallet, success
  const [contactMethod, setContactMethod] = useState('email');
  const [contactValue, setContactValue] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate API calls
  const sendOTP = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('otp');
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('success');
    
    // Redirect after success
    setTimeout(() => {
      window.location.href = '/app';
    }, 2000);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    // Auto-submit if complete
    if (index === 5 && value && newOtp.every(d => d)) {
      verifyOTP();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // Wallet options
  const wallets = [
    { name: 'Talisman', icon: '🦊', installed: true },
    { name: 'Subwallet', icon: '🔷', installed: true },
    { name: 'Polkadot.js', icon: '🔴', installed: false },
    { name: 'Nova Wallet', icon: '⭐', installed: true },
    { name: 'Bitget', icon: '💼', installed: false },
  ];

  const connectWallet = async (walletName) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep('success');
    
    setTimeout(() => {
      window.location.href = '/app';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Welcome Step */}
        {step === 'welcome' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-amber-900 mb-2">Nnọọ!</h1>
              <p className="text-lg text-amber-700">Welcome to Ekene</p>
            </div>

            <p className="text-center text-gray-600 mb-8 leading-relaxed">
              The digital village where gratitude flows freely. Let's get you started.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setStep('input')}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => setStep('wallet')}
                className="w-full bg-amber-100 text-amber-900 py-4 rounded-2xl font-semibold hover:bg-amber-200 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Wallet className="w-5 h-5" />
                Connect Wallet
              </button>

              <button
                onClick={() => window.location.href = '/explore'}
                className="w-full text-amber-700 py-3 rounded-2xl font-medium hover:bg-amber-50 transition-all duration-200"
              >
                Continue as Guest
              </button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {/* Input Step */}
        {step === 'input' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 animate-slideUp">
            <button
              onClick={() => setStep('welcome')}
              className="text-amber-700 mb-6 hover:text-amber-900 transition-colors"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                Your presence enriches the village
              </h2>
              <p className="text-gray-600">
                Enter your {contactMethod === 'email' ? 'email' : 'phone number'} to join
              </p>
            </div>

            {/* Toggle Contact Method */}
            <div className="flex gap-2 mb-6 bg-amber-50 p-1 rounded-2xl">
              <button
                onClick={() => setContactMethod('email')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  contactMethod === 'email'
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-700'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => setContactMethod('phone')}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                  contactMethod === 'phone'
                    ? 'bg-white text-amber-900 shadow-sm'
                    : 'text-amber-700'
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
            </div>

            <input
              type={contactMethod === 'email' ? 'email' : 'tel'}
              placeholder={contactMethod === 'email' ? 'you@example.com' : '+234 800 000 0000'}
              value={contactValue}
              onChange={(e) => setContactValue(e.target.value)}
              className="w-full px-4 py-4 border-2 border-amber-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors text-lg mb-6"
              disabled={isLoading}
            />

            <button
              onClick={sendOTP}
              disabled={!contactValue || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <div className="mt-6 p-4 bg-amber-50 rounded-xl flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                We'll create your Polkadot account behind the scenes. Your keys stay secure.
              </p>
            </div>
          </div>
        )}

        {/* OTP Step */}
        {step === 'otp' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 animate-slideUp">
            <button
              onClick={() => setStep('input')}
              className="text-amber-700 mb-6 hover:text-amber-900 transition-colors"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                Check your {contactMethod}
              </h2>
              <p className="text-gray-600">
                We sent a code to <span className="font-semibold">{contactValue}</span>
              </p>
            </div>

            <div className="flex gap-3 mb-8 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  className="w-14 h-14 text-center text-2xl font-bold border-2 border-amber-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors"
                  disabled={isLoading}
                />
              ))}
            </div>

            <button
              onClick={verifyOTP}
              disabled={otp.some(d => !d) || isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </button>

            <button
              onClick={sendOTP}
              className="w-full text-amber-700 py-3 mt-4 rounded-2xl font-medium hover:bg-amber-50 transition-all duration-200"
            >
              Resend Code
            </button>
          </div>
        )}

        {/* Wallet Connect Step */}
        {step === 'wallet' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 animate-slideUp">
            <button
              onClick={() => setStep('welcome')}
              className="text-amber-700 mb-6 hover:text-amber-900 transition-colors"
            >
              ← Back
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-600">
                Choose your Polkadot wallet to continue
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {wallets.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => wallet.installed && connectWallet(wallet.name)}
                  disabled={!wallet.installed || isLoading}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                    wallet.installed
                      ? 'border-amber-200 hover:border-orange-500 hover:bg-amber-50 cursor-pointer'
                      : 'border-gray-200 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="text-4xl">{wallet.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-amber-900">{wallet.name}</div>
                    <div className="text-sm text-gray-500">
                      {wallet.installed ? 'Ready to connect' : 'Not installed'}
                    </div>
                  </div>
                  {wallet.installed && (
                    <ArrowRight className="w-5 h-5 text-amber-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-4 bg-amber-50 rounded-xl">
              <p className="text-sm text-amber-800 text-center">
                Your wallet stays in your control. We never store your keys.
              </p>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 'success' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-orange-100 animate-slideUp text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-amber-900 mb-2">You're in! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Your Ekene wallet is ready. Time to share some gratitude.
            </p>

            <div className="bg-amber-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-amber-700">Your Balance</span>
                <span className="text-2xl font-bold text-amber-900">0.0 DOT</span>
              </div>
              <button className="w-full bg-amber-200 text-amber-900 py-3 rounded-xl font-semibold hover:bg-amber-300 transition-colors">
                Add Funds
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Redirecting to your village...
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EkeneAuth;