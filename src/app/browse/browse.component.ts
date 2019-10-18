import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as faker from "faker";

interface IPerson {
    name: string;
    email: string;
    address: string;
    description: string;
}

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    persons: Array<IPerson> = [];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.persons = Array.apply(null, { length: 10 }).map(
            (): IPerson => ({
                name: faker.name.findName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(true),
                description: faker.lorem.paragraphs(1)
            })
        );
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
