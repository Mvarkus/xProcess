class BreadcrumbService {
    /**
     * @param {Breadcrumb} view instace 
     */
    constructor(view) {
        this._view = view;
        this._currentBreadcrumb = 0;
        this._breadcrumbsAmount = view.getBreadcrumbsAmount();
    }

    movePointerForward() {
        if (this._currentBreadcrumb+1 < this._view.getBreadcrumbsAmount()) {
            this._view.movePointerForward(++this._currentBreadcrumb);
        }
    }

    movePointerBack() {
        if (this._currentBreadcrumb > 0) {
            this._view.movePointerBack(--this._currentBreadcrumb);
        }
    }
}