/*jshint node:true*/
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "phantomjs_debug_port": 9000,
  "launch_in_ci": [
    "phantomjs"
  ],
  "launch_in_dev": [
    "phantomjs"
  ]
};
