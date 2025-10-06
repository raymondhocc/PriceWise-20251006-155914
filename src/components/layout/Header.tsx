import React from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppStore } from '@/store/useAppStore';
import { sendCommand } from '@/lib/api';
import { Product, AnalysisPayload } from '@/lib/types';
import { Toaster, toast } from 'sonner';
export function Header() {
  const [open, setOpen] = React.useState(false);
  const { setLoading, addProduct, updateStats, updatePriceHistory } = useAppStore();
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);
  const handleCommand = async (command: string) => {
    setOpen(false);
    setLoading(true);
    toast.info(`Processing command: "${command}"`);
    try {
      const response = await sendCommand(command);
      if (response.success && response.data) {
        if (response.data.type === 'product') {
          addProduct(response.data.payload as Product);
          toast.success('New product is now being monitored.');
        } else if (response.data.type === 'analysis') {
          const { stats, priceHistory } = response.data.payload as AnalysisPayload;
          updateStats(stats);
          updatePriceHistory(priceHistory);
          toast.success('Analysis complete. Dashboard updated.');
        } else {
          const payload = response.data.payload as { message: string };
          toast.error(payload.message || 'Command not recognized.');
        }
      } else {
        toast.error(response.error || 'Failed to execute command.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster position="top-center" richColors />
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="relative h-9 w-full justify-start rounded-[0.5rem] text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}
              >
                <Icons.Search className="mr-2 h-4 w-4" />
                <span className="hidden lg:inline-flex">Search commands...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </nav>
          </div>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder="e.g., monitor https://example.com/product"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand((e.target as HTMLInputElement).value);
              }
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => handleCommand('monitor https://example.com/product-a')}>
                <span>monitor https://example.com/product-a</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('calculate price index for product-a')}>
                <span>calculate price index for product-a</span>
              </CommandItem>
              <CommandItem onSelect={() => handleCommand('show margin impact for a 10% price drop')}>
                <span>show margin impact for a 10% price drop</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </header>
    </>
  );
}