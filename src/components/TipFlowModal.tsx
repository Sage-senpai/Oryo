/**
 * ============================================================================
 * ORYO - Tip Modal Component
 * ============================================================================
 * Location: src/components/TipFlowModal.tsx
 * 
 * The signature Oryo tipping experience with:
 * - Circular amount dial
 * - Token selector pills
 * - Optional message
 * - Flame animation on success
 * 
 * Design Philosophy: Must feel like a ritual, not a payment
 * ============================================================================
 */

import React, { useState } from 'react';
import { X, Flame, Send, Check } from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================
interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  creator: {
    name: string;
    username: string;
    avatar: string;
  };
}

type TipStep = 'amount' | 'token' | 'message' | 'confirm' | 'success';

const TOKENS = [
  { symbol: 'DOT', name: 'Polkadot', balance: 125.5, color: '#E6007A' },
  { symbol: 'USDC', name: 'USD Coin', balance: 500.0, color: '#2775CA' },
  { symbol: 'ORYO', name: 'Oryo Token', balance: 1250.0, color: '#F2A541' },
];

const QUICK_AMOUNTS = [0.5, 1, 5, 10];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function TipFlowModal ({ isOpen, onClose, creator }: TipModalProps) {
  const [step, setStep] = useState<TipStep>('amount');
  const [amount, setAmount] = useState<number>(1);
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
      resetModal();
    }, 3000);
  };

  const resetModal = () => {
    setStep('amount');
    setAmount(1);
    setSelectedToken(TOKENS[0]);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F0EB] hover:bg-[#E6DCD2] transition-all duration-300 flex items-center justify-center group z-10"
        >
          <X className="w-5 h-5 text-[#646470] group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Content */}
        <div className="p-6">
          {step === 'success' ? (
            <SuccessView creator={creator} amount={amount} token={selectedToken} />
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#F2A541]/20 to-[#FF686B]/20 flex items-center justify-center text-4xl border-4 border-white shadow-lg">
                  {creator.avatar}
                </div>
                <h2 className="text-2xl font-bold text-[#1E1E23]">
                  Tip {creator.name}
                </h2>
                <p className="text-sm text-[#646470]">{creator.username}</p>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {['amount', 'token', 'message', 'confirm'].map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      ['amount', 'token', 'message', 'confirm'].indexOf(step) >= i
                        ? 'bg-gradient-to-r from-[#F2A541] to-[#FF686B]'
                        : 'bg-[#E6DCD2]'
                    }`}
                  />
                ))}
              </div>

              {/* Step Content */}
              {step === 'amount' && (
                <AmountStep
                  amount={amount}
                  onAmountChange={setAmount}
                  onNext={() => setStep('token')}
                />
              )}

              {step === 'token' && (
                <TokenStep
                  selectedToken={selectedToken}
                  onSelectToken={setSelectedToken}
                  onNext={() => setStep('message')}
                  onBack={() => setStep('amount')}
                />
              )}

              {step === 'message' && (
                <MessageStep
                  message={message}
                  onMessageChange={setMessage}
                  onNext={() => setStep('confirm')}
                  onBack={() => setStep('token')}
                />
              )}

              {step === 'confirm' && (
                <ConfirmStep
                  creator={creator}
                  amount={amount}
                  token={selectedToken}
                  message={message}
                  isProcessing={isProcessing}
                  onConfirm={handleConfirm}
                  onBack={() => setStep('message')}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STEP 1: AMOUNT SELECTION
// ============================================================================
function AmountStep({ amount, onAmountChange, onNext }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-[#646470] mb-4">Choose an amount</p>
        
        {/* Circular Amount Display */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F2A541]/20 to-[#FF686B]/20 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-white shadow-inner flex items-center justify-center">
            <div className="text-center">
              <input
                type="number"
                value={amount}
                onChange={(e) => onAmountChange(Number(e.target.value))}
                className="text-4xl font-bold bg-gradient-to-r from-[#F2A541] to-[#FF686B] bg-clip-text text-transparent text-center w-24 border-none outline-none"
                step="0.1"
                min="0.1"
              />
              <p className="text-xs text-[#646470] mt-1">DOT</p>
            </div>
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {QUICK_AMOUNTS.map((amt) => (
            <button
              key={amt}
              onClick={() => onAmountChange(amt)}
              className={`py-3 rounded-xl font-semibold transition-all duration-300 ${
                amount === amt
                  ? 'bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white shadow-md scale-105'
                  : 'bg-[#F5F0EB] text-[#646470] hover:bg-[#E6DCD2]'
              }`}
            >
              {amt}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        Continue
        <Flame className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

// ============================================================================
// STEP 2: TOKEN SELECTION
// ============================================================================
function TokenStep({ selectedToken, onSelectToken, onNext, onBack }: any) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[#646470] mb-4 text-center">Select token</p>
        
        <div className="space-y-3">
          {TOKENS.map((token) => (
            <button
              key={token.symbol}
              onClick={() => onSelectToken(token)}
              className={`w-full p-4 rounded-2xl transition-all duration-300 flex items-center justify-between ${
                selectedToken.symbol === token.symbol
                  ? 'bg-gradient-to-r from-[#F2A541]/20 to-[#FF686B]/20 border-2 border-[#F2A541] shadow-md'
                  : 'bg-[#F5F0EB] hover:bg-[#E6DCD2] border-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: token.color }}
                >
                  {token.symbol[0]}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[#1E1E23]">{token.symbol}</p>
                  <p className="text-xs text-[#646470]">{token.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#1E1E23]">{token.balance}</p>
                <p className="text-xs text-[#646470]">Available</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl bg-[#F5F0EB] text-[#646470] font-semibold hover:bg-[#E6DCD2] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// STEP 3: MESSAGE (OPTIONAL)
// ============================================================================
function MessageStep({ message, onMessageChange, onNext, onBack }: any) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[#646470] mb-4 text-center">
          Add a message <span className="text-xs">(optional)</span>
        </p>
        
        <textarea
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Say something warm... ✨"
          className="w-full h-32 p-4 rounded-2xl bg-[#F5F0EB] border-2 border-transparent focus:border-[#F2A541] focus:bg-white outline-none resize-none transition-all duration-300"
          maxLength={280}
        />
        <p className="text-xs text-[#646470] text-right mt-1">
          {message.length}/280
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl bg-[#F5F0EB] text-[#646470] font-semibold hover:bg-[#E6DCD2] transition-all"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {message ? 'Continue' : 'Skip'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// STEP 4: CONFIRM
// ============================================================================
function ConfirmStep({ creator, amount, token, message, isProcessing, onConfirm, onBack }: any) {
  const networkFee = 0.001;
  const total = amount + networkFee;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[#646470] mb-4 text-center">Review & Confirm</p>
        
        {/* Summary */}
        <div className="bg-[#F5F0EB] rounded-2xl p-4 space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-[#646470]">Tip Amount</span>
            <span className="font-semibold">{amount} {token.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#646470]">Network Fee</span>
            <span className="text-sm">{networkFee} {token.symbol}</span>
          </div>
          <div className="border-t border-[#E6DCD2] pt-2 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold bg-gradient-to-r from-[#F2A541] to-[#FF686B] bg-clip-text text-transparent">
              {total} {token.symbol}
            </span>
          </div>
        </div>

        {message && (
          <div className="bg-gradient-to-r from-[#F2A541]/10 to-[#FF686B]/10 rounded-2xl p-4 mb-4">
            <p className="text-sm text-[#646470] mb-1">Your message:</p>
            <p className="text-[#1E1E23] italic">"{message}"</p>
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start gap-2 p-3 bg-[#FFF8F0] border border-[#F2A541]/30 rounded-xl">
          <Flame className="w-5 h-5 text-[#F2A541] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#646470]">
            This transaction will be processed on the Polkadot network. Make sure your wallet has sufficient balance.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1 py-4 rounded-2xl bg-[#F5F0EB] text-[#646470] font-semibold hover:bg-[#E6DCD2] transition-all disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={isProcessing}
          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#F2A541] to-[#FF686B] text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Flame className="w-5 h-5" />
              Send Tip
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// SUCCESS VIEW - Flame animation
// ============================================================================
function SuccessView({ creator, amount, token }: any) {
  return (
    <div className="text-center py-8 animate-fadeIn">
      {/* Animated Success Icon */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2A541] to-[#FF686B] rounded-full animate-ping opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F2A541] to-[#FF686B] rounded-full flex items-center justify-center animate-scaleIn">
          <Flame className="w-16 h-16 text-white animate-bounce" />
        </div>
      </div>

      {/* Success Message */}
      <h3 className="text-3xl font-bold text-[#1E1E23] mb-2">
        Tip Delivered! 🎉
      </h3>
      <p className="text-[#646470] mb-6">
        You sent <span className="font-bold bg-gradient-to-r from-[#F2A541] to-[#FF686B] bg-clip-text text-transparent">{amount} {token.symbol}</span> to {creator.name}
      </p>

      {/* Confetti effect would go here */}
      <div className="flex items-center justify-center gap-1 text-3xl animate-pulse">
        ✨ 🔥 ✨
      </div>
    </div>
  );
}

// Inline styles for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-scaleIn {
    animation: scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
`;
document.head.appendChild(style);