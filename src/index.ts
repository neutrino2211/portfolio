// Widget Rendering
import { useComponent } from "widgetsjs";
import { NightModeToggle } from "./widgets/NightModeToggle";

// Favicons
import FavBright from "./assets/fav-bright.png";
import FavDark from "./assets/fav-dark.png";

// Pages
import Page404 from "./pages/404.html";
import HomePage from "./pages/home.html";

import WjsPage from "./pages/wjs/wjs.html";
import GeckoPage from "./pages/gecko/gecko.html";
import WidgetsjsPage from "./pages/widgetsjs/widgetsjs.html";


// Router
import { Router } from "./router";
import { PageTitle } from "./widgets/PageTitle";
import { ProjectCard } from "./widgets/ProjectCard/ProjectCard";


const router = new Router(document.querySelector('.container.body'));
router.addRoute('/', HomePage);
router.addRoute('404', Page404);
router.addRoute('/wjs', WjsPage);
router.addRoute('/gecko', GeckoPage);
router.addRoute('/widgetsjs', WidgetsjsPage);

router.start();


useComponent(PageTitle).as('page-title');

useComponent(ProjectCard).as('project-card');

useComponent(NightModeToggle).as('night-mode-toggle');

const media = matchMedia("(prefers-color-scheme: dark)");
if(media.matches){
    document.getElementById('theme').setAttribute('content', "#000510");
    document.getElementById('fav').setAttribute('href', FavDark);
} else {
    document.getElementById('fav').setAttribute('href', FavBright);
}
