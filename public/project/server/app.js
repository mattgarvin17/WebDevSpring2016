module.exports = function(app) {

    var userModel    = require("./models/user.model.server.js")();

    var groupModel    = require("./models/group.model.server.js")();
    var groupService  = require("./services/group.service.server.js")(app, groupModel, userModel);

    var userService  = require("./services/user.service.server.js")(app, userModel, groupModel);

    var giftModel    = require("./models/gift.model.server.js")();
    var giftService  = require("./services/gift.service.server.js")(app, giftModel);

    var assignmentModel    = require("./models/assignment.model.server.js")();
    var assignmentService  = require("./services/assignment.service.server.js")(app, assignmentModel);

    var inviteModel    = require("./models/invite.model.server.js")();
    var inviteService  = require("./services/invite.service.server.js")(app, inviteModel);
}
