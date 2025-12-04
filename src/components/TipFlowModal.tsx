/**
 * ============================================================================
 * Ekene - Tip Modal Component
 * ============================================================================
 * Location: src/components/TipFlowModal.tsx
 * Styles: src/styles/components/_tip-modal.scss
 * ============================================================================
 */

import { useState } from 'react';
import { X, Flame, Check } from 'lucide-react';

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
  { symbol: 'DOT', name: 'Polkadot', balance: 125.5, color: 'primary' },
  { symbol: 'USDC', name: 'USD Coin', balance: 500.0, color: 'blue' },
  { symbol: 'Ekene', name: 'Ekene Token', balance: 1250.0, color: 'accent' },
];

const QUICK_AMOUNTS = [0.5, 1, 5, 10];

export function TipFlowModal({ isOpen, onClose, creator }: TipModalProps) {
  const [step, setStep] = useState<TipStep>('amount');
  const [amount, setAmount] = useState<number>(1);
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('success');
    
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
    <div className="tip-modal-overlay">
      <div className="tip-modal-backdrop" onClick={onClose} />

      <div className="tip-modal">
        <button onClick={onClose} className="tip-modal__close">
          <X className="w-5 h-5" />
        </button>

        <div className="tip-modal__content">
          {step === 'success' ? (
            <SuccessView creator={creator} amount={amount} token={selectedToken} />
          ) : (
            <>
              <div className="tip-modal__header">
                <div className="tip-modal__avatar">{creator.avatar}</div>
                <h2 className="tip-modal__title">Tip {creator.name}</h2>
                <p className="tip-modal__subtitle">{creator.username}</p>
              </div>

              <div className="tip-modal__progress">
                {['amount', 'token', 'message', 'confirm'].map((s, i) => (
                  <div
                    key={s}
                    className={`tip-modal__progress-bar ${
                      ['amount', 'token', 'message', 'confirm'].indexOf(step) >= i
                        ? 'tip-modal__progress-bar--active'
                        : ''
                    }`}
                  />
                ))}
              </div>

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

function AmountStep({ amount, onAmountChange, onNext }: any) {
  return (
    <div className="tip-step">
      <p className="tip-step__label">Choose an amount</p>
      
      <div className="amount-dial">
        <div className="amount-dial__glow" />
        <div className="amount-dial__inner">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="amount-dial__input"
            step="0.1"
            min="0.1"
          />
          <p className="amount-dial__currency">DOT</p>
        </div>
      </div>

      <div className="quick-amounts">
        {QUICK_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => onAmountChange(amt)}
            className={`quick-amounts__btn ${
              amount === amt ? 'quick-amounts__btn--active' : ''
            }`}
          >
            {amt}
          </button>
        ))}
      </div>

      <button onClick={onNext} className="btn btn-primary btn-lg w-full">
        <span>Continue</span>
        <Flame className="w-5 h-5" />
      </button>
    </div>
  );
}

function TokenStep({ selectedToken, onSelectToken, onNext, onBack }: any) {
  return (
    <div className="tip-step">
      <p className="tip-step__label">Select token</p>
      
      <div className="token-list">
        {TOKENS.map((token) => (
          <button
            key={token.symbol}
            onClick={() => onSelectToken(token)}
            className={`token-item ${
              selectedToken.symbol === token.symbol ? 'token-item--active' : ''
            }`}
          >
            <div className="token-item__left">
              <div className={`token-item__icon token-item__icon--${token.color}`}>
                {token.symbol[0]}
              </div>
              <div className="token-item__info">
                <p className="token-item__symbol">{token.symbol}</p>
                <p className="token-item__name">{token.name}</p>
              </div>
            </div>
            <div className="token-item__right">
              <p className="token-item__balance">{token.balance}</p>
              <p className="token-item__label">Available</p>
            </div>
          </button>
        ))}
      </div>

      <div className="button-group">
        <button onClick={onBack} className="btn btn-secondary">
          Back
        </button>
        <button onClick={onNext} className="btn btn-primary">
          Continue
        </button>
      </div>
    </div>
  );
}

function MessageStep({ message, onMessageChange, onNext, onBack }: any) {
  return (
    <div className="tip-step">
      <p className="tip-step__label">
        Add a message <span className="text-muted">(optional)</span>
      </p>
      
      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Say something warm... ✨"
        className="message-input"
        maxLength={280}
      />
      <p className="message-counter">{message.length}/280</p>

      <div className="button-group">
        <button onClick={onBack} className="btn btn-secondary">
          Back
        </button>
        <button onClick={onNext} className="btn btn-primary">
          {message ? 'Continue' : 'Skip'}
        </button>
      </div>
    </div>
  );
}

function ConfirmStep({ creator, amount, token, message, isProcessing, onConfirm, onBack }: any) {
  const networkFee = 0.001;
  const total = amount + networkFee;

  return (
    <div className="tip-step">
      <p className="tip-step__label">Review & Confirm</p>
      
      <div className="tip-summary">
        <div className="tip-summary__row">
          <span>Tip Amount</span>
          <span className="tip-summary__value">{amount} {token.symbol}</span>
        </div>
        <div className="tip-summary__row">
          <span>Network Fee</span>
          <span>{networkFee} {token.symbol}</span>
        </div>
        <div className="tip-summary__row tip-summary__row--total">
          <span>Total</span>
          <span className="tip-summary__total">{total} {token.symbol}</span>
        </div>
      </div>

      {message && (
        <div className="tip-message">
          <p className="tip-message__label">Your message:</p>
          <p className="tip-message__text">"{message}"</p>
        </div>
      )}

      <div className="tip-warning">
        <Flame className="tip-warning__icon" />
        <p className="tip-warning__text">
          This transaction will be processed on the Polkadot network. Make sure your wallet has sufficient balance.
        </p>
      </div>

      <div className="button-group">
        <button onClick={onBack} disabled={isProcessing} className="btn btn-secondary">
          Back
        </button>
        <button
          onClick={onConfirm}
          disabled={isProcessing}
          className="btn btn-primary btn-tip"
        >
          {isProcessing ? (
            <>
              <div className="loading-spinner" />
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

function SuccessView({ creator, amount, token }: any) {
  return (
    <div className="tip-success">
      <div className="tip-success__icon-container">
        <div className="tip-success__icon-glow" />
        <div className="tip-success__icon">
          <Flame className="w-16 h-16" />
        </div>
      </div>

      <h3 className="tip-success__title">Tip Delivered! 🎉</h3>
      <p className="tip-success__message">
        You sent <span className="tip-success__amount">{amount} {token.symbol}</span> to {creator.name}
      </p>

      <div className="tip-success__confetti">✨ 🔥 ✨</div>
    </div>
  );
}