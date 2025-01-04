//Thunder Client is a extension like post man
const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
// const verifyJwt = require('../../middleware/verifyJWT');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router
  .route('/')
  // .get(verifyJwt, employeesController.getAllEmployees)
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id').get(employeesController.getEmployee);

module.exports = router;
