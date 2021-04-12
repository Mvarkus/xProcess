/**
 * @inheritdoc
 */
 class FileUploadStage extends Stage {
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

        const button = document.createElement('label');
        button.classList = 'panel-button';
        button.textContent = 'Choose an image';

        const input = document.createElement('input');
        input.type = 'file';
        input.name = 'image';
        input.classList = 'upload-input';

        button.append(input);

        return {
            button: button,
            tooltip: tooltip
        };
    }
}