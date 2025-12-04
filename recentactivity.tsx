import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionRow } from './TransactionRow';
import { mockTransactions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RecentActivity() {
  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/transactions">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockTransactions.slice(0, 5).map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </CardContent>
    </Card>
  );
}
