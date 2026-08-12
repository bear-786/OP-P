import Papa from 'papaparse';
import { PogiamItem } from '../types';

export const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQkZgqHnsxvZeLQUjP-txvEJGRDVXUybjdSgLaY-KelrsvoB4RwQmapFqYmvLy9i1kGFjaQmArV0VvA/pub?output=csv';

// Fallback sample data in case sheet is offline or CORS issue
export const FALLBACK_POGIAM_DATA: PogiamItem[] = [
  {
    order: 1,
    code: '๔๐๒',
    title: 'พระบาทสมเด็จพระศิริศักดิ์ธรรมาธิราช บรรยายรัตน มหาสยามินทร์ประชานาถ ศรีวิสุทธิกุล มหาปรีชานุกูล สุธรรมวรคุณ บรมธรรมิกราชาธิราชเจ้าอยู่หัว',
    birthDate: '17 พฤศจิกายน พ.ศ. 2538',
    age: '30',
    robloxUsername: 'uiyhrdhr3',
    rawIndex: 1
  },
  {
    order: 2,
    code: 'HMQS',
    title: 'สมเด็จพระนางเจ้าสุภัทรา รัตนสิริวิมลลักษณ พระบรมราชินี',
    birthDate: '6 เมษายน พ.ศ. 2540',
    age: '29',
    robloxUsername: 'Thanadach26',
    rawIndex: 2
  },
  {
    order: 3,
    code: '๔๐๓',
    title: 'สมเด็จพระอนุชาธิราช สมเด็จพระวชิรศักดาวุธ วิสุทธิยศมหันตบารมี ตรีโลกนาถธรรมิกราช สยามพิพัฒน์จักรินทร์ มหิธรสมมตเทวราช บรมนารถพงศาธิบดี ตรีภูวเนศวรวิสิษฐ์ เอกอัครมหาบุรุษรัตน์ สรรพชัยสิทธิ์วิบูลย์เกษม มหาวีรบดินทร์มหาราช บรมนาถบพิตร',
    birthDate: '28 มกราคม พ.ศ. 2541',
    age: '28',
    robloxUsername: 'INDY964843',
    rawIndex: 3
  },
  {
    order: 4,
    code: 'HMQSP',
    title: 'สมเด็จพระนางเจ้าศิรินภา บรรยายรัตน พระบรมราชินี พระบรมราชินีในรัชกาลที่ 4',
    birthDate: '14 สิงหาคม พ.ศ. 2529',
    age: '39',
    robloxUsername: 'Hari_45452',
    rawIndex: 4
  },
  {
    order: 5,
    code: '๔๐๑',
    title: 'สมเด็จพระเจ้าพี่นางเธอ เจ้าฟ้าสารินีราชสุดา กรมพระสิริโสภาพัณณวดี มหาศิริธรรมธิราชวรภักดี บดินทรเชษฐภคินี สยามบรมราชกุมารี',
    birthDate: '22 กุมภาพันธ์ พ.ศ. 2527',
    age: '42',
    robloxUsername: 'torddddt',
    rawIndex: 5
  },
  {
    order: 6,
    code: '๔๐๔',
    title: 'สมเด็จพระเจ้าน้องยาเธอ เจ้าฟ้าสมาย สิทธิศักดิ์โสภณ วิมลรัตนราชกุมาร นรินทราธิบดินทร',
    birthDate: '9 มิถุนายน พ.ศ. 2543',
    age: '26',
    robloxUsername: 'Thai42881',
    rawIndex: 6
  },
  {
    order: 7,
    code: '๔๐๕',
    title: 'สมเด็จพระเจ้าน้องยาเธอ เจ้าฟ้าราม จักรินทร์เดชานุภาพ มหาจักรินทร์เดโช',
    birthDate: '31 ตุลาคม พ.ศ. 2544',
    age: '24',
    robloxUsername: 'dorfmwr',
    rawIndex: 7
  },
  {
    order: 8,
    code: '๔๐๖',
    title: 'สมเด็จพระเจ้าน้องยาเธอ เจ้าฟ้าคณิน วิทูรปัญญาโกศล มหาเมธาธิบดี',
    birthDate: '3 มีนาคม พ.ศ. 2546',
    age: '23',
    robloxUsername: 'uiyhrdh',
    rawIndex: 8
  },
  {
    order: 9,
    code: '๔๐๗',
    title: 'พระเจ้าบรมวงศ์เธอ พระองค์เจ้ากิตติญาณศุภเมธี รัตนวรากรไพศาล ศรีสุธรรมวิบูลย์ บรมปรีชานาถ',
    birthDate: '19 ธันวาคม พ.ศ. 2547',
    age: '21',
    robloxUsername: 'Jayden12751',
    rawIndex: 9
  },
  {
    order: 10,
    code: '๔๐๘',
    title: 'พระเจ้าวรวงศ์เธอ พระองค์เจ้าวชิรเมธา รวมรัตน์ มหาปรีชานุกูล บวรเดช ศรีสยามกุล',
    birthDate: '11 กรกฎาคม พ.ศ. 2550',
    age: '19',
    robloxUsername: 'BB53161',
    rawIndex: 10
  }
];

export async function fetchPogiamData(sheetUrl: string = DEFAULT_SHEET_URL): Promise<PogiamItem[]> {
  try {
    // Add cache buster
    const fetchUrl = sheetUrl.includes('?') 
      ? `${sheetUrl}&_t=${Date.now()}` 
      : `${sheetUrl}?_t=${Date.now()}`;

    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}`);
    }
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse<string[]>(csvText, {
        header: false,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;
          if (!rows || rows.length < 2) {
            resolve(FALLBACK_POGIAM_DATA);
            return;
          }

          const parsedItems: PogiamItem[] = [];

          // Skip header row at index 0
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < 2) continue;

            const orderNum = parseInt(row[0]?.trim() || `${i}`, 10);
            const code = row[1]?.trim() || '-';
            const title = row[2]?.trim() || '-';
            const birthDate = row[3]?.trim() || '-';
            const age = row[4]?.trim() || '-';
            const robloxUsername = row[5]?.trim() || '-';

            if (title && title !== '-') {
              parsedItems.push({
                order: isNaN(orderNum) ? i : orderNum,
                code,
                title,
                birthDate,
                age,
                robloxUsername,
                rawIndex: i
              });
            }
          }

          if (parsedItems.length === 0) {
            resolve(FALLBACK_POGIAM_DATA);
          } else {
            resolve(parsedItems);
          }
        },
        error: (err) => {
          console.error('PapaParse error:', err);
          resolve(FALLBACK_POGIAM_DATA);
        }
      });
    });
  } catch (error) {
    console.error('Failed to fetch CSV:', error);
    return FALLBACK_POGIAM_DATA;
  }
}

// Convert western digits to Thai digits
export function toThaiDigits(num: number | string): string {
  const thaiNums = ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'];
  return String(num).replace(/[0-9]/g, (digit) => thaiNums[parseInt(digit, 10)]);
}

// Format Roblox user avatar link
export function getRobloxProfileUrl(username: string): string {
  if (!username || username === '-') return '#';
  return `https://www.roblox.com/users/profile?username=${encodeURIComponent(username)}`;
}

// Extract royal rank tier/badge color based on code or order
export function getRankBadgeStyle(order: number, code: string): { bg: string; text: string; border: string; label: string } {
  if (order === 1 || code.includes('๔๐๒')) {
    return {
      bg: 'bg-amber-100 dark:bg-amber-950/60',
      text: 'text-amber-900 dark:text-amber-200',
      border: 'border-amber-400 dark:border-amber-600',
      label: 'องค์พระมหากษัตริย์'
    };
  }
  if (code.startsWith('HMQ') || order === 2 || order === 4) {
    return {
      bg: 'bg-yellow-100 dark:bg-yellow-950/60',
      text: 'text-yellow-900 dark:text-yellow-200',
      border: 'border-yellow-400 dark:border-yellow-600',
      label: 'พระบรมราชินี'
    };
  }
  if (order === 3 || code.includes('๔๐๓')) {
    return {
      bg: 'bg-sky-100 dark:bg-sky-950/60',
      text: 'text-sky-900 dark:text-sky-200',
      border: 'border-sky-400 dark:border-sky-600',
      label: 'สมเด็จพระอนุชาธิราช'
    };
  }
  if (order <= 8) {
    return {
      bg: 'bg-indigo-100 dark:bg-indigo-950/60',
      text: 'text-indigo-900 dark:text-indigo-200',
      border: 'border-indigo-300 dark:border-indigo-700',
      label: 'เจ้าฟ้า / พระบรมวงศ์'
    };
  }
  return {
    bg: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-800 dark:text-slate-200',
    border: 'border-slate-300 dark:border-slate-700',
    label: 'พระองค์เจ้า / พระวงศานุวงศ์'
  };
}
