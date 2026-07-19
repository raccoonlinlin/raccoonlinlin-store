/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRODUCTS, COLORS } from '../data';
import { ProductPreview } from './ProductPreview';
import { Product } from '../types';
import { WeddingContactModal } from './WeddingContactModal';
import { ShoppingCart, Check, HelpCircle, ArrowLeft, Plus, Minus, Tag, Star, Eye, Heart, Sparkles } from 'lucide-react';

interface ShopPageProps {
  quizRecommendation: { category: string; colors: string[] } | null;
  onDirectPurchaseClick: (product: Product, colors: string[], quantity: number, source: string) => void;
  // If user selected colors from the quiz, pre-populate them in the editor
  preSelectedColors: string[] | null;
  preSelectedCategory: string | null;
  onClearPreSelected: () => void;
}

const isCustomizable = (category: string): boolean => {
  return [
    'v_lanyard_single',
    'spiral_lanyard_single',
    'v_lanyard_multi',
    'spiral_lanyard_multi',
    'paw',
    'heart'
  ].includes(category);
};

const LOVE_BLESSINGS: Record<string, { meaning: string; luckySymbol: string }> = {
  '紅色': {
    meaning: '熱烈真摯的愛，為戀情注入源源不絕的活力與熱情，代表著毫無保留的真心與熱戀期般的甜蜜蜜',
    luckySymbol: '愛情升溫、熱戀長久、真愛永恆'
  },
  '黑色': {
    meaning: '沉穩堅定、忠貞不渝的愛，象徵彼此間無可替代的默契與永恆的守護，能擋掉感情中的所有紛擾',
    luckySymbol: '守護真愛、忠貞不二、情比金堅'
  },
  '深藍色': {
    meaning: '沉靜理智、細水長流的溫柔，象徵彼此深信不疑的相知默契，陪伴彼此在平穩溫暖的時光中前行',
    luckySymbol: '互信互諒、細水長流、心靈契合'
  },
  '墨綠色': {
    meaning: '自然舒心、彼此療癒的靈魂伴侶，象徵在愛中自在放鬆做自己，在理解與平安中一同幸福成長',
    luckySymbol: '靈魂契合、溫暖陪伴、生生不息'
  },
  '黃色': {
    meaning: '溫慢明亮、充滿歡笑與正能量的戀情，像煦煦陽光般照亮彼此的心房，是生活中最快樂的依靠',
    luckySymbol: '開心果伴侶、幸福暖陽、正緣相引'
  },
  '橘色': {
    meaning: '熱情洋溢、朝氣蓬勃的甜蜜祝福，象徵兩人世界充滿新奇有趣的靈感，點亮戀愛中的每個精彩瞬間',
    luckySymbol: '甜蜜驚喜、幸福滿格、熱戀升溫'
  },
  '灰色': {
    meaning: '包容理解、知性契合的平靜愛戀，不張揚卻無處不在，代表相互包容、溫和理性的最佳和諧生活感',
    luckySymbol: '相知相惜、包容默契、感情平穩'
  },
  '深粉': {
    meaning: '心動滿載、電力十足的極致浪漫！桃花魅力大爆發，象徵兩人之間無法抗拒的強烈吸引力與悸動',
    luckySymbol: '桃花爆表、熱烈心動、情有獨鍾'
  },
  '淺粉': {
    meaning: '溫柔甜美、純真無邪的戀愛祝福，象徵初戀般的溫柔悸動與棉花糖般輕柔浪漫的真誠守護',
    luckySymbol: '甜蜜初戀、粉色溫柔、幸福常伴'
  },
  '深咖': {
    meaning: '安穩踏實、復古恆久的堅定承諾，如同大地般沉穩可靠，給予這份感情最深沉安定的安全感',
    luckySymbol: '攜手白頭、安穩成家、愛情長跑'
  },
  '淺咖': {
    meaning: '慵懶愜意、奶茶般暖心的溫馨陪伴，享受日常相處的簡單小確幸，讓愛在平淡中散發出香醇甘甜',
    luckySymbol: '溫馨相伴、歲月靜好、浪漫日常'
  },
  '淺紫': {
    meaning: '優雅夢幻、富含心靈美感的心電感應，像薰衣草般浪漫高貴，增強彼此的愛意契合與浪漫貴人運',
    luckySymbol: '心有靈犀、浪漫氛圍、天作之合'
  },
};

export const ShopPage: React.FC<ShopPageProps> = ({
  quizRecommendation,
  onDirectPurchaseClick,
  preSelectedColors,
  preSelectedCategory,
  onClearPreSelected,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentCustomColors, setCurrentCustomColors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeSlot, setActiveSlot] = useState<number>(0);
  const [filterRecommendedOnly, setFilterRecommendedOnly] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<'photo' | 'svg'>('photo');
  const [isWeddingModalOpen, setIsWeddingModalOpen] = useState<boolean>(false);

  // Auto-open product detail if navigated from quiz or preset
  useEffect(() => {
    if (preSelectedCategory) {
      const prod = PRODUCTS.find(p => p.category === preSelectedCategory);
      if (prod) {
        setSelectedProduct(prod);
        setPreviewMode('photo');
        if (preSelectedColors && preSelectedColors.length > 0) {
          // ensure color count fits limits
          const slicedColors = preSelectedColors.slice(0, prod.maxColors);
          setCurrentCustomColors(slicedColors);
        } else {
          setCurrentCustomColors(prod.defaultColors);
        }
        setQuantity(1);
        setActiveSlot(0);
      }
    }
  }, [preSelectedCategory, preSelectedColors]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct, filterRecommendedOnly]);

  const handleOpenProduct = (product: Product) => {
    onClearPreSelected();
    setSelectedProduct(product);
    setPreviewMode('photo');
    
    // Check if there's a quiz recommendation for this category
    if (quizRecommendation && quizRecommendation.category === product.category) {
      setCurrentCustomColors(quizRecommendation.colors);
    } else {
      setCurrentCustomColors(product.defaultColors);
    }
    
    setQuantity(1);
    setActiveSlot(0);

    // Scroll to top of the page so they can slide/scroll down to choose
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
    onClearPreSelected();
  };

  // Color slot assignment
  const handleSelectColorForSlot = (colorName: string) => {
    if (!selectedProduct) return;
    
    const newColors = [...currentCustomColors];
    
    // Fill slot
    newColors[activeSlot] = colorName;
    
    // Clean up any empty items or length constraints
    const finalColors = newColors.slice(0, selectedProduct.maxColors);
    
    // Ensure we don't have fewer colors than minColors
    while (finalColors.length < selectedProduct.minColors) {
      finalColors.push(COLORS[0].name);
    }

    setCurrentCustomColors(finalColors);

    // Auto-advance slot if not last
    if (activeSlot < selectedProduct.maxColors - 1) {
      setActiveSlot(prev => prev + 1);
    }
  };

  // Get filtered products
  const filteredProducts = PRODUCTS.filter(prod => {
    if (filterRecommendedOnly && quizRecommendation) {
      const isPawOrHeart = prod.category === 'paw' || prod.category === 'heart';
      if (quizRecommendation.category === 'lanyard') {
        return prod.category.includes('lanyard') || isPawOrHeart;
      }
      return prod.category === quizRecommendation.category || isPawOrHeart;
    }
    return true;
  });

  return (
    <div className="space-y-10 py-4" id="shop-page-container">
      {/* 1. Catalog View */}
      {!selectedProduct && (
        <div className="space-y-8 animate-fade-in" id="shop-catalog-view">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-warm-border pb-6">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-serif text-[#333] tracking-tight">
                手作編織商品
              </h1>
              <p className="text-slate-500 text-sm font-sans font-light">
                挑選您喜愛的手感織物，自由客製拼配 12 種能量色彩，由職人為您一針一線專屬編織。
              </p>
            </div>

            {/* Filter Toggle for Quiz Recommendation */}
            {quizRecommendation && (
              <div className="flex items-center">
                <button
                  onClick={() => setFilterRecommendedOnly(prev => !prev)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold border cursor-pointer transition-all flex items-center gap-2 ${
                    filterRecommendedOnly
                      ? 'bg-warm-olive border-warm-olive text-white shadow-md hover:bg-warm-olive-dark'
                      : 'bg-white border-warm-border text-slate-700 hover:border-warm-olive hover:text-warm-olive'
                  }`}
                  id="btn-filter-recommended"
                >
                  <Star className={`w-4 h-4 ${filterRecommendedOnly ? 'fill-current' : ''}`} />
                  {filterRecommendedOnly ? '顯示全部商品' : '僅顯示命定推薦商品'}
                </button>
              </div>
            )}
          </div>

          {/* Special Recommendation Banner */}
          {quizRecommendation && !filterRecommendedOnly && (
            <div className="bg-warm-beige-light/80 p-5 rounded-[32px] border border-warm-border flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-warm-olive/10 text-warm-olive shrink-0">
                  <Star className="h-5 w-5 fill-current animate-pulse" />
                </span>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#333]">
                    命定配色推薦就緒！
                  </h4>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    您剛剛測驗出適合您的【{quizRecommendation.category === 'lanyard' ? '手腕掛繩' : quizRecommendation.category === 'paw' ? '狗掌吊飾' : '愛心吊飾'}】專屬配色為：
                    <strong className="text-warm-olive ml-1">{quizRecommendation.colors.join(' ‧ ')}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const p = PRODUCTS.find(prod => prod.category === quizRecommendation.category);
                  if (p) handleOpenProduct(p);
                }}
                className="px-5 py-2 bg-warm-olive hover:bg-warm-olive-dark text-white text-xs font-bold rounded-full cursor-pointer transition-all"
                id="btn-open-recommended-product"
              >
                立即開啟定製
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => {
              const isRecommended = quizRecommendation
                ? (prod.category === 'paw' || prod.category === 'heart' || (quizRecommendation.category === 'lanyard'
                    ? prod.category.includes('lanyard')
                    : prod.category === quizRecommendation.category))
                : false;
              
              return (
                <div
                  key={prod.id}
                  className={`group bg-white rounded-[32px] border transition-all duration-300 p-6 flex flex-col justify-between card-hover ${
                    isRecommended
                      ? 'border-warm-olive/80 shadow-md ring-1 ring-warm-olive/15'
                      : 'border-warm-border shadow-xs'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Visual Preview */}
                    <div className="flex justify-center relative overflow-hidden rounded-2xl bg-warm-beige-light/30 p-4">
                      <ProductPreview
                        category={prod.category}
                        selectedColors={isRecommended ? quizRecommendation.colors : prod.defaultColors}
                        size="lg"
                        showPhoto={true}
                        imageUrl={prod.imageUrl}
                      />
                      
                      {isRecommended && (
                        <span className="absolute top-3 left-3 bg-warm-olive text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-white" />
                          命定推薦
                        </span>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-serif font-bold text-2xl text-[#333] tracking-tight">
                          {prod.name}
                        </h3>
                        <span className="text-warm-olive font-serif font-semibold text-lg whitespace-nowrap">
                          {prod.basePrice === 0 ? '專屬報價' : `NT$ ${prod.basePrice}`}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans font-light">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-warm-border/50 mt-6 grid grid-cols-1 gap-2">
                    {prod.category === 'wedding' ? (
                      <button
                        onClick={() => handleOpenProduct(prod)}
                        className="w-full py-3 bg-warm-olive hover:bg-warm-olive-dark active:scale-95 text-white font-bold text-xs rounded-full text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        id={`btn-view-wedding-${prod.id}`}
                      >
                        <Eye className="w-4 h-4" />
                        進入了解
                      </button>
                    ) : isCustomizable(prod.category) ? (
                      <button
                        onClick={() => handleOpenProduct(prod)}
                        className="w-full py-3 bg-warm-olive hover:bg-warm-olive-dark active:scale-95 text-white font-bold text-xs rounded-full text-center cursor-pointer transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        id={`btn-view-customizer-${prod.id}`}
                      >
                        <Eye className="w-4 h-4" />
                        客製配色與購買
                      </button>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => {
                            onDirectPurchaseClick(prod, prod.defaultColors, 1, '線上選購');
                          }}
                          className="flex-1 py-3 bg-warm-olive hover:bg-warm-olive-dark active:scale-95 text-white font-bold text-xs rounded-full text-center cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm animate-pulse"
                          id={`btn-direct-buy-${prod.id}`}
                        >
                          <Sparkles className="w-4 h-4 text-white" />
                          直接購買
                        </button>
                        <button
                          onClick={() => handleOpenProduct(prod)}
                          className="flex-1 py-3 bg-white border border-warm-border hover:bg-warm-beige-light/50 active:scale-95 text-slate-700 font-bold text-xs rounded-full text-center cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm"
                          id={`btn-view-detail-${prod.id}`}
                        >
                          <Eye className="w-4 h-4 text-slate-500" />
                          查看細節
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Customizer / Detail View */}
      {selectedProduct && (
        <div className="space-y-6 animate-fade-in" id="shop-customizer-view">
          {/* Back button */}
          <button
            onClick={handleCloseProduct}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-warm-olive transition-colors cursor-pointer border border-warm-border rounded-full px-4 py-2 bg-white font-medium"
            id="btn-back-to-catalog"
          >
            <ArrowLeft className="w-4 h-4" />
            返回商品目錄
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Big Interactive Customizer Preview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-md flex flex-col items-center">
                <div className="p-4 bg-warm-beige-light/20 rounded-2xl w-full flex flex-col items-center relative">
                  {/* Mode Selector Toggle */}
                  {isCustomizable(selectedProduct.category) && (
                    <div className="flex bg-warm-beige-light/60 border border-warm-border/50 rounded-full p-1 shadow-xs mb-4 z-10 w-full justify-center">
                      <button
                        type="button"
                        onClick={() => setPreviewMode('photo')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                          previewMode === 'photo'
                            ? 'bg-warm-olive text-white shadow-sm'
                            : 'text-slate-500 hover:text-warm-olive'
                        }`}
                      >
                        實物照片
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewMode('svg')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                          previewMode === 'svg'
                            ? 'bg-warm-olive text-white shadow-sm'
                            : 'text-slate-500 hover:text-warm-olive'
                        }`}
                      >
                        3D配色模擬
                      </button>
                    </div>
                  )}

                  <ProductPreview
                    category={selectedProduct.category}
                    selectedColors={currentCustomColors}
                    size="xl"
                    showPhoto={previewMode === 'photo'}
                    imageUrl={selectedProduct.imageUrl}
                  />
                </div>

                {/* Slots Color Swatch Indicators */}
                {isCustomizable(selectedProduct.category) && selectedProduct.maxColors > 1 && (
                  <div className="mt-6 w-full space-y-2">
                    <div className="text-[10px] text-slate-400 font-semibold text-center uppercase tracking-widest">
                      SELECT SECTION / 點選下方色槽變更顏色
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: selectedProduct.maxColors }).map((_, slotIdx) => {
                        const colorName = currentCustomColors[slotIdx] || '未選擇';
                        const colorObj = COLORS.find(c => c.name === colorName);
                        const isCurrentSlot = activeSlot === slotIdx;

                        return (
                          <button
                            key={slotIdx}
                            onClick={() => setActiveSlot(slotIdx)}
                            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 active:scale-95 ${
                              isCurrentSlot
                                ? 'border-warm-olive bg-warm-olive/10 shadow-xs'
                                : 'border-warm-border bg-warm-beige-light/20 hover:border-warm-olive hover:bg-white'
                            }`}
                            id={`btn-color-slot-${slotIdx}`}
                          >
                            <span className="text-[9px] text-slate-400 font-medium font-sans">
                              {slotIdx === 0 ? '主編織色' : slotIdx === 1 ? '副編織色' : '綴飾配色'}
                            </span>
                            <div className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-white"
                                style={{ backgroundColor: colorObj?.hex || '#D1D5DB' }}
                              />
                              <span className="text-[11px] font-bold text-slate-700">
                                {colorName}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Style customization controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Product Intro info */}
              <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-xs space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-warm-olive/10 text-warm-olive text-[9px] font-bold rounded-full uppercase tracking-widest">
                      100% HANDMADE
                    </span>
                    <span className="text-xs text-warm-clay font-serif italic">純手工針織物</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#2C3E2D] tracking-tight leading-tight border-b border-warm-border/50 pb-3" id="product-detail-big-title">
                    {selectedProduct.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-2.5xl font-serif font-bold text-warm-olive">
                      {selectedProduct.category === 'wedding' ? '專屬報價 / 私訊洽詢' : `NT$ ${selectedProduct.basePrice}`}
                    </span>
                    <span className="text-xs text-slate-500 bg-warm-beige-light px-3 py-1 rounded-full border border-warm-border/50">
                      {selectedProduct.category === 'wedding' ? '製作工時：視數量而定 (約 10-20 天)' : '製作工時：約 3-5 個工作天'}
                    </span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed font-sans font-light">
                  {selectedProduct.longDescription}
                </p>
              </div>

              {selectedProduct.category === 'wedding' ? (
                <div className="space-y-6">
                  {/* Step 1: Choose Color */}
                  <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-xs space-y-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-warm-olive/10 text-warm-olive rounded-full text-xs font-semibold">
                        <Tag className="w-3.5 h-3.5" />
                        1. 選擇顏色
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        您可以從 12 種精選的經典色系中自由選擇搭配（可選單色或複選），為每一款婚禮小物賦予專屬的心靈色彩特質。下方提供 12 色美學涵義，點擊色塊探索色彩背後的幸福寓意！
                      </p>
                    </div>

                    {/* Color Swatches Grid */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                      {COLORS.map((color) => {
                        const isSelectedInSlot = currentCustomColors[0] === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={() => handleSelectColorForSlot(color.name)}
                            className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                              isSelectedInSlot
                                ? 'border-warm-olive bg-warm-olive/5 shadow-xs ring-1 ring-warm-olive/15'
                                : 'border-warm-border bg-warm-beige-light/10 hover:border-warm-olive hover:bg-white'
                            }`}
                            id={`btn-select-color-${color.name}`}
                          >
                            <span
                              className="w-6 h-6 rounded-full border border-white/60 shadow-inner flex items-center justify-center text-white"
                              style={{ backgroundColor: color.hex }}
                            >
                              {isSelectedInSlot && <Check className="w-4 h-4 stroke-[3px]" />}
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              {color.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Emotional Value */}
                    {currentCustomColors[0] && (
                      <div className="p-3.5 bg-warm-beige-light/50 rounded-2xl border border-warm-border/50 text-xs leading-relaxed space-y-1 animate-fade-in font-sans">
                        <div className="font-semibold text-warm-olive flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-warm-clay" />
                          色彩能量與婚禮寓意：【{currentCustomColors[0]}】
                        </div>
                        <p className="text-slate-500 pl-5 font-light leading-relaxed">
                          代表寓意：<strong>{COLORS.find(c => c.name === currentCustomColors[0])?.meaning}</strong>。
                          幸福密碼：<strong>{COLORS.find(c => c.name === currentCustomColors[0])?.luckySymbol}</strong>。
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Choose Backing Card */}
                  <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-xs space-y-4">
                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-semibold border border-rose-100">
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        2. 選擇背卡
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        我們提供精心設計的婚禮公版背卡（無須加價），以及客製化專屬背卡服務（可加價印製新郎新娘姓名、婚期或專屬 Logo）。背卡採用質感象牙卡纸，讓這份手工織品禮物更具質感與紀念意義。
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal Customizable Color selection */
                isCustomizable(selectedProduct.category) && (
                  <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif font-semibold text-sm text-[#333] uppercase tracking-wider">
                        選擇編織色彩 ({currentCustomColors[activeSlot] ? `修改第 ${activeSlot + 1} 色：${currentCustomColors[activeSlot]}` : '選擇配色'})
                      </h3>
                      <span className="text-[10px] text-warm-olive font-bold bg-warm-olive/10 px-2.5 py-1 rounded-full">
                        12色氣場美學
                      </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {COLORS.map((color) => {
                        // Check if this color is currently active in the selected slot
                        const isSelectedInSlot = currentCustomColors[activeSlot] === color.name;
                        
                        return (
                          <button
                            key={color.name}
                            onClick={() => handleSelectColorForSlot(color.name)}
                            className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                              isSelectedInSlot
                                ? 'border-warm-olive bg-warm-olive/5 shadow-xs ring-1 ring-warm-olive/15'
                                : 'border-warm-border bg-warm-beige-light/10 hover:border-warm-olive hover:bg-white'
                            }`}
                            id={`btn-select-color-${color.name}`}
                          >
                            <span
                              className="w-6 h-6 rounded-full border border-white/60 shadow-inner flex items-center justify-center text-white"
                              style={{ backgroundColor: color.hex }}
                            >
                              {isSelectedInSlot && <Check className="w-4 h-4 stroke-[3px]" />}
                            </span>
                            <span className="text-xs font-semibold text-slate-700">
                              {color.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Emotional Value / Color Meaning Display */}
                    {currentCustomColors[activeSlot] && (
                      <div className="p-3.5 bg-warm-beige-light/50 rounded-2xl border border-warm-border/50 text-xs leading-relaxed space-y-1 animate-fade-in font-sans">
                        {selectedProduct.category === 'heart' ? (
                          <>
                            <div className="font-semibold text-rose-600 flex items-center gap-1.5">
                              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
                              愛情專屬祝福解讀：【{currentCustomColors[activeSlot]}】
                            </div>
                            <p className="text-slate-500 pl-5 font-light leading-relaxed">
                              戀愛寓意：<strong>{LOVE_BLESSINGS[currentCustomColors[activeSlot]]?.meaning || COLORS.find(c => c.name === currentCustomColors[activeSlot])?.meaning}</strong>。
                              甜蜜信物：<strong>{LOVE_BLESSINGS[currentCustomColors[activeSlot]]?.luckySymbol || COLORS.find(c => c.name === currentCustomColors[activeSlot])?.luckySymbol}</strong>。
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-warm-olive flex items-center gap-1.5">
                              <Tag className="w-3.5 h-3.5 text-warm-clay" />
                              色彩能量解讀：【{currentCustomColors[activeSlot]}】
                            </div>
                            <p className="text-slate-500 pl-5 font-light leading-relaxed">
                              寓意代表：<strong>{COLORS.find(c => c.name === currentCustomColors[activeSlot])?.meaning}</strong>。
                              幸運密碼：<strong>{COLORS.find(c => c.name === currentCustomColors[activeSlot])?.luckySymbol}</strong>。
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )
              )}

              {/* Checkout Config & Action Panel */}
              {selectedProduct.category === 'wedding' ? (
                <div className="bg-rose-50/50 p-6 rounded-[32px] border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left space-y-1">
                    <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                      💍 專屬婚禮與大宗客製諮詢
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">
                      本產品為預約接單手工客製化商品，請點擊右側填寫諮詢表單。
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWeddingModalOpen(true)}
                    className="w-full md:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-full shadow-md hover:shadow-rose-100 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                    id="btn-wedding-contact"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    與我聯繫訂製
                  </button>
                </div>
              ) : (
                <div className="bg-warm-beige-light/70 p-6 rounded-[32px] border border-warm-border space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-warm-border/60 pb-4">
                    {/* Quantity adjustments */}
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        購買數量
                      </span>
                      <div className="flex items-center border border-warm-border rounded-full bg-white overflow-hidden p-1 shadow-inner">
                        <button
                          onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                          className="p-1.5 hover:bg-warm-beige-light rounded-full text-slate-600 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-4 font-mono font-bold text-slate-800 text-sm">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(prev => prev + 1)}
                          className="p-1.5 hover:bg-warm-beige-light rounded-full text-slate-600 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase font-mono block">總計金額</span>
                      <span className="text-2.5xl font-serif font-bold text-warm-olive">
                        NT$ {selectedProduct.basePrice * quantity}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 justify-end w-full">
                    <button
                      onClick={() => {
                        onDirectPurchaseClick(selectedProduct, currentCustomColors, quantity, '線上選購');
                        handleCloseProduct();
                      }}
                      className="w-full py-4 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold rounded-full shadow-md hover:shadow-warm-olive/15 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all flex items-center justify-center gap-2.5 text-sm"
                      id="btn-direct-buy-myship"
                    >
                      <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
                      確認配色並前往 7-11 賣貨便下單
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <WeddingContactModal
        isOpen={isWeddingModalOpen}
        onClose={() => setIsWeddingModalOpen(false)}
        selectedColorName={currentCustomColors[0]}
      />
    </div>
  );
};
