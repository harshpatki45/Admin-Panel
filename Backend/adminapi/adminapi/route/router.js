const express = require("express");

const upload = require("../connection/multer.js");

const {
  login,
  ForgotPassword,
  resetPassword,
  getProfileDetails,
  changePassword,
  dashboard,
  userList,
  AddUser,
  userDetails,
  activateDeactivate,
  getAllCategory,
  editCategory,
  addCategory,
  deleteCategory,
  getAllVideo,
  videoDetails,
  addVideo,
  deleteVideo,
  updateVideo,
  getAllPdf,
  addPdf,
  editPdf,
  deletePdf,
  updateContent,
  getFaq,
  getFaqDetails,
  addFaq,
  editFaq,
  deleteFaq,
  getContact,
  replyContactUs,
  getContent,
  userByDates,
  videoByDates,
  pdfByDates,
  userAnalyticReport,
  videoAnalyticReport,
  pdfAnalyticReport,
  forgotPasswordNew
} = require("../controller/admin_controller.js");

const { verifyToken } = require("../middleware/jwt_auth.js");

const router = express.Router();

router.post("/login", upload.none(), login);

router.post("/forgot_password", upload.none(), ForgotPassword);

router.post("/reset_password", upload.none(), resetPassword);

router.post("/change_password", upload.none(), verifyToken, changePassword);

router.get("/profile_details", verifyToken, getProfileDetails);

router.get("/dashboard", verifyToken, dashboard);

router.get("/user_list", verifyToken, userList);

router.post("/add_user", verifyToken, AddUser);

router.get("/user_details", verifyToken, userDetails);

router.post("/active_deactive", upload.none(), verifyToken, activateDeactivate);

router.get("/get_category", verifyToken, getAllCategory);

router.post("/edit_category", upload.none(), verifyToken, editCategory);

router.post("/add_category", upload.none(), verifyToken, addCategory);

router.get("/delete_category", verifyToken, deleteCategory);

router.get("/get_all_video", verifyToken, getAllVideo);

router.get("/video_details", verifyToken, videoDetails);

router.post("/forgot-password-new", verifyToken, forgotPasswordNew)

router.post(
  "/add_video",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  verifyToken,
  addVideo
);

router.post("/delete_video", upload.none(), verifyToken, deleteVideo);

router.post(
  "/update_video",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  verifyToken,
  updateVideo
);

router.get("/get_all_pdf", verifyToken, getAllPdf);

router.post("/add_pdf", upload.single("pdf"), verifyToken, addPdf);

router.post("/edit_pdf", upload.single("pdf"), verifyToken, editPdf);

router.post("/delete_pdf", upload.none(), verifyToken, deletePdf);

router.get("/get_faq", getFaq);

router.get("/faq_details", verifyToken, getFaqDetails);

router.post("/add_faq", upload.none(), addFaq);

router.post("/edit_faq", upload.none(), verifyToken, editFaq);

router.post("/delete_faq", upload.none(), verifyToken, deleteFaq);

router.get("/get_contact_us", verifyToken, getContact);

router.post("/reply_contact_us", upload.none(), verifyToken, replyContactUs);

router.get("/get-content-by-id", verifyToken, getContent);

router.post("/update_content", upload.none(), verifyToken, updateContent);

router.get("/get_user_by_date", verifyToken, userByDates);

router.get("/get_video_by_date", verifyToken, videoByDates);

router.get("/get_pdf_by_date", verifyToken, pdfByDates);

router.get("/user_analytic_report", verifyToken, userAnalyticReport);

router.get("/video_analytic_report", verifyToken, videoAnalyticReport);

router.get("/pdf_analytic_report", verifyToken, pdfAnalyticReport);

module.exports = router;
