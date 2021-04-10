/**
 * Core of the application, is responsible for few tasks.
 * 
 * The first is retrieving list of actions out of Stage instance,
 * getting needed controllers from the router and 
 * calling methods which were specified in the actions list.
 * 
 * Another task is to switch application's phases by using StageHandler.
 */
 class Application {
    /**
     * @param {StageHandler} stageHandler 
     * @param {Router} router 
     */
    constructor(stageHandler, router) {
        this._stageHandler = stageHandler;
        this._router = router;
    }

    run() {
        this._handleStage();
    }

    _handleStage() {
        const activeStage = this._stageHandler.getActiveStage();

        for (const [controller, action] of activeStage.getActions()) {
            this._router.getController(controller)[action](
                activeStage,
                this._router
            );
        }
    }

    proceed() {
        const panelController = this._router.getController('PanelController');
        const breadcrumbController = this._router.getController('BreadcrumbController');
        
        const buttonState = panelController.retrieveButtonState('next');

        if (buttonState.active && this._stageHandler.nextStageExists()) { 
            this._stageHandler.switchToNextStage();
            this._handleStage();
            const activeStage = this._stageHandler.getActiveStage();

            panelController.changeButtonState('next', {
                active: activeStage.getState()['done']
            });

            panelController.changeButtonState('back', {
                active: true
            });

            breadcrumbController.movePointerForward();
        }
    }

    goBack() {
        const panelController = this._router.getController('PanelController');
        const breadcrumbController = this._router.getController('BreadcrumbController');

        const buttonState = panelController.retrieveButtonState('back');

        if (buttonState.active && this._stageHandler.previousStageExists()) {
            this._stageHandler.switchToPreviousStage();
            this._handleStage();
            const activeStage = this._stageHandler.getActiveStage();

            panelController.changeButtonState('back', {
                active: this._stageHandler.previousStageExists()
            });
            
            panelController.changeButtonState('next', {
                active: activeStage.getState()['done']
            });

            breadcrumbController.movePointerBack();
        }
    }
}