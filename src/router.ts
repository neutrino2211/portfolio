import { stateRenderer } from "./util/state-renderer";

// Map of event listeners
const eventListeners = {};
const beforeEventListeners = {};
const afterEventListeners = {};

// Parameters to be used when a page is opened via a hashchange event
let latentParams = {};

export class Router {
    
    routes = {
        "404": "<h1> Page Not Found </h1>"
    };

    private openRoute(url: string) {
        const {hash, validPath} = this.getRoutePath(url);

        if(validPath) {
            this.open(hash.slice(1))
        } else if (hash.length > 1 && document.querySelector(hash)) {
            document.querySelector(hash).scrollIntoView(); 
        } else if (hash == "") {
            this.open('/');
        } else {
            this.open('404');
        }
    }
    
    constructor(private root: HTMLElement){
        this.routes['/'] = root.innerHTML;

        window.addEventListener('hashchange', e => {
            // Execute any listeners that want to work before the route changes.
            (Object.getOwnPropertyNames(beforeEventListeners) || []).forEach(o => {
                beforeEventListeners[o](e);
            })


            this.openRoute(e.newURL);


            // Execute any listeners that want to work after the route changes.
            (Object.getOwnPropertyNames(afterEventListeners) || []).forEach(o => {
                afterEventListeners[o](e);
            })
        })
    }

    addListener(listener: Function, before?: boolean): string {
        const id = (Number(Math.random() * 899999) + 100000).toString();

        if(before) {
            beforeEventListeners[id] = eventListeners[id] = listener;
        } else {
            afterEventListeners[id] = eventListeners[id] = listener;
        }

        return id;
    }

    removeListener(id: string) {
        eventListeners[id] = undefined;
        delete eventListeners[id];
    }

    getRoutePath(url: string): {hash: string, validPath: boolean} {
        const hash = new URL(url).hash;
        if (hash.startsWith('#/')) return {hash, validPath: true};
        return {hash, validPath: false};
    }

    setPageParams(params: any) {
        latentParams = params
    }


    addRoute(route: string, html: string) {
        this.routes[route] = html;
    }

    open(route: string, params?: any) {
        if (route in this.routes) {
            this.root.innerHTML = stateRenderer(params || latentParams || {}, this.routes[route])
        } else {
            this.root.innerHTML = stateRenderer(params || latentParams || {}, this.routes['404'])
        }


        // Reset params to avoid poisoning the next route to be opened
        latentParams = {};
    }

    start() {
        this.openRoute(location.toString())
    }
}