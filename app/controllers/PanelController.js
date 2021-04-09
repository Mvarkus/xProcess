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
            stage.getDomComponents()['button']
        );

        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents()['tooltip']
        );
    }

    /**
     * @param {Stage} stage  
     */
     switchToMethodChoosigStage(stage) {
        this._service.renderUpdate(
            'body',
            stage.getDomComponents()['methodsList']
        );

        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents()['tooltip']
        );

        this._service.changeButtonState('back', {active: true});
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