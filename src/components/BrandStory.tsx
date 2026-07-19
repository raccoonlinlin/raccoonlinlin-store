/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { STORIES, PRODUCTS } from '../data';
import { ProductPreview } from './ProductPreview';
import { Heart, Sparkles, ShoppingBag, ScrollText, Instagram, Youtube, Pin, AtSign } from 'lucide-react';

interface BrandStoryProps {
  onNavigate: (page: 'home' | 'quiz' | 'shop') => void;
  onSelectProductForQuiz: (category: string) => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({
  onNavigate,
  onSelectProductForQuiz,
}) => {
  return (
    <div className="space-y-16 py-4 animate-fade-in">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-[32px] bg-warm-olive text-white p-8 md:p-16 soft-shadow">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-warm-clay/10 rounded-full blur-3xl" />
        
        <div className="max-w-2xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-warm-beige text-xs uppercase tracking-widest font-semibold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            純手編 ‧ 心靈配色定製
          </div>
          
          <h1 className="text-4xl md:text-5.5xl font-serif italic tracking-tight leading-tight">
            編織一段<br />
            關於你的色彩故事
          </h1>
          
          <p className="text-warm-beige-light/90 md:text-lg leading-relaxed font-sans font-light">
            每一根絲線都是生活的一種情緒。我們以誠摯的匠心，將你的專屬特質、幸運密碼與色彩能量，編織成陪伴你每一天的美學配件。
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => onNavigate('quiz')}
              className="px-6 py-3.5 bg-white text-warm-olive hover:bg-warm-beige-light hover:text-warm-olive-dark font-semibold rounded-full shadow-lg hover:shadow-white/10 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              id="btn-hero-quiz"
            >
              <ScrollText className="w-4 h-4 text-warm-olive" />
              尋找命定色
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-6 py-3.5 bg-transparent text-white hover:bg-white/10 font-semibold rounded-full border border-white/40 hover:border-white transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
              id="btn-hero-shop"
            >
              <ShoppingBag className="w-4 h-4" />
              線上選購
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="space-y-8" id="sec-featured-products">
        <div className="text-center space-y-3">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-warm-clay block">RECOMMENDED ITEMS</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#333] tracking-tight">
            主打手作設計款式
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            為你量身打造的編織美學，提供客製化配色，讓配件不僅僅是裝飾，更是溫暖的自我表達。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.filter(p => p.category === 'v_lanyard_multi' || p.category === 'paw' || p.category === 'heart').map((prod) => (
            <div
              key={prod.id}
              className="flex flex-col bg-white rounded-[32px] border border-warm-border shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 space-y-6 card-hover"
            >
              {/* Product Visual Center */}
              <div className="flex justify-center p-4 bg-warm-beige-light/30 rounded-2xl">
                <ProductPreview
                  category={prod.category}
                  selectedColors={prod.defaultColors}
                  size="lg"
                  showPhoto={true}
                  imageUrl={prod.imageUrl}
                />
              </div>

              {/* Product details */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-serif font-bold text-2xl text-[#333]">
                      {prod.name}
                    </h3>
                    <span className="text-warm-olive font-serif text-xl font-semibold">
                      NT$ {prod.basePrice}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed mt-2 font-sans">
                    {prod.description}
                  </p>
                </div>

                {/* Direct buttons */}
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectProductForQuiz(prod.category)}
                    className="py-2.5 px-3 bg-warm-beige-light hover:bg-warm-border/40 text-warm-olive text-xs font-semibold rounded-full text-center border border-warm-border/50 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    id={`btn-quiz-for-${prod.id}`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-warm-olive" />
                    尋找命定色
                  </button>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="py-2.5 px-3 bg-warm-olive hover:bg-warm-olive-dark text-white text-xs font-semibold rounded-full text-center cursor-pointer transition-all flex items-center justify-center gap-1.5"
                    id={`btn-buy-for-${prod.id}`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    線上選購
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Story Section with Warm Styling */}
      <section className="bg-warm-beige-light/50 rounded-[32px] p-8 md:p-12 border border-warm-border/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="sec-about-story">
        <div className="lg:col-span-5 space-y-6">
          <div className="w-10 h-10 bg-warm-olive/10 rounded-full flex items-center justify-center text-warm-olive">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif text-[#333] tracking-tight">
            手作的故事與溫度
          </h2>
          
          <p className="text-warm-clay font-serif italic text-lg leading-relaxed">
            {STORIES.aboutTitle}
          </p>

          <div className="p-4 rounded-2xl bg-white border border-warm-border shadow-xs space-y-2">
            <div className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">CRAFTSMANSHIP METRIC / 職人標準</div>
            <div className="grid grid-cols-3 gap-2 text-center divide-x divide-warm-border">
              <div>
                <div className="text-lg font-bold text-warm-olive">100%</div>
                <div className="text-[10px] text-slate-500 font-medium">純手編</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warm-olive">12種</div>
                <div className="text-[10px] text-slate-500 font-medium">精心配色</div>
              </div>
              <div>
                <div className="text-lg font-bold text-warm-olive">3類</div>
                <div className="text-[10px] text-slate-500 font-medium">心靈測驗</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-slate-600 leading-relaxed text-sm">
          {STORIES.storyContent.map((item, idx) => (
            <div key={idx} className="space-y-1.5 p-4 bg-white rounded-2xl border border-warm-border/50 soft-shadow">
              <h3 className="font-serif font-bold text-[#333] text-base flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-warm-clay" />
                {item.title}
              </h3>
              <p className="pl-3.5 text-slate-500 text-xs leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-white rounded-[32px] p-8 border border-warm-border/60 text-center space-y-6 shadow-xs" id="sec-social-media">
        <div className="space-y-2">
          <span className="text-xs tracking-[0.2em] uppercase font-bold text-warm-clay block">FOLLOW OUR JOURNEY</span>
          <h2 className="text-2xl md:text-3xl font-serif text-[#333] tracking-tight">
            追蹤我們的社群平台
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm font-sans">
            關注浣熊琳琳，探索更多客製化手編日常、顧客穿搭分享與最新設計靈感！
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/raccoonlinlin/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-warm-border bg-amber-50/10 hover:bg-pink-50/50 hover:border-pink-200 transition-all active:scale-95 group text-left cursor-pointer"
            id="link-social-ig"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs md:text-sm text-[#333]">Instagram</h4>
              <p className="text-[10px] text-slate-400 font-sans truncate">@raccoonlinlin</p>
            </div>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@Raccoonlinlin%E6%B5%A3%E7%86%8A%E7%90%B3%E7%90%B3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-warm-border bg-amber-50/10 hover:bg-red-50/50 hover:border-red-200 transition-all active:scale-95 group text-left cursor-pointer"
            id="link-social-yt"
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform shrink-0">
              <Youtube className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs md:text-sm text-[#333]">YouTube</h4>
              <p className="text-[10px] text-slate-400 font-sans truncate">浣熊琳琳頻道</p>
            </div>
          </a>

          {/* Pinterest */}
          <a
            href="https://www.pinterest.com/raccoonlinlin/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-warm-border bg-amber-50/10 hover:bg-rose-50/50 hover:border-rose-200 transition-all active:scale-95 group text-left cursor-pointer"
            id="link-social-pin"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-600/10 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform shrink-0">
              <Pin className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs md:text-sm text-[#333]">Pinterest</h4>
              <p className="text-[10px] text-slate-400 font-sans truncate">手作設計靈感</p>
            </div>
          </a>

          {/* Threads */}
          <a
            href="https://www.threads.net/@raccoonlinlin?xmt=AQG0PxQLxsT58iGdSlkL083vLjKuejb7DpyCPvpURXVGvi8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-warm-border bg-amber-50/10 hover:bg-slate-100/50 hover:border-slate-300 transition-all active:scale-95 group text-left cursor-pointer"
            id="link-social-threads"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900/10 flex items-center justify-center text-slate-800 group-hover:scale-110 transition-transform shrink-0">
              <AtSign className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-xs md:text-sm text-[#333]">Threads</h4>
              <p className="text-[10px] text-slate-400 font-sans truncate">日常生活點滴</p>
            </div>
          </a>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-4" id="sec-trust-badges">
        {[
          { title: '匠人全程純手作', desc: '不經機器批量，精工編織' },
          { title: '客製色彩能量', desc: '12色對應心靈特質，專屬定製' },
          { title: '頂級環保棉線', desc: '親膚耐磨，手感紮實不掉色' },
          { title: '台灣安心寄送', desc: '精緻防塵袋包裝，送禮首選' }
        ].map((badge, index) => (
          <div key={index} className="p-4 rounded-2xl border border-warm-border bg-white soft-shadow">
            <h4 className="font-serif font-bold text-sm text-[#333] mb-1">{badge.title}</h4>
            <p className="text-[11px] text-slate-400 font-sans">{badge.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
