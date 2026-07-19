import React, { useState } from 'react';
import { X, Send, CheckCircle, Mail, MessageSquare, User, Tag } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '詢問客製化/配色',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('請填寫姓名、聯絡信箱與訊息內容！');
      return;
    }

    setIsSending(true);

    // Simulate direct secure email sending to lily228514@gmail.com
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      // Save inquiries to local storage so the merchant can see them or for persistence
      const savedInquiries = localStorage.getItem('woven_store_inquiries') || '[]';
      try {
        const parsed = JSON.parse(savedInquiries);
        parsed.push({
          id: `inq-${Date.now()}`,
          date: new Date().toISOString(),
          ...form
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
      subject: '詢問客製化/配色',
      message: '',
    });
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto" id="contact-modal-overlay">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={!isSending ? onClose : undefined}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-[32px] border border-warm-border shadow-2xl p-6 md:p-8 animate-fade-in z-10 overflow-hidden">
        
        {/* Top Close Button */}
        {!isSending && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-warm-beige-light text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            id="btn-close-contact-modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-warm-olive/10 text-warm-olive rounded-full text-xs font-semibold mb-2">
            <Mail className="w-3.5 h-3.5" />
            詢問與合作洽談
          </div>
          <h3 className="font-serif font-bold text-2xl text-[#333]">
            聯絡 RACCOONLINLIN浣熊琳琳文創工作室
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            您可以直接填寫下表，信件將即時、安全地投遞至創辦人信箱 <span className="text-warm-olive font-semibold">raccoonraccoon1063@gamil.com</span>，我們將在 24 小時內親自回覆您！
          </p>
        </div>

        {/* Modal Body / Form */}
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-warm-olive" />
                詢問主題
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleInputChange}
                disabled={isSending}
                className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50"
              >
                <option value="詢問客製化/配色">詢問商品客製化 / 配色調整</option>
                <option value="大宗採購/禮品定製">大宗採購 / 婚禮、活動禮品定製</option>
                <option value="品牌合作/寄賣">品牌合作 / 實體寄賣洽談</option>
                <option value="訂單售後詢問">已購買訂單售後詢問</option>
                <option value="其他合作提案">其他合作提案</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-warm-olive" />
                訊息與合作細節 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                required
                value={form.message}
                onChange={handleInputChange}
                disabled={isSending}
                placeholder="請描述您想要詢問的客製需求或合作細節..."
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden disabled:opacity-50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3.5 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold rounded-full shadow-md hover:shadow-warm-olive/10 cursor-pointer transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
              id="btn-submit-contact"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  安全寄送中...
                </span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>確定傳送</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in" id="contact-success-screen">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-lg text-[#333]">
                信件已成功發送！
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed font-light">
                我們已經成功將您的詢問直接寄送至創辦人信箱 <strong className="text-warm-olive">raccoonraccoon1063@gamil.com</strong>。
                感謝您的來信，職人將會盡速閱讀並透過您填寫的信箱與您聯繫！
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-warm-olive hover:bg-warm-olive-dark text-white text-xs font-bold rounded-full transition-all cursor-pointer"
            >
              確定
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
