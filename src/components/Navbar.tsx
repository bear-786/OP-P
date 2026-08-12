import React from 'react';
import { Crown, RefreshCw, FileSpreadsheet, Copy, LayoutList, Grid, GitFork, Settings } from 'lucide-react';
import { ViewMode, SheetMetadata } from '../types';

interface NavbarProps {
  metadata: SheetMetadata;
  onRefresh: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onOpenSettings: () => void;
  onOpenExport: () => void;
  autoSync: boolean;
  setAutoSync: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  metadata,
  onRefresh,
  viewMode,
  setViewMode,
  onOpenSettings,
  onOpenExport,
  autoSync,
  setAutoSync,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md text-amber-100 border-b border-amber-600/30 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center border border-amber-400/40">
                <Crown className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400">
                  ทำเนียบลำดับโปเจียม
                </h1>
                <span className="text-[10px] sm:text-xs font-sans px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                  Google Sheets Live
                </span>
              </div>
              <p className="text-xs text-amber-200/70 font-light tracking-wide">
                ลำดับพระอิสริยยศและลำดับโปเจียมพระบรมวงศานุวงศ์
              </p>
            </div>
          </div>

          {/* Controls & Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* View Mode Switcher */}
            <div className="flex items-center bg-stone-950/80 p-1 rounded-xl border border-amber-500/20">
              <button
                id="btn-view-table"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-semibold'
                    : 'text-amber-200/80 hover:text-amber-100 hover:bg-stone-900'
                }`}
                title="มุมมองตาราง"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ตาราง</span>
              </button>

              <button
                id="btn-view-cards"
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'cards'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-semibold'
                    : 'text-amber-200/80 hover:text-amber-100 hover:bg-stone-900'
                }`}
                title="มุมมองการ์ด"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">การ์ด</span>
              </button>

              <button
                id="btn-view-hierarchy"
                onClick={() => setViewMode('hierarchy')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'hierarchy'
                    ? 'bg-amber-500 text-stone-950 shadow-md font-semibold'
                    : 'text-amber-200/80 hover:text-amber-100 hover:bg-stone-900'
                }`}
                title="มุมมองแผนผังลำดับชั้น"
              >
                <GitFork className="w-3.5 h-3.5 rotate-180" />
                <span className="hidden sm:inline">แผนผัง</span>
              </button>
            </div>

            {/* Auto Refresh Toggle */}
            <button
              id="btn-toggle-autosync"
              onClick={() => setAutoSync(!autoSync)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                autoSync
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                  : 'bg-stone-950/60 border-amber-500/20 text-stone-400 hover:text-amber-200'
              }`}
              title={autoSync ? 'ปิดการรีเฟรชอัตโนมัติ' : 'เปิดการรีเฟรชอัตโนมัติ (ทุก 30 วินาที)'}
            >
              <span className={`w-2 h-2 rounded-full ${autoSync ? 'bg-emerald-400 animate-ping' : 'bg-stone-500'}`} />
              <span className="hidden md:inline">{autoSync ? 'Auto Sync 30s' : 'Sync ปิด'}</span>
            </button>

            {/* Refresh Button */}
            <button
              id="btn-manual-refresh"
              onClick={onRefresh}
              disabled={metadata.isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-medium transition-all disabled:opacity-50"
              title="ดึงข้อมูลล่าสุดจาก Google Sheets"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${metadata.isLoading ? 'animate-spin text-amber-400' : ''}`} />
              <span className="hidden sm:inline">รีเฟรช</span>
            </button>

            {/* Copy Official Text Export Button */}
            <button
              id="btn-open-export"
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-semibold shadow-md shadow-amber-600/20 transition-all"
              title="คัดลอกข้อความทำเนียบลำดับโปเจียม"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>คัดลอกข้อความ</span>
            </button>

            {/* Sheet Link & Settings */}
            <button
              id="btn-open-settings"
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-stone-950/80 border border-amber-500/20 text-amber-300 hover:bg-amber-500/10 transition-all"
              title="ตั้งค่า Google Sheet Link"
            >
              <Settings className="w-4 h-4" />
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
