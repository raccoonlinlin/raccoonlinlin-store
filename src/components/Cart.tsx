/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem } from '../types';
import { ProductPreview } from './ProductPreview';
import { Trash2, ShoppingBag, X, Check, CreditCard, Sparkles, MapPin, Phone, User, Calendar } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onCheckoutSuccess: (
    orderAmount: number,
    orderedItems: CartItem[],
    shippingInfo: { name: string; phone: string; storeName: string; storeAddress: string }
  ) => void;
}

export const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckoutSuccess,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'success'>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    storeName: '',
    storeAddress: '',
    payment: 'LinePay',
    notes: '',
  });
  const [orderId, setOrderId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingFee = subtotal > 1000 ? 0 : 60;
  const total = subtotal + shippingFee;

  // Handle shipping field changes
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  // Submit checkout
  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.phone || !shippingInfo.storeName || !shippingInfo.storeAddress) {
      alert('請填寫完整的收件人姓名、電話、7-11 門市名稱與門市地址！');
      return;
    }

    setIsSubmitting(true);
    
    // Get the configured 7-11 Myship link
    let myshipUrl = typeof window !== 'undefined' ? localStorage.getItem('woven_store_myship_url') : null;
    if (!myshipUrl || myshipUrl === 'https://myship.7-11.com.tw/' || myshipUrl === 'https://myship.7-11.com.tw/general/maintain/GM2504065791468') {
      myshipUrl = 'https://myship.7-11.com.tw/general/detail/GM2504065791468?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnioOVZ8npnlMdgP4fCOJEjXo5yt20HcNP6x_e7oJhBN88f7anFM6wXSPJDW0_aem_RfKH1i57Zq20iJ9gIa1DMg';
    }

    // Simulate transaction delay
    setTimeout(() => {
      const generatedOrderId = `織心-${Math.floor(Math.random() * 90000) + 10000}`;
      setOrderId(generatedOrderId);
      setIsSubmitting(false);
      setCheckoutStep('success');
      
      // Update parent state for analytics & clear cart
      onCheckoutSuccess(total, cartItems, {
        name: shippingInfo.name,
        phone: shippingInfo.phone,
        storeName: shippingInfo.storeName,
        storeAddress: shippingInfo.storeAddress,
      });

      // Open Myship storefront in new tab
      window.open(myshipUrl, '_blank');
    }, 1200);
  };

  const handleFinishCheckout = () => {
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-overlay-wrapper">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
        onClick={checkoutStep !== 'success' ? onClose : undefined}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-warm-border animate-slide-in">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-warm-border flex items-center justify-between bg-warm-beige-light/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-warm-olive" />
              <h2 className="font-serif font-bold text-lg text-[#333]">
                {checkoutStep === 'cart' ? '購物車商品' : checkoutStep === 'form' ? '結帳與配送資訊' : '訂單送出成功'}
              </h2>
            </div>
            {checkoutStep !== 'success' && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-warm-beige-light text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                id="btn-close-cart-sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Body Content depending on step */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* STEP 1: CART LISTING */}
            {checkoutStep === 'cart' && (
              <>
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <div className="w-16 h-16 bg-warm-beige-light rounded-full flex items-center justify-center text-slate-300">
                      <ShoppingBag className="w-8 h-8 text-warm-clay" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-[#333] text-lg">您的購物車目前是空的</h3>
                      <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1 leading-relaxed">
                        探索屬於您的幸運色彩代表色，或是直接在商品目錄中挑選喜愛的編織配飾吧！
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4" id="cart-items-list">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-warm-border/80 soft-shadow"
                      >
                        {/* Dynamic Item Preview Photo */}
                        <div className="shrink-0 scale-90">
                          <ProductPreview
                            category={item.product.category}
                            selectedColors={item.selectedColors}
                            size="sm"
                            showPhoto={true}
                            hideWatermark={true}
                          />
                        </div>

                        {/* Title & color details */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="font-serif font-bold text-base text-[#333] truncate">
                            {item.product.name}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {item.selectedColors.map((col, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 bg-warm-beige-light rounded-full border border-warm-border/50 text-slate-600 font-semibold"
                              >
                                {col}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="font-serif font-bold text-warm-olive text-sm">
                              NT$ {item.price}
                            </span>
                            
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-warm-border rounded-full bg-white overflow-hidden p-0.5 scale-90">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-5 h-5 rounded-full hover:bg-warm-beige-light text-slate-600 text-xs cursor-pointer flex items-center justify-center font-bold"
                              >
                                -
                              </button>
                              <span className="px-2 font-mono font-bold text-xs text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-5 h-5 rounded-full hover:bg-warm-beige-light text-slate-600 text-xs cursor-pointer flex items-center justify-center font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Trash delete */}
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors cursor-pointer"
                          id={`btn-remove-item-${item.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: SHIPPING & PAYMENT FORM */}
            {checkoutStep === 'form' && (
              <form onSubmit={handleConfirmOrder} className="space-y-4" id="checkout-form">
                
                {/* Cart Items Summary */}
                <div className="bg-warm-beige-light/40 border border-warm-border/80 p-4 rounded-2xl space-y-3">
                  <h4 className="text-xs font-bold text-warm-olive tracking-wider flex items-center justify-between">
                    <span>已選商品清單：</span>
                    <span className="text-[10px] text-slate-400 font-normal">共 {cartItems.reduce((acc, item) => acc + item.quantity, 0)} 件</span>
                  </h4>
                  <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-warm-border/50 text-xs">
                        <div className="shrink-0 w-11 h-11">
                          <ProductPreview
                            category={item.product.category}
                            selectedColors={item.selectedColors}
                            size="sm"
                            showPhoto={true}
                            hideWatermark={true}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-[#333] truncate">{item.product.name}</div>
                          <div className="flex flex-wrap gap-1 mt-0.5">
                            {item.selectedColors.map((col, idx) => (
                              <span key={idx} className="text-[9px] px-1.5 py-0.2 bg-warm-beige-light rounded-sm text-slate-500 font-medium">
                                {col}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono text-[10px] text-slate-400">x{item.quantity}</span>
                          <div className="font-serif font-bold text-warm-olive text-xs">NT$ {item.price * item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-warm-border/60 flex justify-between items-center text-xs">
                    <span className="text-slate-500">商品小計 (含運費)</span>
                    <span className="font-serif font-bold text-warm-olive text-sm">NT$ {total}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-warm-olive" />
                    收件人姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={shippingInfo.name}
                    onChange={handleFieldChange}
                    placeholder="請輸入收件人姓名"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-warm-olive" />
                    收件人電話 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={shippingInfo.phone}
                    onChange={handleFieldChange}
                    placeholder="例如：0912345678"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden"
                  />
                </div>

                {/* 7-11 Shipping Badge */}
                <div className="p-3 bg-[#00A3E0]/10 border border-[#00A3E0]/20 rounded-2xl flex items-center gap-3 text-xs text-slate-700">
                  <span className="w-8 h-8 rounded-full bg-[#00813B] text-white flex items-center justify-center font-bold font-serif shrink-0 text-sm">
                    7-11
                  </span>
                  <div>
                    <span className="font-bold text-[#00813B]">統一超商 7-11 賣貨便寄送</span>
                    <p className="text-[10px] text-slate-500 font-light mt-0.5">
                      職人手作包裝，下單後提供賣貨便專屬運單號碼
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00813B]" />
                    7-11 門市名稱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="storeName"
                    required
                    value={shippingInfo.storeName}
                    onChange={handleFieldChange}
                    placeholder="例如：7-11 忠孝門市"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00813B]" />
                    7-11 門市地址 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="storeAddress"
                    required
                    value={shippingInfo.storeAddress}
                    onChange={handleFieldChange}
                    placeholder="例如：台北市大安區忠孝東路四段 XX 號"
                    className="w-full px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-warm-olive" />
                    付款方式
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-warm-olive/10 border border-warm-olive/20 rounded-2xl text-xs text-slate-700">
                    <span className="px-2 py-0.5 rounded-md bg-[#00813B] text-white font-black text-[10px] tracking-wide shrink-0">
                      7-11 賣貨便
                    </span>
                    <div>
                      <span className="font-bold text-[#00813B]">7-11 賣貨便官方系統結帳</span>
                      <p className="text-[10px] text-slate-500 font-light mt-0.5">
                        我們使用 7-11 賣貨便系統收款與寄送。送出資訊後，我們將自動導向至賣貨便官方賣場，請在賣貨便連結中選擇相同的商品數量完成下單登記。
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    客製要求或訂單備註 (選填)
                  </label>
                  <textarea
                    name="notes"
                    value={shippingInfo.notes}
                    onChange={handleFieldChange}
                    placeholder="例如：想要掛繩長度增長 5 公分，或是需要附贈手寫禮品小卡。"
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden resize-none"
                  />
                </div>

                <div className="p-4 bg-warm-beige-light rounded-2xl border border-warm-border/60 space-y-1">
                  <h5 className="font-serif font-bold text-xs text-warm-olive flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-warm-clay" />
                    手作排單提醒
                  </h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    所有產品皆為接單後排程手工編織。目前排單等待期約 <strong>3-5 個工作天</strong>。出貨時我們將發送簡訊通知，感謝您的喜愛與耐心等待！
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  id="btn-submit-order"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      正在引導至 7-11 賣貨便...
                    </span>
                  ) : (
                    <span>確認配色並前往 7-11 賣貨便下單</span>
                  )}
                </button>

                <p className="text-[10px] text-slate-400 text-center font-light leading-normal mt-2.5 opacity-80">
                  * 本商店為「個人設計師手作工作室」，目前每月營業額尚未達到法規之營業稅起徵點，因此無須開立統一發票。
                </p>
              </form>
            )}

            {/* STEP 3: SUCCESS OVERLAY */}
            {checkoutStep === 'success' && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12" id="checkout-success-view">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-200">
                  <Check className="w-8 h-8 stroke-[3px]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-[#333]">
                    訂單已成功排單！
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed font-light">
                    感謝您對手作溫度的支持。創辦人已收到您的精緻定製需求，並即將為您排程針織製作！
                  </p>
                </div>

                <div className="w-full bg-warm-beige-light/50 p-4 rounded-2xl border border-warm-border text-left space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">訂單編號</span>
                    <span className="font-mono font-bold text-slate-800">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">付款金額</span>
                    <span className="font-serif font-bold text-warm-olive text-sm">NT$ {total}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">付款方式</span>
                    <span className="font-bold text-[#00813B] bg-[#00813B]/10 px-2 py-0.5 rounded-md">7-11 賣貨便貨到付款/線上付</span>
                  </div>
                  <div className="p-3 bg-[#00813B]/5 border border-[#00813B]/10 rounded-2xl text-xs text-slate-600 text-left space-y-1">
                    <p className="font-bold text-[#00813B] flex items-center gap-1 font-serif">
                      💡 溫馨提示
                    </p>
                    <p className="text-[10px] font-light leading-relaxed">
                      我們已在您的瀏覽器新分頁中開啟 7-11 賣貨便賣場。<strong>請務必於賣貨便賣場中下單相同的商品與數量</strong>。
                      您的客製色與配送資訊已在後台登記，我們將比對您的收件姓名/電話並立刻為您手工編織排單！
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-sans">配送管道</span>
                    <span className="font-bold text-[#00813B] bg-[#00813B]/10 px-2 py-0.5 rounded-md">7-11 賣貨便</span>
                  </div>
                  <div className="flex justify-between items-start text-xs border-t border-warm-border/60 pt-2">
                    <span className="text-slate-400 font-sans shrink-0">取貨門市</span>
                    <div className="text-right">
                      <div className="font-bold text-slate-800">{shippingInfo.storeName}</div>
                      <div className="text-[10px] text-slate-500 font-light max-w-[200px] inline-block">{shippingInfo.storeAddress}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-warm-border/60 pt-2">
                    <span className="text-slate-400 flex items-center gap-1.5 font-sans font-light">
                      <Calendar className="w-3.5 h-3.5 text-warm-clay" />
                      預計出貨時間
                    </span>
                    <span className="font-bold text-[#333] font-serif">3-5 個工作天內</span>
                  </div>
                </div>

                <button
                  onClick={handleFinishCheckout}
                  className="w-full py-3.5 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold rounded-full cursor-pointer transition-all"
                  id="btn-checkout-complete"
                >
                  回到商店首頁
                </button>
              </div>
            )}

          </div>

          {/* Bottom Footer with pricing summary (Step 1 only) */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="px-6 py-5 border-t border-warm-border bg-warm-beige-light/30 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>商品小計</span>
                  <span>NT$ {subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>手作包裝與寄送運費</span>
                  <span>{shippingFee === 0 ? '免運優惠' : `NT$ ${shippingFee}`}</span>
                </div>
                {subtotal < 1000 && (
                  <p className="text-[10px] text-warm-clay text-right font-medium">
                    💡 滿 NT$1000 即享免運，還差 NT$ {1000 - subtotal}！
                  </p>
                )}
                <div className="flex justify-between text-base font-extrabold text-[#333] pt-1.5 border-t border-warm-border">
                  <span>總計金額</span>
                  <span className="text-warm-olive font-serif text-lg font-bold">NT$ {total}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('form')}
                className="w-full py-3.5 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold rounded-full shadow-md hover:shadow-warm-olive/10 cursor-pointer transition-all flex items-center justify-center gap-2"
                id="btn-cart-proceed-checkout"
              >
                <span>填寫配送資訊並結帳</span>
              </button>

              <p className="text-[10px] text-slate-400 text-center font-light leading-normal mt-1 opacity-80">
                * 本商店為「個人設計師手作工作室」，目前每月營業額尚未達到法規之營業稅起徵點，因此無須開立統一發票。
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
