const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
const toolQueries = require('../models/queries/tool');
const operatorQueries = require('../models/queries/operator');
const jobQueries = require('../models/queries/job');

class ToolCheckout {
    constructor(request, response) {
        this.user = request.user;
        this.userId = ObjectId(this.user._id);

        this.tool = request.body.tool;
        this.toolAfterCheckout = null;
        this.toolName = this.tool.toolName;
        this.toolId = ObjectId(this.tool._id);
        this.toolCheckoutQty = request.body.toolQty;
        this.toolQty = this.tool.qty;
        this.toolQtyAfterCheckout = this.toolQty - this.toolCheckoutQty;

        this.operatorNumber = request.body.operatorNumber;
        this.operatorName = null;
        this.operator = null;

        this.jobNumber = request.body.jobNumber;
        this.jobName = null;
        this.jobId = null;
    }

    get checkout() {
        return {
            operatorNumber: this.operatorNumber,
            operatorName: this.operatorName,
            jobNumber: this.jobNumber,
            jobName: this.jobName,
            toolName: this.toolName,
            toolId: this.toolId,
            toolCheckoutQty: this.toolCheckoutQty
        }
    }

    isThereEnoughTools() {
        return new Promise((resolve, reject) => {
            if (this.toolCheckoutQty <= this.toolQty) {
                resolve(true);
                return;
            }
            resolve(false);
        })
    }
    getTool() {
        console.log(this.tool);
        console.log(this.tool);
        return toolQueries.getTool(this.userId, this.toolId);
    }
    createCheckout(toolAfterCheckout, job, operator) {
        this.toolId = toolAfterCheckout._id;
        this.jobId = job._id;
        this.jobName = job.jobName;
        this.operatorName = operator.operatorName;

        return toolQueries.updateTool(this.userId, toolAfterCheckout).then(data => {
            return jobQueries.addCheckout(this.userId, job._id, this.checkout);
        });
    }
    getOperator() {
        return operatorQueries.getOperator(this.userId, this.operatorNumber);
    }  
    getJob() {
        return jobQueries.getJob(this.userId, this.jobNumber);
    }
    isCheckoutDataValid(checkout) {
        let error = {};
            error.valid = true;

        if (this.toolQty < this.toolCheckoutQty) {
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
