import React, { useState } from 'react';
import { Crown, Sparkles, Copy, Check, ExternalLink, UserCheck, Calendar, Hash } from 'lucide-react';
import { PogiamItem } from '../types';
import { getRankBadgeStyle, getRobloxProfileUrl, toThaiDigits } from '../lib/pogiamService';

interface CardsViewProps {
  items: PogiamItem[];
  onSelectItem: (item: PogiamItem) => void;
}

export const CardsView: React.FC<CardsViewProps> = ({ items, onSelectItem }) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyTitle = (e: React.MouseEvent, item: PogiamItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.title);
    setCopiedId(item.order);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-12 text-center text-amber-200/60 font-light">
        ไม่พบข้อมูลที่ค้นหา
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const badge = getRankBadgeStyle(item.order, item.code);
        const isKing = item.order === 1 || item.code.includes('๔๐๒');

        return (
          <div
            key={`pogiam-card-${item.order}-${item.rawIndex}`}
            onClick={() => onSelectItem(item)}
            className={`group relative bg-stone-900/90 border rounded-2xl p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer flex flex-col justify-between overflow-hidden backdrop-blur-md ${
              isKing
                ? 'border-amber-400/70 bg-gradient-to-br from-stone-900 via-amber-950/40 to-stone-900 shadow-amber-500/10'
                : 'border-amber-600/30 hover:border-amber-500/60'
            }`}
          >
            {/* Background Crest Watermark */}
            <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Crown className="w-32 h-32 text-amber-400" />
            </div>

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-serif font-bold border flex items-center gap-1.5 shadow-sm ${badge.bg} ${badge.text} ${badge.border}`}>
                    <span>ลำดับที่ {toThaiDigits(item.order)}</span>
                    {isKing && <Crown className="w-3.5 h-3.5 text-amber-500 animate-bounce" />}
                  </span>
                  
                  <span className="px-2.5 py-0.5 rounded-lg bg-stone-950 border border-amber-500/20 text-amber-300 font-mono text-xs font-semibold">
                    {item.code}
                  </span>
                </div>

                <button
                  onClick={(e) => copyTitle(e, item)}
                  className="p-1.5 rounded-lg bg-stone-950/80 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 hover:text-amber-100 transition-all"
                  title="คัดลอกพระอิสริยยศ"
                >
                  {copiedId === item.order ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Title / Name */}
              <h2 className={`font-serif text-base sm:text-lg leading-snug font-semibold mb-4 ${isKing ? 'text-amber-200' : 'text-stone-100 group-hover:text-amber-200'} transition-colors`}>
                {item.title}
              </h2>
            </div>

            {/* Footer Meta */}
            <div className="pt-3 border-t border-amber-900/30 flex flex-col gap-2.5">
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-amber-200/70">
                  <Calendar className="w-3.5 h-3.5 text-amber-400/80 flex-shrink-0" />
                  <span className="truncate">{item.birthDate}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-amber-300 font-medium justify-end">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>พรรษา {item.age !== '-' ? `${item.age} ปี` : '-'}</span>
                </div>
              </div>

              {/* Roblox Username Link */}
              {item.robloxUsername && item.robloxUsername !== '-' && (
                <a
                  href={getRobloxProfileUrl(item.robloxUsername)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-stone-950/80 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-mono transition-all group/roblox"
                >
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Roblox: {item.robloxUsername}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400/60 group-hover/roblox:text-amber-200" />
                </a>
              )}

            </div>

          </div>
        );
      })}
    </div>
  );
};
