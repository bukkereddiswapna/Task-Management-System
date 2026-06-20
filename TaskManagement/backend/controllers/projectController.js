import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find({
    user: req.user.id,
  });

  res.json(projects);
};

export const createProject = async (req, res) => {
  const project = await Project.create({
    ...req.body,
    user: req.user.id,
  });

  res.status(201).json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(project);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);

  res.json({
    message: "Project deleted",
  });
};