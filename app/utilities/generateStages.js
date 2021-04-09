const generateStages = () => {
    const fileUploadStage = new Stage(
        () => {
            const tooltip = document.createElement('p');
            tooltip.textContent = 'Please choose an image which needs to be altered.';

            const button = document.createElement('label');
            button.classList = 'upload-button';
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
        }, [
        ['ImageController', 'registerFileUploadEventHandlers'],
        ['PanelController', 'updatePanel']
    ]);

    return [fileUploadStage];
}