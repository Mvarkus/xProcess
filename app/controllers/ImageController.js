class ImageController {
    /**
     * @param {ImageService} service instance
     */
    constructor(service) {
        this._service = service;
    }

    /**
     * @param {Stage} stage instance 
     * @param {Router} router instance
     */
    switchToFileUploadStage(stage, router) {
        this._service.registerFileUploadEventHandlers(
            stage, router
        );
    }

    /**
     * @param {Stage} stage instance 
     * @param {Router} router instance
     */
    switchToMethodChoosigStage(stage, router) {
        this._service.registerMethodChoosingEventHandlers(
            stage, router
        );
    }

    retrieveChosenMethodContext() {
        return this._service.getChosenMethodContext();
    }

    adjustBrightnessBootstrap(stage, router) {
        console.log(stage);
    }

    adjustContrastBootstrap(stage, router) {
        console.log(stage);
    }
}