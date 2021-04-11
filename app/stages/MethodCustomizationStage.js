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

    _build() {
        const tooltip = document.createElement('p');
        tooltip.textContent = 'Adjust settings to alter the image';

        const sliderContainer = document.createElement('div');
        const slider = document.createElement('input');

        sliderContainer.classList.add('slider-container');

        slider.type = 'range';
        slider.min = '-100';
        slider.max = '100';
        slider.value = '0';
        slider.classList.add('slider');

        sliderContainer.append(slider);

        return {
            controls: {
                'adjustBrightness': sliderContainer,
                'adjustContrast': sliderContainer
            },
            tooltip: tooltip
        };
    }
}