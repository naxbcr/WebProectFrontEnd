"use strict";
var RemainingTime = (function () {
    function RemainingTime(item) {
        this.today = new Date();
        this.item = item;
        this.calculateTime();
    }
    RemainingTime.prototype.calculateTime = function () {
        // вычисляем время до конца
        this.end_date = new Date(this.item.end_date);
        this.remains = this.end_date.getTime() - this.today.getTime();
        this.hours = Math.ceil(((this.remains / (1000 * 60 * 60)) % 24));
        this.minutes = Math.ceil(((this.remains / (1000 * 60)) % 60));
        this.days = Math.ceil((this.remains / (1000 * 60 * 60 * 24)));
    };
    RemainingTime.prototype.getRemainingTime = function () {
        var time = this.days + "d " + this.hours + "h " + this.minutes + "min ";
        return time;
    };
    return RemainingTime;
}());
exports.RemainingTime = RemainingTime;
//# sourceMappingURL=remainingtime.model.js.map