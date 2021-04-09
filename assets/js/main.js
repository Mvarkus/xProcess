"use strict";

const main = (global) => {
    const controlButtons = {
        back: document.querySelector('.back-button'),
        next: document.querySelector('.next-button')
    };

    const app = new Application(
        new StageHandler(generateStages()),
        new Router({
            PanelController: new PanelController(
                new PanelService(
                    new PanelView({
                        body: document.querySelector('.control-panel-body'),
                        tooltip: document.querySelector('.help-tooltip'),
                        buttons: controlButtons
                    })
                )
            ),
            BreadcrumbController: new BreadcrumbController(
                new BreadcrumbService()
            ),
            ImageController: new ImageController(
                new ImageService(
                    new ImageView({
                        canvas: document.querySelector('.image-box canvas'),
                        meta: document.querySelector('.image-meta-data')
                    })
                )
            )
        })
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
    loadScript('app/utilities/generateStages.js'),
    loadScript('app/utilities/opencv.js'),
    loadScript('app/components/StageHandler.js'),
    loadScript('app/components/Stage.js'),
    loadScript('app/components/Router.js'),
    loadScript('app/components/ImageProcessor.js'),
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