import React, { useState } from 'react';
import { X, Crown, Calendar, Sparkles, Copy, Check, ExternalLink, UserCheck, Shield, Bookmark } from 'lucide-react';
import { PogiamItem } from '../types';
import { getRankBadgeStyle, getRobloxProfileUrl, toThaiDigits } from '../lib/pogiamService';

interface DetailModalProps {
  item: PogiamItem | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const badge = getRankBadgeStyle(item.order, item.code);
  const isKing = item.order === 1 || item.code.includes('๔๐๒');

  const handleCopy = () => {
    navigator.clipboard.writeText(item.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedFullText = `[ลำดับที่ ${toThaiDigits(item.order)}] รหัส: ${item.code}\n${item.title}\nเฉลิมพระชนมพรรษา: ${item.birthDate} (พรรษา ${item.age} ปี)\nRoblox Username: ${item.robloxUsername}`;

  const handleCopyFull = () => {
    navigator.clipboard.writeText(formattedFullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-stone-100">
        
        {/* Top Royal Watermark */}
        <div className="absolute -right-12 -top-12 opacity-10 pointer-events-none">
          <Crown className="w-56 h-56 text-amber-400" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-950/80 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`px-3 py-1 rounded-xl font-serif text-xs font-bold border flex items-center gap-1.5 shadow-sm ${badge.bg} ${badge.text} ${badge.border}`}>
            <span>ลำดับโปเจียมที่ {toThaiDigits(item.order)}</span>
            {isKing && <Crown className="w-3.5 h-3.5 text-amber-500 animate-bounce" />}
          </span>

          <span className="px-3 py-1 rounded-xl bg-stone-950 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold">
            รหัสประจำองค์: {item.code}
          </span>

          <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
            {badge.label}
          </span>
        </div>

        {/* Title / Name */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 leading-relaxed tracking-wide">
            {item.title}
          </h2>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          
          <div className="bg-stone-950/80 p-4 rounded-2xl border border-amber-500/20 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-200/60 font-medium">เฉลิมพระชนมพรรษา / ประสูติ</div>
              <div className="text-sm font-semibold text-amber-100 mt-0.5">{item.birthDate}</div>
            </div>
          </div>

          <div className="bg-stone-950/80 p-4 rounded-2xl border border-amber-500/20 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-amber-200/60 font-medium">พรรษา / ชนมายุ</div>
              <div className="text-sm font-semibold text-amber-100 mt-0.5">
                {item.age !== '-' ? `${item.age} ปี` : 'ไม่ระบุ'}
              </div>
            </div>
          </div>

        </div>

        {/* Roblox Profile Badge */}
        {item.robloxUsername && item.robloxUsername !== '-' && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-amber-500/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-amber-200/60">บัญชีผู้เล่น Roblox</div>
                <div className="text-sm font-mono font-bold text-amber-100">{item.robloxUsername}</div>
              </div>
            </div>

            <a
              href={getRobloxProfileUrl(item.robloxUsername)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
            >
              <span>ดูโปรไฟล์</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'คัดลอกพระอิสริยยศแล้ว!' : 'คัดลอกเฉพาะพระอิสริยยศ'}</span>
          </button>

          <button
            onClick={handleCopyFull}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-950 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 font-semibold text-xs transition-all"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>คัดลอกข้อความทำเนียบแบบเต็ม</span>
          </button>

        </div>

      </div>
    </div>
  );
};
