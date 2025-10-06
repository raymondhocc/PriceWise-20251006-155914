import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { getProducts } from '@/lib/api';
import { TargetsDataTable } from '@/components/targets/TargetsDataTable';
import { Toaster } from 'sonner';
export function TargetsPage() {
  const { products, setProducts, isLoading } = useAppStore();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.success && response.data) {
        setProducts(response.data);
      }
    };
    fetchProducts();
  }, [setProducts]);
  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="space-y-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Monitored Targets</h2>
            <p className="text-muted-foreground">
              Here is a list of all products you are currently monitoring.
            </p>
          </div>
        </div>
        <TargetsDataTable products={products} isLoading={isLoading} />
      </div>
    </>
  );
}