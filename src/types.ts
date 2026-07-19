/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  longDescription: string;
  maxColors: number;
  minColors: number;
  defaultColors: string[]; // names of colors e.g. ["淺粉", "淺紫"]
  imagePlaceholder: string; // for visual fallback
  imageUrl?: string; // real photograph URL or path
}

export interface ColorOption {
  name: string; // e.g. "紅色", "黑色"
  englishName: string; // for class names or design
  hex: string;
  meaning: string; // personality/emotional meaning
  luckySymbol: string;
  luckyItems?: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    // Each option points to certain colors or color combinations
    weights: { [colorName: string]: number };
  }[];
}

export interface QuizResult {
  title: string;
  representativeColors: string[]; // 1 to 3 color names
  personality: string;
  luckyMatch: string; // compatible person type
  luckyItems: string;
  styleAdvice: string;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. product-color-hash)
  product: Product;
  selectedColors: string[]; // color names
  quantity: number;
  price: number;
}

export interface AnalyticsData {
  visitors: number;
  quizTakers: number;
  cartAdds: number;
  orders: number;
  revenue: number;
  quizConversions: {
    lanyard: number;
    paw: number;
    heart: number;
  };
  topColors: { name: string; count: number }[];
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  storeName: string;
  storeAddress: string;
  items: {
    productName: string;
    category: string;
    selectedColors: string[];
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
  total: number;
  payment: string;
  status: string;
  createdAt: string;
  shippingCode?: string;
}
