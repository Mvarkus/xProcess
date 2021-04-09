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
        const buttonState = this._router
            .getController('PanelController')
            .retrieveButtonState('next');
        
        console.log(buttonState);
    }

    goBack() {
        const buttonState = this._router
            .getController('PanelController')
            .retrieveButtonState('back');
        
        console.log(buttonState);
    }
}