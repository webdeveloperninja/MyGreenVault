const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;
const weedQueries = require('../models/queries/product');
const operatorQueries = require('../models/queries/operator');
const jobQueries = require('../models/queries/job');

class WeedCheckout {
    
    constructor(request, response) {
        this.response = response;
        this.user = request.user;
        this.weed = request.body.weed;
        this.checkoutCost = request.body.cost;

        this.weedCheckoutQty = request.body.qty;
        this.operatorNumber = request.body.operatorNumber;
        this.jobNumber = request.body.jobNumber;
    }

    get checkout() {
        return {
            operatorNumber: this.operator.operatorNumber,
            operatorName: this.operator.operatorName,
            jobNumber: this.job.jobNumber,
            jobName: this.job.jobName,
            weedName: this.weed.name,
            weedId: this.weed._id,
            cost: this.checkoutCost,
            weedCheckoutQty: this.weedCheckoutQty
        }
    }
    // TODO update tool after checkout on get tool return 
    // get updatedToolAfterCheckout() {
    //     console.log(this.tool);
    //     let newToolQty = this.tool.qty - this.toolCheckoutQty;
    //     this.tool.qty = newToolQty;
    //     return this.tool;
    // }

    createUpdateToolAfterCheckout() {
        let QtyAfterCheckout = Number(this.weed.qty) - Number(this.weedCheckoutQty);
        this.updatedWeedAfterCheckout = Object.assign({}, this.weed, {
            qty: weedQtyAfterCheckout
        });
    }

    doCheckout() {
        return new Promise((resolve, reject) => { 
            Promise.all([
                this.getWeed(),
                this.getEmployee(),
                this.getJob()
            ]).then(values => {
                console.log(values[0]);
                console.log(values[0]);
                this.operator = values[1];
                this.job = values[2];

                // TODO: If not valid dont continue checkout
                // Return promise .then on validate checkout
                const checkoutValidation = this.validateCheckout();
                if (checkoutValidation.valid) {
                    this.createUpdateToolAfterCheckout();
                    this.createCheckout().then(data => {
                        console.log(data);
                        resolve(values);
                        console.log('success');
                    }).catch(err => {
                        console.log(err)
                    });
                }
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
    createCheckout() {
        return toolQueries.updateTool(this.user._id, this.updatedToolAfterCheckout).then(data => {
            return jobQueries.addCheckout(this.user._id, this.job._id, this.checkout);
        });
    }
    getOperator() {
        return operatorQueries.getOperator(this.user._id, this.operatorNumber);
    }  
    getJob() {
        return jobQueries.getJob(this.user._id, this.jobNumber);
    }
    validateCheckout() {
        let validationObj = {};
            validationObj.valid = true;

        if (this.tool.qty < this.toolCheckoutQty) {
            validationObj.toolQty = {
                status: 'danger',
                message: 'There is not enough tools'
            }
            validationObj.valid = false;
        }
        if (!this.operator) {
            validationObj.operatorNumber = {
                status: 'danger',
                message: 'Operator Not Found'
            }
            validationObj.valid = false;
        }
        if (!this.job) {
            validationObj.jobNumber = {
                status: 'danger',
                message: 'Job number not found'
            }
            validationObj.valid = false;
        }
        if (!validationObj.valid) {
            this.response.status(400);
            this.response.setHeader('Content-Type', 'application/json');
            this.response.send(JSON.stringify(validationObj));
        }
        return validationObj;
    }
}

module.exports = WeedCheckout;

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