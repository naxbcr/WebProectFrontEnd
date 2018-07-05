"use strict";
var User = (function () {
    function User(id, idp, email, fname, lname, emailconf, pname) {
        this.id = id;
        this.id_position = idp;
        this.email = email;
        this.first_name = fname;
        this.last_name = lname;
        this.emailconfirm = emailconf;
        this.postionname = pname;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map