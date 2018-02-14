"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var NotificationComponent = (function () {
    function NotificationComponent() {
        try {
            firebase.init({
                onPushTokenReceivedCallback: function (token) {
                    console.log("Firebase push token: " + token);
                },
                onMessageReceivedCallback: function (message) {
                    console.log("Title: " + message.title);
                    console.log("Body: " + message.body);
                    // if your server passed a custom property called 'foo', then do this:
                    console.log("Value of 'foo': " + message.data.foo);
                }
            }).then(function (instance) {
                console.log("firebase.init done");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsdURBQXlEO0FBUXpEO0lBR0k7UUFDSSxJQUFJLENBQUM7WUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNWLDJCQUEyQixFQUFFLFVBQUMsS0FBYTtvQkFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsQ0FBQztnQkFDakQsQ0FBQztnQkFDRCx5QkFBeUIsRUFBRSxVQUFDLE9BQXlCO29CQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVUsT0FBTyxDQUFDLEtBQU8sQ0FBQyxDQUFDO29CQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVMsT0FBTyxDQUFDLElBQU0sQ0FBQyxDQUFDO29CQUNyQyxzRUFBc0U7b0JBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQW1CLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBSyxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7YUFFSixDQUFDLENBQUMsSUFBSSxDQUNILFVBQUEsUUFBUTtnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDdEMsQ0FBQyxFQUNELFVBQUEsS0FBSztnQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUF3QixLQUFPLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQ0osQ0FBQztRQUNOLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsQ0FBQyxDQUFDLFVBQVksQ0FBQyxDQUFDO1FBQ3hELENBQUM7SUFDTCxDQUFDO0lBRUQsd0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCwyQ0FBVyxHQUFYO1FBQ0ksUUFBUSxDQUFDLG1CQUFtQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBYTtZQUM5QywrQkFBK0I7WUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBdUIsS0FBTyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckNRLHFCQUFxQjtRQUxqQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLCtCQUErQjtTQUMvQyxDQUFDOztPQUNXLHFCQUFxQixDQXNDakM7SUFBRCw0QkFBQztDQUFBLEFBdENELElBc0NDO0FBdENZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtbm90aWZpY2F0aW9uXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL25vdGlmaWNhdGlvbi5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZpcmViYXNlLmluaXQoe1xuICAgICAgICAgICAgICAgIG9uUHVzaFRva2VuUmVjZWl2ZWRDYWxsYmFjazogKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGaXJlYmFzZSBwdXNoIHRva2VuOiBcIiArIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2s6IChtZXNzYWdlOiBmaXJlYmFzZS5NZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUaXRsZTogJHttZXNzYWdlLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQm9keTogJHttZXNzYWdlLmJvZHl9YCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHlvdXIgc2VydmVyIHBhc3NlZCBhIGN1c3RvbSBwcm9wZXJ0eSBjYWxsZWQgJ2ZvbycsIHRoZW4gZG8gdGhpczpcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFZhbHVlIG9mICdmb28nOiAke21lc3NhZ2UuZGF0YS5mb299YCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBmaXJlYmFzZS5pbml0IGVycm9yOiAke2Vycm9yfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBmaXJlYmFzZS5pbml0IGVycm9yOiAke2Uuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBnZXRGQ01Ub2tlbigpIHtcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFB1c2hUb2tlbigpLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIC8vIG1heSBiZSBudWxsIGlmIG5vdCBrbm93biB5ZXRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDdXJyZW50IHB1c2ggdG9rZW46ICR7dG9rZW59YCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=