/**
 * Stage is responsible for holding actions to bootstrap the application's phase.
 * 
 * The actions call controller methods to register event handlers,
 * render some content, change state of the application.
 */
 class Stage {
    /**
     * @param {function():object} buildCallback - generates DOM components collection
     * @param {array} actions - array of actions to be called to bootstrap the application's stage
    */
    constructor(buildCallback, actions) {
        this._state = {
            done: false,
            data: null
        };

        this._domComponents = buildCallback();
        this._actions = actions;
    }

    /**
     * @returns {object} Collection of DOM components
     */
    getDomComponents() {
        return this._domComponents;
    }

    /**
     * @returns {array} actions
     */
     getActions() {
        return this._actions;
    }

    /**
     * @param {object} state 
     */
    setState({done, data}) {
        this._state = {
            done: done ?? this.getState()['data'],
            data: data ?? this.getState()['data']
        };
    }

    /**
     * @returns {object} state of a stage
     */
    getState() {
        return this._state;
    }

    /**
     * @returns {int|string}
     */
    getId() {
        return this._id;
    }
}