/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnalyticsData, Order } from '../types';
import { COLORS } from '../data';
import { ProductPreview } from './ProductPreview';
import { ShippingLabelModal } from './ShippingLabelModal';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Sparkles, TrendingUp, DollarSign, ShoppingBag, Eye, Award, Sliders, ArrowUpRight, HelpCircle, MapPin, Phone, User, Calendar, CheckCircle, Clock } from 'lucide-react';

interface AnalyticsDashboardProps {
  data: AnalyticsData;
  orders: Order[];
  onUpdateShippingCode?: (orderId: string, code: string) => void;
  onClose: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  data,
  orders,
  onUpdateShippingCode,
  onClose,
}) => {
  const [quizEngagementRate, setQuizEngagementRate] = useState<number>(45); // simulated slider 
  const [cartConversionRate, setCartConversionRate] = useState<number>(30); // simulated slider
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);

  // Myship URL state
  const [myshipUrl, setMyshipUrl] = useState<string>(() => {
    const saved = localStorage.getItem('woven_store_myship_url');
    if (!saved || saved === 'https://myship.7-11.com.tw/' || saved === 'https://myship.7-11.com.tw/general/maintain/GM2504065791468') {
      const defaultUrl = 'https://myship.7-11.com.tw/general/detail/GM2504065791468?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPOTM2NjE5NzQzMzkyNDU5AAGnioOVZ8npnlMdgP4fCOJEjXo5yt20HcNP6x_e7oJhBN88f7anFM6wXSPJDW0_aem_RfKH1i57Zq20iJ9gIa1DMg';
      localStorage.setItem('woven_store_myship_url', defaultUrl);
      return defaultUrl;
    }
    return saved;
  });
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveMyshipUrl = () => {
    localStorage.setItem('woven_store_myship_url', myshipUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleOpenPrintModal = (order: Order) => {
    setSelectedOrderForPrint(order);
    setIsPrintModalOpen(true);
  };

  // Calculate standard conversion percentages
  const visitorToQuiz = data.visitors > 0 ? (data.quizTakers / data.visitors) * 100 : 0;
  const quizToCart = data.quizTakers > 0 ? (data.cartAdds / data.quizTakers) * 100 : 0;
  const cartToOrder = data.cartAdds > 0 ? (data.orders / data.cartAdds) * 100 : 0;
  const overallConversion = data.visitors > 0 ? (data.orders / data.visitors) * 100 : 0;

  // Prepare data for the Conversion Funnel Chart
  const funnelData = [
    { stage: '1. 全站瀏覽訪客', count: data.visitors, rate: '100%', fill: '#8C7365' },
    { stage: '2. 測驗完成人數', count: data.quizTakers, rate: `${visitorToQuiz.toFixed(1)}%`, fill: '#A3998D' },
    { stage: '3. 點擊配色微調', count: data.cartAdds, rate: `${quizToCart.toFixed(1)}%`, fill: '#5A5A40' },
    { stage: '4. 賣貨便導流數', count: data.orders, rate: `${cartToOrder.toFixed(1)}%`, fill: '#4E574B' },
  ];

  // Prepare data for Product Category Sales Pie Chart
  const productSalesData = [
    { name: '手腕掛繩', value: data.quizConversions.lanyard, color: '#5A5A40' },
    { name: '狗掌吊飾', value: data.quizConversions.paw, color: '#8C7365' },
    { name: '愛心吊飾', value: data.quizConversions.heart, color: '#C9BEB2' },
  ].filter(item => item.value > 0);

  // Fallback if pie is empty
  const displayProductSalesData = productSalesData.length > 0 
    ? productSalesData 
    : [
        { name: '手腕掛繩', value: 12, color: '#5A5A40' },
        { name: '狗掌吊飾', value: 8, color: '#8C7365' },
        { name: '愛心吊飾', value: 5, color: '#C9BEB2' }
      ];

  // Prepare color metrics
  const displayTopColors = data.topColors.length > 0 
    ? data.topColors.slice(0, 5) 
    : [
        { name: '淺粉', count: 18 },
        { name: '淺紫', count: 14 },
        { name: '黃色', count: 11 },
        { name: '墨綠色', count: 9 },
        { name: '黑色', count: 8 }
      ];

  // Calculate simulated projections
  const simulatedVisitors = data.visitors || 500;
  const simulatedQuizTakers = Math.round(simulatedVisitors * (quizEngagementRate / 100));
  const simulatedCartAdds = Math.round(simulatedQuizTakers * (cartConversionRate / 100));
  const simulatedOrders = Math.round(simulatedCartAdds * 0.85); // 85% finish checkout once added
  const simulatedRevenue = simulatedOrders * 280; // NT$ 280 is average product price
  const simulatedConversion = (simulatedOrders / simulatedVisitors) * 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#333]/40 backdrop-blur-md flex justify-center p-4 md:p-8 animate-fade-in" id="dashboard-wrapper">
      <div className="bg-[#FDFBF7] w-full max-w-5xl rounded-3xl shadow-2xl border border-warm-border overflow-hidden flex flex-col h-full max-h-[90vh]">
        
        {/* Header banner */}
        <div className="px-6 py-5 bg-warm-olive text-white flex items-center justify-between border-b border-warm-border/50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-warm-beige text-warm-olive rounded-xl font-bold">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-serif font-bold tracking-tight">
                RACCOONLINLIN 浣熊琳琳文創工作室 ‧ 賣貨便引流與觸擊率統計儀表板
              </h2>
              <p className="text-xs text-warm-beige-light/80 font-light">
                即時追蹤測驗流量、客製自訂配色點擊、賣貨便直接購買點擊數與導流觸擊率，優化您的電商營收。
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/15 hover:bg-white/25 hover:text-white text-warm-beige-light text-xs font-bold rounded-full border border-white/20 transition-colors cursor-pointer"
            id="btn-close-dashboard"
          >
            關閉後台
          </button>
        </div>

        {/* Dashboard Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-warm-beige-light/20">
          
          {/* Top Row: Core KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="dashboard-kpis">
            
            {/* Visitors Card */}
            <div className="bg-white p-4 rounded-2xl border border-warm-border/60 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-warm-beige-light rounded-2xl flex items-center justify-center text-warm-clay shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">全站瀏覽訪客</span>
                <span className="text-xl font-bold text-[#333] font-mono">
                  {data.visitors}
                </span>
                <span className="text-[9px] text-warm-clay font-bold block">100% 流量基底</span>
              </div>
            </div>

            {/* Quiz Takers Card */}
            <div className="bg-white p-4 rounded-2xl border border-warm-border/60 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-warm-beige rounded-2xl flex items-center justify-center text-warm-olive shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">測驗完成人數</span>
                <span className="text-xl font-bold text-[#333] font-mono">
                  {data.quizTakers}
                </span>
                <span className="text-[9px] text-warm-olive font-bold block">
                  互動率 {visitorToQuiz.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Orders Card */}
            <div className="bg-white p-4 rounded-2xl border border-warm-border/60 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-warm-beige-light rounded-2xl flex items-center justify-center text-warm-olive shrink-0">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">直接購買點擊數</span>
                <span className="text-xl font-bold text-[#333] font-mono">
                  {data.orders}
                </span>
                <span className="text-[9px] text-warm-olive font-bold block">
                  導流觸擊率 {overallConversion.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white p-4 rounded-2xl border border-warm-border/60 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-warm-beige rounded-2xl flex items-center justify-center text-warm-clay shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">引流預估金額</span>
                <span className="text-xl font-serif font-bold text-warm-olive font-mono block">
                  NT$ {data.revenue}
                </span>
                <span className="text-[9px] text-warm-clay font-bold block">
                  均單價值 NT$ {data.orders > 0 ? Math.round(data.revenue / data.orders) : 0}
                </span>
              </div>
            </div>

          </div>

          {/* Row 2: Charts and Distributions */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Conversion Funnel Bar Chart */}
            <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-warm-border shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-bold text-sm text-[#333] uppercase tracking-wider">
                  電商漏斗轉換率 (Conversion Funnel)
                </h3>
                <span className="text-[10px] text-slate-500 font-semibold bg-warm-beige-light px-2.5 py-1 rounded-full">
                  即時訪客流向
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funnelData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.15} stroke="#5A5A40" />
                    <XAxis type="number" stroke="#8C7365" fontSize={11} />
                    <YAxis dataKey="stage" type="category" stroke="#8C7365" fontSize={11} width={100} />
                    <Tooltip cursor={{ fill: 'rgba(90,90,64,0.03)' }} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Category sales pie and Color trends */}
            <div className="lg:col-span-4 grid grid-cols-1 gap-6">
              
              {/* Product Distribution Pie */}
              <div className="bg-white p-5 rounded-3xl border border-warm-border shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#333] uppercase tracking-wider">
                    熱銷款式比例 (Sales Share)
                  </h3>
                  <p className="text-[10px] text-slate-400 font-light">三大熱銷編織產品對比</p>
                </div>

                <div className="h-44 w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={displayProductSalesData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {displayProductSalesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-3 text-xs">
                  {displayProductSalesData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 font-medium">
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Row 3: Colors trend list & Optimizer simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Top Color Trends */}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-warm-border shadow-xs space-y-4">
              <div>
                <h3 className="font-serif font-bold text-sm text-[#333] uppercase tracking-wider">
                  熱門客製配色排行榜
                </h3>
                <p className="text-[10px] text-slate-400 font-light">依據測驗推薦及購物車下單統計</p>
              </div>

              <div className="space-y-3 pt-2">
                {displayTopColors.map((col, idx) => {
                  const colorObj = COLORS.find(c => c.name === col.name);
                  
                  return (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-slate-400 w-4">#{idx + 1}</span>
                        <span
                          className="w-4 h-4 rounded-full border border-warm-border/50 shadow-xs"
                          style={{ backgroundColor: colorObj?.hex || '#ccc' }}
                        />
                        <span className="text-xs font-medium text-slate-700">
                          {col.name} {colorObj ? `(${colorObj.englishName})` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-warm-beige-light/50 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-warm-olive h-2 rounded-full"
                            style={{ width: `${(col.count / displayTopColors[0].count) * 100}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-xs text-slate-500">
                          {col.count} 次
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Conversion Optimization Simulator (High-Engagement Feature) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-warm-border shadow-xs space-y-5">
              <div className="space-y-1.5 border-b border-warm-border/50 pb-3">
                <div className="inline-flex items-center gap-1.5 text-xs text-warm-olive font-bold tracking-wider uppercase bg-warm-beige px-2.5 py-0.5 rounded-full">
                  <Sliders className="w-3.5 h-3.5" />
                  數據模擬
                </div>
                <h3 className="font-serif font-bold text-base text-[#333] tracking-tight">
                  行銷優化與轉換率試算器
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  調整下方行銷指標，試算如何透過「提高測驗參與率」與「購物車結帳激勵方案」來優化品牌營業額！
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sliders panel */}
                <div className="space-y-4">
                  {/* Slider 1: Quiz engagement */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-600">
                        1. 測驗參與率 (引導訪客做測驗)
                      </span>
                      <span className="text-xs font-mono font-bold text-warm-olive bg-warm-beige px-2 py-0.5 rounded-full">
                        {quizEngagementRate} %
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={quizEngagementRate}
                      onChange={(e) => setQuizEngagementRate(parseInt(e.target.value))}
                      className="w-full accent-warm-olive h-1.5 bg-warm-beige-light/60 rounded-full cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 font-light">
                      *透過在首頁上方顯眼 Banner 宣傳「免費獲得心靈色彩配飾建議」，吸引更多訪客做測驗。
                    </p>
                  </div>

                  {/* Slider 2: Cart conversion */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-600">
                        2. 測驗完加購率 (把結果加進購物車)
                      </span>
                      <span className="text-xs font-mono font-bold text-warm-clay bg-warm-beige px-2 py-0.5 rounded-full">
                        {cartConversionRate} %
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={cartConversionRate}
                      onChange={(e) => setCartConversionRate(parseInt(e.target.value))}
                      className="w-full accent-warm-clay h-1.5 bg-warm-beige-light/60 rounded-full cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400 font-light">
                      *在測驗結果頁，提供「限時9折優惠」及「客製色彩寓意故事」的情感渲染，提高選購轉化率。
                    </p>
                  </div>
                </div>

                {/* Simulated projections results */}
                <div className="bg-warm-beige-light/20 p-4 rounded-2xl border border-warm-border space-y-3.5 flex flex-col justify-between">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    試算優化預估：(假設全站 1000 訪客)
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-xl border border-warm-border/50">
                      <span className="text-[10px] text-slate-400 font-bold block">預計測驗人數</span>
                      <span className="text-lg font-bold text-[#333] font-mono">
                        {Math.round(1000 * (quizEngagementRate / 100))}
                      </span>
                      <span className="text-[9px] text-warm-olive block">人次</span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-warm-border/50">
                      <span className="text-[10px] text-slate-400 font-bold block">預估導流量</span>
                      <span className="text-lg font-bold text-[#333] font-mono">
                        {Math.round(Math.round(1000 * (quizEngagementRate / 100)) * (cartConversionRate / 100) * 0.85)}
                      </span>
                      <span className="text-[9px] text-warm-clay block">次直接購買點擊</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-warm-olive/5 p-3 rounded-xl border border-warm-olive/10">
                    <div>
                      <span className="text-[10px] text-warm-olive font-bold block">預估引流價值提升</span>
                      <span className="text-xl font-serif font-bold text-warm-olive font-mono">
                        NT$ {Math.round(Math.round(1000 * (quizEngagementRate / 100)) * (cartConversionRate / 100) * 0.85) * 280}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-bold block">全站預估觸擊率</span>
                      <span className="text-sm font-bold text-slate-700 font-mono flex items-center justify-end gap-0.5">
                        {((Math.round(Math.round(1000 * (quizEngagementRate / 100)) * (cartConversionRate / 100) * 0.85) / 1000) * 100).toFixed(1)} %
                        <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Latest Orders List with 7-11 details and photos */}
          <div className="bg-white p-6 rounded-3xl border border-warm-border shadow-xs space-y-5" id="dashboard-orders-section">
            <div className="flex justify-between items-center border-b border-warm-border/50 pb-3">
              <div className="space-y-0.5">
                <h3 className="font-serif font-bold text-base text-[#333] tracking-tight">
                  賣貨便引流與客製點擊追蹤 (直接購買觸擊紀錄)
                </h3>
                <p className="text-xs text-slate-500 font-light">
                  即時查看顧客自訂配色後點擊「直接購買」並引流導向 7-11 賣貨便商城的完整歷程數據。
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-[#00813B]/10 text-[#00813B] px-3 py-1 rounded-full border border-[#00813B]/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#00813B] rounded-full animate-ping" />
                統一超商 7-11 賣貨便
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs font-light">
                目前尚無直接購買點擊紀錄。
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-4 rounded-2xl border border-warm-border bg-warm-beige-light/20 flex flex-col md:flex-row justify-between gap-6 hover:shadow-xs transition-shadow">
                    
                    {/* Left details: Order ID, items list */}
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-extrabold text-sm text-warm-olive bg-warm-beige px-2.5 py-0.5 rounded-md">
                          {ord.id.includes('引流') || ord.id.includes('點擊') ? ord.id : `點擊-${ord.id.split('-')[1] || ord.id}`}
                        </span>
                        <span className="text-[11px] text-slate-400 font-sans">{ord.createdAt}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          已引流導向
                        </span>
                      </div>

                      {/* Items loop */}
                      <div className="space-y-2">
                        {ord.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-warm-border/50 text-xs max-w-lg">
                            <div className="shrink-0 scale-90">
                              <ProductPreview
                                category={item.category}
                                selectedColors={item.selectedColors}
                                size="sm"
                                showPhoto={true}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-[#333] truncate">{item.productName}</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.selectedColors.map((col, idx) => (
                                  <span key={idx} className="text-[9px] px-1.5 py-0.2 bg-warm-beige-light rounded-sm text-slate-500 font-semibold">
                                    {col}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="font-mono text-[10px] text-slate-400 block">x{item.quantity}</span>
                              <div className="font-serif font-bold text-warm-olive">NT$ {item.price * item.quantity}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right details: Click Source & Redirect Destination */}
                    <div className="md:w-72 shrink-0 md:border-l border-warm-border md:pl-6 flex flex-col justify-between space-y-3 text-xs text-slate-600">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-warm-olive shrink-0" />
                          <span className="font-bold text-slate-700">點擊主體：</span>
                          <span>線上訪客</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-warm-olive shrink-0" />
                          <span className="font-bold text-slate-700">配色備註：</span>
                          <span className="truncate max-w-[180px]" title={ord.phone}>{ord.phone.startsWith('自訂色:') ? ord.phone : `預配色: ${ord.phone}`}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#00813B] shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <div><strong className="text-slate-700">引流管道：</strong><span className="font-bold text-[#00813B]">{ord.storeName.includes('來源:') ? ord.storeName : `來源: 線上選購`}</span></div>
                            <div className="text-[10px] text-slate-400 leading-relaxed font-light">引流導向: 7-11 賣貨便 ‧ 專屬賣場</div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-warm-border/50 pt-2 flex justify-between items-center bg-white p-2.5 rounded-xl">
                        <div>
                          <span className="text-[9px] text-slate-400 block font-sans">引流預估金額</span>
                          <span className="font-serif font-extrabold text-warm-olive text-sm">NT$ {ord.total}</span>
                        </div>
                        <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-emerald-600 animate-pulse" />
                          導流成功
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Settings Block */}
          <div className="bg-white p-6 rounded-3xl border border-warm-border shadow-xs space-y-4">
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-base text-[#333] tracking-tight flex items-center gap-2">
                <Sliders className="w-5 h-5 text-warm-olive" />
                7-11 賣貨便連結設定
              </h3>
              <p className="text-xs text-slate-500 font-light">
                在此設定您的 7-11 賣貨便店鋪/產品網址。顧客於商品客製頁面點擊「直接購買」或於購物車點擊「前往賣貨便下單」時，將自動開啟新分頁引導至此連結。
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={myshipUrl}
                onChange={(e) => setMyshipUrl(e.target.value)}
                placeholder="請輸入您的 7-11 賣貨便店鋪連結 (例如 https://myship.7-11.com.tw/...)"
                className="flex-1 px-4 py-2.5 rounded-full border border-warm-border bg-warm-beige-light/30 text-slate-800 text-sm focus:ring-1 focus:ring-warm-olive focus:border-warm-olive focus:outline-hidden"
              />
              <button
                onClick={handleSaveMyshipUrl}
                className="px-6 py-2.5 bg-warm-olive hover:bg-warm-olive-dark text-white font-bold text-xs rounded-full cursor-pointer transition-all shrink-0 flex items-center justify-center gap-1.5 min-w-[100px]"
              >
                {isSaved ? '儲存成功！' : '儲存設定'}
              </button>
            </div>
          </div>

          {/* Practical Conversion Tips Block */}
          <div className="p-5 bg-warm-olive/5 rounded-2xl border border-warm-border space-y-1 text-xs">
            <h4 className="font-serif font-bold text-warm-olive text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-warm-clay" />
              💡 創辦人優化客製化產品轉換率指南：
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-2 font-light">
              <li><strong>情感行銷</strong>：每個測試結果頁有著細膩的文字解析，如代表個性的幸運色 and 風格建議，大幅增加了商品的「故事感」與「附加價值」，是提升客單價的關鍵。</li>
              <li><strong>色彩導購</strong>：減少顧客的「選擇障礙」！自動過濾與預填配色，可以縮短顧客下單的心智時間。</li>
              <li><strong>客製預覽</strong>：實時更新的 SVG 編織掛繩能讓顧客確切看到商品外觀，降低購買前的疑慮，加倍促進銷售！</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Shipping Label Modal */}
      <ShippingLabelModal
        isOpen={isPrintModalOpen}
        order={selectedOrderForPrint}
        onClose={() => {
          setIsPrintModalOpen(false);
          setSelectedOrderForPrint(null);
        }}
        onUpdateShippingCode={(orderId, code) => {
          if (onUpdateShippingCode) {
            onUpdateShippingCode(orderId, code);
          }
          setSelectedOrderForPrint(prev => 
            prev && prev.id === orderId ? { ...prev, shippingCode: code } : prev
          );
        }}
      />
    </div>
  );
};
