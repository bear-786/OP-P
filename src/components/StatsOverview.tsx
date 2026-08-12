import React from 'react';
import { Users, Crown, Calendar, Sparkles, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { PogiamItem, SheetMetadata } from '../types';

interface StatsOverviewProps {
  items: PogiamItem[];
  metadata: SheetMetadata;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ items, metadata }) => {
  // Find King / Queen
  const king = items.find(i => i.order === 1 || i.code.includes('๔๐๒'));
  const queen = items.find(i => i.order === 2 || i.code === 'HMQS');

  // Compute average age if available
  const ages = items
    .map(i => parseInt(i.age, 10))
    .filter(a => !isNaN(a) && a > 0);
  
  const avgAge = ages.length > 0 ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : '-';

  const timeString = metadata.lastFetched
    ? metadata.lastFetched.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '-';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      
      {/* Total Items */}
      <div className="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/40 transition-all">
        <div className="absolute -right-3 -bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Users className="w-24 h-24 text-amber-400" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-amber-200/70">จำนวนในทำเนียบ</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-serif text-amber-100">{items.length}</span>
          <span className="text-xs text-amber-200/60">ลำดับพระอิสริยยศ</span>
        </div>
      </div>

      {/* Head of Royalty (องค์พระมหากษัตริย์) */}
      <div className="bg-gradient-to-br from-amber-950/60 via-stone-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -right-3 -bottom-3 opacity-15">
          <Crown className="w-24 h-24 text-amber-300" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-amber-300/80">ลำดับที่ ๑ (องค์ประธาน)</span>
          <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
            <Crown className="w-4 h-4" />
          </div>
        </div>
        <div className="truncate">
          <div className="text-xs font-semibold text-amber-200 truncate" title={king?.title || '-'}>
            {king ? king.title.split(' ')[0] + ' ' + (king.title.split(' ')[1] || '') : '-'}
          </div>
          <div className="text-[11px] text-amber-300/60 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>รหัส {king?.code || '๔๐๒'} • พรรษา {king?.age || '-'}</span>
          </div>
        </div>
      </div>

      {/* Average Age */}
      <div className="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/40 transition-all">
        <div className="absolute -right-3 -bottom-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Calendar className="w-24 h-24 text-amber-400" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-amber-200/70">พรรษาเฉลี่ย</span>
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-serif text-amber-100">{avgAge}</span>
          <span className="text-xs text-amber-200/60">ปี / พรรษา</span>
        </div>
      </div>

      {/* Data Sync Status */}
      <div className="bg-stone-900/80 border border-amber-500/20 rounded-2xl p-4 shadow-lg backdrop-blur-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-amber-200/70">สถานะ Google Sheets</span>
          {metadata.error ? (
            <AlertCircle className="w-4 h-4 text-rose-400" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          )}
        </div>
        <div className="text-xs font-medium text-amber-100 flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${metadata.isLoading ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          {metadata.isLoading ? 'กำลังซิงค์...' : metadata.error ? 'เกิดข้อผิดพลาด' : 'เชื่อมต่อเรียลไทม์สำเร็จ'}
        </div>
        <div className="text-[11px] text-amber-200/50 flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3" />
          <span>อัปเดตล่าสุด {timeString} น.</span>
        </div>
      </div>

    </div>
  );
};
