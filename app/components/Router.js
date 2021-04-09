/**
 * Router holds controllers
 */
 class Router {
    /**
     * @param {object} controllers - collection of controller instances
     */
    constructor(controllers) {
        this._controllers = controllers;
    }

    /**
     * @param {string} name controller's name 
     * @returns {object} instance of a controller
     */
    getController(name) {
        if (!this._controllerExists(name)) {
            throw Error(`Controller ${name} does not exist`);
        }

        return this._controllers[name];
    }

    /**
     * 
     * @param {string} name controller's name  
     * @returns {boolean}
     */
    _controllerExists(name) {
        return name in this._controllers;
    }
}