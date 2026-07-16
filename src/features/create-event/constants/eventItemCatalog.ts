export interface CatalogItem {
  id: string;
  name: string;
  unit: string;
  pricePerUnit: number;
  icon: string;
}

export const EVENT_ITEM_CATALOG: CatalogItem[] = [
  { id: "air-mineral", name: "Air mineral (dus)", unit: "dus", pricePerUnit: 42000, icon: "💧" },
  { id: "popok-bayi", name: "Popok bayi (pak)", unit: "pak", pricePerUnit: 65000, icon: "🍼" },
  { id: "selimut", name: "Selimut (pcs)", unit: "pcs", pricePerUnit: 90000, icon: "🛏️" },
  { id: "pakaian", name: "Pakaian layak pakai (pcs)", unit: "pcs", pricePerUnit: 35000, icon: "👕" },
  { id: "mi-instan", name: "Mi instan (dus)", unit: "dus", pricePerUnit: 95000, icon: "🍜" },
];
