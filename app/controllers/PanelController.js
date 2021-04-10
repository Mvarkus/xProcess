class PanelController {
    /**
     * @param {PanelService} service instance
     */
    constructor(service) {
        this._service = service;
    }

    /**
     * @param {Stage} stage  
     */
    switchToFileUploadStage(stage) {
        this._service.renderUpdate(
            'body',
            stage.getDomComponents().button
        );

        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents().tooltip
        );
    }

    /**
     * @param {Stage} stage  
     */
    switchToMethodChoosigStage(stage) {
        this._service.renderUpdate(
            'body', stage.getDomComponents().methodsList
        );

        this._service.renderUpdate(
            'tooltip', stage.getDomComponents().tooltip
        );
    }

    /**
     * @param {Stage} stage  
     * @param {Router} router  
     */
    switchToCustomizationStage(stage, router) {
        const methodsContext = router.getController('ImageController')
            .retrieveChosenMethodContext();
        const [controller, action] = methodsContext.registrator;

        this._service.renderUpdate(
            'body', stage.getDomComponents().controls[methodsContext.name]
        );

        this._service.renderUpdate(
            'tooltip', stage.getDomComponents().tooltip
        );

        router.getController(controller)[action](stage, router);
    }

    /**
     * @param {string} buttonName 
     * @param {object} state 
     */
    changeButtonState(buttonName, state) {
        this._service.changeButtonState(buttonName, state);
    }

    /**
     * @param {string} buttonName 
     * @returns {object} state
     */
    retrieveButtonState(buttonName) {
        return this._service.retrieveButtonState(buttonName);
    }
}