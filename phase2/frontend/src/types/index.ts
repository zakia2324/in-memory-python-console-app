// User types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserRegister {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
}

// API Response types
export interface AuthResponse {
  user: User;
  token: {
    access_token: string;
    token_type: string;
  };
}

export interface TaskResponse {
  task: Task;
}

export interface TasksResponse {
  tasks: Task[];
}

// Error types
export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
