import { StatCard } from '@/components/dashboard/StatCard';
import { PriceTrendChart } from '@/components/dashboard/PriceTrendChart';
import { ProductDataTable } from '@/components/dashboard/ProductDataTable';
import { useAppStore } from '@/store/useAppStore';
export function HomePage() {
  const { stats, products, isLoading } = useAppStore();
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((data) => (
          <StatCard key={data.title} {...data} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <PriceTrendChart />
        </div>
        <div className="lg:col-span-3">
          <ProductDataTable products={products} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}