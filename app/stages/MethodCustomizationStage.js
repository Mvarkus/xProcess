/**
 * @inheritdoc
 */
class MethodCustomizationStage extends Stage {
    /**
     * @inheritdoc
     */
    constructor(actions) {
        super(actions);
    }

    /**
     * @inheritdoc
     */
    _build() {
        return {
            controls: {
                adjustBrightness: {
                    elements: this._buildSliders('Adjust Brightness', [{
                        min: -235,
                        labelText: "value",
                        step: 1,
                        max: 235,
                        startValue: 0
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Select the brightness altering level by moving the slider
                            or entering it into the input box`
                },
                adjustContrast: {
                    elements: this._buildSliders('Adjust Contrast', [{
                        min: 0.1,
                        labelText: "level",
                        step: 0.05,
                        max: 5,
                        startValue: 1
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Select the contrast altering level by moving the slider
                            or entering it into the input box. Values lower than 
                            1 will decrease contrast, higher than 1 increase.`
                },
                sharpenImage: {
                    elements: this._buildSliders('Image sharpen', [{
                        min: 0,
                        labelText: "level",
                        step: 1,
                        max: 10,
                        startValue: 1
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Select the sharpening level by moving the slider
                            or entering it into the input box.`
                },
                gammaCorrection: {
                    elements: this._buildSliders('Gamma correction', [{
                        min: 0.1,
                        labelText: "level",
                        step: 0.1,
                        max: 7,
                        startValue: 1
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Select the gamma correction level by moving the slider
                            or entering it into the input box.`
                },
                imageNegatives: {
                    elements: (() => {
                        const applyButton = document.createElement('button');
                        const methodTitle = document.createElement('span');
                        const wrapper = document.createElement('div');

                        applyButton.classList.add('panel-button', 'centered-button');
                        applyButton.textContent = 'apply';

                        // Method title
                        methodTitle.textContent = 'Image negatives';
                        methodTitle.classList.add('method-title');

                        wrapper.classList.add('slider-container');
                        wrapper.append(methodTitle, applyButton);

                        return wrapper;
                    })(),
                    tooltip: document.createElement('p')
                        .textContent = `Press the button to apply image inversion method.`
                },
                logTransform: {
                    elements: this._buildSliders('Log transform', [{
                        min: 30,
                        labelText: "level",
                        step: 1,
                        max: 100,
                        startValue: 30
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Select the tranformation level by moving the slider
                            or entering it into the input box.`
                },
                cannyEdgeDetection: {
                    elements: this._buildSliders('Edge detection (Canny)', [{
                        min: 1,
                        labelText: "min tresh:",
                        step: 1,
                        max: 255,
                        startValue: 1
                    }, {
                        min: 1,
                        labelText: "max thresh: ",
                        step: 1,
                        max: 255,
                        startValue: 1
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Adjust min and max thresholds to find best fit of the line detection.`
                },
                imageSmoothing: {
                    elements: this._buildSliders('Image smoothing', [{
                        min: 1,
                        labelText: "smoothing level: ",
                        step: 2,
                        max: 25,
                        startValue: 1
                    },]),
                    tooltip: document.createElement('p')
                        .textContent = `Select the smoothening level by moving the slider
                            or entering it into the input box.`
                },
                adaptiveThreshold: {
                    elements: this._buildSliders('Adaptive threshold', [{
                        min: 3,
                        labelText: "block size: ",
                        step: 2,
                        max: 35,
                        startValue: 1
                    }, {
                        min: 0,
                        labelText: "constant: ",
                        step: 1,
                        max: 30,
                        startValue: 1
                    }]),
                    tooltip: document.createElement('p')
                        .textContent = `Block size is used to calculate a threshold value by using pixel neighborhood.
                            The constant is subtracted from the mean or weighted mean, it will help to reduce noise`
                }
            }
        };
    }

    _buildSliders(methodTitleText, settings) {
        const applyButton = document.createElement('button');
        const methodTitle = document.createElement('span');
        const slidersWrapper = document.createDocumentFragment()
        const sliderContainer = document.createElement('div');
        const applyButtonWrapper = document.createElement('div');

        for (let i = 0; i < settings.length; i++) {
            let slider = document.createElement('input');
            let sliderTo = document.createElement('span');
            let sliderFrom = document.createElement('span');
            let sliderValue = document.createElement('input');
            let sliderSettings = document.createElement('div');
            let sliderValueLabel = document.createElement('label');
            let sliderRangeWrapper = document.createElement('div');
            let sliderValueWrapper = document.createElement('div');

            let { min, max, startValue, step, labelText } = settings[i];

            // Slider
            slider.min = min;
            slider.max = max;
            slider.step = step;
            slider.type = 'range';
            slider.value = startValue;
            slider.userMousedown = false;
            slider.classList.add('slider');

            sliderSettings.classList.add('slider-settings');
            sliderSettings.append(slider, sliderRangeWrapper);

            // Slider range
            sliderFrom.classList.add('slider-from');
            sliderFrom.textContent = min;

            sliderTo.classList.add('slider-to');
            sliderTo.textContent = max;

            sliderRangeWrapper.classList.add('range-wrapper');
            sliderRangeWrapper.append(sliderFrom, sliderTo);

            // Slider value
            sliderValue.type = 'number';
            sliderValue.step = step;
            sliderValue.min = min;
            sliderValue.max = max;
            sliderValue.value = startValue;
            sliderValue.classList.add('slider-value');
            sliderValue.id = 'slider-value-id'

            slider.addEventListener('change', (event) => {
                sliderValue.value = event.target.value;
            });

            sliderValue.addEventListener('change', (event) => {
                slider.value = sliderValue.value;
            });

            slider.addEventListener('mousemove', (event) => {
                if (slider.userMousedown) {
                    slider.dispatchEvent(new Event('change'));
                }
            });

            slider.onmousedown = () => slider.userMousedown = true;
            slider.onmouseup = () => slider.userMousedown = false;

            sliderValueLabel.textContent = labelText;
            sliderValueLabel.htmlFor = 'slider-value-id';

            sliderValueWrapper.classList.add('slider-value-wrapper');
            sliderValueWrapper.append(sliderValueLabel, sliderValue);

            slidersWrapper.append(sliderSettings, sliderValueWrapper);
        }

        // Method title
        methodTitle.textContent = methodTitleText;
        methodTitle.classList.add('method-title');

        // Button
        applyButton.classList.add('panel-button');
        applyButton.textContent = 'apply';

        applyButtonWrapper.classList.add('slider-apply-wrapper');
        applyButtonWrapper.append(applyButton);

        // Container
        sliderContainer.classList.add('slider-container');
        sliderContainer.append(
            methodTitle, slidersWrapper, applyButtonWrapper
        );

        return sliderContainer;
    }
}