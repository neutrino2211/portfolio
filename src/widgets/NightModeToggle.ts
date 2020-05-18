import { StatefulWidget } from "widgetsjs";

import FavBright from "../assets/fav-bright.png";
import FavDark from "../assets/fav-dark.png";
import { Router } from "../router";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const SVG = (state: string) =>
`<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" class="${state}">
<path id="moon" d="M55.3,77a23.471,23.471,0,0,1-9.481-44.866,1.607,1.607,0,0,1,2.115,2.115,20.867,20.867,0,0,0-1.474,8.2A20.112,20.112,0,0,0,66.553,62.533a20.867,20.867,0,0,0,8.2-1.474,1.607,1.607,0,0,1,2.115,2.115A23.362,23.362,0,0,1,55.3,77Z" transform="translate(-32 -31.997)" fill="rgba(111,111,111,0.28)"/>
  
<g id="sun" transform="translate(-26 -26)">
  <path id="Path_6" data-name="Path 6" d="M236.391,36A2.391,2.391,0,0,1,234,33.609V28.391a2.391,2.391,0,1,1,4.783,0v5.217A2.391,2.391,0,0,1,236.391,36Z" transform="translate(-185.391)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_7" data-name="Path 7" d="M236.391,404A2.391,2.391,0,0,1,234,401.609v-5.217a2.391,2.391,0,1,1,4.783,0v5.217A2.391,2.391,0,0,1,236.391,404Z" transform="translate(-185.391 -328)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_8" data-name="Path 8" d="M349.533,95.4a2.391,2.391,0,0,1-1.691-4.082l3.689-3.689a2.391,2.391,0,1,1,3.382,3.382L351.224,94.7A2.384,2.384,0,0,1,349.533,95.4Z" transform="translate(-286.236 -54.303)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_9" data-name="Path 9" d="M89.313,355.607a2.391,2.391,0,0,1-1.69-4.083l3.689-3.689a2.391,2.391,0,1,1,3.382,3.382L91,354.906A2.385,2.385,0,0,1,89.313,355.607Z" transform="translate(-54.3 -286.229)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_10" data-name="Path 10" d="M401.609,238.783h-5.217a2.391,2.391,0,0,1,0-4.783h5.217a2.391,2.391,0,0,1,0,4.783Z" transform="translate(-328 -185.391)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_11" data-name="Path 11" d="M33.609,238.783H28.391a2.391,2.391,0,1,1,0-4.783h5.217a2.391,2.391,0,0,1,0,4.783Z" transform="translate(0 -185.391)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_12" data-name="Path 12" d="M353.216,355.607a2.385,2.385,0,0,1-1.691-.7l-3.689-3.689a2.391,2.391,0,1,1,3.382-3.382l3.689,3.689a2.391,2.391,0,0,1-1.69,4.083Z" transform="translate(-286.229 -286.229)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_13" data-name="Path 13" d="M93.005,95.4a2.379,2.379,0,0,1-1.69-.7l-3.689-3.689a2.391,2.391,0,1,1,3.382-3.382L94.7,91.315A2.391,2.391,0,0,1,93.005,95.4Z" transform="translate(-54.303 -54.303)" fill="rgba(103,103,103,0.28)"/>
  <path id="Path_14" data-name="Path 14" d="M165.087,176.174a11.087,11.087,0,1,1,11.087-11.087A11.087,11.087,0,0,1,165.087,176.174Z" transform="translate(-114.087 -114.087)" fill="rgba(103,103,103,0.28)"/>
</g>
</svg>
`

const media = matchMedia("(prefers-color-scheme: dark)");

export class NightModeToggle extends StatefulWidget {

    listenerId: string;

    constructor() {
        super({
            dark: !media.matches
        }, {
            dark: Boolean
        })

        media.onchange = (evt) => {
            this.setState({
                dark: !evt.matches
            })
            this.setMode()
        }
    }

    setMode = () => document.querySelectorAll('body, h3, h2, h1, p, a').forEach(e => {
        if (this.state.dark) {
            e.classList.remove('dark');
            e.classList.add('light')
            document.getElementById('theme').setAttribute('content', "#FFF");
            
            if (!isMobile) return;
            document.getElementById('fav').setAttribute('href', FavBright);
        } else {
            e.classList.remove('light');
            e.classList.add('dark');
            document.getElementById('theme').setAttribute('content', "#000510");

            if (!isMobile) return;
            document.getElementById('fav').setAttribute('href', FavDark);
        }
    })

    onMount() {
        this.listenerId = Router.prototype.addListener(() => {
            this.setMode();

            // Scroll back up because the browser does not know we changed pages
            window.scrollTo(0,0);
        })
        this.addEventListener('click', () => {
            this.setState({
                dark: !this.state.dark
            })
            this.setMode()
        })
    }

    onDismount(){
        Router.prototype.removeListener(this.listenerId);
    }

    render(state: {dark: boolean}): string {
        return SVG(state.dark ? "inactive" : "active")
    }
}