/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, CheckCircle, Heart, Calendar, Hash, Palette, Mail, User, Check } from 'lucide-react';
import { COLORS } from '../data';

interface WeddingContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColorName?: string; // Optional pre-selected color from the detail view
}

export const WeddingContactModal: React.FC<WeddingContactModalProps> = ({
  isOpen,
  onClose,
  selectedColorName
}) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    selectedColors: selectedColorName ? [selectedColorName] : [] as string[],
    customCard: '否 公版即可(無須加價)',
    quantity: '',
    deliveryDate: '',
  });

  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleColorToggle = (colorName: string) => {
    setForm(prev => {
      const colors = [...prev.selectedColors];
      const index = colors.indexOf(colorName);
      if (index > -1) {
        colors.splice(index, 1);
      } else {
        colors.push(colorName);
      }
      return { ...prev, selectedColors: colors };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.quantity || !form.deliveryDate) {
      alert('請填寫姓名、聯絡信箱、訂製數量與預計收貨時間！');
      return;
    }
    if (form.selectedColors.length === 0) {
      alert('請至少勾選一種想做的吊飾顏色！');
      return;
    }

    setIsSending(true);

    // Format all answers into a beautiful text message representing the email contents
    const emailContent = `
【婚禮小物客製化 訂製需求單】
------------------------------------------
聯絡姓名：${form.name}
聯絡信箱：${form.email}

[需求問答與題目]
1. 想做幾種顏色的吊飾：
   ${form.selectedColors.join('、')}

2. 是否想要客製化背卡：
   ${form.customCard}

3. 需要訂製的數量：
   ${form.quantity}

4. 預計收貨時間：
   ${form.deliveryDate}
------------------------------------------
發送時間：${new Date().toLocaleString()}
`;

    // Simulate sending email and saving to local inquiries
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);

      const savedInquiries = localStorage.getItem('woven_store_inquiries') || '[]';
      try {
        const parsed = JSON.parse(savedInquiries);
        parsed.push({
          id: `inq-wedding-${Date.now()}`,
          date: new Date().toISOString(),
          name: form.name,
          email: form.email,
          subject: '婚禮小物客製化需求',
          message: emailContent.trim()
        });
        localStorage.setItem('woven_store_inquiries', JSON.stringify(parsed));
      } catch (err) {
        console.error(err);
      }
    }, 1500);
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      selectedColors: selectedColorName ? [selectedColorName] : [],
      customCard: '否 公版即可(無須加價)',
      quantity: '',
      deliveryDate: '',
    });
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto" id="wedding-contact-modal-overlay">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={!isSending ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-[32px] border border-warm-border shadow-2xl p-6 md:p-8 animate-fade-in z-10 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Top Close Button */}
        {!isSending && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-warm-beige-light text-slate-400 hover:text-slate-600 transition-colors cursor-pointer z-10"
            id="btn-close-wedding-modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="mb-4 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold mb-2 border border-rose-100">
            <Heart className="w-3.5 h-3.5 fill-current" />
            婚禮與活動專屬客製化
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#333]">
            婚禮小物客製化洽詢
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            請填寫下方訂製諮詢單，我們將把您的需求整理並發送至信箱 <span className="text-warm-olive font-semibold">raccoonraccoon1063@gamil.com</span>，由創辦人親自為您估價並回信！
          </p>
        </div>

        {/* Scrollable Container for Form or Success */}
        <div className="overflow-y-auto pr-1 flex-1 py-2">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name and Email side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-warm-olive" />
                    您的姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleInputChange}
                    disabled={isSending}
                    placeholder="例如：王小明"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-warm-olive" />
                    您的聯絡信箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                    disabled={isSending}
                    placeholder="例如：your-email@example.com"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Question 1: Colors Checkbox */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-warm-olive" />
                  1. 想做幾種顏色的吊飾 (可複選) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 bg-warm-beige-light/20 p-3.5 rounded-2xl border border-warm-border/50">
                  {COLORS.map(color => {
                    const isChecked = form.selectedColors.includes(color.name);
                    return (
                      <button
                        type="button"
                        key={color.name}
                        disabled={isSending}
                        onClick={() => handleColorToggle(color.name)}
                        className={`p-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-warm-olive/10 border-warm-olive text-warm-olive font-semibold' 
                            : 'bg-white border-warm-border hover:border-warm-olive text-slate-600'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center text-white"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                        </span>
                        <span className="truncate">{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Custom Card dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  2. 是否想要客製化背卡 <span className="text-red-500">*</span>
                </label>
                <select
                  name="customCard"
                  value={form.customCard}
                  onChange={handleInputChange}
                  disabled={isSending}
                  className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50 cursor-pointer"
                >
                  <option value="否 公版即可(無須加價)">否 公版即可(無須加價)</option>
                  <option value="是 需客製背卡(須加價 詳細將回信告知)">是 需客製背卡(須加價 詳細將回信告知)</option>
                </select>
              </div>

              {/* Question 3 & 4: Quantity and Delivery Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-warm-olive" />
                    3. 需要訂製多少數量 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    required
                    value={form.quantity}
                    onChange={handleInputChange}
                    disabled={isSending}
                    placeholder="例如：50 個 / 100 個"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-warm-olive" />
                    4. 預計收貨時間 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="deliveryDate"
                    required
                    value={form.deliveryDate}
                    onChange={handleInputChange}
                    disabled={isSending}
                    placeholder="例如：2026 年 10 月中旬"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-full shadow-md hover:shadow-rose-100 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      正在發送需求單...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      發送訊息
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4 animate-fade-in flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500">
                <CheckCircle className="w-10 h-10 stroke-[2.5px]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-[#333] font-serif">已發送</h4>
                <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto">
                  客製化需求已成功送出！系統已將訂製問卷明細備份至您的專屬數據庫，我們將在收到後的第一時間，發送報價信與背卡款式至您的聯絡信箱，感謝您的支持！
                </p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2 border border-warm-border hover:border-warm-olive text-warm-olive hover:bg-warm-beige-light/30 font-bold text-xs rounded-full cursor-pointer transition-all"
              >
                關閉視窗
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
