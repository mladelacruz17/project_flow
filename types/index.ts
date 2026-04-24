/**
 * Core domain types for the application
 * Includes tasks, projects, users, and activity logs
 */

// Task-related types
export type Status = "To Do" | "In Progress" | "Done";
export type Priority = "None" | "Low" | "Medium" | "High";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  dueDate?: string;
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
};

// Project-related types
export interface Project {
  id: string;
  name: string;
  userId: string;
  description?: string;
  deadline?: string;
}

// Logging system
export type LogAction = "create" | "update" | "move" | "delete";
export type LogEntity = "task" | "project";

export interface Log {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  entity: LogEntity;
  action: LogAction;
  message: string;
  createdAt: string;
  meta?: {
    from?: string;
    to?: string;
  };
}

// Authentication / user
export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  resetToken?: string;
  resetTokenExpiry?: number;
};

// Database shape (used in db.ts)
export type DB = {
  users: User[];
  projects: Project[];
  tasks: Task[];
  logs: Log[];
};