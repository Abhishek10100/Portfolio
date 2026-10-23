/**
 * Illustrative agent set for the Surveillance Suite chatbot demo. The real
 * system has twelve specialised agents; these names and keywords are a
 * plausible stand-in, not the product's internals.
 */
export const AGENTS = [
  {
    id: 'camera_operations',
    name: 'Camera Operations',
    op: 'list_cameras',
    kw: {
      en: ['camera', 'cameras', 'offline', 'online', 'stream', 'feed', 'ptz'],
      hi: ['कैमरा', 'कैमरे', 'ऑफलाइन', 'ऑनलाइन', 'स्ट्रीम'],
      mr: ['कॅमेरा', 'कॅमेरे', 'ऑफलाइन', 'ऑनलाइन', 'स्ट्रीम'],
      ja: ['カメラ', 'オフライン', 'オンライン', '配信'],
    },
  },
  {
    id: 'alert_investigation',
    name: 'Alert Investigation',
    op: 'get_recent_alerts',
    kw: {
      en: ['alert', 'alerts', 'alarm', 'alarms', 'intrusion', 'breach', 'triggered'],
      hi: ['अलर्ट', 'चेतावनी', 'घुसपैठ', 'अलार्म'],
      mr: ['अलर्ट', 'इशारा', 'घुसखोरी', 'अलार्म'],
      ja: ['アラート', '警報', '侵入', '通知', 'アラーム'],
    },
  },
  {
    id: 'live_monitoring',
    name: 'Live Monitoring',
    op: 'get_live_occupancy',
    kw: {
      en: ['live', 'now', 'currently', 'real-time', 'realtime', 'occupancy', 'crowd', 'busy'],
      hi: ['लाइव', 'अभी', 'वर्तमान', 'भीड़'],
      mr: ['लाइव्ह', 'आत्ता', 'सध्या', 'गर्दी'],
      ja: ['ライブ', 'リアルタイム', '現在', '混雑', '今'],
    },
  },
  {
    id: 'kpi_reports',
    name: 'KPI Reports',
    op: 'get_kpi_summary',
    kw: {
      en: ['kpi', 'report', 'reports', 'metric', 'metrics', 'weekly', 'daily', 'statistics'],
      hi: ['रिपोर्ट', 'आंकड़े', 'सारांश', 'साप्ताहिक', 'दैनिक'],
      mr: ['अहवाल', 'आकडेवारी', 'सारांश', 'साप्ताहिक', 'दैनिक'],
      ja: ['レポート', '報告', '統計', '集計', '週間', '日次'],
    },
  },
  {
    id: 'system_health',
    name: 'System Health',
    op: 'get_service_health',
    kw: {
      en: ['health', 'server', 'servers', 'cpu', 'disk', 'storage', 'uptime', 'latency', 'degraded'],
      hi: ['स्वास्थ्य', 'सर्वर', 'स्टोरेज', 'डाउन'],
      mr: ['आरोग्य', 'सर्व्हर', 'स्टोरेज', 'बंद'],
      ja: ['ヘルス', 'サーバー', 'ストレージ', '稼働', '障害'],
    },
  },
  {
    id: 'insight_reports',
    name: 'AI Insights',
    op: 'get_activity_heatmap',
    kw: {
      en: ['insight', 'insights', 'heatmap', 'trend', 'trends', 'pattern', 'patterns', 'analytics', 'dwell', 'footfall'],
      hi: ['इनसाइट', 'हीटमैप', 'रुझान', 'पैटर्न'],
      mr: ['इनसाइट', 'हीटमॅप', 'पॅटर्न'],
      ja: ['インサイト', 'ヒートマップ', '傾向', 'パターン', '分析'],
    },
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    op: 'run_diagnostics',
    kw: {
      en: ['fix', 'troubleshoot', 'error', 'problem', 'issue', 'broken', 'failing', 'blurry', 'not working'],
      hi: ['समस्या', 'ठीक', 'त्रुटि', 'काम नहीं', 'खराब'],
      mr: ['समस्या', 'दुरुस्त', 'त्रुटी', 'काम करत नाही', 'खराब'],
      ja: ['トラブル', '不具合', 'エラー', '直し', '動かない', '故障'],
    },
  },
  {
    id: 'zone_management',
    name: 'Zones & Rules',
    op: 'list_zone_rules',
    kw: {
      en: ['zone', 'zones', 'rule', 'rules', 'perimeter', 'geofence', 'schedule', 'threshold', 'restricted'],
      hi: ['ज़ोन', 'जोन', 'नियम', 'परिधि'],
      mr: ['झोन', 'नियम', 'परिमिती', 'वेळापत्रक'],
      ja: ['ゾーン', 'ルール', '境界', 'スケジュール', '制限'],
    },
  },
  {
    id: 'incident_timeline',
    name: 'Incident Timeline',
    op: 'get_incident_timeline',
    kw: {
      en: ['timeline', 'history', 'yesterday', 'earlier', 'last night', 'what happened', 'sequence'],
      hi: ['टाइमलाइन', 'इतिहास', 'कल रात', 'क्या हुआ'],
      mr: ['टाइमलाइन', 'इतिहास', 'काल रात्री', 'काय झाले'],
      ja: ['タイムライン', '履歴', '昨日', '経緯', '何があった'],
    },
  },
  {
    id: 'evidence_viewer',
    name: 'Evidence Viewer',
    op: 'get_evidence_media',
    kw: {
      en: ['evidence', 'snapshot', 'snapshots', 'clip', 'footage', 'video', 'image', 'screenshot'],
      hi: ['सबूत', 'स्नैपशॉट', 'क्लिप', 'फुटेज', 'वीडियो', 'तस्वीर'],
      mr: ['पुरावा', 'स्नॅपशॉट', 'क्लिप', 'फुटेज', 'व्हिडिओ', 'प्रतिमा'],
      ja: ['証拠', 'スナップショット', 'クリップ', '動画', '画像'],
    },
  },
  {
    id: 'access_admin',
    name: 'Users & Access',
    op: 'get_user_permissions',
    kw: {
      en: ['user', 'users', 'access', 'permission', 'permissions', 'role', 'roles', 'login', 'password', 'invite'],
      hi: ['यूज़र', 'यूजर', 'अनुमति', 'भूमिका', 'लॉगिन', 'पासवर्ड'],
      mr: ['वापरकर्ता', 'परवानगी', 'भूमिका', 'लॉगिन', 'पासवर्ड'],
      ja: ['ユーザー', '権限', 'ロール', 'ログイン', 'パスワード', '招待'],
    },
  },
  {
    id: 'help_guide',
    name: 'Product Guide',
    op: 'search_help_articles',
    kw: {
      en: ['how', 'guide', 'help', 'tutorial', 'learn', 'explain', 'feature', 'features', 'documentation'],
      hi: ['कैसे', 'गाइड', 'मदद', 'सुविधा'],
      mr: ['कसे', 'मार्गदर्शक', 'मदत', 'सुविधा'],
      ja: ['使い方', 'ガイド', 'ヘルプ', '機能', '説明', '方法'],
    },
  },
]

export const LANGUAGES = { en: 'English', hi: 'Hindi', mr: 'Marathi', ja: 'Japanese' }

export const EXAMPLES = [
  { lang: 'en', text: 'Show alerts near Gate 2 from the last hour' },
  { lang: 'hi', text: 'गेट 2 पर कोई अलर्ट आया क्या?' },
  { lang: 'mr', text: 'आजचा साप्ताहिक अहवाल दाखवा' },
  { lang: 'ja', text: 'ストレージの空き容量とサーバーの状態を確認して' },
  { lang: 'en', text: 'Which cameras are offline?' },
  { lang: 'en', text: 'What happened last night at the loading bay?' },
]

/** Synthetic site state the "agents" answer from. */
export const ANSWERS = {
  camera_operations: () => ({
    text: '2 of 8 cameras are offline: Gate 2 North (last seen 14:02) and Dock 1 (last seen 13:47). The other 6 are streaming normally.',
    rows: [['Gate 2 North', 'offline'], ['Dock 1', 'offline'], ['Lobby East', 'online'], ['Lobby West', 'online'], ['Loading Bay', 'online'], ['Car Park A', 'online']],
  }),
  alert_investigation: () => ({
    text: '3 alerts in the last hour. One needs review: a perimeter breach at Gate 2 at 14:18 (high), a person detected after hours. Two low-priority loitering alerts were auto-closed.',
    rows: [['14:18 · Gate 2', 'high · open'], ['14:03 · Car Park A', 'low · closed'], ['13:41 · Lobby East', 'low · closed']],
  }),
  live_monitoring: () => ({
    text: 'Right now: Lobby has 12 people, Dock 1 has 4 and Gate 2 has none. Occupancy is within the normal range for this hour.',
    rows: [['Lobby', '12 people'], ['Dock 1', '4 people'], ['Gate 2', '0 people']],
  }),
  kpi_reports: () => ({
    text: 'This week: 142 alerts (9% fewer than last week), median response time 3m 12s and 96.4% camera uptime.',
    rows: [['Alerts', '142 (-9%)'], ['Median response', '3m 12s'], ['Camera uptime', '96.4%']],
  }),
  system_health: () => ({
    text: 'All services are healthy except video-analytics-worker-2, which is degraded (CPU 91%). Storage is 68% used with about 11 days of retention left.',
    rows: [['video-analytics-worker-2', 'degraded'], ['edge-connector', 'healthy'], ['storage', '68% used']],
  }),
  insight_reports: () => ({
    text: 'The busiest zone is the Lobby, peaking 09:00 to 10:00. The activity heatmap shows concentration at the east door, and dwell time is up 12%.',
    rows: [['Peak hour', '09:00 – 10:00'], ['Hotspot', 'Lobby east door'], ['Dwell time', '+12%']],
  }),
  troubleshooting: () => ({
    text: 'For an offline or blurry camera: check power and PoE, confirm the edge connector reports the camera online, then restart the stream. If it still fails, raise a support ticket with the camera ID.',
    rows: [['1', 'Check power / PoE'], ['2', 'Confirm edge connector status'], ['3', 'Restart the stream']],
  }),
  zone_management: () => ({
    text: 'Active rules: the Gate 2 perimeter is armed 20:00 to 06:00, the Loading Bay is restricted to badge holders, and 2 zones use custom thresholds.',
    rows: [['Gate 2 perimeter', 'armed 20:00–06:00'], ['Loading Bay', 'badge only'], ['Custom thresholds', '2 zones']],
  }),
  incident_timeline: () => ({
    text: 'Last night: motion at Gate 2 at 22:41, an alert at 22:42, acknowledged by the guard at 22:47, and closed as a false positive (animal) at 22:55.',
    rows: [['22:41', 'Motion at Gate 2'], ['22:42', 'Alert raised'], ['22:47', 'Guard acknowledged'], ['22:55', 'Closed: animal']],
  }),
  evidence_viewer: () => ({
    text: 'Alert A-1042 has 3 snapshots and a 12-second clip attached. You can export them as a PDF or share a secure link.',
    rows: [['Snapshots', '3'], ['Clip', '12 s'], ['Export', 'PDF or secure link']],
  }),
  access_admin: () => ({
    text: 'You have Operator access. Administrators can invite users and change roles under Settings, Users.',
    rows: [['Your role', 'Operator'], ['Invite users', 'Admin only']],
  }),
  help_guide: () => ({
    text: 'I can help with cameras, alerts, live status, reports, system health and troubleshooting. Try asking about any of those.',
    rows: [['Cameras', 'status, streams'], ['Alerts', 'investigate, evidence'], ['Reports', 'KPIs, insights']],
  }),
}
