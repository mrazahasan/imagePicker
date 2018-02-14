import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { ItemsComponent } from "./item/items.component";
import {NotificationComponent} from "./notification/notification.component";

const routes: Routes = [
    { path: "", redirectTo: "/notification", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "notification", component: NotificationComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }