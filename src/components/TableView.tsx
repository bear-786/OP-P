import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, Check, ExternalLink, Crown, Sparkles, UserCheck } from 'lucide-react';
import { PogiamItem, FilterOptions } from '../types';
import { getRankBadgeStyle, getRobloxProfileUrl, toThaiDigits } from '../lib/pogiamService';

interface TableViewProps {
  items: PogiamItem[];
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onSelectItem: (item: PogiamItem) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  items,
  filterOptions,
  setFilterOptions,
  onSelectItem,
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleSort = (field: FilterOptions['sortBy']) => {
    setFilterOptions(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const copyTitle = (e: React.MouseEvent, item: PogiamItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.title);
    setCopiedId(item.order);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSortIcon = (field: FilterOptions['sortBy']) => {
    if (filterOptions.sortBy !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-amber-500/40" />;
    return filterOptions.sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-amber-400" />
    );
  };

  return (
    <div className="bg-stone-900/90 border border-amber-600/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-950/90 border-b border-amber-600/30 text-amber-200/90 text-xs font-serif uppercase tracking-wider">
              
              {/* Order Column */}
              <th
                onClick={() => handleSort('order')}
                className="py-4 px-4 sm:px-6 cursor-pointer hover:bg-amber-500/10 transition-colors w-24"
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <span>ลำดับ</span>
                  {getSortIcon('order')}
                </div>
              </th>

              {/* Code Column */}
              <th
                onClick={() => handleSort('code')}
                className="py-4 px-4 cursor-pointer hover:bg-amber-500/10 transition-colors w-28"
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <span>รหัส</span>
                  {getSortIcon('code')}
                </div>
              </th>

              {/* Title Column */}
              <th
                onClick={() => handleSort('title')}
                className="py-4 px-4 sm:px-6 cursor-pointer hover:bg-amber-500/10 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-semibold">
                  <span>พระอิสริยยศ / พระนาม</span>
                  {getSortIcon('title')}
                </div>
              </th>

              {/* Birth Date Column */}
              <th className="py-4 px-4 font-semibold hidden md:table-cell w-56">
                เฉลิมพระชนมพรรษา / ประสูติ
              </th>

              {/* Age Column */}
              <th
                onClick={() => handleSort('age')}
                className="py-4 px-4 cursor-pointer hover:bg-amber-500/10 transition-colors hidden sm:table-cell w-28 text-center"
              >
                <div className="flex items-center justify-center gap-1.5 font-semibold">
                  <span>พรรษา</span>
                  {getSortIcon('age')}
                </div>
              </th>

              {/* Roblox Username Column */}
              <th className="py-4 px-4 sm:px-6 font-semibold w-44">
                Roblox Username
              </th>

              {/* Actions Column */}
              <th className="py-4 px-4 text-center w-20">
                จัดการ
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-amber-900/20 text-stone-200 text-sm">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-amber-200/60 font-light">
                  ไม่พบข้อมูลที่ค้นหา
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const badge = getRankBadgeStyle(item.order, item.code);
                const isKing = item.order === 1 || item.code.includes('๔๐๒');

                return (
                  <tr
                    key={`pogiam-row-${item.order}-${item.rawIndex}`}
                    onClick={() => onSelectItem(item)}
                    className={`group hover:bg-amber-500/10 transition-all cursor-pointer ${
                      isKing ? 'bg-amber-950/20 border-l-4 border-l-amber-400' : ''
                    }`}
                  >
                    {/* Order Number Badge */}
                    <td className="py-4 px-4 sm:px-6 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-8 h-8 rounded-xl border flex items-center justify-center font-serif text-xs font-bold shadow-sm ${badge.bg} ${badge.text} ${badge.border}`}>
                          {toThaiDigits(item.order)}
                        </span>
                        {isKing && <Crown className="w-4 h-4 text-amber-400 animate-pulse" />}
                      </div>
                    </td>

                    {/* Code */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-stone-950 border border-amber-500/20 text-amber-300 font-semibold">
                        {item.code}
                      </span>
                    </td>

                    {/* Title */}
                    <td className="py-4 px-4 sm:px-6 font-serif leading-relaxed">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className={`font-semibold text-sm sm:text-base ${isKing ? 'text-amber-200 font-bold' : 'text-stone-100 group-hover:text-amber-200'}`}>
                            {item.title}
                          </div>
                          <div className="md:hidden text-xs text-amber-200/60 mt-1">
                            {item.birthDate} {item.age !== '-' ? `• พรรษา ${item.age}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Birth Date */}
                    <td className="py-4 px-4 hidden md:table-cell text-xs text-stone-300 font-light whitespace-nowrap">
                      {item.birthDate}
                    </td>

                    {/* Age / Years */}
                    <td className="py-4 px-4 hidden sm:table-cell text-center font-mono text-sm font-semibold text-amber-300/90 whitespace-nowrap">
                      {item.age !== '-' ? `${item.age}` : '-'}
                    </td>

                    {/* Roblox Username Badge */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      {item.robloxUsername && item.robloxUsername !== '-' ? (
                        <a
                          href={getRobloxProfileUrl(item.robloxUsername)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950/80 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-mono transition-all group/roblox"
                          title="ดูโปรไฟล์ Roblox"
                        >
                          <UserCheck className="w-3.5 h-3.5 text-amber-400 group-hover/roblox:scale-110 transition-transform" />
                          <span className="truncate max-w-[110px]">{item.robloxUsername}</span>
                          <ExternalLink className="w-3 h-3 text-amber-400/60 group-hover/roblox:text-amber-300" />
                        </a>
                      ) : (
                        <span className="text-stone-500 text-xs font-mono">-</span>
                      )}
                    </td>

                    {/* Copy Button */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={(e) => copyTitle(e, item)}
                        className="p-2 rounded-lg bg-stone-950/60 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 hover:text-amber-100 transition-all"
                        title="คัดลอกพระอิสริยยศ"
                      >
                        {copiedId === item.order ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
