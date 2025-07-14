import React, { useState, useId, useRef } from 'react';

// Enhanced InputBox component with ripple effect and modern UI
function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
    const amountInputId = useId();
    const containerRef = useRef(null);
    const [ripples, setRipples] = useState([]);

    const createRipple = (e) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const ripple = {
            id: Date.now() + Math.random(),
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        setRipples(prev => [...prev, ripple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 1000);
    };

    const handleInputBlur = (e) => {
        createRipple(e);
    };

    const handleSelectBlur = (e) => {
        createRipple(e);
    };

    return (
        <div 
            ref={containerRef}
            className={`relative overflow-hidden rounded-2xl p-6 text-sm transition-all duration-300 hover:scale-[1.02] group ${className}`}
            style={{
                background: `
                    linear-gradient(145deg, 
                        rgba(255, 255, 255, 0.9) 0%, 
                        rgba(255, 255, 255, 0.8) 30%, 
                        rgba(255, 255, 255, 0.7) 70%, 
                        rgba(255, 255, 255, 0.6) 100%
                    )
                `,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: `
                    0 10px 30px rgba(0, 0, 0, 0.1),
                    0 5px 15px rgba(0, 0, 0, 0.05),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.3)
                `
            }}
        >
            {/* Glass reflection overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, transparent 50%)',
                    clipPath: 'polygon(0 0, 100% 0, 60% 100%, 0 40%)'
                }}
            ></div>

            {/* Ripple effects */}
            {ripples.map((ripple) => (
                <div
                    key={ripple.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: 'translate(-50%, -50%)',
                        width: '0px',
                        height: '0px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 197, 253, 0.3) 30%, rgba(219, 234, 254, 0.2) 60%, transparent 100%)',
                        animation: 'rippleExpand 1s ease-out forwards',
                        zIndex: 10
                    }}
                />
            ))}

            <div className="flex relative z-20">
                <div className="w-1/2 pr-4">
                    <label 
                        htmlFor={amountInputId} 
                        className="text-slate-600 mb-3 inline-block font-medium text-xs uppercase tracking-wider"
                    >
                        {label}
                    </label>
                    <input
                        id={amountInputId}
                        className="outline-none w-full bg-transparent py-2 text-slate-800 placeholder-slate-400 font-semibold text-lg transition-all duration-300 focus:text-blue-600"
                        type="number"
                        placeholder="0.00"
                        disabled={amountDisabled}
                        value={amount}
                        onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                        onBlur={handleInputBlur}
                        style={{
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                </div>
                
                <div className="w-1/2 flex flex-wrap justify-end text-right pl-4">
                    <p className="text-slate-600 mb-3 w-full font-medium text-xs uppercase tracking-wider">
                        Currency
                    </p>
                    <select
                        className="rounded-xl px-4 py-2 cursor-pointer outline-none font-semibold text-slate-700 transition-all duration-300 hover:scale-105 focus:scale-105 active:scale-95"
                        value={selectCurrency}
                        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                        onBlur={handleSelectBlur}
                        disabled={currencyDisabled}
                        style={{
                            background: `
                                linear-gradient(135deg, 
                                    rgba(241, 245, 249, 0.9) 0%, 
                                    rgba(226, 232, 240, 0.8) 50%, 
                                    rgba(203, 213, 225, 0.7) 100%
                                )
                            `,
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: `
                                0 5px 15px rgba(0, 0, 0, 0.1),
                                inset 0 1px 0 rgba(255, 255, 255, 0.8)
                            `,
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <style jsx>{`
                @keyframes rippleExpand {
                    0% {
                        width: 0px;
                        height: 0px;
                        opacity: 0.8;
                    }
                    50% {
                        width: 200px;
                        height: 200px;
                        opacity: 0.4;
                    }
                    100% {
                        width: 400px;
                        height: 400px;
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
export default InputBox;