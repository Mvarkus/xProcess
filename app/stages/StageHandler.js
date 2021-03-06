/**
 * Holds and controls Stage instances
 */
class StageHandler {
    /**
     * @param {Stage[]} stages 
     */
    constructor(stages) {
        this._stages = stages;
        this._currentStage = 0;
    }

    /**
     * Builds StageHandler
     * 
     * @returns {StageHandler} instance
     */
    static build() {
        const supportedMethods = [{
            text: 'Adjust brightess',
            name: 'adjustBrightness',
            registrator: [
                'ImageController',
                'adjustBrightnessBootstrap'
            ]
        }, {
            text: 'Adjust contrast',
            name: 'adjustContrast',
            registrator: [
                'ImageController',
                'adjustContrastBootstrap'
            ]
        }, {
            text: 'Improve sharpness',
            name: 'sharpenImage',
            registrator: [
                'ImageController',
                'sharpenImageBootstrap'
            ]
        }, {
            text: 'Gamma correction',
            name: 'gammaCorrection',
            registrator: [
                'ImageController',
                'gammaCorrectionBootsrap'
            ]
        }, {
            text: 'Image negatives',
            name: 'imageNegatives',
            registrator: [
                'ImageController',
                'imageNegativesBootsrap'
            ]
        }, {
            text: 'Log transform',
            name: 'logTransform',
            registrator: [
                'ImageController',
                'logTransformBootsrap'
            ]
        }, {
            text: 'Edge detection (Canny)',
            name: 'cannyEdgeDetection',
            registrator: [
                'ImageController',
                'cannyEdgeDetectionBootstrap'
            ]
        }, {
            text: 'Image smoothing',
            name: 'imageSmoothing',
            registrator: [
                'ImageController',
                'imageSmoothingBootstrap'
            ]
        }, {
            text: 'Adaptive threshold',
            name: 'adaptiveThreshold',
            registrator: [
                'ImageController',
                'adaptiveThresholdBootstrap'
            ]
        }];

        return new this([
            new FileUploadStage({
                bootstrap: [
                    ['ImageController', 'switchToFileUploadStage'],
                    ['PanelController', 'switchToFileUploadStage']
                ]
            }),
            new MethodSelectionStage({
                bootstrap: [
                    ['ImageController', 'switchToMethodChoosigStage'],
                    ['PanelController', 'switchToMethodChoosigStage']
                ]
            }, supportedMethods),
            new MethodCustomizationStage({
                bootstrap: [
                    ['PanelController', 'switchToCustomizationStage']
                ],
                terminate: [
                    ['ImageController', 'terminateCustomizationStage']
                ]
            }, supportedMethods),
            new FinishStage({
                bootstrap: [
                    ['PanelController', 'switchToFinishStage'],
                    ['ImageController', 'switchToFinishStage']
                ],
                terminate: [
                    ['PanelController', 'terminateFinishStage']
                ]
            }),
        ]);
    }

    /**
     * @returns {Stage} instance
     */
    getActiveStage() {
        return this._stages[this._currentStage];
    }

    /**
     * @returns {Stage} instance
     */
    nextStageIsDone() {
        if (this.nextStageExists()) {
            return this._stages[this._currentStage + 1].getState['done'];
        }

        return false;
    }

    switchToNextStage() {
        this._currentStage++
    }

    switchToPreviousStage() {
        this._currentStage--;
    }

    /**
     * @returns {boolean}
     */
    nextStageExists() {
        return this._stages.length > this._currentStage + 1;
    }

    /**
     * @returns {boolean}
     */
    previousStageExists() {
        return this._currentStage > 0;
    }
}