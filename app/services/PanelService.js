class PanelService {
    /**
     * @param {PanelView} view instance 
     */
    constructor(view) {
        this._view = view;
    }

    /**
     * @param {string} part control panel part name
     * @param {HTMLElement} content 
     */
    renderUpdate(part, content) {
        this._view.clearPanelPart(part);
        this._view.fillPanelPart(part, content);
    }

     /**
     * @param {string} buttonName 
     * @param {object} state 
     */
    changeButtonState(buttonName, state) {
        this._view.setButtonState(buttonName, state);
    }

    /**
     * @param {string} buttonName
     * @returns {object} state
     */
    retrieveButtonState(buttonName) {
        return this._view.getButtonState(buttonName);
    }

    changeButtonContent(buttonName, content) {
        this._view.changeButtonContent(buttonName, content);
    }

    resetButtonContent(buttonName) {
        this._view.changeButtonContentToDefault(buttonName);
    }
}