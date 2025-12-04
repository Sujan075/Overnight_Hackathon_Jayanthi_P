import type {
  Transaction,
  FraudAlert,
  User,
  TrustGraph,
  ScamNews,
  FraudPattern,
  DashboardStats,
  HeatmapData,
  FraudStory,
  RiskLevel,
} from '@/types/fraud';

export const mockDashboardStats: DashboardStats = {
  totalTransactions: 1247,
  blockedTransactions: 23,
  fraudAlertsToday: 7,
  averageRiskScore: 24,
  trustedContacts: 156,
  flaggedContacts: 12,
};

export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    upiId: 'merchant@paytm',
    amount: 2500,
    type: 'send',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    riskScore: 15,
    riskLevel: 'low',
    merchantName: 'Amazon Pay',
    location: { city: 'Mumbai', country: 'India', lat: 19.076, lng: 72.8777 },
    flags: [],
  },
  {
    id: 'txn_002',
    upiId: 'unknown123@ybl',
    amount: 49999,
    type: 'send',
    status: 'blocked',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    riskScore: 92,
    riskLevel: 'critical',
    location: { city: 'Unknown', country: 'India', lat: 28.6139, lng: 77.209 },
    flags: ['high_amount', 'unknown_recipient', 'velocity_breach', 'geo_mismatch'],
  },
  {
    id: 'txn_003',
    upiId: 'friend@okaxis',
    amount: 500,
    type: 'receive',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    riskScore: 5,
    riskLevel: 'low',
    merchantName: 'Rahul Sharma',
    location: { city: 'Bangalore', country: 'India', lat: 12.9716, lng: 77.5946 },
    flags: [],
  },
  {
    id: 'txn_004',
    upiId: 'lottery@scam',
    amount: 1,
    type: 'receive',
    status: 'blocked',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    riskScore: 98,
    riskLevel: 'critical',
    flags: ['test_transaction_scam', 'blacklisted_upi', 'social_engineering'],
  },
  {
    id: 'txn_005',
    upiId: 'grocery@phonepe',
    amount: 1200,
    type: 'send',
    status: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    riskScore: 8,
    riskLevel: 'low',
    merchantName: 'BigBasket',
    location: { city: 'Mumbai', country: 'India', lat: 19.076, lng: 72.8777 },
    flags: [],
  },
  {
    id: 'txn_006',
    upiId: 'refund@fake',
    amount: 15000,
    type: 'send',
    status: 'pending',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    riskScore: 78,
    riskLevel: 'high',
    flags: ['refund_scam_pattern', 'urgency_detected', 'new_recipient'],
  },
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: 'alert_001',
    type: 'anomaly_detected',
    severity: 'critical',
    message: 'Unusual Transaction Pattern Detected',
    description: 'Multiple high-value transactions to unknown UPI IDs within 10 minutes.',
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    transactionId: 'txn_002',
    resolved: false,
  },
  {
    id: 'alert_002',
    type: 'test_transaction',
    severity: 'critical',
    message: '₹1 Test Transaction Scam Detected',
    description: 'Received ₹1 from blacklisted UPI ID associated with lottery scams.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    transactionId: 'txn_004',
    resolved: false,
  },
  {
    id: 'alert_003',
    type: 'social_engineering',
    severity: 'high',
    message: 'Potential Social Engineering Attack',
    description: 'Message contains urgency keywords and request for immediate payment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    resolved: false,
  },
  {
    id: 'alert_004',
    type: 'geo_mismatch',
    severity: 'medium',
    message: 'Geographic Location Mismatch',
    description: 'Transaction initiated from different city than usual pattern.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    resolved: true,
  },
  {
    id: 'alert_005',
    type: 'refund_scam',
    severity: 'high',
    message: 'Refund Scam Pattern Identified',
    description: 'Caller claiming to be bank representative requesting "refund verification".',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    transactionId: 'txn_006',
    resolved: false,
  },
];

export const mockTrustGraph: TrustGraph = {
  nodes: [
    { id: 'user', upiId: 'you@upi', name: 'You', trustScore: 100, riskLevel: 'low', transactionCount: 1247, isBlacklisted: false },
    { id: 'n1', upiId: 'friend1@okaxis', name: 'Rahul', trustScore: 95, riskLevel: 'low', transactionCount: 45, isBlacklisted: false },
    { id: 'n2', upiId: 'merchant@paytm', name: 'Amazon Pay', trustScore: 98, riskLevel: 'low', transactionCount: 120, isBlacklisted: false },
    { id: 'n3', upiId: 'unknown123@ybl', name: 'Unknown', trustScore: 12, riskLevel: 'critical', transactionCount: 1, isBlacklisted: true },
    { id: 'n4', upiId: 'friend2@phonepe', name: 'Priya', trustScore: 88, riskLevel: 'low', transactionCount: 23, isBlacklisted: false },
    { id: 'n5', upiId: 'lottery@scam', name: 'SCAM', trustScore: 0, riskLevel: 'critical', transactionCount: 1, isBlacklisted: true },
    { id: 'n6', upiId: 'grocery@phonepe', name: 'BigBasket', trustScore: 96, riskLevel: 'low', transactionCount: 67, isBlacklisted: false },
    { id: 'n7', upiId: 'refund@fake', name: 'Suspicious', trustScore: 25, riskLevel: 'high', transactionCount: 1, isBlacklisted: false },
  ],
  edges: [
    { source: 'user', target: 'n1', transactionCount: 45, totalAmount: 125000, riskLevel: 'low' },
    { source: 'user', target: 'n2', transactionCount: 120, totalAmount: 450000, riskLevel: 'low' },
    { source: 'user', target: 'n3', transactionCount: 1, totalAmount: 49999, riskLevel: 'critical' },
    { source: 'user', target: 'n4', transactionCount: 23, totalAmount: 78000, riskLevel: 'low' },
    { source: 'user', target: 'n5', transactionCount: 1, totalAmount: 1, riskLevel: 'critical' },
    { source: 'user', target: 'n6', transactionCount: 67, totalAmount: 89000, riskLevel: 'low' },
    { source: 'user', target: 'n7', transactionCount: 1, totalAmount: 15000, riskLevel: 'high' },
  ],
};

export const mockScamNews: ScamNews[] = [
  {
    id: 'news_001',
    title: 'RBI Warns Against QR Code Scams',
    description: 'Reserve Bank of India issues advisory on increasing QR code manipulation frauds targeting UPI users.',
    category: 'warning',
    source: 'RBI',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    tags: ['qr-code', 'rbi', 'advisory'],
  },
  {
    id: 'news_002',
    title: 'New ₹1 Transaction Scam Technique Discovered',
    description: 'Cybersecurity experts identify new variant of test transaction scam using collect requests.',
    category: 'warning',
    source: 'CERT-In',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    tags: ['scam', 'test-transaction', 'collect-request'],
  },
  {
    id: 'news_003',
    title: 'How to Identify Fake Payment Screenshots',
    description: 'Step-by-step guide to verify if a payment confirmation screenshot is genuine or fabricated.',
    category: 'guideline',
    source: 'NPCI',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    tags: ['fake-screenshot', 'verification', 'guide'],
  },
  {
    id: 'news_004',
    title: 'Customer Care Fraud Ring Busted',
    description: 'Police arrest gang operating fake customer care numbers to steal banking credentials.',
    category: 'news',
    source: 'Times of India',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    tags: ['customer-care', 'fraud', 'arrest'],
  },
];

export const mockFraudPatterns: FraudPattern[] = [
  {
    id: 'pattern_001',
    name: 'QR Code Manipulation',
    description: 'Scammer overlays malicious QR code over legitimate merchant codes',
    indicators: ['Modified QR metadata', 'Unexpected UPI ID', 'Amount mismatch'],
    riskWeight: 0.9,
    detectionCount: 234,
    lastDetected: new Date(Date.now() - 1000 * 60 * 30),
    isActive: true,
  },
  {
    id: 'pattern_002',
    name: 'Test Transaction Scam',
    description: 'Fraudster sends ₹1 to verify account, then initiates collect request',
    indicators: ['₹1 incoming transaction', 'Unknown sender', 'Followed by collect request'],
    riskWeight: 0.95,
    detectionCount: 567,
    lastDetected: new Date(Date.now() - 1000 * 60 * 45),
    isActive: true,
  },
  {
    id: 'pattern_003',
    name: 'Refund Scam',
    description: 'Caller claims excess refund received, requests return payment',
    indicators: ['Refund claim', 'Urgency language', 'Payment request'],
    riskWeight: 0.88,
    detectionCount: 189,
    lastDetected: new Date(Date.now() - 1000 * 60 * 120),
    isActive: true,
  },
  {
    id: 'pattern_004',
    name: 'Fake Customer Support',
    description: 'Impersonator pretends to be bank/app support to extract credentials',
    indicators: ['Support claim', 'PIN/OTP request', 'Remote access request'],
    riskWeight: 0.92,
    detectionCount: 412,
    lastDetected: new Date(Date.now() - 1000 * 60 * 60),
    isActive: true,
  },
];

export const mockHeatmapData: HeatmapData[] = [
  { city: 'Mumbai', lat: 19.076, lng: 72.8777, fraudCount: 234, totalTransactions: 45000, riskLevel: 'medium' },
  { city: 'Delhi', lat: 28.6139, lng: 77.209, fraudCount: 567, totalTransactions: 52000, riskLevel: 'high' },
  { city: 'Bangalore', lat: 12.9716, lng: 77.5946, fraudCount: 123, totalTransactions: 38000, riskLevel: 'low' },
  { city: 'Chennai', lat: 13.0827, lng: 80.2707, fraudCount: 189, totalTransactions: 28000, riskLevel: 'medium' },
  { city: 'Kolkata', lat: 22.5726, lng: 88.3639, fraudCount: 345, totalTransactions: 25000, riskLevel: 'high' },
  { city: 'Hyderabad', lat: 17.385, lng: 78.4867, fraudCount: 156, totalTransactions: 32000, riskLevel: 'medium' },
  { city: 'Pune', lat: 18.5204, lng: 73.8567, fraudCount: 98, totalTransactions: 22000, riskLevel: 'low' },
  { city: 'Ahmedabad', lat: 23.0225, lng: 72.5714, fraudCount: 201, totalTransactions: 18000, riskLevel: 'medium' },
];

export const mockFraudStories: FraudStory[] = [
  {
    id: 'story_001',
    title: 'The ₹1 Lottery Scam',
    description: 'How scammers use tiny transactions to steal big',
    category: 'Test Transaction',
    realCase: true,
    steps: [
      {
        id: 's1_1',
        order: 1,
        title: 'The Bait',
        description: 'Victim receives ₹1 with message: "Congratulations! You won ₹50,000 lottery"',
        type: 'scammer_action',
      },
      {
        id: 's1_2',
        order: 2,
        title: 'Curiosity',
        description: 'Victim sees the ₹1 credited and believes the lottery might be real',
        type: 'victim_action',
      },
      {
        id: 's1_3',
        order: 3,
        title: 'The Hook',
        description: 'Scammer calls claiming to be lottery agent, needs "processing fee"',
        type: 'scammer_action',
      },
      {
        id: 's1_4',
        order: 4,
        title: 'Warning Sign',
        description: 'Legitimate lotteries never ask for advance fees via UPI',
        type: 'warning',
      },
      {
        id: 's1_5',
        order: 5,
        title: 'The Trap',
        description: 'Victim sends ₹5,000 as "processing fee" - money gone forever',
        type: 'outcome',
      },
    ],
    prevention: [
      'Never respond to unsolicited lottery messages',
      'Block unknown UPI IDs immediately',
      'Report suspicious transactions to your bank',
      'Remember: If it sounds too good to be true, it is',
    ],
  },
  {
    id: 'story_002',
    title: 'The Fake Refund Call',
    description: 'When someone claims they sent you extra money by mistake',
    category: 'Refund Scam',
    realCase: true,
    steps: [
      {
        id: 's2_1',
        order: 1,
        title: 'The Setup',
        description: 'Victim receives call: "I accidentally sent ₹10,000 to your account instead of ₹1,000"',
        type: 'scammer_action',
      },
      {
        id: 's2_2',
        order: 2,
        title: 'The Confusion',
        description: 'Victim checks account - sees no incoming transaction',
        type: 'victim_action',
      },
      {
        id: 's2_3',
        order: 3,
        title: 'The Pressure',
        description: '"Please check again, it should show. Meanwhile send ₹9,000 back urgently"',
        type: 'scammer_action',
      },
      {
        id: 's2_4',
        order: 4,
        title: 'Warning Sign',
        description: 'Never send money based on phone calls - verify transactions in your bank app',
        type: 'warning',
      },
      {
        id: 's2_5',
        order: 5,
        title: 'The Trap',
        description: 'If victim sends money, they lose it. No refund was ever made.',
        type: 'outcome',
      },
    ],
    prevention: [
      'Always verify transactions in your official bank app',
      'Never act on urgency - take your time',
      'Banks never ask you to send money for refund verification',
      'If in doubt, visit your bank branch',
    ],
  },
];

export const getRiskLevelColor = (level: RiskLevel): string => {
  switch (level) {
    case 'low':
      return 'text-success';
    case 'medium':
      return 'text-warning';
    case 'high':
      return 'text-destructive';
    case 'critical':
      return 'text-destructive animate-pulse';
    default:
      return 'text-muted-foreground';
  }
};

export const getRiskLevelBg = (level: RiskLevel): string => {
  switch (level) {
    case 'low':
      return 'bg-success/20';
    case 'medium':
      return 'bg-warning/20';
    case 'high':
      return 'bg-destructive/20';
    case 'critical':
      return 'bg-destructive/30';
    default:
      return 'bg-muted';
  }
};
