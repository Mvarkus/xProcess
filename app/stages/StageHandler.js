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
            text: 'adjust brightess',
            name: 'adjustBrightness',
            registrator: [
                'ImageController',
                'adjustBrightnessBootstrap'
            ]
        }, {
            text: 'adjust contrast',
            name: 'adjustContrast',
            registrator: [
                'ImageController',
                'adjustContrastBootstrap'
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
                ]
            }, supportedMethods)
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