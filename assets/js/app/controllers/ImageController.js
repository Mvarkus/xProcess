class ImageController {
    /**
     * @param {ImageService} service instance
     */
    constructor(service) {
        this._service = service;
    }

    /**
     * @param {Stage} stage 
     */
    registerFileUploadEventHandlers(stage, router) {
        this._service.registerInputEventHandlers(
            stage.getDomComponents()['button']['control'],
            router
        );
    }
}