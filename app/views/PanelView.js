class PanelView {
    /**
     * @param {object} panelDomParts collection of HTMLElement intances
     */
    constructor(panelDomParts) {
        this._panelDomParts = panelDomParts;

        this._controlButtons = {
            back: {
                active: false
            },
            next: {
                active: false   
            }
        };
    }

    /**
     * @param {string} buttonName
     * @param {object} state 
     */
    setButtonState(buttonName, state) {
        this._controlButtons[buttonName] = state;
        this._panelDomParts.buttons[buttonName].classList = 
            state.active ? 'activate' : '';
    }

    /**
     * @param {string} buttonName
     * @returns {object} state
     */
    getButtonState(buttonName) {
        return this._controlButtons[buttonName];
    }

    /**
     * @param {string} partName 
     */
    clearPanelPart(partName) {
        this._panelDomParts[partName].innerHTML = '';
    }

    /**
     * @param {string} partName 
     * @param {HTMLElement} content 
     */
    fillPanelPart(partName, content) {
        this._panelDomParts[partName].append(content)
    }
}