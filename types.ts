
export type View = 'dashboard' | 'calendar' | 'alerts' | 'integrations' | 'settings' | 'analytics';

export interface Company {
  id: string;
  name: string;
  logo: string;
  status: 'active' | 'warning' | 'error';
  nextSync: string;
  weeklyGoal: { current: number; total: number };
  monthlyGoal: { current: number; total: number };
}

export interface Alert {
  id: string;
  companyName: string;
  logo: string;
  issueType: string;
  metricStatus: string;
  progress: number;
  detectedAt: string;
  status: 'active' | 'snoozed' | 'resolved';
}
