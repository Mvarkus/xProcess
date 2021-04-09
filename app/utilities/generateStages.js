const generateStages = ({
    supportedMethods
}) => {
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
        ['ImageController', 'switchToFileUploadStage'],
        ['PanelController', 'switchToFileUploadStage']
    ]);

    const methodChoosingStage = new Stage(
        () => {
            const tooltip = document.createElement('p');
            tooltip.textContent = 'Please select a method of how to alter the image';

            const list = document.createElement('ul');
            list.classList = 'methods-list';

            for (const method of supportedMethods) {
                list.append(
                    document.createElement('li').textContent = method
                );
            }

            return {
                methodsList: list,
                tooltip: tooltip
            };
        }, [
        ['PanelController', 'switchToMethodChoosigStage']
    ]);

    return [fileUploadStage, methodChoosingStage];
}