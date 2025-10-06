import { ReportCard, Report } from "@/components/reports/ReportCard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
const mockReports: Report[] = [
  {
    id: 'rep-001',
    title: 'Q2 Competitor Price Analysis',
    dateRange: 'April 1, 2024 - June 30, 2024',
    summary: 'A comprehensive analysis of price movements for key competitors in the second quarter. TechNova Inc. showed a 5% average price increase, while Gadgetron prices remained stable.'
  },
  {
    id: 'rep-002',
    title: 'Margin Impact Simulation: July',
    dateRange: 'July 1, 2024 - July 31, 2024',
    summary: 'Simulated the impact of a 10% promotional discount on top 5 products. Results indicate a potential 15% increase in sales volume with a 2% decrease in overall gross margin.'
  },
  {
    id: 'rep-003',
    title: 'Annual Price Index Report 2023',
    dateRange: 'January 1, 2023 - December 31, 2023',
    summary: 'The overall market price index increased by 3.2% in 2023. Our pricing strategy remained competitive, staying within 2% of the market average.'
  }
];
export function ReportsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 20),
    to: new Date()
  });
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and view historical reports on market trends and analysis.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Select a report type and date range to generate a new report.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a report" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="competitor-analysis">Competitor Price Analysis</SelectItem>
                <SelectItem value="margin-impact">Margin Impact Simulation</SelectItem>
                <SelectItem value="price-index">Price Index History</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Date range</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => alert('Report generation is not yet implemented.')}>Generate Report</Button>
        </CardFooter>
      </Card>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-4">Recent Reports</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}