const { contactUsEmail } = require("../mail/templates/contactFormRes")
const MailSender = require("../utils/MailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstName, lastName, message, contactNumber, countrycode } = req.body
  console.log(req.body)
  try {

   // Basic validation
  if (!email || !firstName || !lastName || !message || !contactNumber || !countrycode) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  

    const emailRes = await MailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, contactNumber, countrycode)
    )
    console.log("Email Res ", emailRes)
    return res.status(200).json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
    })
  }
}