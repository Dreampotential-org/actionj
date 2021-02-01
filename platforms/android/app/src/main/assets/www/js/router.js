import {Route} from './route.js';

export class Router{
    constructor(){ 
        this.mode = 'history';
        this.routes = [];
        this.root = 'http://localhost/sfapp/www';
        this.popStateListner();
    }

    get root(){
        return this._root;
    }
    set root(root){
        this._root = root;
    }

    get mode(){
        return this._mode;
    }
    set mode(mode){
        this._mode = mode;
    }

    get routes(){
        return this._routes;
    }
    set routes(val){
        this._routes = val;
    }

    add(route){
        this.routes.push(new Route(route.name, route.path, route.handler));
        return this;
    }

    navigate(route){
        route = route?route:'';
        this.match(route);
    }

    match(route){
        for(var i=0; i<this.routes.length; i++){
            let paramsNames = [];
            let regexPath = this.routes[i].path.replace(/([:*])(\w+)/g, function(full, colon, name){
                paramsNames.push(name);
                return '([^\/]+)';
            }) + '(?:\/|$)';
            let routeMatch = route.match(new RegExp(regexPath));    
            if(routeMatch!=null){
                var params = routeMatch
                .slice(1,routeMatch.length)
                .reduce((params, value, index)=>{
                    if(params == null) params = {};
                    params[paramsNames[index]] = value;
                    return params;
                }, null);
                if(params === null){
                    this.routes[i].handler();
                }
                else{
                    this.routes[i].handler(params);
                }
                this.location(route)
            }        
        }
    }

    location(route){
        this.navigated = true;
        if(this.mode == 'history'){
            window.history.pushState(null, null, this.root + route);
        }
        else{
            route = route.replace(/^\//,'').replace(/\/$/,'');
            window.location.href = window.location.href.replace(/#(.*)$/,'')+'#' + route;
        }
    }

    async popStateListner(){
        window.onpopstate = function(event){
            window.history.back();
            // console.log(event)
        }
    }
}