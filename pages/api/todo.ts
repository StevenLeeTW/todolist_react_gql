import ToDo from "./mongodb/todo";

export default async (req, res) => {
  // APIs logic here
  const { id } = req.query;
  const { method, body } = req;
  if (method === "GET") {
    if (id) {
      try {
        const result = await ToDo.findById(id);
        res.status(200).send(result);
      } catch {
        res.status(400);
      }
    } else {
      
      try {
        const result = await ToDo.find();
        return res.status(200).send(result);
      } catch {
        res.status(400);
      }
    }
  }

  if (method === "POST") {
    if (!id) {
      try {
        const { toDoInput } = JSON.parse(body);
        const result = await ToDo.create({ ...toDoInput });
        const success = Boolean(await result)
        res.status(200).send(success);
      } catch {
        res.status(400);
      }
    } else {
      try {
        const { toDoInput } = JSON.parse(body);
        const result = await ToDo.findOneAndUpdate(id, toDoInput, { new: true });
        res.status(200).send(result);
      } catch {
        res.status(400);
      }
    }
  }
  if (method === "DELETE") {
    if (id) {
      try {
        const result = await ToDo.findByIdAndDelete(id);
        res.status(200).send(result);
      } catch {
        res.status(400);
      }
    } else {
      try {
        const result = await ToDo.remove();
        res.status(200).send(result);
      } catch {
        res.status(400);
      }
    }
  }
};
