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
                    elements: this._buildSlider({
                        min: -235,
                        labelText: "value",
                        step: 1,
                        max: 235,
                        startValue: 0, 
                        sliderTitleText: 'Adjust Brightness'
                    }),
                    tooltip: document.createElement('p')
                        .textContent = `Select the brightness altering level by moving the slider
                            or entering it into the input box`
                },
                adjustContrast: {
                    elements: this._buildSlider({
                        min: 0.1,
                        labelText: "level",
                        step: 0.05,
                        max: 5,
                        startValue: 1, 
                        sliderTitleText: 'Adjust Contrast'
                    }),
                    tooltip: document.createElement('p')
                        .textContent = `Select the contrast altering level by moving the slider
                            or entering it into the input box. Values lower than 
                            1 will decrease contrast, higher than 1 increase.`
                },
                sharpenImage: {
                    elements: this._buildSlider({
                        min: 0,
                        labelText: "level",
                        step: 1,
                        max: 10,
                        startValue: 1, 
                        sliderTitleText: 'Image sharpen'
                    }),
                    tooltip: document.createElement('p')
                        .textContent = `Select the sharpening level by moving the slider
                             or entering it into the input box.`
                },
                gammaCorrection: {
                    elements: this._buildSlider({
                        min: 0.1,
                        labelText: "level",
                        step: 0.1,
                        max: 7,
                        startValue: 1, 
                        sliderTitleText: 'Gamma correction'
                    }),
                    tooltip: document.createElement('p')
                        .textContent = `Select the gamma correction level by moving the slider
                            or entering it into the input box.`
                },
                imageNegatives: {
                    elements: (() => {
                        const applyButton = document.createElement('button');
                        const methodTitle = document.createElement('span');
                        const wrapper = document.createElement('div');
                        
                        applyButton.classList.add('panel-button');
                        applyButton.textContent = 'apply';

                        // Method title
                        methodTitle.textContent = 'Image negatives';
                        methodTitle.classList.add('method-title');

                        wrapper.append(methodTitle, applyButton);

                        return wrapper;
                    })(),
                    tooltip: document.createElement('p')
                        .textContent = `Select the gamma correction level by moving the slider
                            or entering it into the input box.`
                },
                logTransform: {
                    elements: this._buildSlider({
                        min: 30,
                        labelText: "level",
                        step: 1,
                        max: 100,
                        startValue: 30, 
                        sliderTitleText: 'Log transform'
                    }),
                    tooltip: document.createElement('p')
                        .textContent = `Select the tranformation level by moving the slider
                             or entering it into the input box.`
                },
            }
        };
    }

    _buildSlider(settings) {
        const slider = document.createElement('input');
        const sliderTo = document.createElement('span');
        const sliderFrom = document.createElement('span');
        const methodTitle = document.createElement('span');
        const sliderValue = document.createElement('input');
        const applyButton = document.createElement('button');
        const sliderSettings = document.createElement('div');
        const sliderContainer = document.createElement('div');
        const sliderValueLabel = document.createElement('label');
        const sliderRangeWrapper = document.createElement('div');
        const sliderValueWrapper = document.createElement('div');
        const applyButtonWrapper = document.createElement('div');

        const {min, max, startValue, sliderTitleText, step, labelText} = settings;

        // Slider range
        sliderFrom.classList.add('slider-from');
        sliderFrom.textContent = min;

        sliderTo.classList.add('slider-to');
        sliderTo.textContent = max;

        sliderRangeWrapper.classList.add('range-wrapper');
        sliderRangeWrapper.append(sliderFrom, sliderTo);
        
        // Method title
        methodTitle.textContent = sliderTitleText;
        methodTitle.classList.add('method-title');
        
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

        // Slider value
        sliderValue.type = 'number';
        sliderValue.step = step;
        sliderValue.value = startValue;
        sliderValue.classList.add('slider-value');
        sliderValue.id = 'slider-value-id'

        slider.addEventListener('change', (event) => {
            sliderValue.value = event.target.value;
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
        
        // Button
        applyButton.classList.add('panel-button');
        applyButton.textContent = 'apply';

        applyButtonWrapper.classList.add('slider-apply-wrapper');
        applyButtonWrapper.append(applyButton);

        // Container
        sliderContainer.classList.add('slider-container');
        sliderContainer.append(
            methodTitle, sliderSettings, sliderValueWrapper, applyButtonWrapper
        );

        return sliderContainer;
    }
}