/**
 * Stage is responsible for holding actions to bootstrap and terminate the application's phase.
 * 
 * The actions call controller methods to register event handlers,
 * render some content, change state of the application.
 */
class Stage {
    /**
     * @param {array} bootstrap list of actions to be called when stage is bootstraped
     * @param {array} terminate list of actions to be called when stage is terminating
    */
    constructor({bootstrap, terminate = []}) {
        this._actions = {
            bootstrap: bootstrap,
            terminate: terminate
        };

        this._state = null;
        this._components = null;
        this._done = false;
    }

    /**
     * Bootstraps stage.
     * 
     * @param {Router} router instance
     */
    bootstrap(router) {
        for (const [controller, action] of this.getActions('bootstrap')) {
            router.getController(controller)[action](
                this,
                router
            );
        }
    }

    /**
     * Terminates stage.
     * 
     * @abstract
     * @param {Router} router instance
     */
    terminate(router) {
        this._state = null;
        this._components = null;
        for (const [controller, action] of this.getActions('terminate')) {
            router.getController(controller)[action](
                this,
                router
            );  
        }
    }

    /**
     * Returns collection of DOM elements specific to a stage
     * 
     * @abstract
     * @returns {object}
     */
    _build() { }

    /**
     * @returns {object} Collection of DOM components
     */
    getDomComponents() {
        if (this._components !== null) {
            return this._components;
        }

        this._components = this._build();
        return this._components;
    }

    /**
     * @param {string} mode can be bootstrap or termination
     * @returns {array} 
     */
    getActions = mode => this._actions[mode];

    /**
     * @returns {boolean}
     */
    get state() {return this._state};

     /**
      * @param {object} state
      */
    set state(state) {this._state = state};

    /**
     * @returns {boolean}
     */
    get done() {return this._done};

    /**
     * @param {boolean} status
     */
    set done(status) {this._done = status};
}