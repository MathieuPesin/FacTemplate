export interface Metric {
  value: string;
  label: string;
}

export interface FunctionData {
  label: string;
  percentage: number;
  color: string;
}

export interface Activity {
  category: string;
  title: string;
  description: string;
  color: string;
  logos?: string[];
}

export interface TimelineEvent {
  year: string;
  events: {
    category: string;
    description: string;
  }[];
}