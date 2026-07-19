/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COLORS } from '../data';

interface ProductPreviewProps {
  category: string;
  selectedColors: string[]; // names of colors, e.g. ["淺粉", "淺紫"]
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showPhoto?: boolean;
  imageUrl?: string;
  hideWatermark?: boolean;
}

const categoryToImageUrl: { [key: string]: string } = {
  lanyard: '/src/assets/images/wrist_lanyard_photo_1784208584873.jpg',
  v_lanyard_single: '/src/assets/images/v_lanyard_single_1784210593320.jpg',
  spiral_lanyard_single: '/src/assets/images/spiral_lanyard_single_1784210604157.jpg',
  v_lanyard_multi: '/src/assets/images/v_lanyard_multi_1784210618825.jpg',
  spiral_lanyard_multi: '/src/assets/images/spiral_lanyard_multi_1784210632370.jpg',
  paw: '/src/assets/images/dog_paw_charm_photo_1784208601152.jpg',
  heart: '/src/assets/images/heart_charm_photo_1784208615768.jpg',
  couples_charm: '/src/assets/images/couples_charm_1784210497066.jpg',
  waterproof_stickers: '/src/assets/images/waterproof_stickers_1784210509654.jpg',
  phone_patches: '/src/assets/images/phone_patches_1784210520746.jpg',
  shaker_charm: '/src/assets/images/shaker_charm_1784210530456.jpg',
  brooch_clip: '/src/assets/images/brooch_clip_1784210544278.jpg',
  illustration_charm: '/src/assets/images/illustration_charm_1784210555038.jpg',
  phone_stand: '/src/assets/images/phone_stand_1784210566729.jpg',
  clearance: '/src/assets/images/clearance_items_1784210579803.jpg',
  christmas_tree: '/src/assets/images/christmas_tree_1784293499600.jpg',
};

export const ProductPreview: React.FC<ProductPreviewProps> = ({
  category,
  selectedColors,
  size = 'md',
  showPhoto = false,
  imageUrl,
  hideWatermark = false,
}) => {
  // Map color names to hex codes
  const colorHexes = selectedColors.map(name => {
    const found = COLORS.find(c => c.name === name);
    return found ? found.hex : '#D1D5DB'; // default gray if not found
  });

  // Ensure we have at least one color, fallback if empty
  const hex1 = colorHexes[0] || '#E5E7EB';
  const hex2 = colorHexes[1] || hex1;
  const hex3 = colorHexes[2] || hex2 || hex1;

  // Determine size classes
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-80 h-80',
  };

  const containerSize = sizeMap[size];

  if (showPhoto) {
    const finalImageUrl = imageUrl || categoryToImageUrl[category] || categoryToImageUrl['lanyard'];

    return (
      <div className={`relative flex items-center justify-center bg-white rounded-2xl border border-warm-border shadow-sm overflow-hidden p-0 transition-all duration-300 hover:shadow-md ${containerSize}`}>
        <img
          src={finalImageUrl}
          alt={category}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* Real photograph notice watermark */}
        {!hideWatermark && size !== 'sm' && (
          <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-sm font-sans tracking-wider pointer-events-none z-10 font-bold backdrop-blur-xs">
            實體拍攝 僅供參考
          </div>
        )}
        {/* Dynamic label showing colors */}
        <div className="absolute bottom-2 right-2 flex gap-1 scale-90 bg-white/75 backdrop-blur-xs px-2 py-1 rounded-full border border-warm-border/50 shadow-xs">
          {colorHexes.map((hex, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-white shadow-xs block"
              style={{ backgroundColor: hex }}
              title={selectedColors[i]}
            />
          ))}
        </div>
      </div>
    );
  }

  // Render different SVGs based on product category
  return (
    <div className={`relative flex items-center justify-center bg-radial from-warm-beige-light/30 to-warm-beige-light/70 rounded-2xl border border-warm-border shadow-inner p-4 transition-all duration-500 hover:shadow-md ${containerSize}`}>
      {category === 'lanyard' && (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-lg"
          id="svg-preview-lanyard"
        >
          {/* Hang strap loop background */}
          <path
            d="M 100,25 C 150,25 155,140 100,165 C 45,140 50,25 100,25 Z"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.1"
          />

          {/* We will draw a series of braided segments to simulate weaving.
              To make it look like a real hand-braided lanyard, we can draw overlapping capsules in a loop. */}
          <g id="lanyard-weave">
            {Array.from({ length: 24 }).map((_, i) => {
              // Calculate angles for an oval loop
              const total = 24;
              const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
              
              // Oval coordinates
              const rx = 40;
              const ry = 65;
              const cx = 100;
              const cy = 90;
              const x = cx + rx * Math.cos(angle);
              const y = cy + ry * Math.sin(angle);
              
              // Rotate each link to follow the loop curve
              const rotation = (angle * 180) / Math.PI + 90;

              // Sequence the selected colors
              const colorIndex = i % selectedColors.length;
              const linkColor = colorHexes[colorIndex] || hex1;

              return (
                <g key={i} transform={`translate(${x}, ${y}) rotate(${rotation})`}>
                  {/* Left weave strand */}
                  <path
                    d="M -6,-10 C -12,-5 -12,5 -6,10 L 6,10 C 12,5 12,-5 6,-10 Z"
                    fill={linkColor}
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="1.5"
                  />
                  {/* Fine grain woven texture */}
                  <line x1="-3" y1="-7" x2="3" y2="7" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="-5" y1="-3" x2="1" y2="9" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="-1" y1="-9" x2="5" y2="3" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                </g>
              );
            })}
          </g>

          {/* Lower knot binding (macrame wrap) */}
          <g transform="translate(100, 158)">
            {/* Wrap layers */}
            <rect x="-14" y="0" width="28" height="6" rx="2" fill={hex1} stroke="rgba(0,0,0,0.15)" />
            <rect x="-15" y="5" width="30" height="6" rx="2" fill={hex2} stroke="rgba(0,0,0,0.15)" />
            <rect x="-14" y="10" width="28" height="6" rx="2" fill={hex3} stroke="rgba(0,0,0,0.15)" />
          </g>

          {/* Silver Metal Clasp */}
          <g transform="translate(100, 178)">
            {/* O-Ring */}
            <circle cx="0" cy="2" r="10" fill="none" stroke="#D1D5DB" strokeWidth="3" />
            <circle cx="0" cy="2" r="10" fill="none" stroke="#9CA3AF" strokeWidth="1" />
            
            {/* Clasp Swivel */}
            <path d="M -4,8 L 4,8 L 3,15 L -3,15 Z" fill="linear-gradient(#9CA3AF, #D1D5DB)" stroke="#4B5563" strokeWidth="0.5" />
            
            {/* Lobster hook */}
            <path d="M -7,14 C -10,14 -10,24 0,24 C 10,24 10,14 7,14" fill="none" stroke="#9CA3AF" strokeWidth="2.5" />
          </g>
        </svg>
      )}

      {category === 'paw' && (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-lg"
          id="svg-preview-paw"
        >
          {/* Top Hanging Ring */}
          <circle cx="100" cy="22" r="7" fill="none" stroke="#9CA3AF" strokeWidth="2" />
          {/* Braided loop holding the charm */}
          <path d="M 100,29 L 100,48" stroke={hex1} strokeWidth="5" strokeLinecap="round" />
          <path d="M 98,32 L 98,45" stroke={hex2} strokeWidth="2" strokeLinecap="round" />

          {/* Outer woven border of the paw pad */}
          <path
            d="M 100,50 C 135,50 160,80 160,115 C 160,150 135,165 100,165 C 65,165 40,150 40,115 C 40,80 65,50 100,50 Z"
            fill={hex1}
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="2"
            id="paw-body"
          />

          {/* Weave texture on the paw body (subtle diagonal lattice) */}
          <g opacity="0.15" stroke="#FFFFFF" strokeWidth="1.5">
            <line x1="55" y1="90" x2="145" y2="135" />
            <line x1="50" y1="110" x2="140" y2="155" />
            <line x1="65" y1="70" x2="150" y2="115" />
            <line x1="145" y1="90" x2="55" y2="135" />
            <line x1="150" y1="110" x2="60" y2="155" />
            <line x1="135" y1="70" x2="50" y2="115" />
          </g>

          {/* Large Inner Main Paw Pad (Color 2) */}
          <path
            d="M 100,105 C 118,105 130,116 130,128 C 130,142 116,150 100,150 C 84,150 70,142 70,128 C 70,116 82,105 100,105 Z"
            fill={hex2}
            stroke="rgba(0,0,0,0.15)"
            strokeWidth="1"
            id="paw-main-pad"
          />
          {/* Soft inner shadow overlay on main pad */}
          <path
            d="M 100,108 C 114,108 126,116 126,128 C 126,134 120,142 100,144 C 80,142 74,134 74,128 C 74,116 86,108 100,108 Z"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="2"
          />

          {/* 4 Small Toe Pads (Color 3 - falls back to Color 2 if only 2 selected) */}
          <g id="paw-toes">
            {/* Toe 1 (Far Left) */}
            <ellipse cx="62" cy="85" rx="11" ry="14" fill={hex3} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" transform="rotate(-25 62 85)" />
            {/* Toe 2 (Middle Left) */}
            <ellipse cx="86" cy="72" rx="12" ry="15" fill={hex3} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" transform="rotate(-8 86 72)" />
            {/* Toe 3 (Middle Right) */}
            <ellipse cx="114" cy="72" rx="12" ry="15" fill={hex3} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" transform="rotate(8 114 72)" />
            {/* Toe 4 (Far Right) */}
            <ellipse cx="138" cy="85" rx="11" ry="14" fill={hex3} stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" transform="rotate(25 138 85)" />
          </g>

          {/* Highlights to make pads look plump/soft */}
          <g fill="rgba(255,255,255,0.25)">
            <circle cx="92" cy="116" r="4" />
            <circle cx="59" cy="78" r="2.5" />
            <circle cx="82" cy="65" r="3" />
            <circle cx="110" cy="65" r="3" />
            <circle cx="133" cy="78" r="2.5" />
          </g>

          {/* Cute hanging accent bead */}
          <circle cx="100" cy="176" r="5" fill={hex2} />
          <path d="M 100,165 L 100,171" stroke="#E2E8F0" strokeWidth="2" opacity="0.3" />
        </svg>
      )}

      {category === 'heart' && (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-lg"
          id="svg-preview-heart"
        >
          {/* Top Ring */}
          <circle cx="100" cy="25" r="8" fill="none" stroke="#9CA3AF" strokeWidth="2" />
          {/* Hanging braided lace */}
          <path d="M 100,33 L 100,55" stroke={hex1} strokeWidth="4" strokeLinecap="round" />
          <path d="M 100,38 C 96,43 104,47 100,52" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />

          {/* Woven Heart Body (Color 1 - Only 1 color allowed) */}
          <path
            d="M 100,70 C 100,70 125,45 145,65 C 165,85 140,118 100,145 C 60,118 35,85 55,65 C 75,45 100,70 100,70 Z"
            fill={hex1}
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.5"
            id="heart-shape"
          />

          {/* Weave texture on heart (interlocking diagonal braids) */}
          <g opacity="0.2" stroke="#FFFFFF" strokeWidth="2">
            <path d="M 75,60 C 90,75 100,90 110,105" fill="none" />
            <path d="M 60,75 C 80,95 95,110 105,125" fill="none" />
            <path d="M 85,52 C 95,65 110,80 120,95" fill="none" />
            <path d="M 125,60 C 110,75 100,90 90,105" fill="none" />
            <path d="M 140,75 C 120,95 105,110 95,125" fill="none" />
            <path d="M 115,52 C 105,65 90,80 80,95" fill="none" />
          </g>

          {/* Heart center puff gradient overlay */}
          <path
            d="M 100,73 C 100,73 121,51 138,68 C 153,83 133,111 100,135 C 67,111 47,83 62,68 C 79,51 100,73 100,73 Z"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="3.5"
          />

          {/* Tassel bead */}
          <circle cx="100" cy="151" r="5" fill="#F1F5F9" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
          
          {/* Falling woven Tassel (流蘇) */}
          <g id="heart-tassel">
            {/* Tassel threads */}
            <path d="M 97,156 L 90,185 M 99,156 L 95,188 M 100,156 L 100,190 M 101,156 L 105,188 M 103,156 L 110,185" stroke={hex1} strokeWidth="2" strokeLinecap="round" />
            <path d="M 96,156 L 93,184 M 98,156 L 98,187 M 102,156 L 102,187 M 104,156 L 107,184" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
            
            {/* Tassel wrap ring */}
            <rect x="94" y="156" width="12" height="4" rx="1" fill="#E2E8F0" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
          </g>
        </svg>
      )}

      {category === 'christmas_tree' && (
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-lg"
          id="svg-preview-christmas-tree"
        >
          {/* Top Hanging Ring */}
          <circle cx="100" cy="20" r="8" fill="none" stroke="#9CA3AF" strokeWidth="2" />
          <path d="M 100,28 L 100,45" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />

          {/* Star on top */}
          <g transform="translate(100, 45)">
            <polygon
              points="0,-12 3,-3 11,-3 4,2 7,11 0,5 -7,11 -4,2 -11,-3 -3,-3"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="1"
            />
          </g>

          {/* Christmas Tree layers - woven look with segments */}
          {/* Trunk */}
          <rect x="92" y="150" width="16" height="20" rx="3" fill="#78350F" />

          {/* Layer 3 (Bottom) */}
          <path
            d="M 100,115 L 45,155 C 45,155 75,165 100,160 C 125,165 155,155 155,155 Z"
            fill="#065F46"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.5"
          />
          {/* Layer 2 (Middle) */}
          <path
            d="M 100,85 L 55,125 C 55,125 80,133 100,130 C 120,133 145,125 145,125 Z"
            fill="#047857"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.5"
          />
          {/* Layer 1 (Top) */}
          <path
            d="M 100,55 L 65,95 C 65,95 85,102 100,100 C 115,102 135,95 135,95 Z"
            fill="#059669"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.5"
          />

          {/* Little ornaments */}
          <circle cx="75" cy="142" r="5" fill="#EF4444" />
          <circle cx="125" cy="142" r="5" fill="#FBBF24" />
          <circle cx="85" cy="115" r="4.5" fill="#3B82F6" />
          <circle cx="115" cy="115" r="4.5" fill="#EF4444" />
          <circle cx="100" cy="85" r="4" fill="#E2E8F0" />
        </svg>
      )}

      {/* Dynamic label showing colors */}
      <div className="absolute bottom-2 right-2 flex gap-1 scale-90">
        {colorHexes.map((hex, i) => (
          <span
            key={i}
            className="w-3.5 h-3.5 rounded-full border border-white shadow-sm block animate-bounce"
            style={{ backgroundColor: hex, animationDelay: `${i * 150}ms` }}
            title={selectedColors[i]}
          />
        ))}
      </div>
    </div>
  );
};
