import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCard } from './AlertCard';
import { mockFraudAlerts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AlertsFeed() {
  const unresolvedAlerts = mockFraudAlerts.filter((a) => !a.resolved);

  return (
    <Card variant="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>Active Alerts</CardTitle>
          {unresolvedAlerts.length > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
              {unresolvedAlerts.length}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/alerts">
            View All <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {unresolvedAlerts.slice(0, 3).map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
        {unresolvedAlerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No active alerts</p>
            <p className="text-sm">Your account is secure</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
