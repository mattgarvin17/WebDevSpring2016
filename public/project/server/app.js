module.exports = function(app, db, mongoose) {
    // pass db and mongoose reference to model
    var userModel    = require("./models/user.model.server.js")(db, mongoose);
    var userService  = require("./services/user.service.server.js") (app, userModel);

    var groupModel    = require("./models/group.model.server.js")(db, mongoose);
    var groupService  = require("./services/group.service.server.js") (app, groupModel);

    var giftModel    = require("./models/gift.model.server.js")(db, mongoose);
    var giftService  = require("./services/gift.service.server.js") (app, giftModel);

    var assignmentModel    = require("./models/assignment.model.server.js")(db, mongoose);
    var assignmentService  = require("./services/assignment.service.server.js") (app, assignmentModel);

    var inviteModel    = require("./models/invite.model.server.js")(db, mongoose);
    var inviteService  = require("./services/invite.service.server.js") (app, inviteModel);
}
