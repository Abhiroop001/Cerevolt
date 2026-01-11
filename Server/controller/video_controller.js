const Video = require("../db/videodb");

module.exports = {
  // Add a video
  async addVideo(req, res) {
    try {
      const { title, description, youtubeLink } = req.body;
      const video = await Video.create({ title, description, youtubeLink });
      res.json({ msg: "Video added successfully", video });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to add video" });
    }
  },

  // List all videos
  async listVideos(req, res) {
    try {
      const videos = await Video.find().sort({ createdAt: -1 });
      res.json(videos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to fetch videos" });
    }
  },

  // Delete a video
  async deleteVideo(req, res) {
    try {
      const { id } = req.body;
      await Video.findByIdAndDelete(id);
      res.json({ msg: "Video deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to delete video" });
    }
  },

  // Edit a video
  async editVideo(req, res) {
    try {
      const { id } = req.body;
      const video = await Video.findById(id);
      res.json(video);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to fetch video" });
    }
  },

  // Update a video
  async updateVideo(req, res) {
    try {
      const { id, title, description, youtubeLink } = req.body;
      await Video.findByIdAndUpdate(id, { title, description, youtubeLink });
      res.json({ msg: "Video updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Failed to update video" });
    }
  }
};
