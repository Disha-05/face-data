const express = require('express');
const router = express.Router();
const FormData = require('../../models/formData');

// Create a new form data entry
router.post('/', (req, res) => {
    FormData.create(req.body)
      .then(formData => res.json({ msg: 'Form added successfully' }))
      .catch(err => res.status(400).json({ error: 'Unable to add this details' }));
  });
// Get all form data entries
// router.get('/all', async (req, res) => {
//   try {
//     const allFormData = await FormData.find();
//     res.status(200).json({ success: true, data: allFormData });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

module.exports = router;
