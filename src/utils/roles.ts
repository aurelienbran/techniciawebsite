import { User } from '../types/auth';

export const ROLES = {
  TECHNICIAN: 'technician',
  SUPERVISOR: 'supervisor',
  ADMIN: 'admin',
} as const;

export const ROLE_PERMISSIONS = {
  [ROLES.TECHNICIAN]: ['view_tasks', 'update_task_status', 'add_comments'],
  [ROLES.SUPERVISOR]: ['view_tasks', 'update_task_status', 'add_comments', 'assign_tasks', 'view_reports'],
  [ROLES.ADMIN]: ['view_tasks', 'update_task_status', 'add_comments', 'assign_tasks', 'view_reports', 'manage_users'],
} as const;

export function hasPermission(user: User, permission: string): boolean {
  if (!user || !user.role) return false;
  return ROLE_PERMISSIONS[user.role].includes(permission);
}

export function getHighestRole(roles: User['role'][]): User['role'] {
  const roleHierarchy = [ROLES.TECHNICIAN, ROLES.SUPERVISOR, ROLES.ADMIN];
  return roles.reduce((highest, current) => {
    const highestIndex = roleHierarchy.indexOf(highest);
    const currentIndex = roleHierarchy.indexOf(current);
    return currentIndex > highestIndex ? current : highest;
  });
}