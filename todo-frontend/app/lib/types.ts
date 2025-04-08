export interface Todo {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TodoInput {
    title: string;
    description: string;
  }