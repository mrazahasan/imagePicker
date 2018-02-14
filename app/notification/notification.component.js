"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var NotificationComponent = /** @class */ (function () {
    function NotificationComponent() {
        try {
            firebase.init({
                onPushTokenReceivedCallback: function (token) {
                    console.log("Firebase push token: " + token);
                }
            }).then(function (instance) {
                console.log("firebase.init done");
                firebase.addOnMessageReceivedCallback(function (message) {
                    console.log("Title: " + message.title);
                    console.log("Body: " + message.body);
                    // if your server passed a custom property called 'foo', then do this:
                    console.log("Value of 'payload': " + message.data.payload);
                });
            }, function (error) {
                console.log("firebase.init error: " + error);
            });
        }
        catch (e) {
            console.log("firebase.init error: " + e.statusText);
        }
    }
    NotificationComponent.prototype.ngOnInit = function () { };
    NotificationComponent.prototype.getFCMToken = function () {
        firebase.getCurrentPushToken().then(function (token) {
            // may be null if not known yet
            console.log("Current push token: " + token);
        });
    };
    NotificationComponent = __decorate([
        core_1.Component({
            selector: "ns-notification",
            moduleId: module.id,
            templateUrl: "./notification.component.html",
        }),
        __metadata("design:paramtypes", [])
    ], NotificationComponent);
    return NotificationComponent;
}());
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsdURBQXlEO0FBUXpEO0lBR0k7UUFDSSxJQUFJLENBQUM7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNWLDJCQUEyQixFQUFFLFVBQUMsS0FBYTtvQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDakQsQ0FBQzthQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBQSxRQUFRO2dCQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDbEMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLFVBQUMsT0FBeUI7b0JBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBVSxPQUFPLENBQUMsS0FBTyxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBUyxPQUFPLENBQUMsSUFBTSxDQUFDLENBQUM7b0JBQ3JDLHNFQUFzRTtvQkFDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBdUIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFTLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUNKLENBQUM7WUFDTixDQUFDLEVBQ0QsVUFBQSxLQUFLO2dCQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQXdCLEtBQU8sQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FDSixDQUFDO1FBQ04sQ0FBQztRQUNELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUF3QixDQUFDLENBQUMsVUFBWSxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUNMLENBQUM7SUFFRCx3Q0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLDJDQUFXLEdBQVg7UUFDSSxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFhO1lBQzlDLCtCQUErQjtZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF1QixLQUFPLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyQ1EscUJBQXFCO1FBTGpDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsK0JBQStCO1NBQy9DLENBQUM7O09BQ1cscUJBQXFCLENBc0NqQztJQUFELDRCQUFDO0NBQUEsQUF0Q0QsSUFzQ0M7QUF0Q1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1ub3RpZmljYXRpb25cIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbm90aWZpY2F0aW9uLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZmlyZWJhc2UuaW5pdCh7XG4gICAgICAgICAgICAgICAgb25QdXNoVG9rZW5SZWNlaXZlZENhbGxiYWNrOiAodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIHB1c2ggdG9rZW46IFwiICsgdG9rZW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuYWRkT25NZXNzYWdlUmVjZWl2ZWRDYWxsYmFjaygobWVzc2FnZTogZmlyZWJhc2UuTWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaXRsZTogJHttZXNzYWdlLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBCb2R5OiAke21lc3NhZ2UuYm9keX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiB5b3VyIHNlcnZlciBwYXNzZWQgYSBjdXN0b20gcHJvcGVydHkgY2FsbGVkICdmb28nLCB0aGVuIGRvIHRoaXM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFZhbHVlIG9mICdwYXlsb2FkJzogJHttZXNzYWdlLmRhdGEucGF5bG9hZH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYGZpcmViYXNlLmluaXQgZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYGZpcmViYXNlLmluaXQgZXJyb3I6ICR7ZS5zdGF0dXNUZXh0fWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIGdldEZDTVRva2VuKCkge1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50UHVzaFRva2VuKCkudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgLy8gbWF5IGJlIG51bGwgaWYgbm90IGtub3duIHlldFxuICAgICAgICAgICAgY29uc29sZS5sb2coYEN1cnJlbnQgcHVzaCB0b2tlbjogJHt0b2tlbn1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==