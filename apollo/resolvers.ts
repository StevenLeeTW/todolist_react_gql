const todoTransformFunc = (v) => ({ ...v, id: v._id, _v: undefined });

export const resolvers = {
  Query: {
    getToDo: async (parent, args) => {
      try {
        const { toDoId } = args;
        const response = await fetch(`http://localhost:3000/api/todo?id=${toDoId}`);
        const todo = await response.json();
        return todoTransformFunc(todo);
      } catch (error) {
        throw new Error(error);
      }
    },
    getToDos: async (parent, args) => {
      try {
        const response = await fetch("http://localhost:3000/api/todo");
        const todos = await response.json();
        const todosTransform = todos.map(todoTransformFunc);
        return todosTransform;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  // Mutation: {
  //   createToDo: async (parent, args) => {
  //     try {
  //       const { toDoInput } = args;
  //       return await ToDo.create(toDoInput);
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  //   updateToDo: async (parent, args) => {
  //     try {
  //       const { toDoId, toDoInput } = args;
  //       return await ToDo.findOneAndUpdate(toDoId, toDoInput, { new: true });
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  //   deleteToDo: async (parent, args) => {
  //     try {
  //       const { toDoId } = args;
  //       return await ToDo.findByIdAndDelete(toDoId);
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  //   deleteToDos: async (parent, args) => {
  //     try {
  //       return await ToDo.remove();
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   },
  // },
};
