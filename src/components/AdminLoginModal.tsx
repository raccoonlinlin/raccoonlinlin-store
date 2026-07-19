/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Supporting 'raccoon0092' as requested, with fallback legacy ones if needed
    if (password === 'raccoon0092' || password === 'raccoonraccoon1063' || password === 'lily228514' || password === 'craftweave' || password === 'admin') {
      setError('');
      setPassword('');
      onSuccess();
    } else {
      setError('密碼錯誤，請輸入正確的商家管理密碼。');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#333]/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-md bg-white border border-warm-border rounded-[32px] shadow-2xl p-8 z-10 text-center space-y-6"
            id="admin-login-modal"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-warm-beige-light/50 text-[#666] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="mx-auto w-14 h-14 bg-warm-olive/10 text-warm-olive rounded-full flex items-center justify-center">
              <Lock className="w-6 h-6 stroke-[2.5px]" />
            </div>

            {/* Header */}
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-2xl text-[#333]">
                商家身分驗證
              </h3>
              <p className="text-xs text-slate-500 font-light max-w-xs mx-auto leading-relaxed">
                此區域包含機密營業數據與顧客訂單資料。請輸入專屬管理密碼以進行存取。
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1.5 relative">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">
                  管理員安全密碼 (Password)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    placeholder="請輸入商家管理密碼..."
                    className="w-full pl-11 pr-11 py-3.5 bg-warm-beige-light/30 border border-warm-border/70 rounded-2xl text-sm focus:outline-none focus:border-warm-olive transition-colors font-medium"
                    id="admin-password-input"
                    autoFocus
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#333] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-semibold text-rose-500 bg-rose-50/50 border border-rose-100 rounded-xl px-3.5 py-2.5"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold text-xs rounded-full cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                安全登入並進入後台
              </button>
            </form>

            </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
