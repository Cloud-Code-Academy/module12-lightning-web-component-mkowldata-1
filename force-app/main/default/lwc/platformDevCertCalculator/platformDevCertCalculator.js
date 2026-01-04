import { LightningElement } from 'lwc';
const devFundamentalWeight = 0.23;
const processAutoWeight = 0.30;
const userInterfaceWeight = 0.25;
const testDebugDeployWeight = 0.22;
const passingScore = 68;

export default class PlatformDevCertCalculator extends LightningElement {

    devFundamentalScore = 0;
    processAutoScore = 0;
    userInterfaceScore = 0;
    testDebugDeployScore = 0;
    
    certificationScore = 0;
    numberOfQuestions = 60;

    showResources = false;

    showGoodJob = false;

    currentHistoryId = 0;

    attemptHistory = [
        {Id: 1, Score:0}
        ];

    calculateScore(){
        let devFundamentalWeightScore = this.devFundamentalScore * devFundamentalWeight;
        let processAugoWeightScore = this.processAutoScore * processAutoWeight;
        let userInterfaceWeightScore = this.userInterfaceScore * userInterfaceWeight;
        let testDebugDeployWeightScore = this.testDebugDeployScore * testDebugDeployWeight;
        this.certificationScore = devFundamentalWeightScore + processAugoWeightScore + userInterfaceWeightScore + testDebugDeployWeightScore;

        this.showResourceifFailed();
        this.addAttemptHistory(this.certificationScore);
    }
    handleChange(event){
        console.log(event.target.name, event.target.value, event.target.type, event.target.label);
        const inputName = event.target.name;
        let value = Number(event.target.value);
        if (inputName === 'devFundamentals') {
            this.devFundamentalScore = value;
        } else if (inputName === 'processAuto') {
            this.processAutoScore = value;
        } else if (inputName === 'userInterface') {
            this.userInterfaceScore = value;
        } else if (inputName === 'testDebugDeploy') {
            this.testDebugDeployScore = value;
        }
    }
    
    showResourceifFailed(){
        if (this.certificationScore < passingScore) {
            this.showResources = true;
        } else {
            this.showResources = false;
        }
        this.showGoodJob = !this.showResources;
    }


    addAttemptHistory(Score){
        this.currentHistoryId ++;
        const attempt = 
            {
                Id: this.attemptHistory.length + 1, Score
            }
        this.attemptHistory = [...this.attemptHistory, attempt];
    }

    deleteAttemptHandler(event){
        console.log('this is called from parent to handle delete', event.detail);
        let attemptId = event.detail;
        this.attemptHistory = this.attemptHistory.filter(attempt => attempt.Id != attemptId);
        console.log('New attempt history' + this.attemptHistory);
    }

    connectedCallback(){
        console.log('connected callback loaded' + this.showChild);
        this.currentHistoryId = this.attemptHistory.length;
    }
}