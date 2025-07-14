import { useState } from 'react'
import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [convertedAmount, setConvertedAmount] = useState(0);

    const currencyInfo = useCurrencyInfo(from);
    const currencyOptions = Object.keys(currencyInfo);

    const swap = () => {
        setFrom(to);
        setTo(from);
        setConvertedAmount(amount);
        setAmount(convertedAmount);
    }

    const convert = () => {
        if (currencyInfo && currencyInfo[to]) {
            setConvertedAmount(amount * currencyInfo[to]);
        } else {
            setConvertedAmount(0);
        }
    }

    return (
        <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat relative overflow-hidden"
            style={{
                background: `
                    linear-gradient(to right, #cc5333, #23074d)
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Main glass container */}
            <div className="w-full relative z-10">
                <div 
                    className="w-full max-w-md mx-auto rounded-3xl p-8 relative group transition-all duration-500 hover:scale-[1.02]"
                    style={{
                        background: `
                            linear-gradient(145deg, 
                                rgba(255, 255, 255, 0.35) 0%, 
                                rgba(255, 255, 255, 0.25) 30%, 
                                rgba(255, 255, 255, 0.20) 70%, 
                                rgba(255, 255, 255, 0.15) 100%
                            )
                        `,
                        backdropFilter: 'blur(25px) saturate(200%)',
                        WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        boxShadow: `
                            0 30px 60px rgba(0, 0, 0, 0.12),
                            0 20px 40px rgba(0, 0, 0, 0.08),
                            0 10px 25px rgba(59, 130, 246, 0.1),
                            inset 0 1px 0 rgba(255, 255, 255, 0.5),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.2)
                        `
                    }}
                >
                    {/* Glass reflection */}
                    <div 
                        className="absolute inset-0 rounded-3xl pointer-events-none opacity-60"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%)',
                            clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 60%)'
                        }}
                    ></div>
                    
                    <div>
                        <div className="w-full mb-6">
                            <InputBox
                                label="From"
                                amount={amount}
                                currencyOptions={currencyOptions}
                                onCurrencyChange={(currency) => setFrom(currency)}
                                selectCurrency={from}
                                onAmountChange={(amount) => setAmount(amount)}
                            />
                        </div>
                        <div className="relative w-full h-0.5 mb-6">
                            <button
                                type="button"
                                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-6 py-3 font-semibold text-sm transition-all duration-300 hover:scale-110 active:scale-95"
                                style={{
                                    background: `
                                        linear-gradient(135deg, 
                                            rgba(59, 130, 246, 0.95) 0%, 
                                            rgba(99, 102, 241, 0.9) 50%,
                                            rgba(37, 99, 235, 0.85) 100%
                                        )
                                    `,
                                    backdropFilter: 'blur(15px) saturate(150%)',
                                    WebkitBackdropFilter: 'blur(15px) saturate(150%)',
                                    border: '1px solid rgba(255, 255, 255, 0.4)',
                                    boxShadow: `
                                        0 15px 35px rgba(59, 130, 246, 0.4),
                                        0 8px 20px rgba(59, 130, 246, 0.3),
                                        inset 0 1px 0 rgba(255, 255, 255, 0.4),
                                        inset 0 -1px 0 rgba(255, 255, 255, 0.2)
                                    `,
                                    color: 'white',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                                }}
                                onClick={swap}
                            >
                                ⇅ Swap
                            </button>
                        </div>
                        <div className="w-full mb-8">
                            <InputBox
                                label="To"
                                amount={convertedAmount}
                                currencyOptions={currencyOptions}
                                onCurrencyChange={(currency) => setTo(currency)}
                                selectCurrency={to}
                                amountDisabled={true}
                            />
                        </div>
                        <button 
                            type="button"
                            className="w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                                background: `
                                    linear-gradient(135deg, 
                                        rgba(59, 130, 246, 0.98) 0%, 
                                        rgba(99, 102, 241, 0.95) 30%,
                                        rgba(37, 99, 235, 0.92) 70%, 
                                        rgba(29, 78, 216, 0.9) 100%
                                    )
                                `,
                                backdropFilter: 'blur(15px) saturate(150%)',
                                WebkitBackdropFilter: 'blur(15px) saturate(150%)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: `
                                    0 20px 40px rgba(59, 130, 246, 0.5),
                                    0 10px 25px rgba(59, 130, 246, 0.4),
                                    0 5px 15px rgba(99, 102, 241, 0.3),
                                    inset 0 1px 0 rgba(255, 255, 255, 0.4),
                                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                                `,
                                color: 'white',
                                textShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'
                            }}
                            onClick={convert}
                        >
                            Convert {from.toUpperCase()} to {to.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes waveFlow1 {
                    0%, 100% { 
                        transform: translateX(0%) translateY(0%) scale(1) skewX(0deg);
                        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                    }
                    25% { 
                        transform: translateX(15%) translateY(-10%) scale(1.1) skewX(5deg);
                        border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
                    }
                    50% { 
                        transform: translateX(-10%) translateY(15%) scale(0.9) skewX(-3deg);
                        border-radius: 70% 30% 60% 40% / 30% 60% 40% 70%;
                    }
                    75% { 
                        transform: translateX(-20%) translateY(-5%) scale(1.05) skewX(7deg);
                        border-radius: 30% 70% 40% 60% / 70% 40% 60% 30%;
                    }
                }
                
                @keyframes waveFlow2 {
                    0%, 100% { 
                        transform: translateX(0%) translateY(0%) scale(1) skewY(0deg);
                        border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%;
                    }
                    30% { 
                        transform: translateX(-20%) translateY(10%) scale(1.2) skewY(-4deg);
                        border-radius: 60% 40% 40% 60% / 50% 60% 40% 50%;
                    }
                    60% { 
                        transform: translateX(10%) translateY(-15%) scale(0.8) skewY(6deg);
                        border-radius: 40% 60% 60% 40% / 40% 50% 60% 50%;
                    }
                    90% { 
                        transform: translateX(25%) translateY(5%) scale(1.1) skewY(-2deg);
                        border-radius: 70% 30% 50% 50% / 60% 40% 50% 50%;
                    }
                }
                
                @keyframes waveFlow3 {
                    0%, 100% { 
                        transform: translateX(0%) translateY(0%) scale(1) rotate(0deg);
                        border-radius: 80% 20% 60% 40% / 50% 60% 40% 50%;
                    }
                    20% { 
                        transform: translateX(10%) translateY(-20%) scale(1.3) rotate(15deg);
                        border-radius: 20% 80% 40% 60% / 60% 50% 50% 40%;
                    }
                    40% { 
                        transform: translateX(-15%) translateY(10%) scale(0.7) rotate(-10deg);
                        border-radius: 60% 40% 80% 20% / 40% 60% 50% 50%;
                    }
                    60% { 
                        transform: translateX(20%) translateY(15%) scale(1.1) rotate(25deg);
                        border-radius: 40% 60% 20% 80% / 50% 40% 60% 50%;
                    }
                    80% { 
                        transform: translateX(-5%) translateY(-10%) scale(0.9) rotate(-5deg);
                        border-radius: 70% 30% 50% 50% / 60% 50% 40% 60%;
                    }
                }
                
                @keyframes waveRotate {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.2); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes floatWave1 {
                    0%, 100% { 
                        transform: translateX(0px) translateY(0px) scale(1);
                        border-radius: 50% 50% 50% 50% / 60% 40% 60% 40%;
                    }
                    33% { 
                        transform: translateX(30px) translateY(-20px) scale(1.2);
                        border-radius: 60% 40% 50% 50% / 50% 60% 40% 50%;
                    }
                    66% { 
                        transform: translateX(-20px) translateY(15px) scale(0.8);
                        border-radius: 40% 60% 60% 40% / 40% 50% 60% 50%;
                    }
                }
                
                @keyframes floatWave2 {
                    0%, 100% { 
                        transform: translateX(0px) translateY(0px) scale(1);
                        border-radius: 70% 30% 50% 50% / 50% 60% 40% 50%;
                    }
                    40% { 
                        transform: translateX(-25px) translateY(20px) scale(1.1);
                        border-radius: 30% 70% 60% 40% / 60% 40% 50% 60%;
                    }
                    80% { 
                        transform: translateX(15px) translateY(-15px) scale(0.9);
                        border-radius: 50% 50% 70% 30% / 40% 60% 50% 50%;
                    }
                }
                
                @keyframes floatWave3 {
                    0%, 100% { 
                        transform: translateX(0px) translateY(0px) scale(1);
                        border-radius: 60% 40% 60% 40% / 50% 50% 50% 50%;
                    }
                    25% { 
                        transform: translateX(20px) translateY(-25px) scale(1.3);
                        border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%;
                    }
                    50% { 
                        transform: translateX(-30px) translateY(10px) scale(0.7);
                        border-radius: 80% 20% 50% 50% / 50% 60% 40% 50%;
                    }
                    75% { 
                        transform: translateX(10px) translateY(20px) scale(1.1);
                        border-radius: 20% 80% 60% 40% / 40% 50% 60% 50%;
                    }
                }
                
                .wavy-container:hover .wave-layer-1 {
                    animation-duration: 8s;
                }
                
                .wavy-container:hover .wave-layer-2 {
                    animation-duration: 10s;
                }
                
                .wavy-container:hover .wave-layer-3 {
                    animation-duration: 12s;
                }
                
                .wavy-container:hover .wave-distortion {
                    animation-duration: 15s;
                }
            `}</style>
            {/* <div className="block mt-8 text-center">
                <span
                    className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-orange-400 via-pink-500 to-purple-700 bg-clip-text text-transparent drop-shadow-lg font-mono"
                    style={{
                        letterSpacing: '0.05em',
                        textShadow: '0 2px 8px rgba(44, 62, 80, 0.25)',
                    }}
                >
                  Sanket Naik 🚀
                </span>
                <br />
                <a
                    href="https://github.com/sanketnaik20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-base font-mono underline text-black hover:text-blue-600 transition-all duration-300"
                >
                    @sanketnaik20
                </a>
            </div> */}
        </div>
    );
}

export default App;

