"use strict";

const main = (global) => {
    const app = new Application(
        new StageHandler(generateStages()),
        new Router({
            PanelController: new PanelController(
                new PanelService(
                    new PanelRenderer({
                        body: document.querySelector('.control-panel-body'),
                        tooltip: document.querySelector('.help-tooltip')
                    })
                )
            ),
            BreadcrumbController: new BreadcrumbController(
                new BreadcrumbService()
            ),
            ImageController: new ImageController(
                new ImageService()
            )
        })
    );

    app.run();
};

class StageHandler {
    constructor(stages) {
        this._stages = stages;
        this._currentStage = 0;
    }

    getActiveStage() {
        return this._stages[this._currentStage];
    }

    switchToNextStage() {
        this._currentStage++
    }

    switchToPreviousStage() {
        this._currentStage === 0 ? 0 : this._currentStage--;
    }

    nextStageExists() {
        return this._stages.length < this._currentStage+1;
    }

    previousStageExists() {
        return this._currentStage > 0;
    }
}

class Stage {
    /**
     * @param {function():object} buildCallback - builds DOM components collection
     * @param {Object[]} actions - array of actions to be called within application to bootstrap a stage
     * @param {string} actions[].controller
     * @param {string} actions[].action
    */
    constructor(buildCallback, actions) {
        this._state = {};

        this._domComponents = buildCallback();
        this._actions = actions;
    }

    /**
     * @returns {Object} Collection of DOM components
     */
    getDomComponents() {
        return this._domComponents;
    }

    /**
     * @returns {Object[]} actions
     */
     getActions() {
        return this._actions;
    }

    /**
     * @param {Object} state 
     */
    setState(state) {
        this._state = state;
    }

    /**
     * @returns state object
     */
    getState() {
        return this._state;
    }
}

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
        },
        [
            {controller: 'PanelController', action: 'registerEvents'},
            {controller: 'PanelController', action: 'updateBody'},
            {controller: 'PanelController', action: 'updateTooltip'},
        ]
    );

    return [fileUploadStage];
}

class Router {
    constructor(controllers) {
        this._controllers = controllers;
    }

    getController(name) {
        return this._controllers[name];
    }

    controllerExists(name) {
        return name in this._controllers;
    }
}

class Application {
    constructor(stageHandler, router) {
        this._stageHandler = stageHandler;
        this._router = router;
    }

    run() {
        this._handleStage();
    }

    _handleStage() {
        const activeStage = this._stageHandler.getActiveStage();

        for (const {controller, action } of activeStage.getActions()) {
            if (this._router.controllerExists(controller)) {
                this._router.getController(controller)[action](
                    activeStage,
                    this._router
                );
            }
        }
    }

    proceed() {
    }

    goBack() {
    }
}

class PanelController {
    constructor(service) {
        this._service = service;
    }

    registerEvents(stage, router) {
        this._service.registerInputFileEvent(
            stage.getDomComponents()['button'].control, 
            router.getController('ImageController')
        );
    }

    updateBody(stage) {
        this._service.renderUpdate(
            'body',
            stage.getDomComponents()['button']
        );
    }

    updateTooltip(stage) {
        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents()['tooltip']
        );
    }
}

class PanelService {
    constructor(renderer) {
        this._renderer = renderer;
    }    

    registerInputFileEvent(inputElement, imageController) {
        inputElement.addEventListener('change', () => {});
    }

    renderUpdate(part, content) {
        this._renderer.clearPanelPart(part);
        this._renderer.fillPanelPart(part, content);
    }
}

class PanelRenderer {
    constructor(panelDomParts) {
        this._panelDomParts = panelDomParts;
    }

    clearPanelPart(partName) {
        this._panelDomParts[partName].innerHTML = '';
    }

    fillPanelPart(partName, content) {
        this._panelDomParts[partName].append(content)
    }
}

class BreadcrumbController {}
class BreadcrumbService {}
class BreadcrumbRenderer {}

class ImageController {}
class ImageService {}
class ImageRenderer {}
class ImageProcessor {}

main({});