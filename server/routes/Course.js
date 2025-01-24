const express = require("express");
const router = express.Router();
const {
  createCourse,
  updateCourse,
  getAllCourses,
  getCourseDetails,
  getInstructorCourses,
  deleteCourse,
  getFullCourseDetails,
} = require("../controllers/Course");
const {
  createCategory,
  getAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");
const {
  createRatingAndReviews,
  getAverageRating,
  allRatingReview,
} = require("../controllers/RatingAndReview");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");
const { updateCourseProgress } = require("../controllers/courseProgress");
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");


router.post("/createCourse", auth, isInstructor, createCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
router.post("/editCourse", auth, isInstructor, updateCourse);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getcourse", getAllCourses);
router.post("/getFullCourseDetails", auth, isStudent, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);


router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);


router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);


router.post("/createRating", auth, isStudent, createRatingAndReviews);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", allRatingReview);


router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = router;



// Route for creating a course
/**
 * @swagger
 * /api/course/createCourse:
 *   post:
 *     summary: 
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseName:
 *                 type: string
 *                 description: Name of the course
 *                 example: "React for Beginners"
 *               courseDescription:
 *                 type: string
 *                 description: Description of the course
 *                 example: "A comprehensive guide to React.js"
 *               whatYouWillLearn:
 *                 type: string
 *                 description: Key takeaways from the course
 *                 example: "React fundamentals, hooks, and state management"
 *               price:
 *                 type: number
 *                 description: Price of the course
 *                 example: 49.99
 *               tag:
 *                 type: string
 *                 description: Tag for the course
 *                 example: "react, javascript"
 *               category:
 *                 type: string
 *                 description: ID of the course category
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *               instructions:
 *                 type: string
 *                 description: Instructions for the course
 *                 example: "Follow the steps in each section carefully"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: Thumbnail image of the course
 *     responses:
 *       200:
 *         description: Course created successfully
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
 *                   example: "Course Created Successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: The details of the newly created course
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while creating course"
 */

// Route for editing a course
/**
 * @swagger
 * /api/course/editCourse:
 *   post:
 *     summary: 
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course to be updated
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *               courseName:
 *                 type: string
 *                 description: Name of the course
 *                 example: "React for Advanced Learners"
 *               courseDescription:
 *                 type: string
 *                 description: Description of the course
 *                 example: "An advanced guide to React.js"
 *               price:
 *                 type: number
 *                 description: Price of the course
 *                 example: 79.99
 *               tag:
 *                 type: string
 *                 description: Tag for the course
 *                 example: "advanced, react"
 *               category:
 *                 type: string
 *                 description: ID of the course category
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *               instructions:
 *                 type: string
 *                 description: Instructions for the course
 *                 example: "Make sure to go through the exercises"
 *               thumbnail:
 *                 type: string
 *                 format: binary
 *                 description: New thumbnail image for the course
 *               status:
 *                 type: string
 *                 description: Status of the course (e.g., Drafted, Published)
 *                 example: "Published"
 *     responses:
 *       200:
 *         description: Course updated successfully
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
 *                   example: "Course updated successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: The updated course details
 *       400:
 *         description: Invalid course ID or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid course ID or missing required fields"
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Course not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in updating course"
 */

// Route for deleting a course
/**
 * @swagger
 * /api/course/deleteCourse:
 *   delete:
 *     summary: 
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course to delete
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *     responses:
 *       200:
 *         description: Course deleted successfully
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
 *                   example: "Course deleted successfully"
 *       400:
 *         description: Missing course ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "courseId is absent"
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Course not Found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */

// Route for fetching all courses
/**
 * @swagger
 * /api/course/getAllCourses:
 *   get:
 *     summary: 
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of all courses
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
 *                   example: "Courses fetched successfully"
 *                 allCourses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       courseName:
 *                         type: string
 *                         example: "React for Beginners"
 *                       price:
 *                         type: number
 *                         example: 49.99
 *                       thumbnail:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error while fetching courses"
 */


//cours details
/**
 * @swagger
 * /api/course/getCourseDetails:
 *   post:
 *     summary: 
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: Unique identifier of the course
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *     responses:
 *       200:
 *         description: Course details successfully retrieved
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
 *                   example: "Course Details fetched successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: Comprehensive course details with populated references
 *                   properties:
 *                     _id:
 *                       type: string
 *                     instructor:
 *                       type: object
 *                       description: Instructor details with additional information
 *                     courseContent:
 *                       type: array
 *                       description: Course sections and content
 *                     category:
 *                       type: object
 *                     ratingAndReviews:
 *                       type: array
 *       404:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Course Details not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in fetching course details"
 *                 error:
 *                   type: string
 *                   description: Detailed error message
 */


// Route for fetching full course details
/**
 * @swagger
 * /api/course/getFullCourseDetails:
 *   post:
 *     summary: 
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: ID of the course
 *                 example: "64a1e3f2c1a4f4567890abcd"
 *     responses:
 *       200:
 *         description: Full course details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     courseDetails:
 *                       type: object
 *                       description: Complete course details with instructor and sections
 *                     totalDuration:
 *                       type: string
 *                       description: Total duration of the course in hours and minutes
 *                       example: "5 hours 30 minutes"
 *                     completedVideos:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of completed video IDs
 *       400:
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Could not found the course with the courseId"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */

// Route for fetching instructor courses
/**
 * @swagger
 * /api/course/getInstructorCourses:
 *   get:
 *     summary: 
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of instructor's courses fetched successfully
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
 *                   example: "All instructor courses fetched successfully"
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Course object
 *       400:
 *         description: Instructor ID is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Instructor id is missing"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in fetching instructor courses"
 */




// Route for creating a category
/**
 * @swagger
 * /api/course/createCategory:
 *   post:
 *     summary: 
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: "Programming"
 *               description:
 *                 type: string
 *                 description: Description of the category
 *                 example: "Courses related to programming and software development."
 *     responses:
 *       200:
 *         description: Category created successfully
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
 *                   example: "Category Created Successfully"
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in creating category"
 */

// Route for showing all categories
/**
 * @swagger
 * /api/course/showAllCategories:
 *   get:
 *     summary: 
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories
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
 *                   example: "All Categories Returned Successfully"
 *                 allCategories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "Programming"
 *                       description:
 *                         type: string
 *                         example: "Courses related to programming and software development."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in getting all categories"
 */

// Route for category page details
/**
 * @swagger
 * /api/course/getCategoryPageDetails:
 *   post:
 *     summary: 
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *                 description: ID of the category to fetch details for
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *     responses:
 *       200:
 *         description: Successfully retrieved category details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     selectedCategory:
 *                       type: object
 *                       description: Details of the selected category
 *                     differentCategory:
 *                       type: object
 *                       description: Details of a different category
 *                     mostSellingCourses:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Top 10 most sold courses across all categories
 *       404:
 *         description: Category or courses not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category not found or no courses found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in fetching category page details"
 */


// Route for creating a section
/**
 * @swagger
 * /api/course/addSection:
 *   post:
 *     summary: 
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionName:
 *                 type: string
 *                 description: Name of the section
 *                 example: "Introduction"
 *               courseId:
 *                 type: string
 *                 description: ID of the course to which the section belongs
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Section created successfully and course updated with the new section
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
 *                   example: "Section Created Successfully"
 *                 updatedCourse:
 *                   type: object
 *                   description: The updated course object with the new section
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Missing Properties"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to create section, please try again"
 */

// Route for updating a section
/**
 * @swagger
 * /api/course/updateSection:
 *   post:
 *     summary: 
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionName:
 *                 type: string
 *                 description: New name for the section
 *                 example: "Updated Section Name"
 *               sectionId:
 *                 type: string
 *                 description: ID of the section to update
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *               courseId:
 *                 type: string
 *                 description: ID of the course
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Section updated successfully
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
 *                   example: "Section Updated Successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: Updated course details with the populated course content
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Missing Properties"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to update section, Please try again"
 */

// Route for deleting a section
/**
 * @swagger
 * /api/course/deleteSection:
 *   delete:
 *     summary: 
 *     tags: [Section]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: string
 *                 description: ID of the section to delete
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *               courseId:
 *                 type: string
 *                 description: ID of the course to update after deletion
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Section deleted successfully and course updated
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
 *                   example: "Section Deleted Successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: Updated course details after section deletion
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to Delete section, Please try again"
 */


// Route for creating a subsection
/**
 * @swagger
 * /api/course/addSubSection:
 *   post:
 *     summary: 
 *     tags: [Subsection]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *                 example: "64f2b7c88f1a2b001c3dfb01"
 *               sectionId:
 *                 type: string
 *                 description: The ID of the section
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *               title:
 *                 type: string
 *                 description: Title of the subsection
 *                 example: "Introduction to JavaScript"
 *               description:
 *                 type: string
 *                 description: Description of the subsection
 *                 example: "This subsection covers the basics of JavaScript."
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: Video file to be uploaded
 *     responses:
 *       200:
 *         description: Subsection created successfully
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
 *                   example: "Subsection Created Successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: The updated course details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f2b7c88f1a2b001c3dfb01"
 *                     courseContent:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subSection:
 *                             type: array
 *                             items:
 *                               type: string
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Missing Properties"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to create Subsection, Please try again"
 */

// Route for updating a subsection
/**
 * @swagger
 * /api/course/updateSubSection:
 *   post:
 *     summary: 
 *     tags: [Subsection]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               subSectionId:
 *                 type: string
 *                 description: The ID of the subsection to update
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *                 example: "64f2b7c88f1a2b001c3dfb01"
 *               title:
 *                 type: string
 *                 description: New title for the subsection
 *                 example: "Updated Title"
 *               description:
 *                 type: string
 *                 description: New description for the subsection
 *                 example: "Updated description."
 *               video:
 *                 type: string
 *                 format: binary
 *                 description: New video file to update
 *     responses:
 *       200:
 *         description: Subsection updated successfully
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
 *                   example: "SubSection Updated Successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: The updated course details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f2b7c88f1a2b001c3dfb01"
 *                     courseContent:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subSection:
 *                             type: array
 *                             items:
 *                               type: string
 *       404:
 *         description: Subsection not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "SubSection not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to Update Subsection, Please try again"
 */

// Route for deleting a subsection
/**
 * @swagger
 * /api/course/deleteSubSection:
 *   post:
 *     summary: 
 *     tags: [Subsection]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subSectionId:
 *                 type: string
 *                 description: The ID of the subsection to delete
 *                 example: "64f2b7c88f1a2b001c3dfabc"
 *               sectionId:
 *                 type: string
 *                 description: The ID of the section
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *                 example: "64f2b7c88f1a2b001c3dfb01"
 *     responses:
 *       200:
 *         description: Subsection deleted successfully
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
 *                   example: "Subsection deleted successfully"
 *                 courseDetails:
 *                   type: object
 *                   description: The updated course details
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64f2b7c88f1a2b001c3dfb01"
 *                     courseContent:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           subSection:
 *                             type: array
 *                             items:
 *                               type: string
 *       404:
 *         description: Required fields are missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "All fields are required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Unable to Delete Subsection, Please try again"
 */



// Route for creating a rating and review
/**
 * @swagger
 * /api/course/createRating:
 *   post:
 *     summary: 
 *     tags: [RatingAndReview]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 description: The rating given by the user
 *                 example: 4.5
 *               review:
 *                 type: string
 *                 description: The review text provided by the user
 *                 example: "Great course with detailed explanations."
 *               courseId:
 *                 type: string
 *                 description: The ID of the course being reviewed
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Rating and Review created successfully
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
 *                   example: "Rating and Review created successfully"
 *       403:
 *         description: User has already reviewed the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User already reviewed the course"
 *       404:
 *         description: User is not enrolled in the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User is not enrolled in the course"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in creating rating and review"
 */

// Route for getting the average rating of a course
/**
 * @swagger
 * /api/course/getAverageRating:
 *   post:
 *     summary: 
 *     tags: [RatingAndReview]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course
 *                 example: "64f2b7c88f1a2b001c3dfe45"
 *     responses:
 *       200:
 *         description: Average rating fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 averageRating:
 *                   type: number
 *                   example: 4.2
 *                 message:
 *                   type: string
 *                   example: "Average Rating fetched successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in fetching the average rating"
 */

// Route for getting all ratings and reviews
/**
 * @swagger
 * /api/course/getReviews:
 *   get:
 *     summary: 
 *     tags: [RatingAndReview]
 *     responses:
 *       200:
 *         description: 
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
 *                   example: "All ratings and reviews fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: number
 *                       review:
 *                         type: string
 *                       course:
 *                         type: string
 *                         description: Name of the course
 *                       user:
 *                         type: object
 *                         properties:
 *                           firstName:
 *                             type: string
 *                           lastName:
 *                             type: string
 *                           email:
 *                             type: string
 *                           image:
 *                             type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Something went wrong in fetching the ratings and reviews"
 */



/**
 * @swagger
 * /api/course/updateCourseProgress:
 *   post:
 *     summary: 
 *     tags: [CourseProgress]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course.
 *                 example: 64f2b7c88f1a2b001c3dfe45
 *               subSectionId:
 *                 type: string
 *                 description: The ID of the subsection to mark as completed.
 *                 example: 64f2b7e08f1a2b001c3dfe46
 *     responses:
 *       200:
 *         description: Course progress updated successfully.
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
 *                   example: Video marked completed successfully.
 *       400:
 *         description: Bad request, ID not provided properly or subsection already completed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Subsection is already Completed.
 *       404:
 *         description: Not found, course progress or subsection does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Subsection data is not present.
 *       500:
 *         description: Internal server error while updating course progress.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: Error occurred in marking video completed.
 */
