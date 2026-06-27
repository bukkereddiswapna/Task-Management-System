import User from "../models/User.js";

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update fields
    user.fullname = req.body.fullname || user.fullname;
    user.email = req.body.email || user.email;

    // if image uploaded
    if (req.file) {
      user.avatarUrl = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};