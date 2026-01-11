const User = require("../db/userdb");
const bcrypt = require("bcrypt");

module.exports = {
  async signup(req, res) {
    try {
      const { name, email, password, role, meta } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ msg: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, email, password: hashedPassword, role, meta });

      res.json({ id: newUser._id, name: newUser.name, role: newUser.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Signup failed" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      res.json({ id: user._id, name: user.name, role: user.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Login failed" });
    }
  }
};
