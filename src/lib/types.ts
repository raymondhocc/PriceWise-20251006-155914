export type Product = {
  id: string;
  name: string;
  price: number;
  competitor: string;
  lastScraped: string;
  url: string;
  status?: 'active' | 'error';
};
export type PriceHistory = {
  date: string;
  'Your Price': number;
  'Competitor Average': number;
};
export type StatCardData = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
};
export type AnalysisPayload = {
  stats: StatCardData[];
  priceHistory: PriceHistory[];
};