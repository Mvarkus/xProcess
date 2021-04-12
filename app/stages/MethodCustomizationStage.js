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
        const tooltip = document.createElement('p');
        tooltip.textContent = 'Adjust settings to alter the image';

        return {
            controls: {
                'adjustBrightness': this._buildSlider({
                    min: -100, 
                    max: 100, 
                    startValue: 0, 
                    sliderTitleText: 'Adjust Brightness'
                }),
                'adjustContrast': ''
            },
            tooltip: tooltip
        };
    }

    _buildSlider(settings) {
        const slider = document.createElement('input');
        const sliderTo = document.createElement('span');
        const sliderFrom = document.createElement('span');
        const sliderTitle = document.createElement('span');
        const sliderValue = document.createElement('input');
        const applyButton = document.createElement('button');
        const sliderSettings = document.createElement('div');
        const sliderContainer = document.createElement('div');
        const sliderValueLabel = document.createElement('label');
        const sliderRangeWrapper = document.createElement('div');
        const sliderValueWrapper = document.createElement('div');
        const applyButtonWrapper = document.createElement('div');

        const {min, max, startValue, sliderTitleText} = settings;

        // Slider range
        sliderFrom.classList.add('slider-from');
        sliderFrom.textContent = min;

        sliderTo.classList.add('slider-to');
        sliderTo.textContent = max;

        sliderRangeWrapper.classList.add('range-wrapper');
        sliderRangeWrapper.append(sliderFrom, sliderTo);
        
        // Slider title
        sliderTitle.textContent = sliderTitleText;
        sliderTitle.classList.add('slider-title');
        
        // Slider
        slider.min = min;
        slider.max = max;
        slider.type = 'range';
        slider.value = startValue;
        slider.userMousedown = false;
        slider.classList.add('slider');

        sliderSettings.classList.add('slider-settings');
        sliderSettings.append(slider, sliderRangeWrapper);

        // Slider value
        sliderValue.type = 'number';
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

        sliderValueLabel.textContent = 'slider value';
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
            sliderTitle, sliderSettings, sliderValueWrapper, applyButtonWrapper
        );

        return sliderContainer;
    }
}