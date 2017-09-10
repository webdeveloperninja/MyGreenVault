const User = require('../../models/User');

exports.getOperator = (userId, operatorNumber) => {
    return new Promise((resolve, reject) => {
        User.findOne({ '_id': userId }, (err, user) => {
            if (err) return handleError(err);
            for (var i=0; i< user.operators.length; i++) {
                const actualOperatorNumber = user.operators[i].operatorNumber;
                const operatorNumberToCompare = operatorNumber;
                if (actualOperatorNumber === operatorNumberToCompare) {
                    resolve(user.operators[i]);
                    return;
                }
            }
            resolve(null);
        });
    }) 
}

