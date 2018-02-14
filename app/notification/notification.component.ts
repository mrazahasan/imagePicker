import { Component, OnInit } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";


@Component({
    selector: "ns-notification",
    moduleId: module.id,
    templateUrl: "./notification.component.html",
})
export class NotificationComponent implements OnInit {


    constructor() {
        try {
            firebase.init({
                onPushTokenReceivedCallback: (token: string) => {
                    console.log("Firebase push token: " + token);
                },
                onMessageReceivedCallback: (message: firebase.Message) => {
                    console.log(`Title: ${message.title}`);
                    console.log(`Body: ${message.body}`);
                    // if your server passed a custom property called 'foo', then do this:
                    console.log(`Value of 'foo': ${message.data.foo}`);
                }

            }).then(
                instance => {
                    console.log("firebase.init done");
                },
                error => {
                    console.log(`firebase.init error: ${error}`);
                }
            );
        }
        catch (e) {
            console.log(`firebase.init error: ${e.statusText}`);
        }
    }

    ngOnInit() { }

    getFCMToken() {
        firebase.getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            console.log(`Current push token: ${token}`);
        });
    }
}