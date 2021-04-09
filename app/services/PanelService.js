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

    changeButtonState(buttonName, state) {
        this._view.setButtonState(buttonName, state);
    }

    retrieveButtonState(buttonName) {
        return this._view.getButtonState(buttonName);
    }
}