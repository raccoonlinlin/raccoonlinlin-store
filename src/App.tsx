```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrandStory } from './components/BrandStory';
import { QuizPage } from './components/QuizPage';
import { ShopPage } from './components/ShopPage';
import { ContactModal } from './components/ContactModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Product, CartItem, Order } from './types';
import {
  TrendingUp,
  Heart,
  Menu,
  X,
} from 'lucide-react';

export default function App() {
  // Navigation & Cart States
  const [activeTab, setActiveTab] = useState<'home' | 'quiz' | 'shop'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [contactOpen, setContactOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  // Admin Authentication States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Quiz Interaction States
  const [selectedQuizCategory, setSelectedQuizCategory] = useState<string | null>(null);

  const [quizRecommendation, setQuizRecommendation] = useState<{
    category: string;
    colors: string[];
  } | null>(null);

  const [customizerPreset, setCustomizerPreset] = useState<{
    category: string;
    colors: string[];
  } | null>(null);

  // Analytics
  const [analytics, setAnalytics] = useState({
    visitors: 342,
    quizTakers: 154,
    cartAdds: 48,
    orders: 14,
    revenue: 3860,
    quizConversions: {
      lanyard: 6,
      paw: 5,
      heart: 3,
    },
    topColors: [
      { name: '淺粉', count: 18 },
      { name: '淺紫', count: 14 },
      { name: '黃色', count: 11 },
      { name: '墨綠色', count: 9 },
      { name: '黑色', count: 8 },
      { name: '灰色', count: 6 },
    ],
  });

  // Scroll to top when switching tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  // Load saved data
  useEffect(() => {
    const savedCart = localStorage.getItem('woven_store_cart');

    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('讀取購物車失敗:', error);
      }
    }

    const savedAnalytics = localStorage.getItem('woven_store_analytics');

    if (savedAnalytics) {
      try {
        setAnalytics(JSON.parse(savedAnalytics));
      } catch (error) {
        console.error('讀取數據失敗:', error);
      }
    } else {
      setAnalytics(prev => {
        const updated = {
          ...prev,
          visitors: prev.visitors + 1,
        };

        localStorage.setItem(
          'woven_store_analytics',
          JSON.stringify(updated)
        );

        return updated;
      });
    }

    const savedRecommend = localStorage.getItem(
      'woven_store_recommendation'
    );

    if (savedRecommend) {
      try {
        setQuizRecommendation(JSON.parse(savedRecommend));
      } catch (error) {
        console.error('讀取命定色推薦失敗:', error);
      }
    }

    const savedOrders = localStorage.getItem('woven_store_orders');

    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('讀取訂單失敗:', error);
      }
    } else {
      const initialOrders: Order[] = [
        {
          id: '織心-84920',
          name: '林雨涵',
          phone: '0987***654',
          storeName: '7-11 敦南門市',
          storeAddress: '台北市大安區敦化南路一段 236 號',
          items: [
            {
              productName: '客製 V字編織手機掛繩 (單色款)',
              category: 'v_lanyard_single',
              selectedColors: ['淺粉'],
              quantity: 1,
              price: 320,
            },
          ],
          total: 380,
          payment: 'LINE Pay',
          status: '待出貨',
          createdAt: '2026-07-15 14:23',
        },
        {
          id: '織心-72049',
          name: '陳志明',
          phone: '0912***345',
          storeName: '7-11 創藝門市',
          storeAddress: '台中市西區公益路二段 150 號',
          items: [
            {
              productName: '客製 螺旋編織手機掛繩 (多色款)',
              category: 'spiral_lanyard_multi',
              selectedColors: ['淺紫', '黃色'],
              quantity: 1,
              price: 380,
            },
          ],
          total: 440,
          payment: 'LINE Pay',
          status: '已出貨',
          createdAt: '2026-07-14 11:05',
        },
      ];

      setOrders(initialOrders);

      localStorage.setItem(
        'woven_store_orders',
        JSON.stringify(initialOrders)
      );
    }
  }, []);

  // Save cart
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);

    localStorage.setItem(
      'woven_store_cart',
      JSON.stringify(items)
    );
  };

  // Open dashboard
  const handleOpenDashboard = () => {
    if (isAdminAuthenticated) {
      setDashboardOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  // Login success
  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setLoginModalOpen(false);
    setDashboardOpen(true);
  };

  // Direct purchase
  const handleDirectPurchaseClick = (
    product: Product,
    colors: string[],
    quantity: number = 1,
    source: string = '線上選購'
  ) => {
    let myshipUrl = localStorage.getItem(
      'woven_store_myship_url'
    );

    const defaultMyshipUrl =
      'https://myship.7-11.com.tw/general/detail/GM2504065791468';

    if (
      !myshipUrl ||
      myshipUrl === 'https://myship.7-11.com.tw/' ||
      myshipUrl ===
        'https://myship.7-11.com.tw/general/maintain/GM2504065791468'
    ) {
      myshipUrl = defaultMyshipUrl;

      localStorage.setItem(
        'woven_store_myship_url',
        myshipUrl
      );
    }

    // Open 7-11 MyShip
    window.open(myshipUrl, '_blank');

    // Create click log
    const newClickId =
      `點擊-${Math.floor(Math.random() * 90000) + 10000}`;

    const newClickLog: Order = {
      id: newClickId,
      name: '線上訪客 (點擊直接購買)',
      phone: `自訂色: ${colors.join(', ')}`,
      storeName: `來源: ${source}`,
      storeAddress: '預期引流 7-11 賣貨便',
      items: [
        {
          productName: product.name,
          category: product.category,
          selectedColors: colors,
          quantity,
          price: product.basePrice,
        },
      ],
      total: product.basePrice * quantity,
      payment: '7-11 賣貨便',
      status: '已引流',
      createdAt: new Date()
        .toLocaleString('zh-TW', { hour12: false })
        .substring(0, 16)
        .replace(/\//g, '-'),
    };

    const updatedOrders = [newClickLog, ...orders];

    setOrders(updatedOrders);

    localStorage.setItem(
      'woven_store_orders',
      JSON.stringify(updatedOrders)
    );

    // Update analytics
    setAnalytics(prev => {
      const updatedColors = [...prev.topColors];

      colors.forEach(colorName => {
        const foundIndex = updatedColors.findIndex(
          color => color.name === colorName
        );

        if (foundIndex > -1) {
          updatedColors[foundIndex].count += quantity;
        } else {
          updatedColors.push({
            name: colorName,
            count: quantity,
          });
        }
      });

      updatedColors.sort((a, b) => b.count - a.count);

      const updatedConversions = {
        ...prev.quizConversions,
      };

      let baseCategory:
        | 'lanyard'
        | 'paw'
        | 'heart' = 'lanyard';

      if (product.category.includes('lanyard')) {
        baseCategory = 'lanyard';
      } else if (
        product.category === 'paw' ||
        product.category === 'couples_charm' ||
        product.category === 'shaker_charm' ||
        product.category === 'illustration_charm'
      ) {
        baseCategory = 'paw';
      } else {
        baseCategory = 'heart';
      }

      updatedConversions[baseCategory] += quantity;

      const updated = {
        ...prev,
        cartAdds: prev.cartAdds + quantity,
        orders: prev.orders + 1,
        revenue:
          prev.revenue +
          product.basePrice * quantity,
        quizConversions: updatedConversions,
        topColors: updatedColors,
      };

      localStorage.setItem(
        'woven_store_analytics',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // Select product for quiz
  const handleSelectProductForQuiz = (
    category: string
  ) => {
    const validCategories = [
      'v_lanyard_single',
      'spiral_lanyard_single',
      'v_lanyard_multi',
      'spiral_lanyard_multi',
      'paw',
      'heart',
    ];

    if (validCategories.includes(category)) {
      setSelectedQuizCategory(category);
    } else if (category.includes('lanyard')) {
      setSelectedQuizCategory('v_lanyard_multi');
    } else if (category === 'paw') {
      setSelectedQuizCategory('paw');
    } else {
      setSelectedQuizCategory('heart');
    }

    setActiveTab('quiz');
  };

  // Quiz finished
  const handleQuizFinishedWithResult = (
    category: string,
    colors: string[]
  ) => {
    const recommendation = {
      category,
      colors,
    };

    setQuizRecommendation(recommendation);

    localStorage.setItem(
      'woven_store_recommendation',
      JSON.stringify(recommendation)
    );

    setAnalytics(prev => {
      const updatedColors = [...prev.topColors];

      colors.forEach(colorName => {
        const foundIndex = updatedColors.findIndex(
          color => color.name === colorName
        );

        if (foundIndex > -1) {
          updatedColors[foundIndex].count += 1;
        } else {
          updatedColors.push({
            name: colorName,
            count: 1,
          });
        }
      });

      updatedColors.sort((a, b) => b.count - a.count);

      const updated = {
        ...prev,
        quizTakers: prev.quizTakers + 1,
        topColors: updatedColors,
      };

      localStorage.setItem(
        'woven_store_analytics',
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  // Navigate to custom editor
  const handleNavigateToCustomEditor = (
    category: string,
    colors: string[]
  ) => {
    setCustomizerPreset({
      category,
      colors,
    });

    setActiveTab('shop');
  };

  // Checkout success
  const handleCheckoutSuccess = (
    orderAmount: number,
    orderedItems: CartItem[],
    shippingInfo: {
      name: string;
      phone: string;
      storeName: string;
      storeAddress: string;
    }
  ) => {
    const newOrderId =
      `織心-${Math.floor(Math.random() * 90000) + 10000}`;

    const newOrder: Order = {
      id: newOrderId,
      name: shippingInfo.name,
      phone: shippingInfo.phone,
      storeName: shippingInfo.storeName,
      storeAddress: shippingInfo.storeAddress,
      items: orderedItems.map(item => ({
        productName: item.product.name,
        category: item.product.category,
        selectedColors: item.selectedColors,
        quantity: item.quantity,
        price: item.price,
      })),
      total: orderAmount,
      payment: '7-11 賣貨便',
      status: '待出貨',
      createdAt: new Date()
        .toISOString()
        .replace('T', ' ')
        .substring(0, 16),
    };

    const updatedOrders = [
      newOrder,
      ...orders,
    ];

    setOrders(updatedOrders);

    localStorage.setItem(
      'woven_store_orders',
      JSON.stringify(updatedOrders)
    );

    setAnalytics(prev => {
      const updatedConversions = {
        ...prev.quizConversions,
      };

      orderedItems.forEach(item => {
        const category = item.product.category;

        let baseCategory:
          | 'lanyard'
          | 'paw'
          | 'heart' = 'lanyard';

        if (category.includes('lanyard')) {
          baseCategory = 'lanyard';
        } else if (
          category === 'paw' ||
          category === 'couples_charm' ||
          category === 'shaker_charm' ||
          category === 'illustration_charm'
        ) {
          baseCategory = 'paw';
        } else {
          baseCategory = 'heart';
        }

        updatedConversions[baseCategory] +=
          item.quantity;
      });

      const updatedColors = [...prev.topColors];

      orderedItems.forEach(item => {
        item.selectedColors.forEach(colorName => {
          const foundIndex =
            updatedColors.findIndex(
              color => color.name === colorName
            );

          const amount = item.quantity * 2;

          if (foundIndex > -1) {
            updatedColors[foundIndex].count += amount;
          } else {
            updatedColors.push({
              name: colorName,
              count: amount,
            });
          }
        });
      });

      updatedColors.sort((a, b) => b.count - a.count);

      const updated = {
        ...prev,
        orders: prev.orders + 1,
        revenue: prev.revenue + orderAmount,
        quizConversions: updatedConversions,
        topColors: updatedColors,
      };

      localStorage.setItem(
        'woven_store_analytics',
        JSON.stringify(updated)
      );

      return updated;
    });

    saveCart([]);
  };

  // Update shipping code
  const handleUpdateShippingCode = (
    orderId: string,
    code: string
  ) => {
    const updated = orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          shippingCode: code,
        };
      }

      return order;
    });

    setOrders(updated);

    localStorage.setItem(
      'woven_store_orders',
      JSON.stringify(updated)
    );
  };

  // Clear custom preset
  const handleClearPresets = () => {
    setCustomizerPreset(null);
  };

  return (
    <div className="min-h-screen bg-warm-beige text-slate-800 flex flex-col">

      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-white/60 backdrop-blur-md border-b border-warm-border/70"
        id="site-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => {
              setActiveTab('home');
              handleClearPresets();
            }}
            className="flex items-center gap-3 cursor-pointer group"
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-full bg-warm-olive flex items-center justify-center text-white font-bold shadow-sm transform group-hover:rotate-12 transition-transform">
              <Heart className="w-4 h-4 fill-white stroke-none" />
            </div>

            <div>
              <span className="text-xl md:text-2xl font-semibold tracking-tight text-warm-olive group-hover:text-warm-clay transition-colors block leading-tight">
                RACCOONLINLIN 浣熊琳琳文創工作室
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] font-semibold text-[#666]"
            id="desktop-nav"
          >
            <button
              onClick={() => {
                setActiveTab('home');
                handleClearPresets();
              }}
              className={`hover:text-warm-olive cursor-pointer transition-colors pb-1.5 pt-1 ${
                activeTab === 'home'
                  ? 'text-warm-olive border-b-2 border-warm-olive'
                  : 'border-b-2 border-transparent'
              }`}
            >
              主頁介紹
            </button>

            <button
              onClick={() => {
                setActiveTab('quiz');
                handleClearPresets();
                setSelectedQuizCategory(null);
              }}
              className={`hover:text-warm-olive cursor-pointer transition-colors pb-1.5 pt-1 ${
                activeTab === 'quiz'
                  ? 'text-warm-olive border-b-2 border-warm-olive'
                  : 'border-b-2 border-transparent'
              }`}
            >
              尋找命定色
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                handleClearPresets();
              }}
              className={`hover:text-warm-olive cursor-pointer transition-colors pb-1.5 pt-1 ${
                activeTab === 'shop'
                  ? 'text-warm-olive border-b-2 border-warm-olive'
                  : 'border-b-2 border-transparent'
              }`}
            >
              線上選購
            </button>

            <button
              onClick={() => setContactOpen(true)}
              className="hover:text-warm-olive cursor-pointer transition-colors pb-1.5 pt-1 border-b-2 border-transparent"
            >
              詢問/合作
            </button>
          </nav>

          {/* Header Controls */}
          <div className="flex items-center gap-3">

            <button
              onClick={handleOpenDashboard}
              className="p-2 rounded-xl border border-warm-border bg-white hover:border-warm-olive text-[#666] hover:text-warm-olive transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="商家後台數據統計"
            >
              <TrendingUp className="w-4 h-4 text-warm-olive" />

              <span className="text-xs font-bold hidden lg:inline">
                數據分析
              </span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() =>
                setMobileMenuOpen(prev => !prev)
              }
              className="md:hidden p-2 rounded-xl border border-warm-border bg-white text-slate-500 cursor-pointer active:scale-95"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t border-warm-border bg-[#FDFBF7] py-3.5 px-4 space-y-2 flex flex-col"
            id="mobile-nav"
          >
            <button
              onClick={() => {
                setActiveTab('home');
                handleClearPresets();
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left rounded-lg text-xs uppercase tracking-widest font-bold ${
                activeTab === 'home'
                  ? 'bg-warm-olive/10 text-warm-olive'
                  : 'text-[#666]'
              }`}
            >
              主頁介紹
            </button>

            <button
              onClick={() => {
                setActiveTab('quiz');
                handleClearPresets();
                setSelectedQuizCategory(null);
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left rounded-lg text-xs uppercase tracking-widest font-bold ${
                activeTab === 'quiz'
                  ? 'bg-warm-olive/10 text-warm-olive'
                  : 'text-[#666]'
              }`}
            >
              尋找命定色
            </button>

            <button
              onClick={() => {
                setActiveTab('shop');
                handleClearPresets();
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left rounded-lg text-xs uppercase tracking-widest font-bold ${
                activeTab === 'shop'
                  ? 'bg-warm-olive/10 text-warm-olive'
                  : 'text-[#666]'
              }`}
            >
              線上選購
            </button>

            <button
              onClick={() => {
                setContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="p-2.5 text-left rounded-lg text-xs uppercase tracking-widest font-bold text-[#666]"
            >
              詢問/合作
            </button>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

        {activeTab === 'home' && (
          <BrandStory
            onNavigate={setActiveTab}
            onSelectProductForQuiz={
              handleSelectProductForQuiz
            }
          />
        )}

        {activeTab === 'quiz' && (
          <QuizPage
            initialCategory={selectedQuizCategory}
            onDirectPurchaseClick={
              handleDirectPurchaseClick
            }
            onNavigateToCustomEditor={
              handleNavigateToCustomEditor
            }
            onRecordQuizCompletion={(
              category,
              colors
            ) => {
              handleQuizFinishedWithResult(
                category,
                colors
              );
            }}
          />
        )}

        {activeTab === 'shop' && (
          <ShopPage
            quizRecommendation={quizRecommendation}
            onDirectPurchaseClick={
              handleDirectPurchaseClick
            }
            preSelectedCategory={
              customizerPreset?.category || null
            }
            preSelectedColors={
              customizerPreset?.colors || null
            }
            onClearPreSelected={
              handleClearPresets
            }
          />
        )}
      </main>

      {/* Contact Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      {/* Admin Dashboard */}
      {dashboardOpen && (
        <AnalyticsDashboard
          data={analytics}
          orders={orders}
          onUpdateShippingCode={
            handleUpdateShippingCode
          }
          onClose={() => setDashboardOpen(false)}
        />
      )}

      {/* Admin Login */}
      <AdminLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <footer
        className="bg-white/50 backdrop-blur-md border-t border-warm-border/60 py-10 mt-12"
        id="site-footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">

          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-base shadow-sm">
              🦝
            </div>

            <span className="text-lg font-bold text-[#333]">
              RACCOONLINLIN 浣熊琳琳文創工作室
            </span>
          </div>

          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            所有商品皆為職人手工純棉線細緻編織，色彩經由心理特質認證與幸運導航。
            若有任何特殊長度或大宗送禮需求，歡迎隨時來信聯絡。
          </p>

          <div className="text-[10px] text-slate-400 pt-2 flex flex-wrap justify-center gap-x-6 gap-y-2">

            <span>
              聯絡信箱：raccoonraccoon1063@gamil.com
            </span>

            <span>
              © RACCOONLINLIN 浣熊琳琳 文創工作室 All Rights Reserved.
            </span>

            <button
              onClick={handleOpenDashboard}
              className="text-warm-olive hover:text-warm-clay hover:underline cursor-pointer font-bold"
            >
              [ 進入商家管理後台 ]
            </button>

          </div>
        </div>
      </footer>

    </div>
  );
}
```
