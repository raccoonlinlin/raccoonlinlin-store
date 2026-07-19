/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ColorOption, QuizQuestion } from './types';

export const COLORS: ColorOption[] = [
  { name: '紅色', englishName: 'Red', hex: '#EF4444', meaning: '熱情、勇氣與滿滿活力', luckySymbol: '好運開光、熱烈追求', luckyItems: '手腕掛繩' },
  { name: '黑色', englishName: 'Black', hex: '#1F2937', meaning: '穩重、神秘與極致品味', luckySymbol: '守護氣場、防禦小人', luckyItems: '黑白搭配吊飾' },
  { name: '深藍色', englishName: 'Navy', hex: '#1D4ED8', meaning: '理智、沉靜與深邃智慧', luckySymbol: '專注安定、學業事業順利', luckyItems: '商務風掛繩' },
  { name: '墨綠色', englishName: 'Forest', hex: '#065F46', meaning: '療癒、自然與和諧生命', luckySymbol: '茁壯成長、身心健康平衡', luckyItems: '大自然森系吊飾' },
  { name: '黃色', englishName: 'Yellow', hex: '#FBBF24', meaning: '光明、開朗與自信樂觀', luckySymbol: '偏財旺運、超好人緣', luckyItems: '向日葵黃配飾' },
  { name: '橘色', englishName: 'Orange', hex: '#F97316', meaning: '溫暖、創造力與熱忱滿溢', luckySymbol: '滿滿靈感、快樂常在', luckyItems: '暖色調掛飾' },
  { name: '灰色', englishName: 'Gray', hex: '#6B7280', meaning: '簡約、中性與知性百搭', luckySymbol: '心靈平穩、生活秩序和諧', luckyItems: '極簡風吊飾' },
  { name: '深粉', englishName: 'HotPink', hex: '#DB2777', meaning: '浪漫、自信與耀眼個人魅力', luckySymbol: '桃花旺盛、自信心大爆發', luckyItems: '約會必備愛心飾品' },
  { name: '淺粉', englishName: 'Pink', hex: '#FBCFE8', meaning: '溫柔、純真與甜蜜夢幻', luckySymbol: '人緣爆表、療癒心靈', luckyItems: '櫻花粉粉掛繩' },
  { name: '深咖', englishName: 'DarkBrown', hex: '#78350F', meaning: '踏實、可靠與溫潤復古', luckySymbol: '踏實穩健、安心信賴', luckyItems: '焦糖復古風掛繩' },
  { name: '淺咖', englishName: 'LightBrown', hex: '#D97706', meaning: '溫馨、溫和與慵懶午後', luckySymbol: '療癒放鬆、平靜心境', luckyItems: '奶茶色系掛繩' },
  { name: '淺紫', englishName: 'Lavender', hex: '#C084FC', meaning: '神祕、優雅與心靈美感', luckySymbol: '貴人相助、增強直覺與智慧', luckyItems: '薰衣草紫吊飾' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'lanyard-v-single',
    name: '【織心漫步】V字手機掛繩 (單色)',
    category: 'v_lanyard_single',
    basePrice: 350,
    description: '職人編織經典 V 字單色手機掛繩，厚實耐磨，簡約有質感。',
    longDescription: '選用 100% 精梳棉線，由職人以經典的 V 字編法單色編織而成。結構紮實，親膚防滑，單一純色更能凸顯極簡俐落的工藝美感，附帶高品質金屬扣環。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['墨綠色'],
    imagePlaceholder: 'lanyard',
    imageUrl: '/src/assets/images/v_lanyard_single_1784210593320.jpg'
  },
  {
    id: 'lanyard-spiral-single',
    name: '【織心漫步】螺旋手機掛繩 (單色)',
    category: 'spiral_lanyard_single',
    basePrice: 350,
    description: '獨特立體旋轉編法單色手機掛繩，層次分明，手感豐厚。',
    longDescription: '獨特的 3D 立體螺旋編法，為純色掛繩注入活潑、流暢的旋轉弧度。純棉線編織手感豐厚、柔韌耐用，能完美陪伴您的每一天。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['淺咖'],
    imagePlaceholder: 'lanyard',
    imageUrl: '/src/assets/images/spiral_lanyard_single_1784210604157.jpg'
  },
  {
    id: 'lanyard-v-multi',
    name: '【織心漫步】V字手機掛繩 (多色拼配)',
    category: 'v_lanyard_multi',
    basePrice: 390,
    description: '雙色/三色經典 V 字拼配手機掛繩，色彩交織，獨一無二。',
    longDescription: '職人手工編織雙色或三色交錯 V 字編法。色彩豐富、層次感鮮明，非常適合客製化出專屬您心靈測驗密碼的代表性幸運配飾。',
    maxColors: 3,
    minColors: 2,
    defaultColors: ['淺粉', '淺紫', '灰色'],
    imagePlaceholder: 'lanyard',
    imageUrl: '/src/assets/images/v_lanyard_multi_1784210618825.jpg'
  },
  {
    id: 'lanyard-spiral-multi',
    name: '【織心漫步】螺旋手機掛繩 (多色拼配)',
    category: 'spiral_lanyard_multi',
    basePrice: 390,
    description: '繽紛旋轉立體螺旋多色手機掛繩，糖果般斑斕活潑，手感滿分。',
    longDescription: '多款色彩交織的 3D 螺旋編法。旋轉的條紋讓不同色彩完美互補，呈現出極具活力與童趣的美學質感，為穿搭注入亮眼驚喜。',
    maxColors: 3,
    minColors: 2,
    defaultColors: ['淺粉', '淺紫', '黃色'],
    imagePlaceholder: 'lanyard',
    imageUrl: '/src/assets/images/spiral_lanyard_multi_1784210632370.jpg'
  },
  {
    id: 'paw-1',
    name: '【萌犬守護】狗掌吊飾 (可客製配色)',
    category: 'paw',
    basePrice: 250,
    description: '超療癒立體狗掌編織吊飾，掌心與肉墊可自由定製拼色。',
    longDescription: '以經典的狗掌形狀為靈感，純手工編織呈現圓潤肉厚觸感。掌心與指爪可以自由定製拼色，掛在鑰匙圈或包包上每天揉捏、極具療癒。',
    maxColors: 3,
    minColors: 2,
    defaultColors: ['淺咖', '淺粉'],
    imagePlaceholder: 'paw',
    imageUrl: '/src/assets/images/dog_paw_charm_photo_1784208601152.jpg'
  },
  {
    id: 'heart-1',
    name: '【一心一意】愛心吊飾 (純色經典)',
    category: 'heart',
    basePrice: 180,
    description: '經典編織純色愛心吊飾，手感溫潤，寓意美好信物。',
    longDescription: '經典厚實愛心造型編織，純色大方，手感飽滿。非常適合情侶或閨蜜之間的悄悄話心靈信物，訴說最單純的陪伴溫度。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['深粉'],
    imagePlaceholder: 'heart',
    imageUrl: '/src/assets/images/heart_charm_photo_1784208615768.jpg'
  },
  {
    id: 'couples-charm',
    name: '【織心守護】情侶吊飾組合',
    category: 'couples_charm',
    basePrice: 480,
    description: '兩入一組超萌手工編織情侶吊飾，象徵守護與甜蜜連結。',
    longDescription: '包含兩款一對的手工編織萌趣卡通吊飾，可以客製化男女款式的專屬拼色。使用精細工藝製成，象徵情侶、好友之間最誠摯美好的陪伴守護。',
    maxColors: 2,
    minColors: 1,
    defaultColors: ['淺粉', '淺咖'],
    imagePlaceholder: 'paw',
    imageUrl: '/src/assets/images/couples_charm_1784210497066.jpg'
  },
  {
    id: 'waterproof-stickers',
    name: '【織心日常】手繪防水貼紙組',
    category: 'waterproof_stickers',
    basePrice: 120,
    description: '獨家手繪溫馨風格防水貼紙，妝點水壺、電腦與手機殼的最佳伴侶。',
    longDescription: '採用高品質 PVC 防水防曬材質，精緻裁切。內含多款獨家手繪插畫，溫暖文字與可愛小動物圖樣，經久耐用不褪色，完美點綴您的生活物件。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['黃色'],
    imagePlaceholder: 'heart',
    imageUrl: '/src/assets/images/waterproof_stickers_1784210509654.jpg'
  },
  {
    id: 'phone-patches',
    name: '【織心便利】夾片夾心手機墊片',
    category: 'phone_patches',
    basePrice: 80,
    description: '超薄高強度尼龍手機夾片墊片，極致強韌、繽紛百搭。',
    longDescription: '採用高密度超薄固化尼龍材質，不卡充電孔。具備高強度抗拉扯鋼圈，能牢固扣在各式手機殼與掛繩之間。多款馬卡龍色系供您搭配。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['灰色'],
    imagePlaceholder: 'heart',
    imageUrl: '/src/assets/images/phone_patches_1784210520746.jpg'
  },
  {
    id: 'shaker-charm',
    name: '【織心遊樂】繽紛搖搖樂吊飾',
    category: 'shaker_charm',
    basePrice: 190,
    description: '雙層壓克力搖搖樂吊飾，亮片與萌犬在內部自由舞動，超級吸睛。',
    longDescription: '厚實雙層高透光壓克力製成，內部裝有精緻亮片、微縮編織印花與可愛小愛心。輕輕搖晃即能看見飾物自由滾動，治癒感十足，搭配高品質金色星星鑰匙扣。',
    maxColors: 2,
    minColors: 1,
    defaultColors: ['黃色', '淺紫'],
    imagePlaceholder: 'paw',
    imageUrl: '/src/assets/images/shaker_charm_1784210530456.jpg'
  },
  {
    id: 'brooch-clip',
    name: '【織心點綴】職人手作胸針/夾子組',
    category: 'brooch_clip',
    basePrice: 160,
    description: '職人細緻手工鉤織小花與櫻桃胸針，搭配精緻小夾子套組。',
    longDescription: '一組包含鉤織精緻胸針與同色系邊夾。可用於衣領、包包、帽子、或髮飾，小巧可愛，為穿搭加上最點睛的職人手作刺繡溫暖質感。',
    maxColors: 2,
    minColors: 1,
    defaultColors: ['紅色', '黃色'],
    imagePlaceholder: 'heart',
    imageUrl: '/src/assets/images/brooch_clip_1784210544278.jpg'
  },
  {
    id: 'illustration-charm',
    name: '【織心繪夢】插畫周邊壓克力吊飾',
    category: 'illustration_charm',
    basePrice: 150,
    description: '獨家溫馨插畫周邊雙面壓克力鑰匙圈，跟著小萌狗一起看世界。',
    longDescription: '精選原創溫暖插畫，雙面立體高清印刷。展現職人筆下毛茸茸的萌犬日常生活，搭配簡約五金扣，為鑰匙、隨身小包掛上最真摯的插畫陪伴。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['淺粉'],
    imagePlaceholder: 'paw',
    imageUrl: '/src/assets/images/illustration_charm_1784210555038.jpg'
  },
  {
    id: 'phone-stand',
    name: '【織心漫想】品牌手機支架氣囊支架',
    category: 'phone_stand',
    basePrice: 180,
    description: '原創壓花滴膠與編織圖樣手機氣囊支架，美觀便利、防手滑必備。',
    longDescription: '採用強效 3M 背膠與伸縮氣囊，可多角度拉伸站立或手持。支架面採用職人獨家設計的押花滴膠與微縮編織花樣，精美剔剔、好握拿，防摔更時尚。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['淺紫'],
    imagePlaceholder: 'heart',
    imageUrl: '/src/assets/images/phone_stand_1784210566729.jpg'
  },
  {
    id: 'clearance',
    name: '【驚喜織惠】職人手作現貨出清',
    category: 'clearance',
    basePrice: 199,
    description: '經典手作樣品與微瑕品驚喜出清，限量現貨、超值珍藏！',
    longDescription: '職人於創作、拍攝、市集擺攤時留存的現貨樣品或微瑕手織物，完全不影響日常使用。每一件都是隨機發貨的寶物，超高性價比，帶走獨一無二的手作溫柔。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['灰色'],
    imagePlaceholder: 'lanyard',
    imageUrl: '/src/assets/images/clearance_items_1784210579803.jpg'
  },
  {
    id: 'christmas-tree',
    name: '【溫馨織意】手工編織聖誕樹掛飾🎄',
    category: 'christmas_tree',
    basePrice: 220,
    description: '純手工鉤織精緻立體聖誕樹掛飾，點綴節日溫暖氣息。',
    longDescription: '採用高品質精梳棉線一針一線編織而成的立體聖誕樹，搭配精緻小吊飾與頂部金色星星。聖誕節日裝飾包包、掛在車內、鑰匙扣上，傳遞節日溫馨。此款式為固定經典配色（墨綠樹身與暖金星星），無客製化選項。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['墨綠色'],
    imagePlaceholder: 'christmas_tree',
    imageUrl: '/src/assets/images/christmas_tree_1784293499600.jpg'
  },
  {
    id: 'wedding-custom',
    name: '【專屬心意】婚禮小物客製化',
    category: 'wedding',
    basePrice: 0,
    description: '專為婚禮與品牌活動打造的客製化精緻編織手作，提供 12 色自由配色與專屬背卡定製。',
    longDescription: '專為婚禮、派對或品牌活動打造的精緻手作禮品。我們提供 12 種經典顏色供自由選配，並可客製化專屬背卡、提袋或吊牌，為您的重要日子傳遞手作的溫暖心意與獨一無二的專屬紀念。',
    maxColors: 1,
    minColors: 1,
    defaultColors: ['淺粉'],
    imagePlaceholder: 'heart'
  }
];

export const STORIES = {
  aboutTitle: '「用一根線，編織生活中的小確幸」',
  storyContent: [
    {
      title: '關於我們的誕生',
      content: '我們是一個專注於手工編織配件的個人設計品牌。一切源於一個悠閒的午後，創辦人在整理五彩繽紛的棉線時，被那溫潤的觸感與豐富的色彩深深吸引。心想，在人人手機不離手的現代生活中，如果能將這樣的手作溫度，化為每天握在手心、掛在隨身包包上的配件，是不是能為繁忙的日常帶來一絲溫暖的平靜？'
    },
    {
      title: '手作的無可取代',
      content: '與工廠大量機器生產不同，我們的每一件商品——不論是繁複的【手腕掛繩】、俏皮的【狗掌吊飾】，還是小巧的【愛心吊飾】——都是由我們一針一線親手編織、修剪、塑形。手作的過程中，每一道拉力的微調、每一次色彩的交織，都注入了編織者的專注與祝福。這使得每一件成品都擁有獨一無二的靈魂，沒有兩件是完全一模一樣的。'
    },
    {
      title: '客製化與心靈色彩學',
      content: '色彩，是心靈的語言。我們精心挑選了12種質感配色，從溫柔療癒的櫻花粉與薰衣草紫，到成熟穩重的墨綠與黑色。我們希望透過「心靈色彩特質測驗」，幫助每一位顧客找到此時此刻最能與內心產生共鳴的「代表色」與「幸運風格建議」，並將測驗出來的幸運配色，直接定製到專屬的手工織品中，成為陪伴你每一天的生活儀式感。'
    }
  ]
};

// Quiz definitions
export const LANYARD_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: '1. 週末下午，你最嚮往哪一種放鬆的時光？',
    options: [
      { text: '漫步在大自然中，享受草地野餐或露營', weights: { '墨綠色': 3, '黃色': 2, '淺咖': 2, '灰色': 1 } },
      { text: '躲在溫馨的咖啡廳，看一本書、喝杯熱拿鐵', weights: { '淺咖': 3, '深咖': 2, '淺粉': 2, '灰色': 1 } },
      { text: '逛逛美術館或潮流市集，尋找穿搭與生活靈感', weights: { '深藍色': 3, '黑色': 2, '灰色': 3, '淺紫': 2 } },
      { text: '與三五好友聚會，在熱鬧的派對或音樂祭中搖擺', weights: { '紅色': 3, '橘色': 3, '深粉': 2, '黃色': 2 } }
    ]
  },
  {
    id: 2,
    text: '2. 挑選隨身攜帶的日常配件時，你最看重什麼特點？',
    options: [
      { text: '極致簡約與百搭耐看，不喧賓奪主', weights: { '黑色': 3, '灰色': 3, '深藍色': 2, '深咖': 2 } },
      { text: '亮眼奪目，能成為整體穿搭的時尚亮點', weights: { '紅色': 2, '黃色': 3, '橘色': 3, '深粉': 3 } },
      { text: '舒適溫潤的手作質感與天然纖維香氣', weights: { '淺咖': 3, '墨綠色': 3, '淺粉': 2, '黃色': 1 } },
      { text: '充滿夢幻感或甜美感的療癒配色', weights: { '淺粉': 3, '淺紫': 3, '深粉': 2, '黃色': 1 } }
    ]
  },
  {
    id: 3,
    text: '3. 當你面對生活中突如其來的混亂與挑戰，你通常會？',
    options: [
      { text: '充滿鬥志，積極尋找方法正面迎戰', weights: { '紅色': 3, '橘色': 2, '深藍色': 2, '深粉': 1 } },
      { text: '深呼吸，沉著冷靜地思考最合適的解方', weights: { '深藍色': 3, '黑色': 2, '墨綠色': 2, '灰色': 2 } },
      { text: '隨遇而安，相信一切都是最好的安排', weights: { '灰色': 3, '淺粉': 2, '淺咖': 2, '淺紫': 2 } },
      { text: '用幽默與天馬行空的創意，轉化沉重的氛圍', weights: { '黃色': 3, '橘色': 3, '淺紫': 2, '深粉': 2 } }
    ]
  },
  {
    id: 4,
    text: '4. 想像一個微風徐徐的早晨，你一睜開眼，最想看見窗外是什麼景色？',
    options: [
      { text: '陽光斑駁灑落的茂密森林與露水', weights: { '墨綠色': 3, '淺咖': 2, '黃色': 1, '黑色': 1 } },
      { text: '微光閃爍、海浪輕拍的淡藍色沙灘', weights: { '深藍色': 3, '灰色': 2, '淺紫': 2, '淺粉': 1 } },
      { text: '滿是復古紅磚與暖心路燈的歐式街道', weights: { '深咖': 3, '淺咖': 2, '紅色': 2, '橘色': 2 } },
      { text: '開滿繽紛櫻花與粉色波斯菊的花海', weights: { '淺粉': 3, '深粉': 3, '淺紫': 2, '黃色': 1 } }
    ]
  }
];

export const PAW_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: '1. 如果你可以化身為一隻小動物，你覺得自己的個性最接近？',
    options: [
      { text: '熱情奔放、熱愛玩耍，人見人愛的大型金毛犬', weights: { '黃色': 3, '橘色': 3, '紅色': 2, '淺咖': 1 } },
      { text: '高雅神祕、享受獨處，默默觀察世界的貓咪', weights: { '黑色': 3, '灰色': 3, '淺紫': 3, '深藍色': 1 } },
      { text: '溫和沈穩、默默守護，極度忠誠貼心的柴犬', weights: { '淺咖': 3, '深咖': 3, '墨綠色': 2, '灰色': 1 } },
      { text: '甜美精緻、軟萌愛撒嬌，融化人心的博美犬', weights: { '淺粉': 3, '深粉': 3, '黃色': 2, '淺紫': 1 } }
    ]
  },
  {
    id: 2,
    text: '2. 走在路上看到路邊可愛的浪浪，你心中第一個反應通常是？',
    options: [
      { text: '超級興奮，立刻蹲下來用娃娃音打招呼', weights: { '黃色': 3, '橘色': 3, '深粉': 2, '紅色': 2 } },
      { text: '默默注視牠，在心裡溫柔地祈禱牠平安健康', weights: { '深藍色': 3, '灰色': 3, '墨綠色': 2, '黑色': 1 } },
      { text: '溫柔地走過去，看看包包裡有沒有適合的小點心', weights: { '淺咖': 3, '淺粉': 2, '深咖': 2, '黃色': 1 } },
      { text: '拿起相機記錄牠可愛的一幕，發在社交軟體分享', weights: { '深粉': 3, '淺紫': 3, '紅色': 1, '橘色': 2 } }
    ]
  },
  {
    id: 3,
    text: '3. 你的日常作息與生活步調，通常最像哪一種動物的生活？',
    options: [
      { text: '精力無限的哈士奇，隨時隨地都想動起來、出門探險', weights: { '紅色': 3, '橘色': 3, '黃色': 2, '深粉': 1 } },
      { text: '愛乾淨且步調優雅的白貓，注重細節與個人空間的整潔', weights: { '灰色': 3, '黑色': 2, '深藍色': 3, '淺紫': 2 } },
      { text: '懶洋洋躺在陽光下曬太陽、睡午覺的小橘貓，追求舒適放鬆', weights: { '淺咖': 3, '橘色': 2, '墨綠色': 2, '淺粉': 2 } },
      { text: '對世界充滿好奇心，喜歡搜集漂亮小物件的松鼠', weights: { '深咖': 3, '黃色': 2, '淺紫': 2, '深粉': 2 } }
    ]
  },
  {
    id: 4,
    text: '4. 若要挑選一個度假勝地帶你的寵物一起去探險，你會選？',
    options: [
      { text: '在遼闊的草地上奔跑、露營看星星的森林公園', weights: { '墨綠色': 3, '黃色': 2, '淺咖': 2, '深咖': 1 } },
      { text: '能聽見海浪聲、吹著微風，欣賞浪漫粉紅夕陽的海邊沙灘', weights: { '橘色': 3, '淺粉': 3, '淺紫': 2, '深藍色': 1 } },
      { text: '充滿木頭香氣、壁爐柴火啪啪作響的復古山中小木屋', weights: { '深咖': 3, '淺咖': 3, '灰色': 1, '黑色': 1 } },
      { text: '充滿手作小物與美味寵物餐點的文青慢活小鎮市集', weights: { '淺紫': 3, '深粉': 2, '黃色': 2, '灰色': 2 } }
    ]
  }
];

export const HEART_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: '1. 關於愛情中「心動的瞬間」，最容易讓你小鹿亂撞、瞬間陷入情網的是？',
    options: [
      { text: '霸道而直接的熱烈偏愛：炙熱的眼神交會、堅定地向所有人介紹你，展現滿滿佔有慾', weights: { '紅色': 4, '深粉': 2, '橘色': 1 } },
      { text: '溫柔體貼的細節守護：過馬路時輕輕護著你、主動幫你提重物，眼神裡滿是藏不住的寵溺', weights: { '淺粉': 4, '淺咖': 2, '墨綠色': 1 } },
      { text: '浪漫夢幻的儀式感驚喜：在微醺星空下對你深情告白，送上親手準備的精緻心意', weights: { '淺紫': 4, '黃色': 2, '橘色': 1 } },
      { text: '沉穩可靠的安心安全感：不論何時回頭，他都在身後用深邃堅定的目光守護你，做你最強的後盾', weights: { '黑色': 4, '深藍色': 2, '深咖': 1 } }
    ]
  },
  {
    id: 2,
    text: '2. 當你與心儀的對象展開第一次正式約會，你最嚮往哪一種經典浪漫場景？',
    options: [
      { text: '熱鬧歡樂的遊樂園：手牽手坐雲霄飛車，在歡笑與刺激中拉近彼此距離', weights: { '黃色': 4, '橘色': 2, '紅色': 1 } },
      { text: '暖心慢活的日式咖啡館：在香醇的咖啡香中，慵懶自在地聊著彼此的夢想與日常', weights: { '淺咖': 4, '墨綠色': 2, '灰色': 1 } },
      { text: '璀璨高雅的景觀餐酒館：看著繁華都市夜景，在精緻奢華氛圍中享受微醺心動', weights: { '深粉': 4, '黑色': 2, '淺紫': 1 } },
      { text: '靜謐神秘的星空天文館：在浩瀚星辰的投影下，並肩坐著，悄悄碰觸彼此溫熱的指尖', weights: { '深藍色': 4, '灰色': 2, '黑色': 1 } }
    ]
  },
  {
    id: 3,
    text: '3. 在一段親密關係中，你覺得維繫兩人感情「最不可或缺的甜蜜催化劑」是？',
    options: [
      { text: '無保留的熱情傳遞：天天對你說愛你、隨時黏在一起擁抱親吻，永遠保持戀愛高溫', weights: { '紅色': 4, '橘色': 2, '深粉': 1 } },
      { text: '無條件的溫柔陪伴：在對方疲憊脆弱時，給予最暖心的傾聽，做彼此的靈魂避風港', weights: { '淺粉': 4, '淺咖': 2, '黃色': 1 } },
      { text: '安穩踏實的承諾與規劃：一起去超市買菜、下廚，共同經營踏實且有安全感的未來', weights: { '深咖': 4, '墨綠色': 2, '黑色': 1 } },
      { text: '心有靈犀的心靈默契：一個對視就能讀懂彼此的心思，擁有精神高度契合的心電感應', weights: { '淺紫': 4, '深藍色': 2, '灰色': 1 } }
    ]
  },
  {
    id: 4,
    text: '4. 如果用一種美麗的花草事物，來形容你對「理想愛情」的純粹期盼，你會選擇？',
    options: [
      { text: '熱烈盛開、鮮豔欲滴的紅玫瑰：代表最真摯、轟轟烈烈且永不退色的熱戀', weights: { '紅色': 4, '深粉': 2 } },
      { text: '迎著陽光、樸實溫馨的向日葵：代表溫暖、陪伴彼此並充滿生活笑聲的甜甜幸福', weights: { '黃色': 4, '淺粉': 2 } },
      { text: '優雅靜謐、芳香四溢的薰衣草：代表心靈契合、尊貴優雅且帶有神秘感應的愛戀', weights: { '淺紫': 4, '深藍色': 2 } },
      { text: '四季長青、堅韌相依的長春藤：代表大地般沉穩可靠，歷經時光洗禮仍不離不棄的深情', weights: { '墨綠色': 4, '灰色': 2 } }
    ]
  }
];

export const PERSONALITY_MAP: { [key: string]: { description: string; partner: string; style: string; detail: string } } = {
  '紅色': {
    description: '熱情奔放、勇氣十足的「盛夏烈陽」',
    partner: '溫暖踏實的【深咖】或平穩和諧的【灰色】',
    style: '大膽耀眼的「美式復古風」，適合搭配經典皮衣與大膽的純紅配飾。',
    detail: '你是一個內心充滿能量與正義感的人！不畏懼冒險，樂於成為焦點，且做事非常有行動力。在人群中你總是那個帶頭衝鋒、溫暖大家的發光體。你的專屬幸運色紅色能為你招來滿滿的貴人與開運能量。'
  },
  '黑色': {
    description: '內斂沉穩、極致優雅的「深邃黑曜石」',
    partner: '陽光溫柔的【黃色】或溫和純真的【淺粉】',
    style: '極簡現代的「高街工裝風」，黑色搭配精緻的金屬配件，流露低調高質感。',
    detail: '你擁有強大的內心與卓越的品味，不隨波逐流。你習慣將真實的情感深藏在沉穩的外表下，給人一種神秘而可靠的信賴感。你重視承諾，做事極度專注。專屬黑色編織飾品是你的守護御守，能幫你隔絕外界雜音，安定氣場。'
  },
  '深藍色': {
    description: '知性冷靜、理智深邃的「靜謐星空」',
    partner: '活潑亮眼的【橘色】或溫馨舒適的【淺咖】',
    style: '知性得體的「雅痞學院風」，深藍配飾能展現你深厚沉靜的專業氣場。',
    detail: '你擁有極佳的邏輯與冷靜的判斷力。面對混亂時，你是最能沈得住氣、理清頭緒的智者。雖然有時給人些許距離感，但熟悉你的人都知道你內心無比溫柔與可靠。深藍色將助你保持澄澈思維，在專注中實現自我。'
  },
  '墨綠色': {
    description: '療癒和諧、富有生命力的「晨曦森林」',
    partner: '純真甜美的【淺粉】或浪漫亮眼的【深粉】',
    style: '慢活隨性的「森系日雜風」，天然棉麻質感與墨綠色織品簡直是天作之合。',
    detail: '你是個自然的療癒大師。熱愛和諧，體貼包容，總能細膩地察覺他人的情緒需求，像大樹一樣給予身邊的人安全感。你嚮往自然、慢活的生活步調。墨綠色能平衡你的能量，在繁忙的日子裡為你鎖住內心的平靜。'
  },
  '黃色': {
    description: '明亮開朗、自信幽默的「向日葵種子」',
    partner: '沉穩守護的【黑色】或高雅深邃的【深藍色】',
    style: '活力四射的「亮眼街頭風」，適合在日常素雅的穿搭中，加入亮黃色點綴。',
    detail: '你是大家的開心果，天生自帶陽光般的熱能與好奇心！你樂觀豁達，擅長發現生活中微小而美好的事物，並用極佳的幽默感感染他人。你的存在就是溫暖。幸運黃色能強化你的招財體質，並為你帶來頂級的好人緣。'
  },
  '橘色': {
    description: '熱情洋溢、富有創意的「溫暖暖陽」',
    partner: '理智沉靜的【深藍色】或知性優雅的【灰色】',
    style: '溫暖文青的「日系簡約風」，溫潤的橘色能為簡約的穿搭注入滿滿的生活熱忱。',
    detail: '你是一個充滿生活品味、創造力與行動力的人。你對新事物抱持極大熱情，腦袋裡總是裝滿天馬行空的靈感。你樂於與人分享快樂，善於用溫度去融化冰冷。橘色是你的能量催化劑，激發你不間斷的創作靈感。'
  },
  '灰色': {
    description: '簡約知性、優雅平衡的「城市晨霧」',
    partner: '自信耀眼的【深粉】或熱情活力的【紅色】',
    style: '精緻洗鍊的「極簡冷淡風」，用灰色與白色的低飽和色階，疊加出精緻美感。',
    detail: '你是一個追求生活平衡與心靈平靜的人。你擁有極高的情商與協調能力，不喜歡衝突，善於在中立的視角中找到最佳平衡點。你的生活美學是簡約、克制卻充滿細節的。灰色是你的知性化身，能幫你維持生活的和諧與秩序。'
  },
  '深粉': {
    description: '自信浪漫、魅力四射的「玫瑰名伶」',
    partner: '溫和自然的【墨綠色】或沉穩大器的【黑色】',
    style: '大膽迷人的「復古芭比風」，深粉配飾能將你獨特的女性魅力與自信大方完美襯托。',
    detail: '你是一個勇敢做自己、熱愛浪漫且充滿個人魅力的人！你懂得欣賞自己的獨特，並樂於在生活中展現對美與愛情的極致追求。你敢愛敢恨，不委屈自己。深粉色能引爆你的桃花與自信能量，讓你在任何場合都閃閃發光。'
  },
  '淺粉': {
    description: '溫柔純真、軟萌夢幻的「春櫻絮語」',
    partner: '包容穩重的【深咖】或知性優雅的【淺紫】',
    style: '軟萌甜美的「溫柔少女風」，粉嫩色彩的織品搭上柔軟毛衣，讓人忍不住想靠近。',
    detail: '你擁有一顆無比純真、細膩且充滿同理心的心。你容易被美好與可愛的事物感動，對人總是溫柔以待、不設防。你的溫柔擁有一種無形的撫慰力量，是身邊人的療癒天使。淺粉色是你的幸運守護，為你帶來不間斷的愛與好人緣。'
  },
  '深咖': {
    description: '踏實可靠、溫潤經典的「焦糖瑪奇朵」',
    partner: '熱情奔放的【紅色】或溫柔純真的【淺粉】',
    style: '經典耐看的「英倫復古風」，深咖配飾與格紋、皮革材質是絕佳搭配，歷久彌新。',
    detail: '你是一個極其踏實、重視安全感與原則的人。你像大地一樣寬廣沉穩，做事一步一腳印，深得朋友與家人的信賴。你懂得欣賞時間沈澱下來的美，熱愛老派浪漫與復古事物。深咖色能給予你踏實的根基，安穩迎向每一步。'
  },
  '淺咖': {
    description: '溫馨舒適、隨性和暖的「午後燕麥奶」',
    partner: '沉靜知性的【深藍色】或優雅浪漫的【淺紫】',
    style: '舒適愜意的「暖系韓風」，大地色與奶茶色系的完美揉合，散發慵懶迷人氣息。',
    detail: '你就像一杯溫暖的燕麥奶，給人無壓力、溫和且好相處的舒服氛圍。你懂得享受生活微小儀式感，不喜歡過度競爭，只追求心靈的自在。你是最佳的傾聽者。淺咖色能為你凝聚溫馨的能量，在日常中慢下來、享受平靜。'
  },
  '淺紫': {
    description: '神祕優雅、靈性獨特的「薰衣草精靈」',
    partner: '溫柔細膩的【淺粉】或開朗陽光的【黃色】',
    style: '仙氣空靈的「溫柔法式風」，淺紫配飾能在細節處隱約流露你的獨特美感與優雅。',
    detail: '你是一個直覺極強、富有藝術天分與靈性美感的人。你對世界有著獨特而深刻的見解，喜歡探尋事物背後的深層意義。你氣質高雅，不隨波逐流。幸運淺紫色能為你招來精神契合的「靈魂貴人」，並放大你的直覺與智慧。'
  }
};
