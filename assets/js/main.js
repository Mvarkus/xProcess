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
            ['ImageController', 'registerFileUploadEventHandlers'],
            ['PanelController', 'updatePanel']
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
        if (!this._controllerExists(name)) {
            throw Error(`Controller ${name} does not exist`);
        }

        return this._controllers[name];
    }

    /**
     * 
     * @param {string} name controller's name  
     * @returns {boolean}
     */
    _controllerExists(name) {
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

class PanelController {
    /**
     * @param {PanelService} service instance
     */
    constructor(service) {
        this._service = service;
    }

    /**
     * @param {Stage} stage  
     */
    updatePanel(stage) {
        this._service.renderUpdate(
            'body',
            stage.getDomComponents().button
        );

        this._service.renderUpdate(
            'tooltip',
            stage.getDomComponents().tooltip
        );
    }

    changeButtonState(buttonName, state) {
        this._service.changeButtonState(buttonName, state);
    }

    retrieveButtonState(buttonName) {
        return this._service.retrieveButtonState(buttonName);
    }
}

class PanelService {
    /**
     * @param {PanelView} view instance 
     */
    constructor(view) {
        this._view = view;
    }

    /**
     * @param {string} part control panel part name
     * @param {HTMLElement} content 
     */
    renderUpdate(part, content) {
        this._view.clearPanelPart(part);
        this._view.fillPanelPart(part, content);
    }

    changeButtonState(buttonName, state) {
        this._view.setButtonState(buttonName, state);
    }

    retrieveButtonState(buttonName) {
        return this._view.getButtonState(buttonName);
    }
}

class PanelView {
    /**
     * @param {object} panelDomParts collection of HTMLElement intances
     */
    constructor(panelDomParts) {
        this._panelDomParts = panelDomParts;

        this._controlButtons = {
            back: {
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
        this._panelDomParts.buttons[buttonName].classList = 
            state.active ? 'activate' : '';
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

class ImageController {
    /**
     * @param {ImageService} service instance
     */
    constructor(service) {
        this._service = service;
    }

    /**
     * @param {Stage} stage 
     */
    registerFileUploadEventHandlers(stage, router) {
        this._service.registerInputEventHandlers(
            stage.getDomComponents()['button']['control'],
            router
        );
    }

}
class ImageService {
    /**
     * @param {ImageView} view instance 
     * @param {ImageProcessor} imageProcessor instance 
     */
    constructor(view, imageProcessor) {
        this._view = view;
        this._imageProcessor = imageProcessor;

        this._imageFile = null;
    }

    /**
     * @param {HTMLElement} inputElement instance
     */
     registerInputEventHandlers(inputElement, router) {
        inputElement.onchange = (event) => {
            this.setImageFile(event.target.files[0]);
            this.updateImageBox();
            router.getController('PanelController').changeButtonState(
                'next',
                {active: true}
            );
        };
    }

    /**
     * @param {File} imageFile instance
     */
    setImageFile(imageFile) {
        if (imageFile.type.split('/')[0] !== 'image') {
            NotificationManager.errorOccured(
                new Error("Uploaded file must be an image")
            );
        }
        
        this._imageFile = imageFile;
    }

    getImageFile() {
        return this._imageFile;
    }

    updateImageBox() {
        this._view.updateCanvas(this.getImageFile());
        this._view.updateMetaData(this.getImageFile());
    }
}

class ImageView {
    /**
     * @param {object} imageBoxParts collection of DOM elemets
     */
    constructor(imageBoxParts) {
        this._imageBoxParts = imageBoxParts;
    }

    /**
     * @param {File} imageFile instance
     */
    updateCanvas(imageFile) {
        const image = new Image();
        image.src = URL.createObjectURL(imageFile);

        image.onload = () => {
            cv.imshow(this._imageBoxParts.canvas, cv.imread(image));
            URL.revokeObjectURL(image.src);
        };
    }

    /**
     * @param {File} imageFile instance 
     */
    updateMetaData(imageFile) {
        const filename = document.createElement('span');
        filename.textContent = imageFile.name;

        this._imageBoxParts.meta.append(filename);
    }
}
class ImageProcessor {}

class BreadcrumbController {}
class BreadcrumbService {}
class BreadcrumbView {}



class NotificationManager {
    /**
     * Handles errors occurence
     * 
     * @param {Error} error instance 
     */
    static errorOccured(error) {
        this.notifyUser(error.message, 'error');
        throw error;
    }

    static notifyUser(message, type) {
        alert(message);
    }
}

main({});