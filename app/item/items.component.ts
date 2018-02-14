import { Component, OnInit } from "@angular/core";

import { session, Session } from "nativescript-background-http";
import * as camera from "nativescript-camera";
import { first } from 'lodash';
import {Subject} from "rxjs/Subject";
import {isAndroid} from "tns-core-modules/platform";
import * as fs from "file-system";
import * as imageSource from "image-source";
import { Mediafilepicker, MediaFilepickerOptions } from 'nativescript-mediafilepicker';


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    private UploadSession: Session;
    private mediafilepicker;
    constructor(

    ) {
        this.UploadSession = session('image-upload');
    }

    ngOnInit() { }

    VideoPicker(){
        let options: MediaFilepickerOptions = {
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
        let mediafilepicker = new Mediafilepicker();

        mediafilepicker.on("getFiles",  (res: any) =>{

            let files = res.files;

            if (files.length > 0) {

                files = files.split(",");

                files.forEach(file => {

                    console.log(file);
                    this.uploadMultipartImagePicker({fileUri: file})
                        .subscribe({
                            next: (e) => {
                                console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                            },
                            error: (e) => {
                                console.log(JSON.stringify(e));
                            },
                            complete: () => {
                                console.log("complete");
                            }
                        });
                });
            }else{
                console.log("There was some problem to select the file. Looks like user has cancel it.")
            }

        });

        mediafilepicker.on("error",  (res: any) => {
            console.log(res.msg)
        });

        mediafilepicker.startFilePicker(options);
    }

    cameraOpen(){
        camera.requestPermissions();
        camera
            .takePicture({
                saveToGallery: true,
                cameraFacing: 'front'
            })
            .then(imageAsset => {
                let image : any;
                if(isAndroid){
                    image = <any>{
                        fileUri: imageAsset.android
                    };

                    this.uploadMultipartImagePicker(image)
                        .subscribe({
                            next: (e) => {
                                console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                            },
                            error: (e) => {
                                console.log(JSON.stringify(e));
                            },
                            complete: () => {
                                console.log("complete");
                            }
                        });
                }
                else {

                    let source = new imageSource.ImageSource();
                    source.fromAsset(imageAsset)
                        .then(imageSource => {
                            let folder = fs.knownFolders.documents();
                            let path = fs.path.join(folder.path, "Temp"+Date.now()+".jpg");
                            let saved = imageSource.saveToFile(path, "png");
                            console.log(saved);
                            if(saved){
                                this.uploadMultipartImagePicker({fileUri: path})
                                    .subscribe({
                                        next: (e) => {
                                            console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                                        },
                                        error: (e) => {
                                            console.log(JSON.stringify(e));
                                        },
                                        complete: () => {
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
    }

    pickerOpen(){
        let options: MediaFilepickerOptions = {
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
        let mediafilepicker = new Mediafilepicker();
        mediafilepicker.on("getFiles",  (res: any) =>{

            let files = res.files;

            if (files.length > 0) {

                files = files.split(",");

                files.forEach(file => {

                    console.log(file);
                    this.uploadMultipartImagePicker({fileUri: file})
                        .subscribe({
                            next: (e) => {
                                console.log(`Upload: ${(e.currentBytes / e.totalBytes) * 100}`)
                            },
                            error: (e) => {
                                console.log(JSON.stringify(e));
                            },
                            complete: () => {
                                console.log("complete");
                            }
                        });
                });
            }else{
                console.log("There was some problem to select the file. Looks like user has cancel it.")
            }

        });

        mediafilepicker.on("error",  (res: any) => {
            console.log(res.msg)
        });

        mediafilepicker.startFilePicker(options);
    }


    private uploadMultipartImagePicker(image: any): Subject<any> {

        let fileUri = image.fileUri;
        let filename = fileUri.substring(fileUri.lastIndexOf('/')+1);
        let mimetype = filename.substring(filename.lastIndexOf('.')+1);
        let uploadType;
        let request;
        if(mimetype === 'mp4'){
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
                description: `Uploading ${filename}`
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
                description: `Uploading `
            };
        }


        let params = [{ name: filename, filename: fileUri, mimeType: `${uploadType}/${mimetype}` }];
        console.log(JSON.stringify(params));

        let subject = new Subject<any>();
        let task = this.UploadSession.multipartUpload(params, request);
        task.on('progress', (e: any) => subject.next(e));

        task.on('error', (e) => subject.error(e));

        task.on('complete', (e) => subject.complete());

        return subject;
    }

}
