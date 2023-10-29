const todoTransformFunc = (v) => ({ ...v, id: v._id, _v: undefined });

export const resolvers = {
  Query: {
    getToDo: async (parent, args) => {
      try {
        const { toDoId } = args;
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/todo?id=${toDoId}`);
        const todo = await response.json();
        return todoTransformFunc(todo);
      } catch (error) {
        throw new Error(error);
      }
    },
    getToDos: async (parent, args) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/todo`);
        const todos = await response.json();
        const todosTransform = todos.map(todoTransformFunc);
        return todosTransform;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createToDo: async (parent, args) => {
      try {
        const { toDoInput } = args;
        const body = JSON.stringify({ toDoInput });
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/todo`, {
          method: "POST",
          body,
        });
        const todo = await response.json();
        return todoTransformFunc(todo);
      } catch (error) {
        throw new Error(error);
      }
    },
    updateToDo: async (parent, args) => {
      try {
        const { toDoId, toDoInput } = args;
        const body = JSON.stringify({ toDoInput });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/todo?id=${toDoId}`,
          {
            method: "POST",
            body,
          }
        );
        const todo = await response.json();
        return todoTransformFunc(todo);
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteToDo: async (parent, args) => {
      try {
        const { toDoId } = args;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/todo?id=${toDoId}`,
          {
            method: "DELETE",
          }
        );
        const resStatus = await response.status;
        return resStatus;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteToDos: async (parent, args) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/todo`, {
          method: "DELETE",
        });
        const resStatus = await response.status;
        return resStatus;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
