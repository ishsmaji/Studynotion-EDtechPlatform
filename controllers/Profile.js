const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

// update profile
exports.updateProfile = async (req, res) => {
  try {
    // fetch data from req
    const { dateOfBirth, about, contactNumber, gender, firstName, lastName } =
      req.body;

    const userId = req.user.id;

    // validation
    if (
      !contactNumber ||
      !gender ||
      !userId ||
      !about ||
      !dateOfBirth ||
      !firstName ||
      !lastName
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    // updating user also and finding profile id
    const userDetails = await User.findByIdAndUpdate(
      { _id: userId },
      {
        firstName: firstName,
        lastName: lastName,
      },
      { new: true }
    );

    // find profile
    const profileId = userDetails.additionDetails;

    // update profile
    const alluserdetails = await Profile.findByIdAndUpdate(
      { _id: profileId },
      {
        gender: gender,
        contactNumber: contactNumber,
        dateOfBirth: dateOfBirth,
        about: about,
      },
      { new: true }
    );

    const updateProfile = await User.findByIdAndUpdate(
        userId,
        {
          $push: { additionDetails: userDetails.additionDetails._id }, // Correct usage
        },
        { new: true }
      )
        .populate("additionDetails") // Populate referenced documents
        .exec();
      

    // return res.
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updateProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to Update Profile, Please try again",
    });
  }
};

// delete Profile
exports.deleteAccount = async (req, res) => {
  try {
    // get user id
    const userId = req.user.id;

    // user
    const userDetails = await User.findById({ _id: userId });

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    // delete additionalDetails - profile
    const profileId = userDetails.additionDetails;

    await Profile.findByIdAndDelete({ _id: profileId });

    // jitta v course lia h waha se user ko unenroll krna hoga
    for (courseId of userDetails?.courses) {
      const courseDetails = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $pull: {
            studentEnrolled: userId,
          },
        },
        { new: true }
      );
    }

    // delete user Account
    await User.findByIdAndDelete({ _id: userId });

    // return responce
    return res.status(200).json({
      success: true,
      message: "User Account Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to Delete Profile, Please try again",
    });
  }
};

// All UserDetails
exports.getAllUserDetails = async (req, res) => {
  try {
    // fetch data from req.
    const userId = req.user.id;

    // validation
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User Id not found",
      });
    }

    // get data from DB
    const userDetails = await User.findById({ _id: userId })
      .populate("additionDetails")
      .exec();

    // validation
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Details not found",
      });
    }

    // return responce
    return res.status(200).json({
      success: true,
      message: "User Details Fetched Successfully",
      userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
      message: "Unable to Get User Details, Please try again",
    });
  }
};

// update profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    // fetch data from req.
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    // validation
    if (!displayPicture || !userId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload image to cloudinary
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // update user model
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      {
        image: image.secure_url,
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Display picture updated Successfully",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in updating Profile picture",
      error: err.message,
    });
  }
};

// getEnrolledCourses
/**
 * Controller to fetch enrolled courses for a user with progress tracking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getEnrolledCourses = async (req, res) => {
  try {
    // Extract user ID from request object
    const userId = req.user.id;

    // Validate if userId exists
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Fetch user details with populated course information
    // Using populate to get nested course content and subsection details
    let userDetails = await User.findById({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    // Convert mongoose document to plain JavaScript object
    userDetails = userDetails.toObject();

    // Process each course
    for (let i = 0; i < userDetails?.courses?.length; i++) {
      let totalDurationInSeconds = 0;
      let subSectionLength = 0;

      // Calculate total duration and subsection length for each course
      for (let j = 0; j < userDetails?.courses[i]?.courseContent?.length; j++) {
        // Calculate total duration from all subsections
        userDetails?.courses[i]?.courseContent[j]?.subSection.forEach(
          (subSection) => {
            totalDurationInSeconds += parseInt(subSection?.timeDuration);
          }
        );

        // Add the length of subsections for this course content
        subSectionLength += userDetails?.courses[i]?.courseContent[j]?.subSection?.length || 0;
      }

      // Convert total duration from seconds to formatted duration string
      userDetails.courses[i].totalDuration = convertSecondsToDuration(
        totalDurationInSeconds
      );

      // Fetch progress details for the current course
      let courseProgressDetails = await CourseProgress.findOne({
        courseId: userDetails?.courses[i]?._id,
        userId: userId,
      });

      // Get count of completed videos
      let courseProgressCount = courseProgressDetails?.completedVideos?.length || 0;

      // Calculate progress percentage
      if (subSectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // Calculate percentage with 2 decimal places
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / subSectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    // Validate if user details were found
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Could not find user details",
      });
    }

    // Return successful response with course data
    return res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: userDetails.courses,
    });

  } catch (error) {
    // Handle any errors that occur during execution
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went wrong in GetEnrolled Courses",
    });
  }
};

// instructor Dashboard
exports.instructorDasboard = async (req, res) => {
  try {
    const userId = req.user.id;

    //  fetching course details
    const courseDetails = await Course.find({ instructor: userId });

    // creating an array using map which contains course related details
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course?.studentEnrolled.length;
      const totalAmountGenerated = course?.price * totalStudentsEnrolled;

      // creating an obj that can be stored in a array upon return
      const courseDataWithStats = {
        _id: course?._id,
        courseName: course?.courseName,
        courseDescription: course?.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    return res.status(200).json({
      success: true,
      message: "Instuctor dashboard details fetched successfully",
      courseData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong in fetching instructor dashboard Data",
    });
  }
};
