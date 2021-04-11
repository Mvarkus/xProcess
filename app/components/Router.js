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
     * Builds Router.
     * 
     * @param {object} controlButtons DOM elements 
     * @returns {Router} instance
     */
    static build(controlButtons) {
        return new this({
            PanelController: new PanelController(
                new PanelService(
                    new PanelView({
                        body: document.querySelector('.control-panel-body'),
                        tooltip: document.querySelector('.help-tooltip'),
                        buttons: controlButtons
                    })
                )
            ),
            BreadcrumbController: new BreadcrumbController(
                new BreadcrumbService(
                    new BreadcrumbView({
                        breadcrumbs: document.querySelector('.breadcrumbs')
                    })
                )
            ),
            ImageController: new ImageController(
                new ImageService(
                    new ImageView({
                        canvas: document.querySelector('.image-box canvas'),
                        meta: document.querySelector('.image-meta-data')
                    })
                )
            )
        });
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