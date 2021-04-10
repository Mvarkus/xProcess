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
     drawImage(imageFile) {
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