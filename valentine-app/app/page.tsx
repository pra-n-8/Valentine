"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

export default function ValentineApp() {
  const [step, setStep] = useState(0);
  const [noButtons, setNoButtons] = useState([{ top: 50, left: 50, id: 0 }]);
  const [accepted, setAccepted] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [password, setPassword] = useState("");

  const messages = [
    "I think you deserve this....",
    "You make me smile every day 😄",
    "Okay don’t overthink this...",
    "Will you be my Valentine? ❤️",
    "I promise it’ll be fun 😏",
    "I’ve been waiting to ask you 💌"
  ];

  const handleYes = () => {
    setAccepted(true);
  };

  const addFloatingEmoji = () => {
    const emoji = document.createElement('div');
    emoji.innerText = ['💖','✨','🌸','💌'][Math.floor(Math.random()*4)];
    emoji.style.position = 'absolute';
    emoji.style.left = `${Math.random()*80 + 10}%`;
    emoji.style.top = `${Math.random()*80 + 10}%`;
    emoji.style.fontSize = `${Math.random()*24 + 16}px`;
    emoji.style.pointerEvents = 'none';
    document.body.appendChild(emoji);
    setTimeout(() => document.body.removeChild(emoji), 1500);
  };

  const splitNoButton = (id: number) => {
    addFloatingEmoji();
    setNoButtons(prev => {
      const index = prev.findIndex(b => b.id === id);
      if(index === -1) return prev;
      const newButtons = [...prev];
      newButtons.splice(index,1);
      const extra = Array.from({length:3}).map((_,i) => ({
        id: Date.now() + i,
        top: Math.random()*70 + 10,
        left: Math.random()*70 + 10
      }));
      return [...newButtons, ...extra];
    });
  };

  const checkPassword = () => {
    if(password.toUpperCase() === 'RITOXICA') {
      setShowSecret(true);
    } else {
      alert('Wrong code 😅');
    }
  };

  return (
    <>
      <Head>
        <title>Your Valentine 💖</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="w-full max-w-md text-center shadow-2xl rounded-3xl bg-white p-8 flex flex-col items-center gap-6 relative border border-rose-200">

          {!showSecret && (
            <div className="flex flex-col gap-4">
              <h2 className="text-purple-800 text-lg font-bold">Enter our secret code to continue… 😏</h2>
              <input 
                type="text" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="border border-purple-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black"
                placeholder="Secret code..." 
              />
              <button 
                onClick={checkPassword}
                className="bg-purple-600 text-white rounded-2xl px-6 py-2 hover:bg-purple-700 transition"
              >
                Enter 💌
              </button>
            </div>
          )}

          {showSecret && !accepted && (
            <>
              <motion.h1
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-purple-800"
              >
                {messages[step]}
              </motion.h1>

              {step < messages.length - 1 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="rounded-2xl text-lg px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Continue
                </button>
              ) : (
                <div className="relative w-full h-64">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ boxShadow: [
                      "0 0 0px rgba(168,85,247,0.6)",
                      "0 0 20px rgba(168,85,247,0.8)",
                      "0 0 0px rgba(168,85,247,0.6)"
                    ] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    onClick={handleYes}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-rose-500 text-white rounded-full px-8 py-3 text-lg font-semibold z-10"
                  >
                    YES 💖
                  </motion.button>

                  {noButtons.map(button => (
                    <motion.button
                      key={button.id}
                      onClick={() => splitNoButton(button.id)}
                      whileHover={{ scale: 1.1 }}
                      className="absolute bg-red-500 text-white font-semibold rounded-xl px-4 py-2 shadow-lg z-10"
                      style={{ top: `${button.top}%`, left: `${button.left}%` }}
                    >
                      No 😈
                    </motion.button>
                  ))}
                </div>
              )}
            </>
          )}

          {accepted && (
            <div className="flex flex-col items-center gap-6 relative w-full">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, rotate: 0, opacity: 1 }}
                  animate={{ y: [0, -500], rotate: [0, 360], opacity: [1, 0] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  style={{ position: "absolute", left: `${Math.random()*90 + 5}%`, fontSize: `${Math.random()*24 + 12}px`, zIndex: 5 }}
                >
                  🎉
                </motion.div>
              ))}

              <div className="z-10 flex flex-col items-center gap-4">
                <img
                  src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"
                  alt="cute gif asking for pics and message"
                  className="rounded-2xl w-64"
                />
                <h2 className="text-purple-800 text-xl font-bold text-center">
                  Yay! Now send me some cute pics and a message :P
                </h2>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}