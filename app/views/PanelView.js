class PanelView {
    /**
     * @param {object} panelDomParts collection of HTMLElement intances
     */
    constructor(panelDomParts) {
        this._panelDomParts = panelDomParts;
        this._defaultButtonContent = {
            back: panelDomParts.buttons['back'].textContent,
            next: panelDomParts.buttons['next'].textContent
        };

        this._controlButtons = {
            back: {
                active: false,
                skip: 0
            },
            next: {
                active: false,
                skip: 0
            }
        };
    }

    /**
     * @param {string} buttonName
     * @param {object} state 
     */
    setButtonState(buttonName, state) {
        this._controlButtons[buttonName] = {
            active: state.active ?? this._controlButtons[buttonName].active,
            skip: state.skip ?? this._controlButtons[buttonName].skip,
        };
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

    changeButtonContent(buttonName, content) {
        this._panelDomParts.buttons[buttonName].textContent = '';
        this._panelDomParts.buttons[buttonName].textContent = content;
    }

    changeButtonContentToDefault(buttonName) {
        this._panelDomParts.buttons[buttonName].textContent = '';
        this._panelDomParts.buttons[buttonName].textContent =
            this._defaultButtonContent[buttonName];
    }
}