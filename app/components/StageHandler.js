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

    /**
     * @returns {Stage} instance
     */
    nextStageIsDone() {
        if (this.nextStageExists()) {
            return this._stages[this._currentStage+1].getState['done'];
        }

        return false;
    }

    /**
     * @returns {Stage} instance
     */
    previousStageIsDone() {
        if (this.previousStageExists()) {
            return this._stages[this._currentStage-1].getState['done'];
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