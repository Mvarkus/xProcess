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
                        imageData.data[blue]
                    ] = [
                        imageData.data[red] + value,
                        imageData.data[green] + value,
                        imageData.data[blue] + value
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
                        imageData.data[blue]
                    ] = [
                        imageData.data[red] * value,
                        imageData.data[green] * value,
                        imageData.data[blue] * value
                    ];
                }
            }

            context.putImageData(imageData, 0, 0);
        }
    }

    sharpenImage(amount) {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.sharpenImage(amount);
            });
        } else {
            this._redraw = true;
            if (amount < 1) {return}
            const src = cv.imread(this._imageBoxParts.canvas);
            const laplasianResult = new cv.Mat(),
                subsctrationResult = new cv.Mat(),
                mask = new cv.Mat();

            // cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
            cv.Laplacian(src, laplasianResult, cv.CV_8U, 1, 1, 0, cv.BORDER_DEFAULT);

            cv.subtract(src, laplasianResult, subsctrationResult, mask, -1);

            for (let i = 1; i <= amount; i++) {
                cv.subtract(subsctrationResult, laplasianResult, subsctrationResult, mask, -1);
            }

            cv.imshow(this._imageBoxParts.canvas, subsctrationResult);
            src.delete();
            laplasianResult.delete();
            subsctrationResult.delete();
            mask.delete();
        }
    }

    correctGamma(gamma) {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.correctGamma(gamma);
            });
        } else {
            this._redraw = true;
            const gammaCorrection = 1 / gamma;

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
                        imageData.data[blue]
                    ] = [
                        255 * ((imageData.data[red] / 255) ** gammaCorrection),
                        255 * ((imageData.data[green] / 255) ** gammaCorrection),
                        255 * ((imageData.data[blue] / 255) ** gammaCorrection)
                    ];    
                }
            }

            context.putImageData(imageData, 0, 0);
        }
    }

    imageNegatives() {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.imageNegatives();
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
                        imageData.data[blue]
                    ] = [
                        255 - imageData.data[red],
                        255 - imageData.data[green],
                        255 - imageData.data[blue]
                    ];
                }
            }

            context.putImageData(imageData, 0, 0);
        }
    }

    logTransform(value) {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.logTransform(value);
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
                        imageData.data[blue]
                    ] = [
                        value * Math.log(imageData.data[red]+1),
                        value * Math.log(imageData.data[green]+1),
                        value * Math.log(imageData.data[blue]+1)
                    ];
                }
            }

            context.putImageData(imageData, 0, 0);
        }
    }

    detectEdgeCanny(min, max) {
        if (this._redraw) {
            this.drawImage().then(() => {
                this._redraw = false;
                this.detectEdgeCanny(min, max);
            });
        } else {
            this._redraw = true;
           
            const src = cv.imread(this._imageBoxParts.canvas);
            const dst = new cv.Mat();
            cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
            cv.Canny(src, dst, min, max, 3, true);
            cv.imshow(this._imageBoxParts.canvas, dst);
            src.delete(); dst.delete();
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