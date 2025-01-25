const express = require("express");
const router = express.Router();
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payment");
const { auth, isStudent } = require("../middlewares/auth");


router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);




module.exports = router;


/**
 * @swagger
 * /api/payment/capturePayment:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: The IDs of the courses to enroll in.
 *                 example: ["64d6f03b9f4e1c23b476b8f1", "64d6f03b9f4e1c23b476b8f2"]
 *     responses:
 *       200:
 *         description: Payment initiated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 paymentResponse:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: order_9A33XWu170gUtm
 *                     amount:
 *                       type: number
 *                       example: 100000
 *                     currency:
 *                       type: string
 *                       example: INR
 *       404:
 *         description: Course not found or user already enrolled in the course.
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
 *                   example: "Course not found" or "User already enrolled course"
 *       500:
 *         description: Error during payment initiation.
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
 *                   example: "Could not initiate order."
 */

/**
 * @swagger
 * /api/payment/verifyPayment:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *                 description: The Razorpay order ID.
 *                 example: "order_9A33XWu170gUtm"
 *               razorpay_payment_id:
 *                 type: string
 *                 description: The Razorpay payment ID.
 *                 example: "pay_29QQoUBi66xm2f"
 *               razorpay_signature:
 *                 type: string
 *                 description: The Razorpay signature to verify.
 *                 example: "d52e3c7d9cd3b5b8764bc423ab3e0979d13d15a0a7f8365c6e42ff2356b34c66"
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The IDs of the courses enrolled in.
 *                 example: ["64d6f03b9f4e1c23b476b8f1"]
 *     responses:
 *       200:
 *         description: Payment verified and user enrolled in courses.
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
 *                   example: "Payment Verified"
 *       400:
 *         description: Invalid request or signature mismatch.
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
 *                   example: "Invalid Request"
 *       500:
 *         description: Error during payment verification.
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
 *                   example: "Internal server error."
 */

/**
 * @swagger
 * /api/payment/sendPaymentSuccessEmail:
 *   post:
 *     summary: 
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The Razorpay order ID.
 *                 example: "order_9A33XWu170gUtm"
 *               paymentId:
 *                 type: string
 *                 description: The Razorpay payment ID.
 *                 example: "pay_29QQoUBi66xm2f"
 *               amount:
 *                 type: number
 *                 description: The payment amount in paise.
 *                 example: 50000
 *     responses:
 *       200:
 *         description: Payment success email sent successfully.
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
 *                   example: "Email sent successfully"
 *       400:
 *         description: Missing or invalid details.
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
 *                   example: "Please provide all the details"
 *       500:
 *         description: Error during email sending.
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
 *                   example: "Could not send email"
 */

