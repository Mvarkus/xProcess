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
        stage.getDomComponents().button.control.onchange = (event) => {
            if (!this._isImage(event.target.files[0])) {
                NotificationManager.errorOccured(
                    new Error("Uploaded file must be an image")
                );

                return false;
            }

            this._view.imageFile = event.target.files[0];
            this.setupImageBox();

            stage.state = {imageFile: event.target.files[0]};
            stage.done = true;

            router.getController('PanelController').changeButtonState(
                'next',
                {active: true}
            );
        };
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
    registerAdjustBrightnessHandlers(stage, router) {
        const container = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements;
        console.log(container);
        const button = container.querySelector('button');
        const input = container.querySelector('.slider-value');
        const slider = container.querySelector('.slider');
        const min = slider.min, max = slider.max;
        
        button.addEventListener('click', (event) => {
            if (+input.value > max) {
                input.value = max
            } else if (+input.value < min) {
                input.value = min
            }
        
            this._view.alterBrightness(+input.value);
        });
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerAdjustContrastHandlers(stage, router) {
        const container = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements;
        const button = container.querySelector('button');
        const input = container.querySelector('.slider-value');
        const slider = container.querySelector('.slider');
        const min = slider.min, max = slider.max;
        
        button.addEventListener('click', (event) => {
            if (+input.value > max) {
                input.value = max
            } else if (+input.value < min) {
                input.value = min
            }
        
            this._view.alterContrast(+input.value);
        });
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerSharpenImageHandlers(stage, router) {
        const container = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements;
        const button = container.querySelector('button');
        const input = container.querySelector('.slider-value');
        const slider = container.querySelector('.slider');
        const min = slider.min, max = slider.max;
        
        button.addEventListener('click', (event) => {
            if (+input.value > max) {
                input.value = max
            } else if (+input.value < min) {
                input.value = min
            }
        
            this._view.sharpenImage(+input.value);
        });
    }

    /**
     * @param {Stage} stage instance
     * @param {Router} router instance
     */
    registerGammaCorrectionHandlers(stage, router) {
        const container = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements;
        const button = container.querySelector('button');
        const input = container.querySelector('.slider-value');
        const slider = container.querySelector('.slider');
        const min = slider.min, max = slider.max;
        
        button.addEventListener('click', (event) => {
            if (+input.value > max) {
                input.value = max
            } else if (+input.value < min) {
                input.value = min
            }
        
            this._view.correctGamma(+input.value);
        });
    }

    registerImageNegativesHandlers(stage, router) {
        const applyButton = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements.querySelector('button');

        applyButton.addEventListener('click', (event) => {
            this._view.imageNegatives();
        });
    }

    registerLogTransformHandlers(stage, router) {
        const container = stage.getDomComponents()
            .controls[this._chosenMethodContext.name].elements;
        const button = container.querySelector('button');
        const input = container.querySelector('.slider-value');
        const slider = container.querySelector('.slider');
        const min = slider.min, max = slider.max;
        
        button.addEventListener('click', (event) => {
            if (+input.value > max) {
                input.value = max
            } else if (+input.value < min) {
                input.value = min
            }
        
            this._view.logTransform(+input.value);
        });
    }

    registerCannyEdgeDetectionHandlers(stage, router) {
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
            for (const [key, input] of Object.entries(inputs)) {
                if (+input.value > limitValues[key].max) {
                    input.value = limitValues[key].max
                } else if (+input.value < limitValues[key].min) {
                    input.value = limitValues[key].min
                }
            }
            
            this._view.detectEdgeCanny(+inputs[0].value, +inputs[1].value);
        });
    }

    registerImageSmoothingHandlers(stage, router) {
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
            for (const [key, input] of Object.entries(inputs)) {
                if (+input.value > limitValues[key].max) {
                    input.value = limitValues[key].max
                } else if (+input.value < limitValues[key].min) {
                    input.value = limitValues[key].min
                }
            }
            
            this._view.smoothenImage(+inputs[0].value);
        });
    }

    registerAdaptiveThresholdHandlers(stage, router) {
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
            for (const [key, input] of Object.entries(inputs)) {
                if (+input.value > limitValues[key].max) {
                    input.value = limitValues[key].max
                } else if (+input.value < limitValues[key].min) {
                    input.value = limitValues[key].min
                }
            }
            
            this._view.adaptThreshold(+inputs[0].value, +inputs[1].value);
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
        console.log();
        this._view.drawImage();
    }

    setupImageBox() {
        this._view.drawImage();
        this._view.updateMetaData();
    }
}