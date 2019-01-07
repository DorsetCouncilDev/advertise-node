var express = require("express");
var router = express.Router();

var homepage_controller = require("../controllers/homepageController");
var search_controller = require("../controllers/searchController");
var asset_controller = require("../controllers/assetController");
var mediapack_controller = require("../controllers/mediapackController");
var contact_controller = require("../controllers/contactController");

router.get("/", homepage_controller.home);
router.get("/search",search_controller.search);
router.get("/:asset",asset_controller.asset);

router.get("/mediapack",mediapack_controller.mediapack);
router.get("/contact-form",contact_controller.contact);

module.exports = router;