import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Filter, RefreshCw, Crown, AlertCircle, FileSpreadsheet, Sparkles, X, ArrowUpDown } from 'lucide-react';
import { PogiamItem, ViewMode, FilterOptions, SheetMetadata } from './types';
import { fetchPogiamData, DEFAULT_SHEET_URL } from './lib/pogiamService';
import { Navbar } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { TableView } from './components/TableView';
import { CardsView } from './components/CardsView';
import { HierarchyView } from './components/HierarchyView';
import { DetailModal } from './components/DetailModal';
import { ExportModal } from './components/ExportModal';
import { SheetSettingsModal } from './components/SheetSettingsModal';

export default function App() {
  const [sheetUrl, setSheetUrl] = useState<string>(DEFAULT_SHEET_URL);
  const [items, setItems] = useState<PogiamItem[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [autoSync, setAutoSync] = useState<boolean>(true);
  
  const [selectedItem, setSelectedItem] = useState<PogiamItem | null>(null);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [metadata, setMetadata] = useState<SheetMetadata>({
    url: DEFAULT_SHEET_URL,
    lastFetched: null,
    totalRows: 0,
    isLoading: true,
    error: null,
  });

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    search: '',
    sortBy: 'order',
    sortOrder: 'asc',
  });

  // Fetch Data Function
  const loadData = useCallback(async (url: string = sheetUrl) => {
    setMetadata(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await fetchPogiamData(url);
      setItems(data);
      setMetadata({
        url,
        lastFetched: new Date(),
        totalRows: data.length,
        isLoading: false,
        error: null,
      });
    } catch (err: any) {
      console.error('Failed to load data:', err);
      setMetadata(prev => ({
        ...prev,
        isLoading: false,
        error: 'ไม่สามารถเชื่อมต่อ Google Sheets ได้ ใช้ข้อมูลสำรองล่าสุด',
      }));
    }
  }, [sheetUrl]);

  // Initial Load
  useEffect(() => {
    loadData(sheetUrl);
  }, [sheetUrl, loadData]);

  // Auto Refresh Interval (every 30 seconds if autoSync is active)
  useEffect(() => {
    if (!autoSync) return;
    const interval = setInterval(() => {
      loadData(sheetUrl);
    }, 30000);
    return () => clearInterval(interval);
  }, [autoSync, sheetUrl, loadData]);

  // Search & Sorting Logic
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Filter by search query
    if (filterOptions.search.trim()) {
      const q = filterOptions.search.trim().toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.birthDate.toLowerCase().includes(q) ||
        item.robloxUsername.toLowerCase().includes(q) ||
        item.order.toString().includes(q) ||
        item.age.toString().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA: any;
      let valB: any;

      if (filterOptions.sortBy === 'order') {
        valA = a.order;
        valB = b.order;
      } else if (filterOptions.sortBy === 'code') {
        valA = a.code;
        valB = b.code;
      } else if (filterOptions.sortBy === 'age') {
        valA = parseInt(a.age, 10) || 0;
        valB = parseInt(b.age, 10) || 0;
      } else if (filterOptions.sortBy === 'title') {
        valA = a.title;
        valB = b.title;
      }

      if (valA < valB) return filterOptions.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return filterOptions.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [items, filterOptions]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950 flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        metadata={metadata}
        onRefresh={() => loadData(sheetUrl)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        autoSync={autoSync}
        setAutoSync={setAutoSync}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Error / Alert Banner if any */}
        {metadata.error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <span>{metadata.error}</span>
            </div>
            <button
              onClick={() => loadData(sheetUrl)}
              className="px-3 py-1 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-100 font-medium text-xs border border-rose-500/40 transition-all"
            >
              ลองใหม่
            </button>
          </div>
        )}

        {/* Stats Summary Bar */}
        <StatsOverview items={items} metadata={metadata} />

        {/* Filter and Search Bar */}
        <div className="bg-stone-900/80 border border-amber-600/30 rounded-2xl p-4 mb-6 shadow-xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterOptions.search}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, search: e.target.value }))}
                placeholder="ค้นหาพระอิสริยยศ, รหัส, Roblox Username หรือวันประสูติ..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-stone-950 border border-amber-500/30 text-amber-100 placeholder-amber-200/40 text-xs sm:text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
              {filterOptions.search && (
                <button
                  onClick={() => setFilterOptions(prev => ({ ...prev, search: '' }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-amber-200/60 hover:text-amber-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              
              <div className="flex items-center gap-1.5 text-xs text-amber-200/80">
                <Filter className="w-3.5 h-3.5 text-amber-400" />
                <span>จัดเรียง:</span>
              </div>

              <select
                value={filterOptions.sortBy}
                onChange={(e) => setFilterOptions(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="px-3 py-2 rounded-xl bg-stone-950 border border-amber-500/30 text-amber-200 text-xs focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="order">ตามลำดับโปเจียม</option>
                <option value="code">ตามรหัสประจำองค์</option>
                <option value="age">ตามพรรษา / ชนมายุ</option>
                <option value="title">ตามชื่อพระอิสริยยศ</option>
              </select>

              <button
                onClick={() => setFilterOptions(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}
                className="p-2 rounded-xl bg-stone-950 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-all"
                title={`เปลี่ยนทิศทาง (${filterOptions.sortOrder === 'asc' ? 'น้อยไปมาก' : 'มากไปน้อย'})`}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

        {/* View Component Render */}
        {viewMode === 'table' && (
          <TableView
            items={filteredAndSortedItems}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            onSelectItem={setSelectedItem}
          />
        )}

        {viewMode === 'cards' && (
          <CardsView
            items={filteredAndSortedItems}
            onSelectItem={setSelectedItem}
          />
        )}

        {viewMode === 'hierarchy' && (
          <HierarchyView
            items={filteredAndSortedItems}
            onSelectItem={setSelectedItem}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 bg-stone-900 border-t border-amber-600/30 py-6 text-center text-xs text-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="font-serif">ทำเนียบลำดับโปเจียม (Order of Precedence)</span>
          </div>

          <div className="flex items-center gap-1 text-amber-200/50">
            <span>ข้อมูลเชื่อมโยงจาก Google Sheets สดแบบเรียลไทม์</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />

      <ExportModal
        items={items}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      <SheetSettingsModal
        currentUrl={sheetUrl}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveUrl={(newUrl) => {
          setSheetUrl(newUrl);
          loadData(newUrl);
        }}
      />

    </div>
  );
}
