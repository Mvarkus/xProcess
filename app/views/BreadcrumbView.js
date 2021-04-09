class BreadcrumbView {
    /**
     * @param {object} breadcrumbParts collection of DOM elements 
     */
    constructor(breadcrumbParts) {
        this._breadcrumbParts = breadcrumbParts;
    }

    getBreadcrumbsAmount() {
        return this._breadcrumbParts.breadcrumbs.children.length;
    }

    movePointerForward(nextBreadcrumb) {
        this._breadcrumbParts.breadcrumbs
            .children[nextBreadcrumb-1].classList.remove('current');

        this._breadcrumbParts.breadcrumbs
            .children[nextBreadcrumb].classList.add('current', 'active-breadcrumb');
    }

    movePointerBack(previousBreadcrumb) {
        this._breadcrumbParts.breadcrumbs
            .children[previousBreadcrumb+1]
            .classList.remove('current', 'active-breadcrumb');

        this._breadcrumbParts.breadcrumbs
            .children[previousBreadcrumb].classList.add('current');
    }

}