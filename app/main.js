"use strict";

const main = (global) => {
    const controlButtons = {
        back: document.querySelector('.back-button'),
        next: document.querySelector('.next-button')
    };

    const app = new Application(
        StageHandler.build(),
        Router.build(controlButtons)
    );

    controlButtons.next.addEventListener('click', () => {
        app.proceed();
    });

    controlButtons.back.addEventListener('click', () => {
        app.goBack();
    });

    app.run();
};

Promise.all([
    loadScript('app/Application.js'),
    loadScript('app/utilities/opencv.js'),
    loadScript('app/stages/StageHandler.js'),
    loadScript('app/stages/Stage.js'),
    loadScript('app/stages/FileUploadStage.js'),
    loadScript('app/stages/MethodSelectionStage.js'),
    loadScript('app/stages/MethodCustomizationStage.js'),
    loadScript('app/components/Router.js'),
    loadScript('app/components/NotificationManager.js'),
    loadScript('app/controllers/PanelController.js'),
    loadScript('app/controllers/ImageController.js'),
    loadScript('app/controllers/BreadcrumbController.js'),
    loadScript('app/services/PanelService.js'),
    loadScript('app/services/ImageService.js'),
    loadScript('app/services/BreadcrumbService.js'),
    loadScript('app/views/PanelView.js'),
    loadScript('app/views/ImageView.js'),
    loadScript('app/views/BreadcrumbView.js'),
]).then(() => main({}));