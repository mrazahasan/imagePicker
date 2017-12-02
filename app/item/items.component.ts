import { Component, OnInit } from "@angular/core";

import { session, Session } from "nativescript-background-http";
import * as Picker from "nativescript-imagepicker";
import * as camera from "nativescript-camera";
import { first } from 'lodash';
import {Subject} from "rxjs/Subject";
import {isAndroid} from "tns-core-modules/platform";
import * as fs from "file-system";
import * as imageSource from "image-source";
import { Image } from 'ui/image';

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
    private request : any;

    private imageName : string;
    private UploadSession: Session;
    constructor(

    ) {
        this.UploadSession = session('image-upload');
    }

    ngOnInit(): void {
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
                    this.uploadImagePicker(image);
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
                                this.uploadImagePicker({fileUri: path});
                            }
                        });
                }
            })
            .catch(function (err) {
                console.log("Error -> " + err.message);
            });
    }

    pickerOpen(){
        let context = Picker.create(<any>{
            mode: "single",
            mdeiaType: 'image'
        });
        this.startSelection(context);
    }

    private startSelection(context: Picker.ImagePicker) {
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection: Array<Picker.SelectedAsset>) => {
                if(isAndroid){
                    return first(selection);
                }
                else {
                    return first(selection).getImage();
                }

            })
            .then((image: any) => {
                if(isAndroid){
                    this.uploadImagePicker(image);
                }
                else {
                    let folder = fs.knownFolders.documents();
                    let path = fs.path.join(folder.path, "Temp" + Date.now() + ".jpg");
                    let saved = image.saveToFile(path, "jpg");
                    console.log(saved);
                    if (saved) {
                        //use new image path
                        this.uploadImagePicker({fileUri: path});
                    }
                }
            })
            .catch(function (e) {
                console.error(e);
            });

    }

    private uploadImagePicker(image: any) {

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





    uploadMultipartImagePicker(image: any): Subject<any> {

        let  fileUri = image.fileUri;

        let request = {
            url: "http://35.158.193.55/api/FileUpload/BolSelfie",
            method: 'POST',
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": fileUri,
                'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1laWQiOiI4MzlmMDg4NC1jMmI3LTQ1ZGUtOTc1Yy0wOTYwMTY4MWE2M2EiLCJ1bmlxdWVfbmFtZSI6IjgzOWYwODg0LWMyYjctNDVkZS05NzVjLTA5NjAxNjgxYTYzYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vYWNjZXNzY29udHJvbHNlcnZpY2UvMjAxMC8wNy9jbGFpbXMvaWRlbnRpdHlwcm92aWRlciI6IkFTUC5ORVQgSWRlbnRpdHkiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImFiNGNmOWE2LWVmYzEtNDZhNi05N2YyLWNlNzc5NjkxZGMxMCIsIlVzZXJJZCI6IjgzOWYwODg0LWMyYjctNDVkZS05NzVjLTA5NjAxNjgxYTYzYSIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJhdWQiOiI0MTRlMTkyN2EzODg0ZjY4YWJjNzlmNzI4MzgzN2ZkMSIsImV4cCI6MTU2MzgxMDQ4NiwibmJmIjoxNTExOTcwNDg2fQ.KUdYperMo_79QhR3sU3odmt7LzuCjdSMa25-AU9QLwA",
                "UserId": "2a2736cb-e5e6-4515-8ad7-02ea0cfef08b"
            },
            description: `Uploading `
        };

        let params = [{ name: "nameOfFile", filename: fileUri, mimeType: 'image/JPG' }];
        console.log(JSON.stringify(params));

        let subject = new Subject<any>();
        let task = this.UploadSession.multipartUpload(params, request);
        task.on('progress', (e: any) => subject.next(e));

        task.on('error', (e) => subject.error(e));

        task.on('complete', (e) => subject.complete());

        return subject;
    }

}
