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
     * @returns {Stage} instance
     */
    getActiveStage() {
        return this._stages[this._currentStage];
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