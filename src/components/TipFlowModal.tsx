import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, ChevronRight, X, Check, DollarSign } from 'lucide-react';

const EkeneTipFlow = ({ recipient, onClose, onSuccess }) => {
  const [step, setStep] = useState(1); // 1: amount, 2: token, 3: message, 4: confirm, 5: processing, 6: success
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(null);
  const [message, setMessage] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const tokens = [
    { id: 'dot', name: 'DOT', icon: '🔴', balance: 24.5, usdPrice: 6.12, color: 'from-pink-500 to-pink-600' },
    { id: 'usdt', name: 'USDT', icon: '💵', balance: 150.0, usdPrice: 1.0, color: 'from-green-500 to-green-600' },
    { id: 'ekene', name: 'EKENE', icon: '🔥', balance: 1000, usdPrice: 0.05, color: 'from-orange-500 to-amber-500' },
    { id: 'usdc', name: 'USDC', icon: '💠', balance: 75.0, usdPrice: 1.0, color: 'from-blue-500 to-blue-600' },
  ];

  const presetAmounts = ['0.5', '1', '5', '10'];
  const flairEmojis = ['🔥', '❤️', '🌟', '✨', '🙏', '💎', '🎉', '👏'];

  const getUsdValue = () => {
    if (!selectedToken || !amount) return 0;
    const token = tokens.find(t => t.id === selectedToken);
    return (parseFloat(amount) * token.usdPrice).toFixed(2);
  };

  const handleAmountSelect = (preset) => {
    setAmount(preset);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const processTip = async () => {
    setIsProcessing(true);
    setStep(5);
    
    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setStep(6);

    // Auto-close and callback after success
    setTimeout(() => {
      onSuccess?.({
        recipient: recipient.name,
        amount,
        token: selectedToken,
        message,
        usdValue: getUsdValue()
      });
      onClose?.();
    }, 2500);
  };

  useEffect(() => {
    if (step === 1 && tokens.length > 0) {
      setSelectedToken(tokens[0].id);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Send Ekene</span>
              </div>
              <h2 className="text-2xl font-bold">To {recipient?.name || 'Creator'}</h2>
              <p className="text-sm opacity-80">@{recipient?.username || 'username'}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex gap-2 mt-6 relative z-10">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Amount Selection */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-amber-900 mb-6 text-center">
                How much gratitude?
              </h3>

              {/* Circular Amount Dial */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="none"
                    stroke="#FED7AA"
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
                    strokeDasharray={`${(amount / 20) * 691} 691`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F97316" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    placeholder="0"
                    className="text-5xl font-bold text-amber-900 text-center bg-transparent border-none focus:outline-none w-32"
                    step="0.1"
                    min="0"
                  />
                  <span className="text-lg text-amber-600 font-semibold mt-1">
                    {selectedToken ? tokens.find(t => t.id === selectedToken)?.name : 'TOKEN'}
                  </span>
                  {amount && (
                    <span className="text-sm text-gray-500 mt-1">
                      ≈ ${getUsdValue()} USD
                    </span>
                  )}
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-3 mb-6">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleAmountSelect(preset)}
                    className={`py-3 rounded-2xl font-semibold transition-all duration-200 ${
                      amount === preset
                        ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                        : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Token Selection */}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-amber-900 mb-6 text-center">
                Choose your token
              </h3>

              <div className="space-y-3 mb-6">
                {tokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => setSelectedToken(token.id)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 ${
                      selectedToken === token.id
                        ? 'border-orange-500 bg-orange-50 shadow-md scale-105'
                        : 'border-amber-100 hover:border-amber-300'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${token.color} flex items-center justify-center text-2xl shadow-sm`}>
                      {token.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-amber-900">{token.name}</div>
                      <div className="text-sm text-gray-500">
                        Balance: {token.balance.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-900">
                        {amount} {token.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ${(parseFloat(amount) * token.usdPrice).toFixed(2)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-amber-100 text-amber-900 py-4 rounded-2xl font-semibold hover:bg-amber-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Message (Optional) */}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-amber-900 mb-2 text-center">
                Add a warm message
              </h3>
              <p className="text-sm text-gray-500 text-center mb-6">
                (Optional, but appreciated)
              </p>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 280))}
                placeholder="Say something warm... ✨"
                className="w-full h-32 p-4 border-2 border-amber-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-colors resize-none mb-3"
                maxLength={280}
              />
              <div className="text-right text-sm text-gray-400 mb-6">
                {message.length}/280
              </div>

              {/* Flair Emojis */}
              <div className="mb-6">
                <p className="text-sm font-medium text-amber-900 mb-3">Add flair:</p>
                <div className="flex flex-wrap gap-2">
                  {flairEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setMessage(message + emoji)}
                      className="w-12 h-12 rounded-xl bg-amber-50 hover:bg-amber-100 text-2xl transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-amber-100 text-amber-900 py-4 rounded-2xl font-semibold hover:bg-amber-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Review
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-bold text-amber-900 mb-6 text-center">
                Confirm your gratitude
              </h3>

              <div className="bg-amber-50 rounded-2xl p-6 mb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">To:</span>
                  <span className="font-semibold text-amber-900">
                    {recipient?.name} (@{recipient?.username})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold text-amber-900">
                    {amount} {tokens.find(t => t.id === selectedToken)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">USD Value:</span>
                  <span className="font-semibold text-amber-900">${getUsdValue()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Network Fee:</span>
                  <span className="font-semibold text-green-600">Free 🎉</span>
                </div>
                {message && (
                  <div className="pt-4 border-t border-amber-200">
                    <span className="text-gray-600 text-sm">Message:</span>
                    <p className="text-amber-900 mt-1">{message}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-amber-100 text-amber-900 py-4 rounded-2xl font-semibold hover:bg-amber-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={processTip}
                  className="flex-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Flame className="w-6 h-6" />
                  Send Ekene
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Processing */}
          {step === 5 && (
            <div className="animate-fadeIn text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full animate-ping opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                Sending your gratitude...
              </h3>
              <p className="text-gray-600">
                This usually takes a few seconds
              </p>
            </div>
          )}

          {/* Step 6: Success */}
          {step === 6 && (
            <div className="animate-fadeIn text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-scale-in">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900 mb-2">
                Tip delivered! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                {recipient?.name} received your appreciation
              </p>
              <div className="bg-amber-50 rounded-2xl p-4 inline-block">
                <div className="text-3xl font-bold text-amber-900">
                  {amount} {tokens.find(t => t.id === selectedToken)?.name}
                </div>
                <div className="text-sm text-gray-500">≈ ${getUsdValue()} USD</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
};

// Demo wrapper to show the component
const TipFlowDemo = () => {
  const [showTipFlow, setShowTipFlow] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const recipient = {
    name: 'Amina Kwesi',
    username: 'amina_creates',
    avatar: '👩🏾‍🎨'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl">
              {recipient.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-amber-900">{recipient.name}</h2>
              <p className="text-gray-600">@{recipient.username}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-6">
            Creative director & digital artist celebrating African culture through design.
          </p>
          <button
            onClick={() => setShowTipFlow(true)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5" />
            Send Ekene (Tip)
          </button>
        </div>

        {successData && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 animate-fadeIn">
            <h3 className="font-bold text-green-900 mb-2">Last Tip Sent:</h3>
            <p className="text-green-800">
              {successData.amount} {successData.token.toUpperCase()} (${successData.usdValue}) to {successData.recipient}
            </p>
            {successData.message && (
              <p className="text-green-700 mt-2 italic">"{successData.message}"</p>
            )}
          </div>
        )}
      </div>

      {showTipFlow && (
        <EkeneTipFlow
          recipient={recipient}
          onClose={() => setShowTipFlow(false)}
          onSuccess={(data) => {
            setSuccessData(data);
            setShowTipFlow(false);
          }}
        />
      )}
    </div>
  );
};

export default TipFlowDemo;