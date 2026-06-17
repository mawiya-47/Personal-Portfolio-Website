export interface GithubProject {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  topics?: string[];
  homepage?: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface VisitEvent {
  id: string;
  eventType: "visit" | "download" | "chat" | "theme";
  metadata?: string;
  timestamp: string;
}

export interface AdminStats {
  visitorCount: number;
  messages: ContactSubmission[];
  downloadsCount: number;
  chatLogs: { id: string; session: string; query: string; reply: string; timestamp: string }[];
  themeStats: { light: number; dark: number };
  trafficAnalytics: { date: string; visits: number }[];
}
