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

    /**
     * @param {Stage} stage instance 
     * @param {Router} router instance
     */
    switchToFinishStage(stage, router) {
        this._service.saveImage();
        this._service.registerDownloadHandlers(
            stage, router
        );
    }

    /**
     * @param {Stage} stage instance 
     * @param {Router} router instance
     */
    terminateCustomizationStage(stage, router) {
        this._service.redrawImage();
    }
    
    retrieveChosenMethodContext() {
        return this._service.getChosenMethodContext();
    }

    adjustBrightnessBootstrap(stage, router) {
        this._service.registerAdjustBrightnessHandlers(stage, router);
    }

    adjustContrastBootstrap(stage, router) {
        this._service.registerAdjustContrastHandlers(stage, router);
    }

    sharpenImageBootstrap(stage, router) {
        this._service.registerSharpenImageHandlers(stage, router);
    }

    gammaCorrectionBootsrap(stage, router) {
        this._service.registerGammaCorrectionHandlers(stage, router);
    }

    imageNegativesBootsrap(stage, router) {
        this._service.registerImageNegativesHandlers(stage, router);
    }

    logTransformBootsrap(stage, router) {
        this._service.registerLogTransformHandlers(stage, router);
    }

    cannyEdgeDetectionBootstrap(stage, router) {
        this._service.registerCannyEdgeDetectionHandlers(stage, router);
    }imageSmoothing

    imageSmoothingBootstrap(stage, router) {
        this._service.registerImageSmoothingHandlers(stage, router);
    }

    adaptiveThresholdBootstrap(stage, router) {
        this._service.registerAdaptiveThresholdHandlers(stage, router);
    }
    
}