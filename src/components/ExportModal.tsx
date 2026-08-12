import React, { useState } from 'react';
import { X, Copy, Check, FileText, Download, Share2 } from 'lucide-react';
import { PogiamItem } from '../types';
import { toThaiDigits } from '../lib/pogiamService';

interface ExportModalProps {
  items: PogiamItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ items, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [includeRoblox, setIncludeRoblox] = useState(true);

  if (!isOpen) return null;

  const sortedItems = [...items].sort((a, b) => a.order - b.order);

  const generatedText = `👑 ประกาศลำดับโปเจียมแห่งพระบรมวงศานุวงศ์ 👑
อัปเดตข้อมูลจากทำเนียบ Google Sheets
--------------------------------------------------
${sortedItems
  .map(
    item =>
      `ลำดับที่ ${toThaiDigits(item.order)} [รหัส ${item.code}]
${item.title}
• เฉลิมพระชนมพรรษา: ${item.birthDate} (พรรษา ${item.age} ปี)` +
      (includeRoblox && item.robloxUsername && item.robloxUsername !== '-'
        ? `\n• Roblox: ${item.robloxUsername}`
        : '')
  )
  .join('\n\n')}
--------------------------------------------------
ตราไว้ ณ ทำเนียบลำดับโปเจียมออนไลน์`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `ทำเนียบลำดับโปเจียม_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-stone-100 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-950/80 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-amber-100">
              คัดลอกข้อความทำเนียบลำดับโปเจียม
            </h2>
            <p className="text-xs text-amber-200/60 font-light">
              สร้างข้อความทางการสำหรับนำไปใช้ใน Discord, งานเอกสาร หรือข่าวประกาศ
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="flex items-center gap-4 mb-3 px-1 text-xs text-amber-200/80">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeRoblox}
              onChange={(e) => setIncludeRoblox(e.target.checked)}
              className="accent-amber-500 rounded w-4 h-4"
            />
            <span>แสดง Roblox Username ในข้อความ</span>
          </label>
        </div>

        {/* Text Preview Area */}
        <div className="flex-1 min-h-[250px] bg-stone-950 p-4 rounded-2xl border border-amber-500/20 font-mono text-xs text-amber-100/90 overflow-y-auto leading-relaxed shadow-inner whitespace-pre-wrap select-all">
          {generatedText}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 mt-2">
          
          <button
            onClick={handleCopyText}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'คัดลอกข้อความเรียบร้อย!' : 'คัดลอกข้อความทั้งหมด'}</span>
          </button>

          <button
            onClick={handleDownloadFile}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-950 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 font-semibold text-xs transition-all"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>ดาวน์โหลดเป็นไฟล์ .txt</span>
          </button>

        </div>

      </div>
    </div>
  );
};
