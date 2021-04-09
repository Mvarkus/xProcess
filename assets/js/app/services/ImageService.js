class ImageService {
    /**
     * @param {ImageView} view instance 
     * @param {ImageProcessor} imageProcessor instance 
     */
    constructor(view, imageProcessor) {
        this._view = view;
        this._imageProcessor = imageProcessor;

        this._imageFile = null;
    }

    /**
     * @param {HTMLElement} inputElement instance
     */
     registerInputEventHandlers(inputElement, router) {
        inputElement.onchange = (event) => {
            this.setImageFile(event.target.files[0]);
            this.updateImageBox();
            router.getController('PanelController').changeButtonState(
                'next',
                {active: true}
            );
        };
    }

    /**
     * @param {File} imageFile instance
     */
    setImageFile(imageFile) {
        if (imageFile.type.split('/')[0] !== 'image') {
            NotificationManager.errorOccured(
                new Error("Uploaded file must be an image")
            );
        }
        
        this._imageFile = imageFile;
    }

    getImageFile() {
        return this._imageFile;
    }

    updateImageBox() {
        this._view.updateCanvas(this.getImageFile());
        this._view.updateMetaData(this.getImageFile());
    }
}