export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface Transaction {
  id: string;
  upiId: string;
  amount: number;
  type: 'send' | 'receive';
  status: 'pending' | 'completed' | 'failed' | 'blocked';
  timestamp: Date;
  riskScore: number;
  riskLevel: RiskLevel;
  merchantName?: string;
  deviceId?: string;
  location?: {
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  ipAddress?: string;
  flags: string[];
}

export interface FraudAlert {
  id: string;
  type: FraudAlertType;
  severity: RiskLevel;
  message: string;
  description: string;
  timestamp: Date;
  transactionId?: string;
  resolved: boolean;
  evidence?: Evidence[];
}

export type FraudAlertType =
  | 'anomaly_detected'
  | 'suspicious_upi'
  | 'fake_screenshot'
  | 'qr_manipulation'
  | 'social_engineering'
  | 'refund_scam'
  | 'test_transaction'
  | 'geo_mismatch'
  | 'device_mismatch'
  | 'velocity_breach'
  | 'blacklisted_upi'
  | 'sim_swap'
  | 'account_takeover';

export interface Evidence {
  id: string;
  type: 'screenshot' | 'device_info' | 'location' | 'browser_info' | 'message_log';
  data: Record<string, unknown>;
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  upiId: string;
  trustScore: number;
  riskLevel: RiskLevel;
  isVerified: boolean;
  createdAt: Date;
  lastActive: Date;
  transactionCount: number;
  flaggedTransactions: number;
}

export interface TrustNode {
  id: string;
  upiId: string;
  name: string;
  trustScore: number;
  riskLevel: RiskLevel;
  transactionCount: number;
  isBlacklisted: boolean;
}

export interface TrustEdge {
  source: string;
  target: string;
  transactionCount: number;
  totalAmount: number;
  riskLevel: RiskLevel;
}

export interface TrustGraph {
  nodes: TrustNode[];
  edges: TrustEdge[];
}

export interface ScamNews {
  id: string;
  title: string;
  description: string;
  category: 'warning' | 'advisory' | 'news' | 'guideline';
  source: string;
  url?: string;
  publishedAt: Date;
  tags: string[];
}

export interface FraudPattern {
  id: string;
  name: string;
  description: string;
  indicators: string[];
  riskWeight: number;
  detectionCount: number;
  lastDetected?: Date;
  isActive: boolean;
}

export interface DeviceInfo {
  id: string;
  fingerprint: string;
  browser: string;
  os: string;
  device: string;
  screenResolution: string;
  timezone: string;
  language: string;
  isTrusted: boolean;
  firstSeen: Date;
  lastSeen: Date;
}

export interface RiskAssessment {
  overallScore: number;
  riskLevel: RiskLevel;
  factors: {
    name: string;
    score: number;
    weight: number;
    description: string;
  }[];
  recommendations: string[];
}

export interface HeatmapData {
  city: string;
  lat: number;
  lng: number;
  fraudCount: number;
  totalTransactions: number;
  riskLevel: RiskLevel;
}

export interface TimelineEvent {
  id: string;
  type: 'transaction' | 'alert' | 'verification' | 'block' | 'unblock';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface FraudStory {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: FraudStoryStep[];
  prevention: string[];
  realCase: boolean;
}

export interface FraudStoryStep {
  id: string;
  order: number;
  title: string;
  description: string;
  type: 'scammer_action' | 'victim_action' | 'warning' | 'outcome';
  icon?: string;
}

export interface DashboardStats {
  totalTransactions: number;
  blockedTransactions: number;
  fraudAlertsToday: number;
  averageRiskScore: number;
  trustedContacts: number;
  flaggedContacts: number;
}
