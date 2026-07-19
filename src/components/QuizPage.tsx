/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LANYARD_QUIZ_QUESTIONS,
  PAW_QUIZ_QUESTIONS,
  HEART_QUIZ_QUESTIONS,
  COLORS,
  PERSONALITY_MAP,
  PRODUCTS,
} from '../data';
import { ProductPreview } from './ProductPreview';
import { Sparkles, ArrowRight, RotateCcw, ShoppingCart, Sliders, ChevronLeft, Heart, Layers, HelpCircle } from 'lucide-react';
import { Product } from '../types';

interface QuizPageProps {
  initialCategory?: string | null;
  onDirectPurchaseClick: (product: Product, colors: string[], quantity: number, source: string) => void;
  onNavigateToCustomEditor: (category: string, colors: string[]) => void;
  onRecordQuizCompletion: (category: string, colors: string[]) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  initialCategory = null,
  onDirectPurchaseClick,
  onNavigateToCustomEditor,
  onRecordQuizCompletion,
}) => {
  const getNormalizedCategory = (cat: string | null | undefined): string | null => {
    if (!cat) return null;
    const validCategories = [
      'v_lanyard_single',
      'spiral_lanyard_single',
      'v_lanyard_multi',
      'spiral_lanyard_multi',
      'paw',
      'heart'
    ];
    if (validCategories.includes(cat)) {
      return cat;
    }
    if (cat.includes('lanyard')) return 'v_lanyard_multi';
    if (cat === 'paw') return 'paw';
    if (cat === 'heart') return 'heart';
    return null;
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(getNormalizedCategory(initialCategory));

  useEffect(() => {
    setSelectedCategory(getNormalizedCategory(initialCategory));
    setCurrentQuestionIdx(0);
    setScores({});
    setQuizFinished(false);
    setQuizResult(null);
  }, [initialCategory]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [scores, setScores] = useState<{ [colorName: string]: number }>({});
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<{
    colors: string[];
    primaryColor: string;
    personalityTitle: string;
    personalityDesc: string;
    luckyMatch: string;
    styleAdvice: string;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory, currentQuestionIdx, quizFinished]);

  // Get active questions based on category
  const getQuestions = () => {
    if (!selectedCategory) return LANYARD_QUIZ_QUESTIONS;
    if (selectedCategory.includes('lanyard')) return LANYARD_QUIZ_QUESTIONS;
    if (selectedCategory === 'paw') return PAW_QUIZ_QUESTIONS;
    return HEART_QUIZ_QUESTIONS;
  };

  const questions = getQuestions();

  // Reset quiz
  const handleReset = () => {
    setSelectedCategory(null);
    setCurrentQuestionIdx(0);
    setScores({});
    setQuizFinished(false);
    setQuizResult(null);
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setCurrentQuestionIdx(0);
    setScores({});
    setQuizFinished(false);
    setQuizResult(null);
  };

  // Handle option click
  const handleSelectOption = (weights: { [colorName: string]: number }) => {
    // Accumulate scores
    const newScores = { ...scores };
    Object.entries(weights).forEach(([color, weight]) => {
      newScores[color] = (newScores[color] || 0) + weight;
    });
    setScores(newScores);

    // Proceed or calculate result
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      calculateResult(newScores);
    }
  };

  // Calculate top colors based on category requirements
  const calculateResult = (finalScores: { [colorName: string]: number }) => {
    // Sort colors by accumulated score desc
    const sortedColors = Object.entries(finalScores)
      .sort((a, b) => b[1] - a[1])
      .map(([colorName]) => colorName);

    // Filter to make sure only colors in our predefined list are chosen
    const validSortedColors = sortedColors.filter(name => COLORS.some(c => c.name === name));
    
    // Fill up to 3 colors if empty using defaults
    const fallbackColors = ['淺粉', '淺紫', '黃色', '墨綠色', '紅色', '深藍色'];
    while (validSortedColors.length < 3) {
      const nextFallback = fallbackColors.find(c => !validSortedColors.includes(c));
      if (nextFallback) {
        validSortedColors.push(nextFallback);
      } else {
        break;
      }
    }

    const primaryColor = validSortedColors[0];
    const matchingProduct = PRODUCTS.find(p => p.category === selectedCategory);
    const maxColors = matchingProduct ? matchingProduct.maxColors : 1;

    // Determine how many colors needed & beautifully pair them up ("並且幫他們搭配好")
    let outputColors: string[] = [];
    if (maxColors === 1) {
      outputColors = [primaryColor];
    } else {
      // Multi-color palette compatibility map
      const COLOR_PALETTES: { [key: string]: string[] } = {
        '紅色': ['深咖', '灰色', '黑色'],
        '黑色': ['黃色', '淺粉', '灰色'],
        '深藍色': ['橘色', '淺咖', '灰色'],
        '墨綠色': ['淺粉', '深粉', '淺咖'],
        '黃色': ['黑色', '深藍色', '淺紫'],
        '橘色': ['深藍色', '灰色', '淺咖'],
        '灰色': ['深粉', '紅色', '黑色'],
        '深粉': ['墨綠色', '黑色', '淺粉'],
        '淺粉': ['深咖', '淺紫', '黃色'],
        '深咖': ['紅色', '淺粉', '淺咖'],
        '淺咖': ['深藍色', '淺紫', '灰色'],
        '淺紫': ['淺粉', '黃色', '灰色'],
      };

      const compatibles = COLOR_PALETTES[primaryColor] || ['灰色', '淺粉', '黃色'];
      const palette = [primaryColor];

      // 1. Try to pick from user's other high-score colors that are also compatible
      const compatibleSorted = validSortedColors.filter(c => c !== primaryColor && compatibles.includes(c));
      // 2. Try to pick from rest of compatibles
      const otherCompatibles = compatibles.filter(c => !palette.includes(c));
      // 3. Fallback to other high-score colors
      const otherSorted = validSortedColors.filter(c => !palette.includes(c));

      const candidates = [...compatibleSorted, ...otherCompatibles, ...otherSorted];
      for (const cand of candidates) {
        if (palette.length < maxColors && !palette.includes(cand)) {
          palette.push(cand);
        }
      }

      // Ensure full palette
      while (palette.length < maxColors) {
        const fb = fallbackColors.find(c => !palette.includes(c));
        if (fb) palette.push(fb);
        else break;
      }

      outputColors = palette;
    }

    const details = PERSONALITY_MAP[primaryColor] || {
      description: '溫和善良的「平衡行者」',
      partner: '契合搭配【灰色】',
      style: '自然舒適風',
      detail: '你是一個沉著、理智且喜愛美好手作物的人。'
    };

    setQuizResult({
      colors: outputColors,
      primaryColor,
      personalityTitle: details.description,
      personalityDesc: details.detail,
      luckyMatch: details.partner,
      styleAdvice: details.style,
    });

    setQuizFinished(true);

    if (selectedCategory) {
      onRecordQuizCompletion(selectedCategory, outputColors);
    }
  };

  // Find related product info
  const relatedProduct = PRODUCTS.find(p => p.category === selectedCategory) || PRODUCTS[0];

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8" id="quiz-page-container">
      {/* 1. Category Selection Screen */}
      {!selectedCategory && (
        <div className="space-y-8 text-center animate-fade-in" id="quiz-category-select">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-olive/10 rounded-full text-warm-olive">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-4.5xl font-serif text-[#333] tracking-tight">
              命定色彩測驗
            </h1>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">
              SELECT YOUR JOURNEY / 選擇您想測驗的商品種類。我們將透過互動情境探索您的色彩氣場，為您量身推薦最契合日常的手編設計。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              {
                category: 'spiral_lanyard_multi',
                name: '螺旋手機掛繩 (多色)',
                description: '繽紛條紋與 3D 立體旋轉美學，色彩互補，呈現活潑絢麗的能量搭配。',
                colorLimit: '命定 3 色拼配測驗',
                icon: <Layers className="w-5 h-5" />,
              },
              {
                category: 'v_lanyard_multi',
                name: 'V字手機掛繩 (多色)',
                description: '經典 V 字編法交錯編織，色彩層次分明，展現精湛手藝的繽紛之選。',
                colorLimit: '命定 3 色拼配測驗',
                icon: <Sparkles className="w-5 h-5" />,
              },
              {
                category: 'paw',
                name: '狗掌吊飾 (拼色)',
                description: '超療癒立體狗掌編織吊飾，指爪與掌心配色可自由定製。',
                colorLimit: '命定雙色漸層測驗',
                icon: <Heart className="w-5 h-5 fill-current" />,
              },
              {
                category: 'v_lanyard_single',
                name: 'V字手機掛繩 (單色)',
                description: '單一純色經典編法，厚實紮實且親膚耐磨，呈現極簡俐落的工藝美感。',
                colorLimit: '命定單色限定測驗',
                icon: <Sliders className="w-5 h-5" />,
              },
              {
                category: 'spiral_lanyard_single',
                name: '螺旋手機掛繩 (單色)',
                description: '流暢旋轉弧度搭配純色編法，層次立體分明，手感豐厚。',
                colorLimit: '命定單色限定測驗',
                icon: <RotateCcw className="w-5 h-5" />,
              },
              {
                category: 'heart',
                name: '愛心吊飾 (單色)',
                description: '經典溫潤手鈎編織愛心，單一純色傳達最簡單溫厚的守護與陪伴。',
                colorLimit: '命定單色限定測驗',
                icon: <Heart className="w-5 h-5" />,
              }
            ].map((opt) => {
              return (
                <div
                  key={opt.category}
                  onClick={() => handleSelectCategory(opt.category)}
                  className="group relative bg-white border border-warm-border rounded-[32px] p-6 text-left hover:border-warm-olive hover:shadow-xl active:scale-[0.98] active:border-warm-olive/80 transition-all duration-300 cursor-pointer flex flex-col justify-between h-80 card-hover"
                  id={`card-quiz-choice-${opt.category}`}
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 bg-warm-beige-light text-warm-olive rounded-full flex items-center justify-center group-hover:bg-warm-olive group-hover:text-white transition-colors">
                      {opt.icon}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-[#333] group-hover:text-warm-olive transition-colors leading-tight">
                        {opt.name}
                      </h3>
                      <p className="text-warm-clay text-[11px] font-mono mt-1 font-semibold uppercase tracking-wider">
                        {opt.colorLimit}
                      </p>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans font-light">
                      {opt.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-bold text-[#666] group-hover:text-warm-olive pt-4 border-t border-warm-border/50">
                    <span>開始命定色分析</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-warm-olive" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-warm-beige-light/50 rounded-2xl max-w-lg mx-auto text-center border border-warm-border">
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              💡 <strong>測驗小祕密</strong>：分析結果將根據您的靈魂本色自動推薦一組專屬拼色組合，並可一鍵帶走此配色商品，直接定製最契合您的幸運配飾。
            </p>
          </div>
        </div>
      )}

      {/* 2. Active Quiz Questions Screen */}
      {selectedCategory && !quizFinished && (
        <div className="space-y-6 max-w-2xl mx-auto" id="quiz-active-questions">
          {/* Top Back/Progress Indicator */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-warm-olive transition-colors cursor-pointer font-medium"
            >
              <ChevronLeft className="w-4 h-4" />
              重新選擇測驗
            </button>
            <span className="text-xs font-mono text-warm-clay bg-warm-beige-light px-2.5 py-1 rounded-full font-semibold border border-warm-border/50">
              {relatedProduct?.name.replace(/【.*?】/, '')} ‧ Q {currentQuestionIdx + 1}/{questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-warm-border/50 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-warm-olive h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question text */}
          <div className="bg-warm-beige-light/40 rounded-[24px] p-6 border border-warm-border">
            <h2 className="text-xl md:text-2xl font-serif font-semibold text-[#333] leading-relaxed flex items-start gap-2.5">
              <HelpCircle className="w-6 h-6 text-warm-olive shrink-0 mt-0.5" />
              {questions[currentQuestionIdx].text}
            </h2>
          </div>

          {/* Options grid */}
          <div className="space-y-3">
            {questions[currentQuestionIdx].options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(opt.weights)}
                className="w-full text-left bg-white hover:bg-warm-beige-light/40 border border-warm-border hover:border-warm-olive rounded-2xl p-5 font-medium text-sm md:text-base text-slate-700 hover:text-[#333] transition-all cursor-pointer shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] active:bg-warm-beige-light/75 active:border-warm-olive/80"
                id={`btn-quiz-option-${currentQuestionIdx}-${oIdx}`}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Quiz Result Screen (Emotional / Interactive Ecommerce Conversion) */}
      {quizFinished && quizResult && relatedProduct && (
        <div className="space-y-8 animate-fade-in" id="quiz-result-screen">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs text-warm-olive font-bold tracking-wider uppercase bg-warm-beige-light px-3 py-1.5 rounded-full border border-warm-border/40">
              <Sparkles className="w-3.5 h-3.5 text-warm-olive" />
              專屬色彩特質分析結果
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic text-warm-olive leading-tight">
              {quizResult.personalityTitle}
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mx-auto">
              根據你在【{relatedProduct.name.replace(/【.*?】/, '')}測驗】中的心靈氣場對話，以下色彩是最契合你當下靈魂頻率的命定配色：
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Dynamic Visual Craft Preview */}
            <div className="lg:col-span-5 flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-md w-full flex flex-col items-center">
                <div className="p-4 bg-warm-beige-light/20 rounded-2xl w-full flex justify-center">
                  <ProductPreview
                    category={relatedProduct.category}
                    selectedColors={quizResult.colors}
                    size="xl"
                    showPhoto={true}
                    imageUrl={relatedProduct.imageUrl}
                  />
                </div>
                
                {/* Custom Color Chip Legends */}
                <div className="mt-6 w-full space-y-3 border-t border-warm-border/50 pt-4">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest text-center">
                    RECOMMENDED PALETTE / 推薦配色組合
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {quizResult.colors.map((colorName, idx) => {
                      const cObj = COLORS.find(c => c.name === colorName);
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-warm-beige-light px-3 py-1.5 rounded-full border border-warm-border/40"
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-white shadow-xs"
                            style={{ backgroundColor: cObj?.hex || '#ccc' }}
                          />
                          <span className="text-xs font-semibold text-slate-700">
                            {colorName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Spiritual / Personality Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              {/* Detailed description card */}
              <div className="bg-white p-6 rounded-[32px] border border-warm-border shadow-xs space-y-5">
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl text-[#333] flex items-center gap-2.5">
                    <span className="w-1.5 h-5 bg-warm-clay rounded-full" />
                    靈魂本色解析
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-4 font-light">
                    {quizResult.personalityDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3.5 border-t border-warm-border/50">
                  <div className="space-y-1 pl-4">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      心靈相吸 (契合搭配)
                    </h4>
                    <p className="text-sm font-semibold text-warm-olive font-serif italic">
                      {quizResult.luckyMatch}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      命定幸運色
                    </h4>
                    <p className="text-sm font-semibold text-warm-clay font-serif italic">
                      {quizResult.colors.join(' ‧ ')}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-3.5 border-t border-warm-border/50 pl-4">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    日常美學與搭配建議
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">
                    {quizResult.styleAdvice}
                  </p>
                </div>
              </div>

              {/* Conversion Actions Box */}
              <div className="bg-warm-beige-light/70 p-6 rounded-[32px] border border-warm-border space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#333]">
                      客製化：靈魂本色系列
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-light">
                      我們將根據此測驗的配色結果（{quizResult.colors.join('、')}），由職人純手工細緻編織出您的專屬商品。
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-slate-400 line-through block font-mono">NT$ {Math.round(relatedProduct.basePrice * 1.1)}</span>
                    <span className="text-2xl font-serif font-bold text-warm-olive">NT$ {relatedProduct.basePrice}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      onDirectPurchaseClick(relatedProduct, quizResult.colors, 1, '命定色測驗');
                    }}
                    className="w-full py-3 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold rounded-full text-center shadow-md cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95"
                    id="btn-result-add-to-cart"
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                    直接購買 (前往賣貨便)
                  </button>
                  <button
                    onClick={() => onNavigateToCustomEditor(relatedProduct.category, quizResult.colors)}
                    className="w-full py-3 bg-white hover:bg-warm-beige-light text-warm-olive border border-warm-border font-bold rounded-full text-center cursor-pointer transition-all flex items-center justify-center gap-2 active:scale-95"
                    id="btn-result-adjust-colors"
                  >
                    <Sliders className="w-4 h-4" />
                    微調配色 / 細節定製
                  </button>
                </div>
              </div>

              {/* Reset Quiz Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-warm-olive cursor-pointer transition-colors px-5 py-2.5 bg-white border border-warm-border rounded-full hover:border-warm-olive shadow-xs"
                  id="btn-retake-quiz"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-warm-olive" />
                  重新開啟命定色彩旅程
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
