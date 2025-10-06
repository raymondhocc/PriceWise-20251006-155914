import { Product, PriceHistory, StatCardData } from './types';
export const statCardsData: StatCardData[] = [
  {
    title: 'Average Market Price',
    value: '$1,203.45',
    change: '+2.5%',
    changeType: 'increase',
  },
  {
    title: 'Price Index',
    value: '105.2',
    change: '-0.8%',
    changeType: 'decrease',
  },
  {
    title: 'Margin Impact',
    value: '+$12,890',
    change: '+1.2%',
    changeType: 'increase',
  },
];
export const priceHistoryData: PriceHistory[] = [
  { date: 'Jan', 'Your Price': 980, 'Competitor Average': 1050 },
  { date: 'Feb', 'Your Price': 1020, 'Competitor Average': 1080 },
  { date: 'Mar', 'Your Price': 1010, 'Competitor Average': 1100 },
  { date: 'Apr', 'Your Price': 1150, 'Competitor Average': 1120 },
  { date: 'May', 'Your Price': 1180, 'Competitor Average': 1150 },
  { date: 'Jun', 'Your Price': 1210, 'Competitor Average': 1190 },
  { date: 'Jul', 'Your Price': 1200, 'Competitor Average': 1210 },
];
export const productData: Product[] = [
  {
    id: 'prod-001',
    name: 'Quantum Hyper-Drive X1',
    price: 1250.0,
    competitor: 'TechNova Inc.',
    lastScraped: '2024-07-21 10:30 AM',
    url: 'https://example.com/product-a',
  },
  {
    id: 'prod-002',
    name: 'Aether-Core Processor Z9',
    price: 899.99,
    competitor: 'Gadgetron',
    lastScraped: '2024-07-21 10:28 AM',
    url: 'https://example.com/product-b',
  },
  {
    id: 'prod-003',
    name: 'Chrono-Synch Watch Pro',
    price: 450.5,
    competitor: 'FutureTime Co.',
    lastScraped: '2024-07-21 10:32 AM',
    url: 'https://example.com/product-c',
  },
  {
    id: 'prod-004',
    name: 'Nova-Glide Hoverboard',
    price: 1500.0,
    competitor: 'TechNova Inc.',
    lastScraped: '2024-07-21 10:25 AM',
    url: 'https://example.com/product-d',
  },
  {
    id: 'prod-005',
    name: 'Stealth-Drone MK-IV',
    price: 2100.75,
    competitor: 'Gadgetron',
    lastScraped: '2024-07-21 10:31 AM',
    url: 'https://example.com/product-e',
  },
];