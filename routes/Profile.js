const express = require("express");
const router = express.Router();
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDasboard,
} = require("../controllers/Profile");
const { auth, isInstructor } = require("../middlewares/auth");


router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getAllUserDetails);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDasboard", auth, isInstructor, instructorDasboard);

module.exports = router;

/**
 * @swagger
 * /api/profile/updateProfile:
 *   put:
 *     summary: 
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: User's date of birth
 *                 example: 1990-01-01
 *               about:
 *                 type: string
 *                 description: About the user
 *                 example: "I am a software developer."
 *               contactNumber:
 *                 type: string
 *                 description: User's contact number
 *                 example: "1234567890"
 *               gender:
 *                 type: string
 *                 description: Gender of the user
 *                 example: "Female"
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *                 example: "Jane"
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile Updated Successfully"
 *                 updateProfile:
 *                   type: object
 *                   description: Updated profile details
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/profile/deleteProfile:
 *   delete:
 *     summary: 
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User Account Deleted Successfully"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/profile/getUserDetails:
 *   get:
 *     summary: 
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User Details Fetched Successfully"
 *                 userDetails:
 *                   type: object
 *                   description: User details with additional profile info
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/profile/getEnrolledCourses:
 *   get:
 *     summary: 
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Courses fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Course details fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Course details
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/profile/updateDisplayPicture:
 *   put:
 *     summary:
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               displayPicture:
 *                 type: string
 *                 format: binary
 *                 description: The new profile picture to upload
 *     responses:
 *       200:
 *         description: Display picture updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Display picture updated Successfully"
 *                 updatedUser:
 *                   type: object
 *                   description: Updated user details
 *       404:
 *         description: Missing fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/profile/instructorDasboard:
 *   get:
 *     summary: 
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Instructor dashboard details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Instructor dashboard details fetched successfully"
 *                 courseData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "courseId"
 *                       courseName:
 *                         type: string
 *                         example: "Full-Stack Development"
 *                       courseDescription:
 *                         type: string
 *                         example: "Learn full-stack development from scratch."
 *                       totalStudentsEnrolled:
 *                         type: integer
 *                         example: 100
 *                       totalAmountGenerated:
 *                         type: number
 *                         example: 5000
 *       500:
 *         description: Server error
 */
