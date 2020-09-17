import React, { Component } from 'react';
import './Calculator.css';

var rightOperand = "";
var leftOperand = "";
var operator = null;
var operationComplete = false;

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: 0,
        }
    }

    // Note:input value is a string
    inputValue = (value) => {
        console.log("AT START OF inputValue FX::");
        console.log("LEFT::", leftOperand);
        console.log("OPERATOR::", operator);
        console.log("RIGHT::", rightOperand);
        // is value a number or an operator?
        if ((!isNaN(parseFloat(value)) && isFinite(value))) {
            console.log("VALUE IS A NUMBER::", value);

            // clear right operand unless it is a leading "-"
            if (rightOperand !== "-") {
                rightOperand = "";
            }
            // are we building a left operand or a right operand?
            if (leftOperand !== 0 && leftOperand !== "" && operator) {
                // leftOperand is filled and operator is filled
                this.setState({solution:rightOperand += value});
                return;
            }
            else {
                this.setState({solution:leftOperand += value});
                return;
            }
        }
        else {
            console.log("VALUE IS AN OPERATOR::", value);
            // value is an operator
            // is "-" a negative or a subtraction operator?
            if (value === "-") {
                console.log("HANDLING NEGATIVE SIGN::");
                console.log("LEFT::", leftOperand);
                console.log("OPERATOR::", operator);
                console.log("RIGHT::", rightOperand);
                // build the left operator if value is a negative
                if (!operator && (leftOperand === "0" || leftOperand === "")) {
                    console.log("NEGATING LEFT OPERAND::");
                    leftOperand = "-";
                    this.setState({solution:leftOperand});
                    return;
                }
                // or build the right operator if value is a negative
                else if (operator && leftOperand && (rightOperand === 0 || rightOperand === "")) {
                    console.log("NEGATING RIGHT OPERAND::");
                    rightOperand = "-";
                    this.setState({solution:rightOperand});
                    return;
                }

            }
            // otherwise, set operator to value
            console.log("SETTING OPERATOR TO::", value);
            operationComplete = false;
            operator = value;
            
        }

    }

    handleDecimal = () => {

        if (operationComplete) {
            this.setState({solution: "0"});
        }

        // is this the left operand or the right?
        // assume it is the right if operator is filled
        if (operator) {
            if (rightOperand.includes(".")) {
                return;
            }

            rightOperand += "."
            this.setState({solution: rightOperand});
        }
        // otherwise it is the left
        else {
            if (leftOperand.includes(".")) {
                return;
            }

            leftOperand += "."
            this.setState({solution: leftOperand});
        }

    }

    clearDisplay = () => {
        leftOperand = "";
        rightOperand = "";
        operator = null;
        this.setState({solution:0})
    }

    // handles +/- button
    negateOperand = () => {
        if (operator && rightOperand !== "0" && rightOperand !== "") {
            console.log("TOGGLING RIGHT OPERAND SIGN::");
            rightOperand = (parseFloat(rightOperand) *-1).toString();
            this.setState({solution:rightOperand});
        }
        else if (leftOperand !== "0" && leftOperand !== "") {
            console.log("TOGGLING LEFT OPERAND SIGN::");
            leftOperand = (parseFloat(leftOperand) *-1).toString();
            this.setState({solution:leftOperand});
        }
    }

    getPercent = () => {
        if (leftOperand) {
            let solution = (parseFloat(leftOperand) * 100).toFixed(2).toString() + "%";
            rightOperand = "";
            operator = null;
            this.setState({solution:solution})
        }
    }

    solveCalculation = () => {
        let solution = 0;
        console.log(leftOperand+" "+operator+" "+rightOperand);

        if (!operator) {
            this.clearDisplay();
            return;
        }

        switch(operator) {
            case "/":
                solution = leftOperand / rightOperand;
                break;

            case "*":
                solution = leftOperand * rightOperand;
                break;
    
            case "-":
                solution = leftOperand - rightOperand;
                break;
        
            case "+": 
                solution = parseFloat(leftOperand) + parseFloat(rightOperand);
                break;

            case "%":
                solution = toString(parseFloat(leftOperand) * 100) + "%";
                break;

            default:
                solution = "ERROR";
        }
        if (isNaN(solution)) {
            solution = "ERROR (NaN)";
        }
        leftOperand = solution;
        rightOperand = "";
        operator = null;
        operationComplete = true;
        this.setState({solution:solution})
    }

    render() {
        
        return (
            <div className="container">

                <div className="calculator-wrapper">

                    <div className="display-section">
                        <div className="lcd-display">
                            <div className="calculator-output">{this.state.solution}</div>
                        </div>
                    </div>

                    <div className="horizontal-rule"></div>

                    <div className="calc-controls-row">
                        <button className="round-button orange-red" onClick={this.clearDisplay}>C</button>
                        <button className="round-button orange-red" onClick={this.negateOperand}>+/-</button>
                        <button className="round-button orange-red" onClick={this.getPercent} >%</button>
                        <button className="round-button orange" onClick={() => this.inputValue("/")}>÷</button>
                    </div>

                    <div className="calc-controls-row">
                        <button className="round-button" onClick={() => this.inputValue("7")}>7</button>
                        <button className="round-button" onClick={() => this.inputValue("8")}>8</button>
                        <button className="round-button" onClick={() => this.inputValue("9")}>9</button>
                        <button className="round-button orange" onClick={() => this.inputValue("*")}>×</button>
                    </div>

                    <div className="calc-controls-row">
                        <button className="round-button" onClick={() => this.inputValue("4")}>4</button>
                        <button className="round-button" onClick={() => this.inputValue("5")}>5</button>
                        <button className="round-button" onClick={() => this.inputValue("6")}>6</button>
                        <button className="round-button orange" onClick={() => this.inputValue("-")}>—</button>
                    </div>

                    <div className="calc-controls-row">
                        <button className="round-button" onClick={() => this.inputValue("1")}>1</button>
                        <button className="round-button" onClick={() => this.inputValue("2")}>2</button>
                        <button className="round-button" onClick={() => this.inputValue("3")}>3</button>
                        <button className="round-button orange" onClick={() => this.inputValue("+")}>+</button>
                    </div>

                    <div className="calc-controls-row">
                        <button className="wide-button" onClick={() => this.inputValue("0")}>0</button>
                        <button className="round-button" onClick={this.handleDecimal}>.</button>
                        <button className="round-button orange" onClick={this.solveCalculation}>=</button>
                    </div>

                </div>

            </div>
        )

    }

}
export default Calculator;