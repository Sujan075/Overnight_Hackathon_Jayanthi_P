import { ArrowDownLeft, ArrowUpRight, Ban, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/types/fraud';
import { formatDistanceToNow } from 'date-fns';

interface TransactionRowProps {
  transaction: Transaction;
  onClick?: (transaction: Transaction) => void;
}

export function TransactionRow({ transaction, onClick }: TransactionRowProps) {
  const statusConfig = {
    completed: { icon: CheckCircle, variant: 'success' as const, text: 'Completed' },
    pending: { icon: Clock, variant: 'pending' as const, text: 'Pending' },
    failed: { icon: AlertTriangle, variant: 'danger' as const, text: 'Failed' },
    blocked: { icon: Ban, variant: 'danger' as const, text: 'Blocked' },
  };

  const config = statusConfig[transaction.status];
  const StatusIcon = config.icon;

  return (
    <div
      onClick={() => onClick?.(transaction)}
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-colors cursor-pointer',
        transaction.status === 'blocked' && 'border-destructive/30 bg-destructive/5'
      )}
    >
      {/* Direction Icon */}
      <div
        className={cn(
          'h-10 w-10 rounded-full flex items-center justify-center',
          transaction.type === 'send' ? 'bg-destructive/10' : 'bg-success/10'
        )}
      >
        {transaction.type === 'send' ? (
          <ArrowUpRight className="h-5 w-5 text-destructive" />
        ) : (
          <ArrowDownLeft className="h-5 w-5 text-success" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">
            {transaction.merchantName || transaction.upiId}
          </p>
          {transaction.flags.length > 0 && (
            <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">{transaction.upiId}</p>
      </div>

      {/* Amount */}
      <div className="text-right">
        <p
          className={cn(
            'font-semibold tabular-nums',
            transaction.type === 'send' ? 'text-foreground' : 'text-success'
          )}
        >
          {transaction.type === 'send' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
        </p>
      </div>

      {/* Status */}
      <Badge variant={config.variant} className="shrink-0">
        <StatusIcon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>

      {/* Risk Score */}
      <div
        className={cn(
          'w-12 h-12 rounded-lg flex flex-col items-center justify-center text-xs font-mono',
          transaction.riskLevel === 'low'
            ? 'bg-success/20 text-success'
            : transaction.riskLevel === 'medium'
            ? 'bg-warning/20 text-warning'
            : 'bg-destructive/20 text-destructive'
        )}
      >
        <span className="font-bold text-lg">{transaction.riskScore}</span>
        <span className="text-[10px] opacity-70">RISK</span>
      </div>
    </div>
  );
}
