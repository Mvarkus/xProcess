class ImageView {
    /**
     * @param {object} imageBoxParts collection of DOM elemets
     */
    constructor(imageBoxParts) {
        this._imageBoxParts = imageBoxParts;
        this._imageFile = null
        this._redraw = false;
    }

    _getColorIndices(x, y, width) {
        const index = x * 4 + y * (width * 4);
        return [index, index + 1, index + 2, index + 3];
    }

    alterBrightness(value) {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.alterBrightness(value);
            });
        } else {
            this._redraw = true;

            const context = this._imageBoxParts.canvas.getContext('2d');
            const imageData = context.getImageData(
                0,
                0,
                this._imageBoxParts.canvas.width,
                this._imageBoxParts.canvas.height
            );

            for (let x = 0; x < imageData.width; x++) {
                for (let y = 0; y < imageData.height; y++) {
                    const [red, green, blue, alpha] = this._getColorIndices(
                        x, y, imageData.width
                    );

                    [
                        imageData.data[red],
                        imageData.data[green],
                        imageData.data[blue],
                        imageData.data[alpha],
                    ] = [
                            imageData.data[red] + value,
                            imageData.data[green] + value,
                            imageData.data[blue] + value,
                            imageData.data[alpha],
                        ];
                }
            }

            context.putImageData(imageData, 0, 0);
        }
    }

    alterContrast(value) {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.alterContrast(value);
            });
        } else {
            this._redraw = true;

            const context = this._imageBoxParts.canvas.getContext('2d');
            const imageData = context.getImageData(
                0,
                0,
                this._imageBoxParts.canvas.width,
                this._imageBoxParts.canvas.height
            );

            for (let x = 0; x < imageData.width; x++) {
                for (let y = 0; y < imageData.height; y++) {
                    const [red, green, blue, alpha] = this._getColorIndices(
                        x, y, imageData.width
                    );

                    [
                        imageData.data[red],
                        imageData.data[green],
                        imageData.data[blue],
                        imageData.data[alpha],
                    ] = [
                        imageData.data[red] * value,
                        imageData.data[green] * value,
                        imageData.data[blue] * value,
                        imageData.data[alpha],
                    ];  
                }
            }

            context.putImageData(imageData, 0, 0);
        }
    }

    set imageFile(file) { this._imageFile = file };

    /**
     * @param {File} imageFile instance
     */
    drawImage() {
        return new Promise((resolve) => {
            const image = new Image();
            image.src = URL.createObjectURL(this._imageFile);

            image.onload = () => {
                const context = this._imageBoxParts.canvas.getContext("2d");

                this._imageBoxParts.canvas.width = image.width;
                this._imageBoxParts.canvas.height = image.height;

                context.drawImage(image, 0, 0);
                URL.revokeObjectURL(image.src);

                resolve();
            };
        });
    }

    /**
     * @param {File} imageFile instance 
     */
    updateMetaData() {
        const filename = document.createElement('span');
        filename.textContent = this._imageFile.name;

        this._imageBoxParts.meta.append(filename);
    }
}