/**
 * @inheritdoc
 */
 class FinishStage extends Stage {
    /**
     * @inheritdoc
    */
    constructor(actions) {
        super(actions);
    }

    /**
     * @inheritdoc
     */
    _build() {
        const tooltip = document.createElement('p');
        tooltip.textContent = 'Choose an image which needs to be altered.';

        const downloadButton = document.createElement('button');
        downloadButton.classList.add('centered-button', 'panel-button');
        downloadButton.textContent = 'Download result';

        return {
            button: downloadButton,
            tooltip: tooltip
        };
    }
}