import React, { useState } from 'react';
import { X, FileSpreadsheet, ExternalLink, RefreshCw, Check, RotateCcw, AlertCircle } from 'lucide-react';
import { DEFAULT_SHEET_URL } from '../lib/pogiamService';

interface SheetSettingsModalProps {
  currentUrl: string;
  isOpen: boolean;
  onClose: () => void;
  onSaveUrl: (newUrl: string) => void;
}

export const SheetSettingsModal: React.FC<SheetSettingsModalProps> = ({
  currentUrl,
  isOpen,
  onClose,
  onSaveUrl,
}) => {
  const [inputUrl, setInputUrl] = useState(currentUrl);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUrl(inputUrl.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    setInputUrl(DEFAULT_SHEET_URL);
    onSaveUrl(DEFAULT_SHEET_URL);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-stone-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-stone-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-950/80 border border-amber-500/20 text-amber-300 hover:bg-amber-500/20 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-amber-100">
              แหล่งข้อมูล Google Sheets CSV
            </h2>
            <p className="text-xs text-amber-200/60 font-light">
              เชื่อมต่อและดึงข้อมูลโปเจียมแบบเรียลไทม์
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-amber-200/80 mb-1.5">
              URL สำหรับดึงไฟล์ CSV จาก Google Sheets
            </label>
            <input
              type="url"
              required
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
              className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-amber-500/30 text-amber-100 font-mono text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-amber-500/20 text-xs text-amber-200/70 space-y-1">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>คำแนะนำการแชร์ Google Sheets:</span>
            </div>
            <p>1. ใน Google Sheets ไปที่ <strong className="text-amber-200">ไฟล์ (File) &gt; แชร์ (Share) &gt; เผยแพร่นั้นไปยังเว็บ (Publish to web)</strong></p>
            <p>2. เลือกรุ่นเป็น <strong className="text-amber-200">Comma-separated values (.csv)</strong> แล้วคัดลอกลิงก์มาวาง</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-amber-500/20 text-amber-300/80 text-xs font-medium transition-all"
                title="คืนค่าเป็น Google Sheets เริ่มต้น"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>คืนค่าเริ่มต้น</span>
              </button>

              <a
                href={inputUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-stone-950 hover:bg-stone-800 border border-amber-500/20 text-amber-300/80 text-xs font-medium transition-all"
                title="เปิดลิงก์ CSV ในแท็บใหม่"
              >
                <span>เปิด CSV</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              {saved ? <Check className="w-4 h-4 text-stone-950" /> : <RefreshCw className="w-4 h-4" />}
              <span>{saved ? 'บันทึกเรียบร้อย!' : 'บันทึกและซิงค์ใหม่'}</span>
            </button>

          </div>
        </form>

      </div>
    </div>
  );
};
