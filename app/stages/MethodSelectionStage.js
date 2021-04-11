/**
 * @inheritdoc
 */
class MethodSelectionStage extends Stage {
    /**
     * @inheritdoc
     * @param {object} supportedMethods supported methods of image processing 
     */
    constructor(actions, supportedMethods) {
        super(actions);
        this._supportedMethods = supportedMethods;
    }

    _build() {
        const tooltip = document.createElement('p');
        tooltip.textContent = 'Select a method of how to alter the image';

        const list = document.createElement('ul');
        list.classList = 'methods-list';

        const methodsContext = Symbol.for('methodContext');

        for (const methodContext of this._supportedMethods) {
            const li = document.createElement('li');
            li.textContent = methodContext.text;
            li[methodsContext] = methodContext;
            list.append(li);
        }

        return {
            methodsList: list,
            tooltip: tooltip
        };
    }
}