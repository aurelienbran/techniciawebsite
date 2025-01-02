import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}