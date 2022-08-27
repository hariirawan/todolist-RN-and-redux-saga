export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoListType = {
  data: TodoType[];
  isLoading: boolean;
};
