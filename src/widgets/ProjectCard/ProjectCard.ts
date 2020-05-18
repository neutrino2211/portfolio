import { StatelessWidget } from "widgetsjs";
import { stateRenderer } from "../../util/state-renderer";

import Html from "./ProjectCard.html";

import wjsLogo from "../../assets/wjs-logo.svg";
import { Router } from "../../router";

type ProjectCardState = {
    project: string,
    description: string,
    image: string,
    target: string
};

export class ProjectCard extends StatelessWidget {
    constructor(){
        super({
            external: ""
        }, {
            external: e => e == "true"
        });
    }

    onMount() {
        this.$child<HTMLImageElement>('img.project-image').setAttribute('src', wjsLogo);
    }

    render(state: ProjectCardState): string {
        state.target = this.state.external ? "_blank" : "_self";
        return stateRenderer(state, Html);
    }
}