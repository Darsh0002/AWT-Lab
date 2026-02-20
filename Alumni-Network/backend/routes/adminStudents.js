const express = require("express");
const Student = require("../models/Student");
const Institute = require("../models/Institute");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// GET all students for logged-in admin's institute
router.get("/students", protect, async (req, res) => {
  try {
    // Only admin allowed
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access denied. Admin only.",
      });
    }

    // Find institute of logged-in admin
    const institute = await Institute.findOne({
      adminUser: req.user.id,
    });

    if (!institute) {
      return res.status(404).json({
        message: "Institute not found",
      });
    }

    // Fetch students of this institute
    const students = await Student.find({
      instituteId: institute._id,
    }).select("-password"); // 🔒 never send password

    // Derive alumni/current dynamically
    const currentYear = new Date().getFullYear();

    const formattedStudents = students.map((student) => {
      const status =
        student.passoutYear && student.passoutYear <= currentYear
          ? "alumni"
          : "current";

      return {
        id: student._id,
        full_name: student.full_name,
        email: student.email,
        phone: student.phone,
        enrollment_no: student.enrollment_no,
        course: student.course,
        branch: student.branch,
        passoutYear: student.passoutYear,
        company: student.company,
        job: student.job,
        linkedinuri: student.linkedinuri,
        createdAt: student.createdAt,
      };
    });

    res.status(200).json({
      total: formattedStudents.length,
      students: formattedStudents,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
});

module.exports = router;