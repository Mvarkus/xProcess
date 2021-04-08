"use strict";

const main = (global) => {
    const app = new Application(
        new StageHandler(generateStages()),
        new Router({
            PanelController: new PanelController(
                new PanelService(
                    new PanelView({
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

/**
 * Holds and controls Stage instances
 */
class StageHandler {
    /**
     * @param {Stage[]} stages 
     */
    constructor(stages) {
        this._stages = stages;
        this._currentStage = 0;
    }

    /**
     * @returns {Stage} instance
     */
    getActiveStage() {
        return this._stages[this._currentStage];
    }

    switchToNextStage() {
        this._currentStage++
    }

    switchToPreviousStage() {
        this._currentStage--;
    }

    /**
     * @returns {boolean}
     */
    nextStageExists() {
        return this._stages.length > this._currentStage+1;
    }

    /**
     * @returns {boolean}
     */
    previousStageExists() {
        return this._currentStage > 0;
    }
}

/**
 * Stage is responsible for holding actions to bootstrap the application's phase.
 * 
 * The actions call controller methods to register event handlers,
 * render some content, change state of the application.
 */
class Stage {
    /**
     * @param {function():object} buildCallback - generates DOM components collection
     * @param {array} actions - array of actions to be called to bootstrap the application's stage
    */
    constructor(buildCallback, actions) {
        this._state = {};

        this._domComponents = buildCallback();
        this._actions = actions;
    }

    /**
     * @returns {object} Collection of DOM components
     */
    getDomComponents() {
        return this._domComponents;
    }

    /**
     * @returns {array} actions
     */
     getActions() {
        return this._actions;
    }

    /**
     * @param {object} state 
     */
    setState(state) {
        this._state = state;
    }

    /**
     * @returns {object} state of a stage
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
        }, [
            ['PanelController', 'registerEvents'],
            ['PanelController', 'updateBody'],
            ['PanelController', 'updateTooltip'],
        ]
    );

    return [fileUploadStage];
}

/**
 * Router holds controllers
 */
class Router {
    /**
     * @param {object} controllers - collection of controller instances
     */
    constructor(controllers) {
        this._controllers = controllers;
    }

    /**
     * @param {string} name controller's name 
     * @returns {object} instance of a controller
     */
    getController(name) {
        return this._controllers[name];
    }

    /**
     * 
     * @param {string} name controller's name  
     * @returns {boolean}
     */
    controllerExists(name) {
        return name in this._controllers;
    }
}

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
    /**
     * @param {PanelService} service instance
     */
    constructor(service) {
        this._service = service;
    }

    /**
     * @param {Stage} stage 
     * @param {Router} router 
     */
    registerEvents(stage, router) {
        this._service.registerInputChangeEventHandler(
            stage.getDomComponents().button.control, router
        );
    }

    /**
     * @param {Stage} stage  
     */
    updateBody(stage) {
        this._service.renderUpdate(
            'body',
            stage.getDomComponents().button
        );
    }

    /**
     * @param {Stage} stage  
     */
    updateTooltip(stage) {
        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents().tooltip
        );
    }
}

class PanelService {
    /**
     * @param {PanelView} renderer instance 
     */
    constructor(renderer) {
        this._renderer = renderer;
    }

    /**
     * @param {HTMLElement} inputElement
     * @param {Router} router
     */
    registerInputChangeEventHandler(inputElement, router) {
        inputElement.addEventListener('change', (event) => {
            const imageFile = event.target.files[0];
        });
    }

    /**
     * @param {string} part control panel part name
     * @param {HTMLElement} content 
     */
    renderUpdate(part, content) {
        this._renderer.clearPanelPart(part);
        this._renderer.fillPanelPart(part, content);
    }
}

class PanelView {
    /**
     * @param {object} panelDomParts collection of HTMLElement intances
     */
    constructor(panelDomParts) {
        this._panelDomParts = panelDomParts;

        this._controlButtons = {
            previous: {
                active: false
            },
            next: {
                active: false   
            }
        };
    }

    /**
     * @param {string} buttonName 
     * @param {object} state 
     */
    setButtonState(buttonName, state) {
        this._controlButtons[buttonName] = state;
    }

    /**
     * @param {string} buttonName 
     * @returns {object} state of a button 
     */
    getButtonState(buttonName) {
        return this._controlButtons[buttonName];
    }

    /**
     * @param {string} partName 
     */
    clearPanelPart(partName) {
        this._panelDomParts[partName].innerHTML = '';
    }

    /**
     * @param {string} partName 
     * @param {HTMLElement} content 
     */
    fillPanelPart(partName, content) {
        this._panelDomParts[partName].append(content)
    }
}

class BreadcrumbController {}
class BreadcrumbService {}
class BreadcrumbView {}

class ImageController {}
class ImageService {}
class ImageView {}
class ImageProcessor {}

main({});