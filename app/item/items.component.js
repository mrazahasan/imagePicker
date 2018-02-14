"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_background_http_1 = require("nativescript-background-http");
var camera = require("nativescript-camera");
var Subject_1 = require("rxjs/Subject");
var platform_1 = require("tns-core-modules/platform");
var fs = require("file-system");
var imageSource = require("image-source");
var nativescript_mediafilepicker_1 = require("nativescript-mediafilepicker");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent() {
        this.UploadSession = nativescript_background_http_1.session('image-upload');
    }
    ItemsComponent.prototype.ngOnInit = function () { };
    ItemsComponent.prototype.VideoPicker = function () {
        var _this = this;
        var options = {
            android: {
                mxcount: 1,
                enableImagePicker: false,
                enableVideoPicker: true,
                enableCameraSupport: true
            },
            ios: {
                allowsMultipleSelection: false,
                title: "videos",
                mediaTypes: "video",
                showCameraButton: false
            }
        };
        var mediafilepicker = new nativescript_mediafilepicker_1.Mediafilepicker();
        mediafilepicker.on("getFiles", function (res) {
            var files = res.files;
            if (files.length > 0) {
                files = files.split(",");
                files.forEach(function (file) {
                    console.log(file);
                    _this.uploadMultipartImagePicker({ fileUri: file })
                        .subscribe({
                        next: function (e) {
                            console.log("Upload: " + (e.currentBytes / e.totalBytes) * 100);
                        },
                        error: function (e) {
                            console.log(JSON.stringify(e));
                        },
                        complete: function () {
                            console.log("complete");
                        }
                    });
                });
            }
            else {
                console.log("There was some problem to select the file. Looks like user has cancel it.");
            }
        });
        mediafilepicker.on("error", function (res) {
            console.log(res.msg);
        });
        mediafilepicker.startFilePicker(options);
    };
    ItemsComponent.prototype.cameraOpen = function () {
        var _this = this;
        camera.requestPermissions();
        camera
            .takePicture({
            saveToGallery: true,
            cameraFacing: 'front'
        })
            .then(function (imageAsset) {
            var image;
            if (platform_1.isAndroid) {
                image = {
                    fileUri: imageAsset.android
                };
                _this.uploadMultipartImagePicker(image)
                    .subscribe({
                    next: function (e) {
                        console.log("Upload: " + (e.currentBytes / e.totalBytes) * 100);
                    },
                    error: function (e) {
                        console.log(JSON.stringify(e));
                    },
                    complete: function () {
                        console.log("complete");
                    }
                });
            }
            else {
                var source = new imageSource.ImageSource();
                source.fromAsset(imageAsset)
                    .then(function (imageSource) {
                    var folder = fs.knownFolders.documents();
                    var path = fs.path.join(folder.path, "Temp" + Date.now() + ".jpg");
                    var saved = imageSource.saveToFile(path, "png");
                    console.log(saved);
                    if (saved) {
                        _this.uploadMultipartImagePicker({ fileUri: path })
                            .subscribe({
                            next: function (e) {
                                console.log("Upload: " + (e.currentBytes / e.totalBytes) * 100);
                            },
                            error: function (e) {
                                console.log(JSON.stringify(e));
                            },
                            complete: function () {
                                console.log("complete");
                            }
                        });
                    }
                });
            }
        })
            .catch(function (err) {
            console.log("Error -> " + err.message);
        });
    };
    ItemsComponent.prototype.pickerOpen = function () {
        var _this = this;
        var options = {
            android: {
                mxcount: 1,
                enableImagePicker: true,
                enableVideoPicker: false,
                enableCameraSupport: true
            },
            ios: {
                allowsMultipleSelection: false,
                title: "Images",
                mediaTypes: "image",
                showCameraButton: false
            }
        };
        var mediafilepicker = new nativescript_mediafilepicker_1.Mediafilepicker();
        mediafilepicker.on("getFiles", function (res) {
            var files = res.files;
            if (files.length > 0) {
                files = files.split(",");
                files.forEach(function (file) {
                    console.log(file);
                    _this.uploadMultipartImagePicker({ fileUri: file })
                        .subscribe({
                        next: function (e) {
                            console.log("Upload: " + (e.currentBytes / e.totalBytes) * 100);
                        },
                        error: function (e) {
                            console.log(JSON.stringify(e));
                        },
                        complete: function () {
                            console.log("complete");
                        }
                    });
                });
            }
            else {
                console.log("There was some problem to select the file. Looks like user has cancel it.");
            }
        });
        mediafilepicker.on("error", function (res) {
            console.log(res.msg);
        });
        mediafilepicker.startFilePicker(options);
    };
    ItemsComponent.prototype.uploadMultipartImagePicker = function (image) {
        var fileUri = image.fileUri;
        var filename = fileUri.substring(fileUri.lastIndexOf('/') + 1);
        var mimetype = filename.substring(filename.lastIndexOf('.') + 1);
        var uploadType;
        var request;
        if (mimetype === 'mp4') {
            uploadType = "video";
            request = {
                url: "https://requestb.in/1mf5ae31",
                method: 'POST',
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": filename,
                    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiJiYWM0ZWM2Yi1kNmM4LTQ0NjAtOGU5ZS1mNTUyMWZhZGE3YWUiLCJ1bmlxdWVfbmFtZSI6Im1fcmF6YV9oYXNzYW5AaG90bWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI2Njc3NjE5OS1hYTJjLTQ5YmQtYmY1YS1iMzg2MzY2NTUzOWQiLCJVc2VySWQiOiJiYWM0ZWM2Yi1kNmM4LTQ0NjAtOGU5ZS1mNTUyMWZhZGE3YWUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiNDE0ZTE5MjdhMzg4NGY2OGFiYzc5ZjcyODM4MzdmZDEiLCJleHAiOjE1NjYyNTQ0MjksIm5iZiI6MTUxNDQxNDQyOX0.fp0IyQSId8sisGQ3kqMPXovzcl8KGZ0M9LBjnSlOpSE",
                    "UserId": "bac4ec6b-d6c8-4460-8e9e-f5521fada7ae",
                    "QuestionId": '5a4420b53a5d5a1c38e34028',
                    "GameId": '13'
                },
                description: "Uploading " + filename
            };
        }
        else {
            uploadType = "image";
            request = {
                url: "https://requestb.in/1mf5ae31",
                method: 'POST',
                headers: {
                    "Content-Type": "application/octet-stream",
                    "File-Name": filename,
                    'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiJiYWM0ZWM2Yi1kNmM4LTQ0NjAtOGU5ZS1mNTUyMWZhZGE3YWUiLCJ1bmlxdWVfbmFtZSI6Im1fcmF6YV9oYXNzYW5AaG90bWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI2Njc3NjE5OS1hYTJjLTQ5YmQtYmY1YS1iMzg2MzY2NTUzOWQiLCJVc2VySWQiOiJiYWM0ZWM2Yi1kNmM4LTQ0NjAtOGU5ZS1mNTUyMWZhZGE3YWUiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0IiwiYXVkIjoiNDE0ZTE5MjdhMzg4NGY2OGFiYzc5ZjcyODM4MzdmZDEiLCJleHAiOjE1NjYyNTQ0MjksIm5iZiI6MTUxNDQxNDQyOX0.fp0IyQSId8sisGQ3kqMPXovzcl8KGZ0M9LBjnSlOpSE",
                    "UserId": "bac4ec6b-d6c8-4460-8e9e-f5521fada7ae",
                    "QuestionId": '5a4420b53a5d5a1c38e34028',
                    "GameId": '2'
                },
                description: "Uploading "
            };
        }
        var params = [{ name: filename, filename: fileUri, mimeType: uploadType + "/" + mimetype }];
        console.log(JSON.stringify(params));
        var subject = new Subject_1.Subject();
        var task = this.UploadSession.multipartUpload(params, request);
        task.on('progress', function (e) { return subject.next(e); });
        task.on('error', function (e) { return subject.error(e); });
        task.on('complete', function (e) { return subject.complete(); });
        return subject;
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
        }),
        __metadata("design:paramtypes", [])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELDZFQUFnRTtBQUNoRSw0Q0FBOEM7QUFFOUMsd0NBQXFDO0FBQ3JDLHNEQUFvRDtBQUNwRCxnQ0FBa0M7QUFDbEMsMENBQTRDO0FBQzVDLDZFQUF1RjtBQVF2RjtJQUdJO1FBR0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxzQ0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxpQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLG9DQUFXLEdBQVg7UUFBQSxpQkFvREM7UUFuREcsSUFBSSxPQUFPLEdBQTJCO1lBQ2xDLE9BQU8sRUFBRTtnQkFDTCxPQUFPLEVBQUUsQ0FBQztnQkFDVixpQkFBaUIsRUFBRSxLQUFLO2dCQUN4QixpQkFBaUIsRUFBRSxJQUFJO2dCQUN2QixtQkFBbUIsRUFBRSxJQUFJO2FBQzVCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELHVCQUF1QixFQUFFLEtBQUs7Z0JBQzlCLEtBQUssRUFBRSxRQUFRO2dCQUNmLFVBQVUsRUFBRSxPQUFPO2dCQUNuQixnQkFBZ0IsRUFBRSxLQUFLO2FBQzFCO1NBQ0osQ0FBQztRQUNGLElBQUksZUFBZSxHQUFHLElBQUksOENBQWUsRUFBRSxDQUFDO1FBRTVDLGVBQWUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFHLFVBQUMsR0FBUTtZQUVyQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBRXRCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRXpCLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO29CQUVkLE9BQU8sQ0FBQyxHQUFH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LFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzs7T0FDVyxjQUFjLENBd08xQjtJQUFELHFCQUFDO0NBQUEsQUF4T0QsSUF3T0M7QUF4T1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IHNlc3Npb24sIFNlc3Npb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhY2tncm91bmQtaHR0cFwiO1xuaW1wb3J0ICogYXMgY2FtZXJhIGZyb20gXCJuYXRpdmVzY3JpcHQtY2FtZXJhXCI7XG5pbXBvcnQgeyBmaXJzdCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gXCJyeGpzL1N1YmplY3RcIjtcbmltcG9ydCB7aXNBbmRyb2lkfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBpbWFnZVNvdXJjZSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XG5pbXBvcnQgeyBNZWRpYWZpbGVwaWNrZXIsIE1lZGlhRmlsZXBpY2tlck9wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtbWVkaWFmaWxlcGlja2VyJztcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgcHJpdmF0ZSBVcGxvYWRTZXNzaW9uOiBTZXNzaW9uO1xuICAgIHByaXZhdGUgbWVkaWFmaWxlcGlja2VyO1xuICAgIGNvbnN0cnVjdG9yKFxuXG4gICAgKSB7XG4gICAgICAgIHRoaXMuVXBsb2FkU2Vzc2lvbiA9IHNlc3Npb24oJ2ltYWdlLXVwbG9hZCcpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBWaWRlb1BpY2tlcigpe1xuICAgICAgICBsZXQgb3B0aW9uczogTWVkaWFGaWxlcGlja2VyT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFuZHJvaWQ6IHtcbiAgICAgICAgICAgICAgICBteGNvdW50OiAxLFxuICAgICAgICAgICAgICAgIGVuYWJsZUltYWdlUGlja2VyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBlbmFibGVWaWRlb1BpY2tlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlbmFibGVDYW1lcmFTdXBwb3J0OiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW9zOiB7XG4gICAgICAgICAgICAgICAgYWxsb3dzTXVsdGlwbGVTZWxlY3Rpb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcInZpZGVvc1wiLFxuICAgICAgICAgICAgICAgIG1lZGlhVHlwZXM6IFwidmlkZW9cIixcbiAgICAgICAgICAgICAgICBzaG93Q2FtZXJhQnV0dG9uOiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsZXQgbWVkaWFmaWxlcGlja2VyID0gbmV3IE1lZGlhZmlsZXBpY2tlcigpO1xuXG4gICAgICAgIG1lZGlhZmlsZXBpY2tlci5vbihcImdldEZpbGVzXCIsICAocmVzOiBhbnkpID0+e1xuXG4gICAgICAgICAgICBsZXQgZmlsZXMgPSByZXMuZmlsZXM7XG5cbiAgICAgICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBmaWxlcyA9IGZpbGVzLnNwbGl0KFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkTXVsdGlwYXJ0SW1hZ2VQaWNrZXIoe2ZpbGVVcmk6IGZpbGV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwbG9hZDogJHsoZS5jdXJyZW50Qnl0ZXMgLyBlLnRvdGFsQnl0ZXMpICogMTAwfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIHNvbWUgcHJvYmxlbSB0byBzZWxlY3QgdGhlIGZpbGUuIExvb2tzIGxpa2UgdXNlciBoYXMgY2FuY2VsIGl0LlwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lZGlhZmlsZXBpY2tlci5vbihcImVycm9yXCIsICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5tc2cpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lZGlhZmlsZXBpY2tlci5zdGFydEZpbGVQaWNrZXIob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgY2FtZXJhT3Blbigpe1xuICAgICAgICBjYW1lcmEucmVxdWVzdFBlcm1pc3Npb25zKCk7XG4gICAgICAgIGNhbWVyYVxuICAgICAgICAgICAgLnRha2VQaWN0dXJlKHtcbiAgICAgICAgICAgICAgICBzYXZlVG9HYWxsZXJ5OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNhbWVyYUZhY2luZzogJ2Zyb250J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGltYWdlQXNzZXQgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbWFnZSA6IGFueTtcbiAgICAgICAgICAgICAgICBpZihpc0FuZHJvaWQpe1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IDxhbnk+e1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZVVyaTogaW1hZ2VBc3NldC5hbmRyb2lkXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRNdWx0aXBhcnRJbWFnZVBpY2tlcihpbWFnZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVcGxvYWQ6ICR7KGUuY3VycmVudEJ5dGVzIC8gZS50b3RhbEJ5dGVzKSAqIDEwMH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29tcGxldGVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzb3VyY2UgPSBuZXcgaW1hZ2VTb3VyY2UuSW1hZ2VTb3VyY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLmZyb21Bc3NldChpbWFnZUFzc2V0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oaW1hZ2VTb3VyY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb2xkZXIgPSBmcy5rbm93bkZvbGRlcnMuZG9jdW1lbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGggPSBmcy5wYXRoLmpvaW4oZm9sZGVyLnBhdGgsIFwiVGVtcFwiK0RhdGUubm93KCkrXCIuanBnXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzYXZlZCA9IGltYWdlU291cmNlLnNhdmVUb0ZpbGUocGF0aCwgXCJwbmdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2F2ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNhdmVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRNdWx0aXBhcnRJbWFnZVBpY2tlcih7ZmlsZVVyaTogcGF0aH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVXBsb2FkOiAkeyhlLmN1cnJlbnRCeXRlcyAvIGUudG90YWxCeXRlcykgKiAxMDB9YClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgLT4gXCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwaWNrZXJPcGVuKCl7XG4gICAgICAgIGxldCBvcHRpb25zOiBNZWRpYUZpbGVwaWNrZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgYW5kcm9pZDoge1xuICAgICAgICAgICAgICAgIG14Y291bnQ6IDEsXG4gICAgICAgICAgICAgICAgZW5hYmxlSW1hZ2VQaWNrZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgZW5hYmxlVmlkZW9QaWNrZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGVuYWJsZUNhbWVyYVN1cHBvcnQ6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpb3M6IHtcbiAgICAgICAgICAgICAgICBhbGxvd3NNdWx0aXBsZVNlbGVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiSW1hZ2VzXCIsXG4gICAgICAgICAgICAgICAgbWVkaWFUeXBlczogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgIHNob3dDYW1lcmFCdXR0b246IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCBtZWRpYWZpbGVwaWNrZXIgPSBuZXcgTWVkaWFmaWxlcGlja2VyKCk7XG4gICAgICAgIG1lZGlhZmlsZXBpY2tlci5vbihcImdldEZpbGVzXCIsICAocmVzOiBhbnkpID0+e1xuXG4gICAgICAgICAgICBsZXQgZmlsZXMgPSByZXMuZmlsZXM7XG5cbiAgICAgICAgICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICBmaWxlcyA9IGZpbGVzLnNwbGl0KFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkTXVsdGlwYXJ0SW1hZ2VQaWNrZXIoe2ZpbGVVcmk6IGZpbGV9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVwbG9hZDogJHsoZS5jdXJyZW50Qnl0ZXMgLyBlLnRvdGFsQnl0ZXMpICogMTAwfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIHNvbWUgcHJvYmxlbSB0byBzZWxlY3QgdGhlIGZpbGUuIExvb2tzIGxpa2UgdXNlciBoYXMgY2FuY2VsIGl0LlwiKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lZGlhZmlsZXBpY2tlci5vbihcImVycm9yXCIsICAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy5tc2cpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1lZGlhZmlsZXBpY2tlci5zdGFydEZpbGVQaWNrZXIob3B0aW9ucyk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIHVwbG9hZE11bHRpcGFydEltYWdlUGlja2VyKGltYWdlOiBhbnkpOiBTdWJqZWN0PGFueT4ge1xuXG4gICAgICAgIGxldCBmaWxlVXJpID0gaW1hZ2UuZmlsZVVyaTtcbiAgICAgICAgbGV0IGZpbGVuYW1lID0gZmlsZVVyaS5zdWJzdHJpbmcoZmlsZVVyaS5sYXN0SW5kZXhPZignLycpKzEpO1xuICAgICAgICBsZXQgbWltZXR5cGUgPSBmaWxlbmFtZS5zdWJzdHJpbmcoZmlsZW5hbWUubGFzdEluZGV4T2YoJy4nKSsxKTtcbiAgICAgICAgbGV0IHVwbG9hZFR5cGU7XG4gICAgICAgIGxldCByZXF1ZXN0O1xuICAgICAgICBpZihtaW1ldHlwZSA9PT0gJ21wNCcpe1xuICAgICAgICAgICAgdXBsb2FkVHlwZSA9IFwidmlkZW9cIjtcbiAgICAgICAgICAgIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vcmVxdWVzdGIuaW4vMW1mNWFlMzFcIixcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRmlsZS1OYW1lXCI6IGZpbGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IFwiQmVhcmVyIGV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp1WVcxbGFXUWlPaUppWVdNMFpXTTJZaTFrTm1NNExUUTBOakF0T0dVNVpTMW1OVFV5TVdaaFpHRTNZV1VpTENKMWJtbHhkV1ZmYm1GdFpTSTZJbTFmY21GNllWOW9ZWE56WVc1QWFHOTBiV0ZwYkM1amIyMGlMQ0pvZEhSd09pOHZjMk5vWlcxaGN5NXRhV055YjNOdlpuUXVZMjl0TDJGalkyVnpjMk52Ym5SeWIyeHpaWEoyYVdObEx6SXdNVEF2TURjdlkyeGhhVzF6TDJsa1pXNTBhWFI1Y0hKdmRtbGtaWElpT2lKQlUxQXVUa1ZVSUVsa1pXNTBhWFI1SWl3aVFYTndUbVYwTGtsa1pXNTBhWFI1TGxObFkzVnlhWFI1VTNSaGJYQWlPaUkyTmpjM05qRTVPUzFoWVRKakxUUTVZbVF0WW1ZMVlTMWlNemcyTXpZMk5UVXpPV1FpTENKVmMyVnlTV1FpT2lKaVlXTTBaV00yWWkxa05tTTRMVFEwTmpBdE9HVTVaUzFtTlRVeU1XWmhaR0UzWVdVaUxDSnBjM01pT2lKb2RIUndPaTh2Ykc5allXeG9iM04wSWl3aVlYVmtJam9pTkRFMFpURTVNamRoTXpnNE5HWTJPR0ZpWXpjNVpqY3lPRE00TXpkbVpERWlMQ0psZUhBaU9qRTFOall5TlRRME1qa3NJbTVpWmlJNk1UVXhORFF4TkRReU9YMC5mcDBJeVFTSWQ4c2lzR1Eza3FNUFhvdnpjbDhLR1owTTlMQmpuU2xPcFNFXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlcklkXCI6IFwiYmFjNGVjNmItZDZjOC00NDYwLThlOWUtZjU1MjFmYWRhN2FlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUXVlc3Rpb25JZFwiOiAnNWE0NDIwYjUzYTVkNWExYzM4ZTM0MDI4JyxcbiAgICAgICAgICAgICAgICAgICAgXCJHYW1lSWRcIjogJzEzJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGBVcGxvYWRpbmcgJHtmaWxlbmFtZX1gXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdXBsb2FkVHlwZSA9IFwiaW1hZ2VcIjtcbiAgICAgICAgICAgIHJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vcmVxdWVzdGIuaW4vMW1mNWFlMzFcIixcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiRmlsZS1OYW1lXCI6IGZpbGVuYW1lLFxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IFwiQmVhcmVyIGV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUp1WVcxbGFXUWlPaUppWVdNMFpXTTJZaTFrTm1NNExUUTBOakF0T0dVNVpTMW1OVFV5TVdaaFpHRTNZV1VpTENKMWJtbHhkV1ZmYm1GdFpTSTZJbTFmY21GNllWOW9ZWE56WVc1QWFHOTBiV0ZwYkM1amIyMGlMQ0pvZEhSd09pOHZjMk5vWlcxaGN5NXRhV055YjNOdlpuUXVZMjl0TDJGalkyVnpjMk52Ym5SeWIyeHpaWEoyYVdObEx6SXdNVEF2TURjdlkyeGhhVzF6TDJsa1pXNTBhWFI1Y0hKdmRtbGtaWElpT2lKQlUxQXVUa1ZVSUVsa1pXNTBhWFI1SWl3aVFYTndUbVYwTGtsa1pXNTBhWFI1TGxObFkzVnlhWFI1VTNSaGJYQWlPaUkyTmpjM05qRTVPUzFoWVRKakxUUTVZbVF0WW1ZMVlTMWlNemcyTXpZMk5UVXpPV1FpTENKVmMyVnlTV1FpT2lKaVlXTTBaV00yWWkxa05tTTRMVFEwTmpBdE9HVTVaUzFtTlRVeU1XWmhaR0UzWVdVaUxDSnBjM01pT2lKb2RIUndPaTh2Ykc5allXeG9iM04wSWl3aVlYVmtJam9pTkRFMFpURTVNamRoTXpnNE5HWTJPR0ZpWXpjNVpqY3lPRE00TXpkbVpERWlMQ0psZUhBaU9qRTFOall5TlRRME1qa3NJbTVpWmlJNk1UVXhORFF4TkRReU9YMC5mcDBJeVFTSWQ4c2lzR1Eza3FNUFhvdnpjbDhLR1owTTlMQmpuU2xPcFNFXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiVXNlcklkXCI6IFwiYmFjNGVjNmItZDZjOC00NDYwLThlOWUtZjU1MjFmYWRhN2FlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiUXVlc3Rpb25JZFwiOiAnNWE0NDIwYjUzYTVkNWExYzM4ZTM0MDI4JyxcbiAgICAgICAgICAgICAgICAgICAgXCJHYW1lSWRcIjogJzInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYFVwbG9hZGluZyBgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgcGFyYW1zID0gW3sgbmFtZTogZmlsZW5hbWUsIGZpbGVuYW1lOiBmaWxlVXJpLCBtaW1lVHlwZTogYCR7dXBsb2FkVHlwZX0vJHttaW1ldHlwZX1gIH1dO1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcblxuICAgICAgICBsZXQgc3ViamVjdCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICAgICAgbGV0IHRhc2sgPSB0aGlzLlVwbG9hZFNlc3Npb24ubXVsdGlwYXJ0VXBsb2FkKHBhcmFtcywgcmVxdWVzdCk7XG4gICAgICAgIHRhc2sub24oJ3Byb2dyZXNzJywgKGU6IGFueSkgPT4gc3ViamVjdC5uZXh0KGUpKTtcblxuICAgICAgICB0YXNrLm9uKCdlcnJvcicsIChlKSA9PiBzdWJqZWN0LmVycm9yKGUpKTtcblxuICAgICAgICB0YXNrLm9uKCdjb21wbGV0ZScsIChlKSA9PiBzdWJqZWN0LmNvbXBsZXRlKCkpO1xuXG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH1cblxufVxuIl19