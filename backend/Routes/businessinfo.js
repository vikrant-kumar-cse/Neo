const express = require('express');
const router = express.Router();
const BusinessInfo = require('../models/BusinessInfo');
const upload = require('../middlewares/fileUpload');
const verifyToken = require("../Middlewares/Auth");

router.post(
  "/business-info",
  verifyToken,
  upload.fields([
    { name: "brandLogo", maxCount: 1 },
    { name: "tradeLicense", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      console.log("req.body:", req.body);
      console.log("req.files:", req.files);
      const existing = await BusinessInfo.findOne({ brandId: req.brandId });
      if (existing) return res.status(409).json({ message: "Already submitted" });

      const tradeLicenseUrl = req.files?.tradeLicense?.[0]?.path || '';
      const brandLogoUrl = req.files?.brandLogo?.[0]?.path || '';

      const info = new BusinessInfo({
        brandId: req.brandId,
        companyName: req.body.companyName,
        tradeLicenseUrl,
        countryAndEmirates: req.body.countryAndEmirates,                 // ✅ FIXED
        profileAtCompany: req.body.profileAtCompany,
        primaryContactName: req.body.primaryContactName,
        primaryContactPhone: req.body.primaryContactPhone,
        businessPhone: req.body.businessPhone,                           // ✅ Make sure it's not ''
        vatNumber: req.body.vatRegistrationNumber,
        brandLogoUrl,
        brandName: req.body.brandName,
        brandWebsite: req.body.brandWebsite,
        brandCountryAndEmirates: req.body.brandCountryAndEmirates,       // ✅ FIXED
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        brandFormat: req.body.brandFormat,
        termsAccepted: req.body.terms === 'true' || req.body.terms === true,
        privacyPolicyAccepted: req.body.privacy === 'true' || req.body.privacy === true
      });
      

      await info.save();
      res.status(201).json({ message: "Saved", data: info });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error saving info", error });
    }
  }
);



// Step2: Get Business Info
router.get("/business-info", verifyToken, async (req, res) => {
  try {
    const info = await BusinessInfo.findOne({ brandId: req.brandId });
    if (!info) return res.status(404).json({ message: "Not found" });
    res.json(info);
  } catch (error) {
    res.status(500).json({ message: "Error fetching info", error });
  }
});

module.exports = router;


//  Step2: Select Template
// const {
//   getAllTemplates,
//   saveUserTemplates,
//   getUserTemplates,
// } = require("../controllers/templateController");

// router.get("/templates", getAllTemplates);
// router.post("/templates/save", saveUserTemplates);
// router.get("/templates/user/:userId", getUserTemplates);

// module.exports = router;









const Brand_Manager = require('../Models/Brand_Manager'); // ✅ No destructuring here

// Route: GET /brand-info/:id
router.get("/brand-info/:id", async (req, res) => {
    try {
        const brandId = req.params.id; // or use req.brandId if coming from token

        const brand = await Brand_Manager.findOne({
            where: { id: brandId },
            attributes: ['first_name', 'last_name', 'business_email', 'business_phone'] // Only required fields
        });

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        res.status(200).json({ brand });
    } catch (error) {
        console.error("Error fetching brand signup info:", error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;