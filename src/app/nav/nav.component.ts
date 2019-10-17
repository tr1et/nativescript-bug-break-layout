import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "navbar",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"]
})
export class NavComponent {
    @Input() row = 1;
}
