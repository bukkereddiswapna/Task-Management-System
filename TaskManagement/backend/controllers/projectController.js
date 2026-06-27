export const createProject = async (req, res) => {
  try {
    // Falls back to targetDueDate if dueDate isn't supplied directly
    const { title, description, dueDate, targetDueDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: "Please enter all required fields" });
    }

    const newProject = new Project({
      title,
      description,
      targetDueDate: dueDate || targetDueDate || null, 
      user: req.user.id,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Server Error: Failed to save project" });
  }
};
