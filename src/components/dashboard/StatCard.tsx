import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { StatCardData } from '@/lib/types';
export function StatCard({ title, value, change, changeType }: StatCardData) {
  const isIncrease = changeType === 'increase';
  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
          <span
            className={cn(
              'flex items-center gap-1',
              isIncrease ? 'text-green-600' : 'text-red-600'
            )}
          >
            {isIncrease ? (
              <Icons.ChevronUp className="h-4 w-4" />
            ) : (
              <Icons.ChevronDown className="h-4 w-4" />
            )}
            {change}
          </span>
          <span className="ml-1">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}