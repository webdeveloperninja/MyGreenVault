const User = require('../models/User');

class ToolCheckout {
    constructor(request) {
        this.tool = request.body.tool;
        this.toolQty = request.body.toolQty;
        this.operatorNumber = request.body.operatorNumber;
        this.user = request.user;
        this.jobNumber = request.body.jobNumber;
    }

    isThereEnoughTools() {
        return new Promise((resolve, reject) => {
            if (this.toolQty <= this.tool.qty) {
                resolve(true);
                return;
            }
            resolve(false);
        })
    }
    getTool() {
        return new Promise((resolve, reject) => {
            User.findOne({ '_id': this.user.id }, (err, user) => {
                if (err) return handleError(err);
                for (var i=0; i< user.tools.length; i++) {
                    const toolId = user.tools[i].id;
                    const toolIdToCompare = this.tool._id;
                    if (toolId === toolIdToCompare) {
                        resolve(user.tools[i]);
                        return;
                    }
                }
                resolve(null);
            });
        });     
    }
    getOperator() {
        return new Promise((resolve, reject) => {
            User.findOne({ '_id': this.user.id }, (err, user) => {
                if (err) return handleError(err);
                for (var i=0; i< user.operators.length; i++) {
                    const actualOperatorNumber = user.operators[i].operatorNumber;
                    const operatorNumberToCompare = this.operatorNumber;
                    if (actualOperatorNumber === operatorNumberToCompare) {
                        resolve(user.operators[i]);
                        return;
                    }
                }
                resolve(null);
            });
        }) 
    }
    getJob() {
        return new Promise((resolve, reject) => {
            User.findOne({ '_id': this.user.id }, (err, user) => {
                if (err) return handleError(err);
                for (var i=0; i< user.jobs.length; i++) {
                    const actualJobNumber = Number(user.jobs[i].jobNumber);
                    const jobNumberToCompare = this.jobNumber;
                    if (actualJobNumber === jobNumberToCompare) {
                        resolve(user.jobs[i]);
                        return;
                    }
                }
                resolve(null);
            });
        }) 
    }
    isCheckoutDataValid(checkoutObj) {
        /**
         *      toolId: tool.id,
                operatorNumber: operator.operatorNumber,
                jobNumber: job.jobNumber,
                isThereEnoughTools,
         */
        let error = {};
            error.valid = true;
        /*
            formControlName : {
                status: bootstrapClass,
                message: messageConstant 
            }
        */
        if (!checkoutObj.toolQty) {
            error.toolQty = {
                status: 'danger',
                message: 'There is not enough tools'
            }
            error.valid = false;
        }
        if (!checkoutObj.operatorNumber) {
            error.operatorNumber = {
                status: 'danger',
                message: 'Operator Not Found'
            }
            error.valid = false;
        }
        if (!checkoutObj.jobNumber) {
            error.jobNumber = {
                status: 'danger',
                message: 'Job number not found'
            }
            error.valid = false;
        }
        return error;
    }
}

module.exports = ToolCheckout;
