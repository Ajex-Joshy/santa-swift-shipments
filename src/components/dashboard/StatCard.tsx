import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
  className
}: StatCardProps) => {
  const variantStyles = {
    default: 'border-border/50',
    success: 'border-status-success/30 bg-status-success/5',
    warning: 'border-status-warning/30 bg-status-warning/5',
    danger: 'border-status-danger/30 bg-status-danger/5',
    info: 'border-status-info/30 bg-status-info/5'
  };

  return (
    <div className={cn(
      'stat-card glow-effect',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight truncate">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
          {trend && (
            <div className={cn(
              'mt-2 inline-flex items-center text-xs font-medium',
              trend.value >= 0 ? 'text-status-success' : 'text-status-danger'
            )}>
              <span>{trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%</span>
              <span className="ml-1 text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 ml-4 p-2 rounded-lg bg-muted/50">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
