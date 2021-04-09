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
    updatePanel(stage) {
        this._service.renderUpdate(
            'body',
            stage.getDomComponents().button
        );

        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents().tooltip
        );
    }

    changeButtonState(buttonName, state) {
        this._service.changeButtonState(buttonName, state);
    }

    retrieveButtonState(buttonName) {
        return this._service.retrieveButtonState(buttonName);
    }
}