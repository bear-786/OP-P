export interface PogiamItem {
  order: number;              // ลำดับ (e.g., 1, 2, 3)
  code: string;               // รหัส (e.g., ๔๐๒, HMQS, ๔๐๓)
  title: string;              // พระอิสริยยศ
  birthDate: string;          // เฉลิมพระชนมพรรษา/พระราชสมภพ/ประสูติ
  age: string;                // พรรษา (e.g., 30, 29)
  robloxUsername: string;     // username roblox
  rawIndex: number;           // Row index from sheet
}

export type ViewMode = 'table' | 'cards' | 'hierarchy';

export interface FilterOptions {
  search: string;
  sortBy: 'order' | 'code' | 'age' | 'title';
  sortOrder: 'asc' | 'desc';
}

export interface SheetMetadata {
  url: string;
  lastFetched: Date | null;
  totalRows: number;
  isLoading: boolean;
  error: string | null;
}
