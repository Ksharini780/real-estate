import cloudinary from '../config/cloudinary.js'; // Ensure Cloudinary is configured

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image provided' });
    }

    // Upload image to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: 'listings',
    });

    res.status(200).json({ success: true, url: uploadResponse.secure_url });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Image upload failed' });
  }
};
