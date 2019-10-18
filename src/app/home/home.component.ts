import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as faker from "faker";
import * as contacts from "nativescript-contacts";
import * as permissions from "nativescript-permissions";
import { isAndroid } from "tns-core-modules/ui/page/page";

interface IPerson {
    name: string;
    email: string;
    address: string;
    description: string;
}

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
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

    onOpenContacts() {
        const permission = isAndroid
            ? permissions.requestPermission(
                  [android.Manifest.permission.GET_ACCOUNTS, android.Manifest.permission.READ_CONTACTS],
                  "I need to see your contacts"
              )
            : Promise.resolve(true);

        permission
            .then(() => {
                return contacts.getContact();
            })
            .then(({ response, data }) => {
                if (response !== "selected") {
                    return;
                }

                console.log("Selected contact: ", data);
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
