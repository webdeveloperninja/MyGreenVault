const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
const toolQueries = require('../models/queries/tool');
const operatorQueries = require('../models/queries/operator');
const jobQueries = require('../models/queries/job');

class ToolCheckout {
    
    constructor(request, response) {
        this.user = request.user;
        this.tool = request.body.tool;

        this.toolCheckoutQty = request.body.toolQty;
        this.operatorNumber = request.body.operatorNumber;
        this.jobNumber = request.body.jobNumber;
    }

    get checkout() {
        // TODO Validate before returning
        return {
            operatorNumber: this.operator.operatorNumber,
            operatorName: this.operator.operatorName,
            jobNumber: this.job.jobNumber,
            jobName: this.job.jobName,
            toolName: this.tool.toolName,
            toolId: this.tool._id,
            toolCheckoutQty: this.toolCheckoutQty
        }
    }

    doCheckout() {
        return new Promise((resolve, reject) => { 
            Promise.all([
                this.getTool(),
                this.getOperator(),
                this.getJob()
            ]).then(values => {
                [this.tool, this.operator, this.job] = values;
                // TODO: Package checkout object
                console.log(this.checkout);
                console.log(this.checkout);
                console.log(this.checkout);
        
                // TODO: Create tool to save with updated qty
  

                resolve(values);
            }).catch(err => {
                reject(err);
            });
        });
    }


    isThereEnoughTools() {
        if (this.toolCheckoutQty <= this.tool.qty) {
            return true;
        }
        return false;
    }
    getTool() {
        console.log(this.tool);
        console.log(this.tool);
        return toolQueries.getTool(this.user._id, this.tool._id);
    }
    createCheckout(toolAfterCheckout, job, operator) {
        this.jobId = job._id;
        this.jobName = job.jobName;
        this.operatorName = operator.operatorName;

        return toolQueries.updateTool(this.user._id, toolAfterCheckout).then(data => {
            return jobQueries.addCheckout(this.user._id, job._id, this.checkout);
        });
    }
    getOperator() {
        return operatorQueries.getOperator(this.user._id, this.operatorNumber);
    }  
    getJob() {
        return jobQueries.getJob(this.user._id, this.jobNumber);
    }
    isCheckoutDataValid(checkout) {
        let error = {};
            error.valid = true;

        if (this.tool.qty < this.toolCheckoutQty) {
            error.toolQty = {
                status: 'danger',
                message: 'There is not enough tools'
            }
            error.valid = false;
        }
        if (!checkout.operator) {
            error.operatorNumber = {
                status: 'danger',
                message: 'Operator Not Found'
            }
            error.valid = false;
        }
        if (!checkout.job) {
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

    // Promise.all([
    //     toolCheckout.getTool(),
    //     toolCheckout.getOperator(),
    //     toolCheckout.getJob()
    //     ]).then(values => {
    //         const [tool, operator, job] = values;

    //         let isCheckoutDataValid = toolCheckout.isCheckoutDataValid({
    //             tool,
    //             operator,
    //             job
    //         });

    //         if (!isCheckoutDataValid.valid) {
    //             res.status(400);
    //             res.setHeader('Content-Type', 'application/json');
    //             res.send(JSON.stringify(isCheckoutDataValid));
    //         } else {
    //             const updatedTool = tool;
    //                 updatedTool.qty = updatedTool.qty - toolCheckout.toolCheckoutQty;
    //             toolCheckout.createCheckout(updatedTool, job, operator).then(data => {
    //                 res.status(200);
    //                 res.json({success: true});
    //             }).catch(err => {
    //                 res.send(500);
    //                 res.json({success: false});
    //                 throw new Error(err);
    //             })
    //         }

    // });