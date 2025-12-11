// File: src/components/Onboarding/OnboardingFlow.tsx
// Welcome and onboarding experience for new Ekene users
// Walletless account creation, cultural introduction, and getting started

import React, { useState } from 'react';
import { Flame, Wallet, ArrowRight, Sparkles, Users, Gift, Check } from 'lucide-react';

// ============================================================================
// ONBOARDING FLOW COMPONENT
// ============================================================================

const OnboardingFlow: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1-5
  const [userName, setUserName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Step 1: Welcome screen
  const WelcomeScreen = () => (
    <div className="text-center space-y-8 animate-fadeIn">
      {/* Animated logo */}
      <div className="relative">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-2xl animate-pulse">
          <Flame className="w-16 h-16 text-white" />
        </div>
        {/* Floating particles */}
        <div className="absolute -top-4 left-1/4 w-3 h-3 rounded-full bg-amber-400 animate-bounce" />
        <div className="absolute -top-2 right-1/4 w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute -bottom-4 left-1/3 w-2.5 h-2.5 rounded-full bg-yellow-400 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>

      {/* Welcome text */}
      <div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to EKENE
        </h1>
        <p className="text-xl text-amber-200 mb-2">
          You are welcomed. Ekene.
        </p>
        <p className="text-gray-300 max-w-md mx-auto">
          The digital village of gratitude and value exchange, powered by Polkadot.
        </p>
      </div>

      {/* CTA buttons */}
      <div className="space-y-3 max-w-sm mx-auto">
        <button
          onClick={() => setStep(2)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg flex items-center justify-center gap-2"
        >
          Enter Ekene
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
        >
          Continue as Guest
        </button>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8">
        {[
          { icon: Flame, label: 'Send Gratitude', desc: 'Tip creators instantly' },
          { icon: Users, label: 'Join Circles', desc: 'Build community' },
          { icon: Gift, label: 'Earn Rewards', desc: 'Collect warmth' }
        ].map((feature, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/10 flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-white font-semibold text-sm mb-1">{feature.label}</div>
            <div className="text-gray-400 text-xs">{feature.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: What is Ekene
  const AboutScreen = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          What is Ekene?
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          <span className="text-amber-400 font-semibold">Ekene</span> means <span className="italic">"gratitude"</span> in Igbo. 
          It's a Web3 platform where appreciation flows naturally through the digital village.
        </p>
      </div>

      {/* Feature cards */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        {[
          {
            icon: '🔥',
            title: 'Instant Gratitude',
            desc: 'Send tips to creators, speakers, and community members with one tap. No complex crypto steps.'
          },
          {
            icon: '🏘️',
            title: 'Cultural Connection',
            desc: 'Built on African values of communal support and reciprocity. Your digital village.'
          },
          {
            icon: '⚡',
            title: 'Powered by Polkadot',
            desc: 'Fast, secure, multi-chain. Use DOT, USDC, or any supported asset across parachains.'
          },
          {
            icon: '✨',
            title: 'Earn Warmth',
            desc: 'Get rewarded for community participation. Warmth is currency of belonging.'
          }
        ].map((feature, i) => (
          <div 
            key={i}
            className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{feature.icon}</div>
              <div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 max-w-sm mx-auto">
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  // Step 3: Choose account type
  const AccountTypeScreen = () => (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Claim Your Village Identity
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Choose how you want to join Ekene
        </p>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {/* Quick start option */}
        <button
          onClick={() => setStep(4)}
          className="rounded-2xl p-8 bg-gradient-to-br from-amber-500/20 to-orange-600/20 border-2 border-amber-500/50 hover:border-amber-400 transition-all text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-white font-bold text-xl">Quick Start</h3>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                  Recommended
                </span>
              </div>
              <p className="text-gray-300 mb-3">
                Create an Ekene account instantly. No wallet needed to start.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  Start tipping immediately
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  No crypto knowledge required
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" />
                  Upgrade to full wallet anytime
                </li>
              </ul>
            </div>
          </div>
        </button>

        {/* Connect wallet option */}
        <button
          onClick={() => setStep(5)}
          className="rounded-2xl p-8 bg-white/5 border-2 border-white/20 hover:border-white/40 transition-all text-left group"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl mb-2">Connect Wallet</h3>
              <p className="text-gray-300 mb-3">
                Use your existing Polkadot wallet (Talisman, SubWallet, Nova, etc.)
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-500" />
                  Full control of your keys
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-500" />
                  Use existing balances
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-500" />
                  Advanced features
                </li>
              </ul>
            </div>
          </div>
        </button>
      </div>

      <div className="flex gap-3 max-w-sm mx-auto">
        <button
          onClick={() => setStep(2)}
          className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
        >
          Back
        </button>
      </div>
    </div>
  );

  // Step 4: Create Ekene account
  const CreateAccountScreen = () => {
    const handleCreate = async () => {
      if (!userName.trim()) return;
      
      setIsCreating(true);
      // Simulate account creation
      await new Promise(r => setTimeout(r, 2000));
      onComplete();
    };

    return (
      <div className="space-y-8 animate-fadeIn max-w-md mx-auto">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Create Your Identity
          </h2>
          <p className="text-gray-300">
            Choose a name for the village
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-semibold mb-2">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g., Chioma"
              className="w-full px-4 py-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-amber-500 outline-none text-lg"
              autoFocus
            />
            <p className="text-gray-400 text-sm mt-2">
              This is how you'll be known in the village
            </p>
          </div>

          {/* Info card */}
          <div className="rounded-xl p-4 bg-blue-500/10 border border-blue-500/30">
            <div className="flex gap-3">
              <div className="text-2xl">ℹ️</div>
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-1">What happens next:</p>
                <ul className="space-y-1">
                  <li>• We'll create a secure Polkadot account for you</li>
                  <li>• You can start sending Ekene immediately</li>
                  <li>• Your account can be upgraded to full wallet later</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep(3)}
            disabled={isCreating}
            className="flex-1 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all disabled:opacity-50"
          >
            Back
          </button>
          <button
            onClick={handleCreate}
            disabled={!userName.trim() || isCreating}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-600 hover:to-orange-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isCreating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Step 5: Connect wallet
  const ConnectWalletScreen = () => (
    <div className="space-y-8 animate-fadeIn max-w-md mx-auto">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
          <Wallet className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Connect Your Wallet
        </h2>
        <p className="text-gray-300">
          Choose your Polkadot wallet
        </p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Talisman', icon: '🦊', recommended: true },
          { name: 'SubWallet', icon: '🔷', recommended: false },
          { name: 'Polkadot.js', icon: '●', recommended: false },
          { name: 'Nova Wallet', icon: '✦', recommended: false },
          { name: 'Bitget Wallet', icon: '🅱️', recommended: false }
        ].map((wallet) => (
          <button
            key={wallet.name}
            onClick={onComplete}
            className="w-full rounded-xl p-4 bg-white/5 border-2 border-white/20 hover:border-amber-500/50 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{wallet.icon}</div>
              <div className="text-left">
                <div className="text-white font-semibold">{wallet.name}</div>
                {wallet.recommended && (
                  <div className="text-amber-400 text-xs">Recommended</div>
                )}
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-400 transition-colors" />
          </button>
        ))}
      </div>

      <button
        onClick={() => setStep(3)}
        className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
      >
        Back
      </button>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 flex items-center justify-center p-6">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="onboarding-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="2" fill="#f59e0b" className="animate-pulse" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#onboarding-pattern)" />
        </svg>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl">
        {step === 1 && <WelcomeScreen />}
        {step === 2 && <AboutScreen />}
        {step === 3 && <AccountTypeScreen />}
        {step === 4 && <CreateAccountScreen />}
        {step === 5 && <ConnectWalletScreen />}
      </div>
    </div>
  );
};

export default OnboardingFlow;