import { StatefulWidget } from "widgetsjs";
import { Router } from "../router";

type PageTitleState = {hash: string, validPath: boolean};

export class PageTitle extends StatefulWidget {
    constructor(){
        super(
            Router.prototype.getRoutePath(location.toString())
        )
    }

    onMount() {
        Router.prototype.addListener((e: HashChangeEvent) => {
            this.setState(
                Router.prototype.getRoutePath(e.newURL)
            )
        })
    }

    render(state: PageTitleState) : string {

        // Don't change anything if the path is not a valid route.
        if(!state.validPath) return this.widgetChildren;

        let img = "<div class='image'></div>"

        if(state.hash == '#/wjs') {
            return img + "<br><br><h1 class='work'>Web JS</h1>"
        } else if(state.hash == '#/widgetsjs') {
            return img + "<br><br><h1 class='work'>Widgets JS</h1>"
        } else if(state.hash == '#/gecko') {
            return img + "<br><br><h1 class='work'>Gecko</h1>"
        } else {
            // Else always return image
            return img;
        }
    }
}