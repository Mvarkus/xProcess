class BreadcrumbController {
    /**
     * @param {BreadcrumbService} service instance 
     */
    constructor(service) {
        this._service = service;
    }

    movePointerForward() {
        this._service.movePointerForward();
    }

    movePointerBack() {
        this._service.movePointerBack();
    }
}