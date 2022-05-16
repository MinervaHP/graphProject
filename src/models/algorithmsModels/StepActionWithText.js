import StepAction from './StepAction'
export default class StepActionWithText extends StepAction {
    text;
    constructor(text, type) {
        super(type)
        this.text = text;
    }
}