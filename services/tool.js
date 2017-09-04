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
        let error = '';
        if (!checkoutObj.isThereEnoughTools) {
            error += 'There is not enough tools;'
        }
        if (!checkoutObj.operator) {
            error += 'Operator Not Found;'
        }
        if (!checkoutObj.job) {
            error += 'Job Not Found;'
        }
        return {
            valid: !error,
            err: error
        }
        
    }
}

module.exports = ToolCheckout;
