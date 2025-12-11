// File: src/components/TipFlow/TipFlow.tsx
// Ceremonial Ekene sending experience with Afrocentric design
// 4-step ritual: Amount → Asset → Message → Confirm

import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Send, X, Check } from 'lucide-react';

// Mock wallet hook (replace with actual import)
const useWallet = () => ({
  account: { address: '5GrwvaEF...', name: 'Chioma' },
  balances: [
    { symbol: 'DOT', formattedBalance: '12.5000', decimals: 10 },
    { symbol: 'USDC', formattedBalance: '100.00', decimals: 6 },
    { symbol: 'EKENE', formattedBalance: '50.0000', decimals: 4 }
  ],
  sendTip: async (params) => {
    await new Promise(r => setTimeout(r, 2000));
    return { status: 'confirmed', txHash: '0x123...' };
  }
});

const TipFlow = ({ recipient, onClose, onComplete }) => {
  const { balances, sendTip } = useWallet();
  
  // Step state
  const [step, setStep] = useState(1); // 1-4
  const [amount, setAmount] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('DOT');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Amount presets
  const presets = [0.5, 1, 5];
  
  // Reset on open
  useEffect(() => {
    setStep(1);
    setAmount('');
    setSelectedAsset('DOT');
    setMessage('');
    setSuccess(false);
  }, [recipient]);

  // Step 1: Amount Selection
  const renderAmountStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Flame className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Send Ekene to {recipient.name}
        </h3>
        <p className="text-gray-600">Choose your gratitude amount</p>
      </div>

      {/* Circular Amount Dial */}
      <div className="relative w-64 h-64 mx-auto">
        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="128"
            cy="128"
            r="110"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          <circle
            cx="128"
            cy="128"
            r="110"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(parseFloat(amount) / 10) * 691} 691`}
            className="transition-all duration-500"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center amount display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="text-5xl font-bold text-center bg-transparent border-none outline-none w-32 text-gray-900"
            step="0.1"
          />
          <span className="text-gray-500 mt-2">{selectedAsset}</span>
        </div>
      </div>

      {/* Quick presets */}
      <div className="flex gap-3 justify-center">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => setAmount(preset.toString())}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-400 text-amber-900 font-semibold transition-all hover:scale-105"
          >
            {preset}
          </button>
        ))}
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        Continue
      </button>
    </div>
  );

  // Step 2: Asset Selection
  const renderAssetStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Choose Your Asset
        </h3>
        <p className="text-gray-600">Select what to send</p>
      </div>

      <div className="space-y-3">
        {balances.map((balance) => (
          <button
            key={balance.symbol}
            onClick={() => setSelectedAsset(balance.symbol)}
            className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              selectedAsset === balance.symbol
                ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-orange-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                balance.symbol === 'DOT' ? 'bg-pink-100' :
                balance.symbol === 'USDC' ? 'bg-blue-100' :
                'bg-amber-100'
              }`}>
                <span className="font-bold text-lg">
                  {balance.symbol === 'DOT' ? '●' : 
                   balance.symbol === 'USDC' ? '$' : '✦'}
                </span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">{balance.symbol}</div>
                <div className="text-sm text-gray-500">Balance: {balance.formattedBalance}</div>
              </div>
            </div>
            {selectedAsset === balance.symbol && (
              <Check className="w-6 h-6 text-amber-600" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all"
        >
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          className="flex-1 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 3: Message (Optional)
  const renderMessageStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Add a Message
        </h3>
        <p className="text-gray-600">Share your gratitude (optional)</p>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Thank you for the amazing talk! 🔥"
        rows={4}
        maxLength={200}
        className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:border-amber-400 outline-none resize-none"
      />
      
      <div className="text-right text-sm text-gray-500">
        {message.length}/200
      </div>

      {/* Cultural flair stickers */}
      <div className="flex gap-2 flex-wrap justify-center">
        {['🔥', '✨', '🙏', '💛', '🎯', '🌟'].map((emoji) => (
          <button
            key={emoji}
            onClick={() => setMessage(message + emoji)}
            className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl transition-all hover:scale-110"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(2)}
          className="flex-1 py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all"
        >
          Back
        </button>
        <button
          onClick={() => setStep(4)}
          className="flex-1 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );

  // Step 4: Confirm & Send
  const renderConfirmStep = () => {
    const handleSend = async () => {
      setIsProcessing(true);
      try {
        const assetDecimals = balances.find(b => b.symbol === selectedAsset)?.decimals || 10;
        const amountRaw = (parseFloat(amount) * Math.pow(10, assetDecimals)).toString();
        
        await sendTip({
          to: recipient.address,
          asset: selectedAsset,
          amount: amountRaw,
          message: message || undefined
        });
        
        setSuccess(true);
        setTimeout(() => {
          onComplete?.();
          onClose?.();
        }, 2000);
      } catch (error) {
        console.error('Failed to send tip:', error);
        setIsProcessing(false);
      }
    };

    if (success) {
      return (
        <div className="text-center space-y-6 py-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center animate-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900">Ekene Sent! 🔥</h3>
          <p className="text-gray-600">Your gratitude has been shared</p>
          <div className="flex gap-2 justify-center">
            {[...Array(5)].map((_, i) => (
              <Sparkles key={i} className="w-6 h-6 text-amber-500 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Confirm Ekene
          </h3>
          <p className="text-gray-600">Review and send</p>
        </div>

        {/* Summary card */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 space-y-4 border-2 border-amber-200">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">To</span>
            <span className="font-semibold text-gray-900">{recipient.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount</span>
            <span className="font-bold text-2xl text-gray-900">{amount} {selectedAsset}</span>
          </div>
          {message && (
            <div className="pt-4 border-t border-amber-200">
              <p className="text-gray-700 italic">"{message}"</p>
            </div>
          )}
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={isProcessing}
          className="w-full py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xl hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
        >
          {isProcessing ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Flame className="w-6 h-6" />
              Send Ekene
            </>
          )}
        </button>

        {!isProcessing && (
          <button
            onClick={() => setStep(3)}
            className="w-full py-4 rounded-full border-2 border-gray-300 text-gray-700 font-semibold hover:border-gray-400 transition-all"
          >
            Back
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Modal */}
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 relative shadow-2xl">
        {/* Close button */}
        {!isProcessing && !success && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Step indicator */}
        {!success && (
          <div className="flex gap-2 mb-8 justify-center">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? 'w-8 bg-amber-500' :
                  s < step ? 'w-2 bg-amber-300' :
                  'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        {/* Step content */}
        {step === 1 && renderAmountStep()}
        {step === 2 && renderAssetStep()}
        {step === 3 && renderMessageStep()}
        {step === 4 && renderConfirmStep()}
      </div>
    </div>
  );
};

// Demo component showing usage
const TipFlowDemo = () => {
  const [showTipFlow, setShowTipFlow] = useState(false);

  const recipient = {
    name: 'Adewale',
    address: '5FHneW46...',
    avatar: '👨🏿‍💻'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-900 to-stone-900 flex items-center justify-center p-8">
      {/* Creator Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md border border-white/20">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-4xl border-4 border-white/30">
            {recipient.avatar}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{recipient.name}</h2>
            <p className="text-amber-200">Web3 Developer & Speaker</p>
          </div>
          <button
            onClick={() => setShowTipFlow(true)}
            className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5" />
            Send Ekene
          </button>
        </div>
      </div>

      {/* Tip Flow Modal */}
      {showTipFlow && (
        <TipFlow
          recipient={recipient}
          onClose={() => setShowTipFlow(false)}
          onComplete={() => {
            console.log('Tip completed!');
          }}
        />
      )}
    </div>
  );
};

export default TipFlowDemo;