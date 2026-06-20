import Project from "../models/Project.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newProject = new Project({
      title,
      description,
      targetDueDate: dueDate || null, 
      user: req.user.id,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Server Error: Failed to save project" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({ message: "Server Error: Failed to retrieve projects" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized to delete this project" });
    }

    await project.deleteOne();
    res.status(200).json({ id: req.params.id, message: "Project removed successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server Error: Failed to delete project" });
  }
};
