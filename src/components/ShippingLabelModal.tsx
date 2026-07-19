/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Check, Info, FileText, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';

interface ShippingLabelModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onUpdateShippingCode: (orderId: string, code: string) => void;
}

export const ShippingLabelModal: React.FC<ShippingLabelModalProps> = ({
  isOpen,
  order,
  onClose,
  onUpdateShippingCode,
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);
  const [inputCode, setInputCode] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Generate a mock stable 11-character 7-11 shipping code (E05 + 8 numbers) as default
  const generateShippingCode = (orderId: string) => {
    let hash = 0;
    for (let i = 0; i < orderId.length; i++) {
      hash = orderId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const numPart = Math.abs(hash % 100000000).toString().padStart(8, '0');
    return `E05${numPart}`;
  };

  const activeShippingCode = order?.shippingCode || (order ? generateShippingCode(order.id) : '');

  // Initialize input field when order loads or updates
  useEffect(() => {
    if (order) {
      setInputCode(order.shippingCode || '');
      setSaveSuccess(false);
    }
  }, [order]);

  if (!order) return null;

  const handleSaveCode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      alert('請輸入 7-11 寄件單號！');
      return;
    }
    onUpdateShippingCode(order.id, cleanCode);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Construct official-looking scannable Code 128 barcode URL via free bwip-js API
  const barcodeUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${activeShippingCode}&scale=2&height=12&includetext=false`;

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML;

    if (printContent) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>RACCOONLINLIN浣熊琳琳文創工作室 - 7-11 賣貨便寄件單列印</title>
              <style>
                body {
                  font-family: system-ui, -apple-system, sans-serif;
                  color: #333;
                  background: white;
                  padding: 40px;
                  margin: 0;
                }
                .label-container {
                  border: 2px dashed #00813B;
                  padding: 30px;
                  max-width: 480px;
                  margin: 0 auto;
                  border-radius: 12px;
                }
                .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                  border-bottom: 2px solid #00813B;
                  padding-bottom: 12px;
                  margin-bottom: 16px;
                }
                .logo-title {
                  font-size: 16px;
                  font-weight: bold;
                  color: #00813B;
                }
                .logo-subtitle {
                  font-size: 10px;
                  color: #666;
                  margin-top: 2px;
                }
                .ship-type {
                  background-color: #00813B;
                  color: white;
                  font-size: 11px;
                  padding: 4px 8px;
                  border-radius: 4px;
                  font-weight: bold;
                }
                .code-box {
                  background-color: #f4faf6;
                  border: 1px solid #cce9d8;
                  border-radius: 8px;
                  padding: 12px;
                  text-align: center;
                  margin-bottom: 16px;
                }
                .code-title {
                  font-size: 10px;
                  color: #666;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  margin-bottom: 4px;
                }
                .code-value {
                  font-family: monospace;
                  font-size: 24px;
                  font-weight: bold;
                  color: #00813B;
                  letter-spacing: 2px;
                }
                .barcode-section {
                  margin: 20px 0;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 6px;
                }
                .barcode-img {
                  height: 48px;
                  max-width: 100%;
                }
                .barcode-num {
                  font-family: monospace;
                  font-size: 11px;
                  color: #666;
                  letter-spacing: 1px;
                }
                .info-grid {
                  font-size: 13px;
                  border-top: 1px solid #eee;
                  border-bottom: 1px solid #eee;
                  padding: 12px 0;
                  margin-bottom: 16px;
                }
                .grid-row {
                  display: grid;
                  grid-template-columns: 80px 1fr;
                  gap: 8px;
                  margin-bottom: 6px;
                }
                .grid-row:last-child {
                  margin-bottom: 0;
                }
                .label {
                  font-weight: bold;
                  color: #666;
                }
                .value {
                  color: #111;
                }
                .footer-notes {
                  font-size: 9px;
                  color: #888;
                  line-height: 1.5;
                }
                @media print {
                  body { padding: 0; }
                  .label-container { border-style: dashed; }
                }
              </style>
            </head>
            <body>
              <div class="label-container">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        window.print();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#333]/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#FDFBF7] border border-warm-border rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            id="shipping-label-modal"
          >
            {/* Header banner */}
            <div className="px-6 py-4 bg-[#00813B] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h3 className="font-serif font-bold text-lg">7-11 C2C 寄件單 (可實際寄件)</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Help Tips */}
              <div className="bg-[#00813B]/5 border border-[#00813B]/20 rounded-2xl p-4 text-xs space-y-2 shrink-0">
                <h4 className="font-bold text-[#00813B] flex items-center gap-1">
                  <Info className="w-4 h-4 shrink-0" />
                  統一超商 7-11 寄件真實出貨指南：
                </h4>
                <ol className="list-decimal list-inside text-slate-600 space-y-1 pl-1 font-light">
                  <li>本頁面條碼為 <strong className="text-[#00813B]">100% 真實 Code 128 規格條碼</strong>，只要輸入真實單號即可直接掃描寄件。</li>
                  <li><strong>如何取得真實單號？</strong> 請前往 7-11 賣貨便、ibon APP 或第三方物流後台建立該筆訂單的常溫寄件，獲得 11 碼寄件代碼 (例：E05...)。</li>
                  <li><strong>綁定與出貨：</strong> 將該單號填入右側的輸入框並儲存。您就可以直接列印此寄件專用單，或是至 7-11 ibon 機台輸入代碼/掃描條碼列印小白單！</li>
                </ol>
              </div>

              {/* Grid: Preview & Manual instructions */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Print preview (The printable slip) */}
                <div className="md:col-span-7 bg-white border border-warm-border/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6600] to-[#00813B]" />
                  
                  {/* Outer Print Container */}
                  <div ref={printAreaRef} className="space-y-4">
                    {/* Slip Header */}
                    <div className="header flex justify-between items-end border-b-2 border-[#00813B] pb-3">
                      <div>
                        <div className="logo-subtitle text-[10px] text-slate-400 font-bold tracking-wider">7-11 賣貨便 ‧ 常溫店到店</div>
                        <h4 className="logo-title font-serif font-bold text-base text-[#00813B] mt-0.5">RACCOONLINLIN浣熊琳琳文創工作室 寄件專用單</h4>
                      </div>
                      <span className="ship-type bg-[#00813B] text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md">
                        常溫 38 元
                      </span>
                    </div>

                    {/* Shipping Code Box */}
                    <div className="code-box bg-[#00813B]/5 border border-[#00813B]/10 rounded-xl p-3 text-center">
                      <span className="code-title text-[9px] text-slate-400 font-bold tracking-widest block uppercase">ibon 11碼寄件代碼</span>
                      <span className="code-value font-mono text-2xl font-black text-[#00813B] tracking-wider block mt-0.5">
                        {activeShippingCode}
                      </span>
                    </div>

                    {/* Real scannable Barcode via bwip-js API */}
                    <div className="barcode-section flex flex-col items-center justify-center py-3 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 gap-1.5">
                      <img
                        src={barcodeUrl}
                        alt="7-11 C2C Barcode"
                        className="barcode-img h-12 object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <span className="barcode-num font-mono text-[10px] text-slate-500 font-bold tracking-widest">
                        {activeShippingCode}
                      </span>
                    </div>

                    {/* Details Table */}
                    <div className="info-grid border-t border-b border-slate-100 py-3 text-xs space-y-2">
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">寄件人</span>
                        <span className="value col-span-9 text-slate-800 font-bold">RACCOONLINLIN浣熊琳琳文創工作室 (Raccoon)</span>
                      </div>
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">寄件電話</span>
                        <span className="value col-span-9 text-slate-600 font-mono">0912-***-063</span>
                      </div>
                      <hr className="border-slate-100" />
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">收件人</span>
                        <span className="value col-span-9 text-slate-800 font-bold">{order.name}</span>
                      </div>
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">收件電話</span>
                        <span className="value col-span-9 text-slate-600 font-mono">{order.phone}</span>
                      </div>
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">取貨門市</span>
                        <span className="value col-span-9 text-slate-800 font-bold">7-11 {order.storeName} 門市</span>
                      </div>
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">門市地址</span>
                        <span className="value col-span-9 text-slate-400 text-[10px] leading-relaxed font-light">{order.storeAddress}</span>
                      </div>
                      <hr className="border-slate-100" />
                      <div className="grid-row grid grid-cols-12 gap-1.5">
                        <span className="label col-span-3 text-slate-400 font-medium">包裹內容</span>
                        <span className="value col-span-9 text-slate-500 text-[11px] font-light leading-normal">
                          {order.items.map((it, idx) => (
                            <div key={idx}>
                              - {it.productName} ({it.selectedColors.join(',')}) x{it.quantity}
                            </div>
                          ))}
                        </span>
                      </div>
                    </div>

                    {/* Fine Print Footer */}
                    <div className="footer-notes text-[9px] text-slate-400 leading-normal font-light">
                      * 寄件單列印有效期限為本單生成起 7 天內，逾期請重新產生。
                      <br />
                      * 寄件規範：最長單邊 &le; 45公分，總重 &le; 5公斤。
                    </div>
                  </div>
                </div>

                {/* Print Actions & Steps */}
                <div className="md:col-span-5 space-y-4">
                  {/* Step 1: Input Real Code */}
                  <div className="bg-white border border-warm-border/80 rounded-2xl p-4 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-warm-olive/10 text-warm-olive font-mono text-xs font-bold">1</span>
                      綁定真實 7-11 寄件單號
                    </h4>
                    
                    <form onSubmit={handleSaveCode} className="space-y-2.5">
                      <div className="relative">
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          placeholder="請輸入 11 碼代碼，如 E05..."
                          maxLength={15}
                          className="w-full px-3 py-2 text-xs border border-warm-border rounded-xl focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden font-mono text-center tracking-wider uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1 shadow-sm"
                      >
                        {saveSuccess ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 animate-bounce" />
                            <span>儲存並繪製條碼成功！</span>
                          </>
                        ) : (
                          <span>儲存單號並更新條碼</span>
                        )}
                      </button>
                    </form>
                    <p className="text-[10px] text-slate-400 leading-normal font-light">
                      目前此筆訂單：
                      {order.shippingCode ? (
                        <span className="text-[#00813B] font-bold font-mono">
                          已綁定單號 {order.shippingCode}
                        </span>
                      ) : (
                        <span className="text-amber-600 font-medium">
                          尚未綁定（目前使用系統隨機生成的模擬條碼）
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Step 2: Print */}
                  <div className="bg-white border border-warm-border/80 rounded-2xl p-4 shadow-xs text-center space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-warm-olive/10 text-warm-olive font-mono text-xs font-bold">2</span>
                      執行列印
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      按下列印按鈕，可直接印出符合寄件規範的小白單貼在包裏上，亦可直接至 7-11 ibon 掃描上方條碼列印。
                    </p>

                    <button
                      onClick={handlePrint}
                      className="w-full py-3 bg-[#00813B] hover:bg-[#006F30] text-white font-bold text-xs rounded-full cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-4 h-4" />
                      直接列印此寄件單
                    </button>
                  </div>

                  {/* ibon instructions */}
                  <div className="bg-white border border-warm-border/80 rounded-2xl p-4 shadow-xs space-y-2 text-[11px]">
                    <h4 className="font-bold text-slate-800">ibon 機台操作說明：</h4>
                    <ul className="text-slate-500 space-y-1.5 font-light">
                      <li className="flex items-start gap-1">
                        <Check className="w-3.5 h-3.5 text-[#00813B] shrink-0 mt-0.5" />
                        <span>至 7-11 點選 ibon <strong>「代碼輸入/條碼掃描」</strong></span>
                      </li>
                      <li className="flex items-start gap-1">
                        <Check className="w-3.5 h-3.5 text-[#00813B] shrink-0 mt-0.5" />
                        <span>輸入此單號：<strong className="font-mono text-[#00813B]">{activeShippingCode}</strong> 或是將此手機螢幕對準 ibon 掃描孔</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <Check className="w-3.5 h-3.5 text-[#00813B] shrink-0 mt-0.5" />
                        <span>列印寄件單交給櫃檯刷讀並將包裹完成交寄！</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 border-t border-warm-border/50 bg-warm-beige-light/30 flex justify-end gap-3 shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white border border-warm-border hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-full cursor-pointer transition-colors"
              >
                關閉視窗
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
