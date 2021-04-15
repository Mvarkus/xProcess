class ImageService {
    /**
     * @param {ImageView} view instance  
     */
    constructor(view) {
        this._view = view;
        this._chosenMethodContext = null;
    }

    /**
     * @param {object} domComponents collection of DOM elements
     */
     registerFileUploadEventHandlers(stage, router) {
        stage.getDomComponents().button.control.addEventListener('change', (event) => {
            if (!this._isImage(event.target.files[0])) {
                NotificationManager.errorOccured(
                    new Error("Uploaded file must be an image")
                );

                return false;
            }

            this._view.imageBlob = event.target.files[0];
            this.setupImageBox();

            stage.state = {imageBlob: event.target.files[0]};
            stage.done = true;

            router.getController('PanelController').changeButtonState(
                'next',
                {active: true}
            );
        });
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerMethodChoosingEventHandlers(stage, router) {
        stage.getDomComponents().methodsList.addEventListener('click', (event) => {
            if (event.target.tagName !== 'LI') {
                return false;
            }
            const li = event.target;
            const activeLi = li.parentElement.querySelector('.active-method');
            
            this._chosenMethodContext = li[Symbol.for('methodContext')];

            if (activeLi !== null) {
                activeLi.classList.remove('active-method');
            }

            li.classList.add('active-method');
            stage.done = true;

            router.getController('PanelController').changeButtonState(
                'next', {active: true}
            );
        }); 
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerDownloadHandlers(stage, router) {

    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerAdjustBrightnessHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router,this._view.alterBrightness);
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerAdjustContrastHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router,this._view.alterContrast);
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerSharpenImageHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router,this._view.sharpenImage);
    }

    /**
     * @param {Stage} stage instance
     */
    registerGammaCorrectionHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router,this._view.correctGamma);
    }

    registerImageNegativesHandlers(stage, router) {
        const panelController = router.getController('PanelController');
        const applyButton = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements.querySelector('button');

        applyButton.addEventListener('click', () => {
            this._view.imageNegatives();
            panelController.changeButtonState('next', {active: true});
            stage.done = true;
        });
    }

    registerLogTransformHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router, this._view.logTransform);
    }

    registerCannyEdgeDetectionHandlers(stage, router) { 
        this._slidersApplyButtonRegistration(stage, router, this._view.detectEdgeCanny);
    }

    registerImageSmoothingHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router, this._view.smoothenImage);
    }

    registerAdaptiveThresholdHandlers(stage, router) {
        this._slidersApplyButtonRegistration(stage, router, this._view.adaptThreshold);
    }

    _slidersApplyButtonRegistration(stage, router, callback) {
        const panelController = router.getController('PanelController');

        const container = stage.getDomComponents()
        .controls[this._chosenMethodContext.name].elements;
        const button = container.querySelector('button');
        const inputs = container.querySelectorAll('.slider-value');
        const sliders = container.querySelectorAll('.slider');
        const limitValues = [];

        
        
        for (const slider of sliders) {
            limitValues.push({min: slider.min, max: slider.max});
        }
        
        button.addEventListener('click', (event) => {
            let values = [];

            for (const [key, input] of Object.entries(inputs)) {
                if (+input.value > limitValues[key].max) {
                    input.value = limitValues[key].max
                } else if (+input.value < limitValues[key].min) {
                    input.value = limitValues[key].min
                }

                values.push(+input.value);
            }
            
            callback.apply(this._view, values);
            panelController.changeButtonState('next', {active: true});
            stage.done = true;
        });
    }

    /**
     * @param {File} imageFile instance
     */
    _isImage(imageFile) {
        if (imageFile.type.split('/')[0] !== 'image') {
            return false;
        }
        
        return true;
    }

    /**
     * @returns {string} 
     */
    getChosenMethodContext() {
        return this._chosenMethodContext;
    }

    redrawImage() {
        this._view.drawImage();
    }

    setupImageBox() {
        this._view.drawImage();
        this._view.updateMetaData();
    }

    saveImage() {
        this._view.saveImage();
    }
}