import React from 'react';
import { Crown, ArrowDown, ChevronRight, UserCheck, ExternalLink, Calendar, Copy, Check } from 'lucide-react';
import { PogiamItem } from '../types';
import { getRankBadgeStyle, getRobloxProfileUrl, toThaiDigits } from '../lib/pogiamService';

interface HierarchyViewProps {
  items: PogiamItem[];
  onSelectItem: (item: PogiamItem) => void;
}

export const HierarchyView: React.FC<HierarchyViewProps> = ({ items, onSelectItem }) => {
  const [copiedId, setCopiedId] = React.useState<number | null>(null);

  const copyTitle = (e: React.MouseEvent, item: PogiamItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.title);
    setCopiedId(item.order);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Sort items strictly by order for hierarchy flow
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  if (sortedItems.length === 0) {
    return (
      <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-12 text-center text-amber-200/60 font-light">
        ไม่พบข้อมูลลำดับชั้น
      </div>
    );
  }

  return (
    <div className="relative max-w-4xl mx-auto py-4">
      {/* Central Connector Line */}
      <div className="absolute left-6 sm:left-10 top-8 bottom-8 w-1 bg-gradient-to-b from-amber-400 via-amber-600 to-amber-900/40 rounded-full shadow-sm shadow-amber-500/20 pointer-events-none" />

      <div className="space-y-6">
        {sortedItems.map((item, idx) => {
          const badge = getRankBadgeStyle(item.order, item.code);
          const isKing = item.order === 1 || item.code.includes('๔๐๒');

          return (
            <div key={`hierarchy-${item.order}-${item.rawIndex}`} className="relative pl-14 sm:pl-24">
              
              {/* Order Node Badge on Timeline */}
              <div
                className={`absolute left-0 sm:left-4 top-2.5 w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-serif text-sm font-bold shadow-xl z-10 transition-transform hover:scale-110 ${badge.bg} ${badge.text} ${badge.border}`}
              >
                {toThaiDigits(item.order)}
              </div>

              {/* Card Body */}
              <div
                onClick={() => onSelectItem(item)}
                className={`group bg-stone-900/90 border rounded-2xl p-5 shadow-xl transition-all duration-300 hover:border-amber-400 cursor-pointer backdrop-blur-md ${
                  isKing
                    ? 'border-amber-400/80 bg-gradient-to-r from-amber-950/40 via-stone-900 to-stone-900 shadow-amber-500/10'
                    : 'border-amber-600/30'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg bg-stone-950 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                        รหัส {item.code}
                      </span>

                      <span className="text-xs text-amber-300/80 font-serif font-medium px-2 py-0.5 rounded-md bg-amber-500/10">
                        {badge.label}
                      </span>

                      {isKing && (
                        <span className="flex items-center gap-1 text-xs text-amber-300 font-semibold px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40">
                          <Crown className="w-3.5 h-3.5 text-amber-400" />
                          องค์ประธาน
                        </span>
                      )}
                    </div>

                    <h3 className={`font-serif text-base sm:text-lg font-semibold leading-relaxed ${isKing ? 'text-amber-200' : 'text-stone-100 group-hover:text-amber-200'} transition-colors`}>
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-amber-200/60 pt-1 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{item.birthDate}</span>
                      </div>
                      <div>•</div>
                      <div>พรรษา {item.age !== '-' ? `${item.age} ปี` : '-'}</div>
                    </div>
                  </div>

                  {/* Actions & Roblox badge */}
                  <div className="flex items-center gap-2 self-start md:self-center">
                    {item.robloxUsername && item.robloxUsername !== '-' && (
                      <a
                        href={getRobloxProfileUrl(item.robloxUsername)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-950 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-mono transition-all"
                        title="เปิดโปรไฟล์ Roblox"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span className="hidden sm:inline">{item.robloxUsername}</span>
                        <ExternalLink className="w-3 h-3 text-amber-400/70" />
                      </a>
                    )}

                    <button
                      onClick={(e) => copyTitle(e, item)}
                      className="p-2 rounded-xl bg-stone-950/80 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 transition-all"
                      title="คัดลอกชื่อ"
                    >
                      {copiedId === item.order ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                </div>
              </div>

              {/* Connecting arrow if not last */}
              {idx < sortedItems.length - 1 && (
                <div className="flex justify-start my-1 pl-2 text-amber-500/40">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}

            </div>
          );
        })}
      </div>
    </div>
  );
};
