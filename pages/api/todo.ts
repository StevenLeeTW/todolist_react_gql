import ToDo from "./mongodb/todo";

export default async (req, res) => {
  // APIs logic here
  const { id } = req.query;
  const { method } = req;
  if (method === "GET") {
    if (id) {
      const result = await ToDo.findById(id);
      res.status(200).send(result);
    } else {
      const result = await ToDo.find();
      return res.status(200).send(result);
    }
  }
};
