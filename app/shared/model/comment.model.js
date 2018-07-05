"use strict";
var Comment = (function () {
    function Comment(id, created_date, comment, id_user, id_translate, position, userfname, userlname) {
        this.id = id;
        this.created_date = created_date;
        this.comment = comment;
        this.id_user = id_user;
        this.id_translate = id_translate;
        this.postion = position;
        this.userfname = userfname;
        this.userlname = userlname;
    }
    return Comment;
}());
exports.Comment = Comment;
//# sourceMappingURL=comment.model.js.map