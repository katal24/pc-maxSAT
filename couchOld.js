function(keys, values, rereduce) {
    if (rereduce) {
        var results = {};
        var data = createDataObject(values);

        var buckets = data.bucket;
        data.bill.forEach(function(bill) {
            if (bill.currency != "PLN") {
                var costs = [];
                var i = 0;
                var sum = bill.sum;
                while (sum > 0) {
                    if (bill.currency == buckets[i].currency) {
                        if (buckets[i].value >= sum) {
                            buckets[i].value -= sum;
                            costs[i] = sum;
                            sum = 0;
                        } else {
                            sum -= buckets[i].value;
                            costs[i] = buckets[i].value;
                            buckets[i].value = 0;
                            i++;
                        }
                    } else {
                        costs[i] = 0;
                        i++;
                    }
                }

                bill.users.forEach(function(user) {
                    var payment = 0;
                    var usage = 0;

                    user.actions.forEach(function(action) {
                        if (action.type == "usage") {
                            usage += parseFloat(action.amount);
                        } else {
                            payment += parseFloat(action.amount);
                        }
                    });

                    var difference = payment - usage;
                    var userDifference = 0;

                    costs.forEach(function(cost, id) {
                        userDifference += (cost / bill.sum) * difference * buckets[id].exchange;
                    });

                    if (results[user.name]) {
                        results[user.name] += parseFloat(userDifference.toFixed(2));
                    } else {
                        results[user.name] = parseFloat(userDifference.toFixed(2));
                    }

                });

            } else {
                bill.users.forEach(function(user) {
                    var payment = 0;
                    var usage = 0;
                    user.actions.forEach(function(action) {
                        if (action.type == "usage") {
                            usage += parseFloat(action.amount);
                        } else {
                            payment += parseFloat(action.amount);
                        }
                    });
                    if (results[user.name]) {
                        results[user.name] += parseFloat((payment - usage).toFixed(2));
                    } else {
                        results[user.name] = parseFloat((payment - usage).toFixed(2));
                    }
                });
            }
        })
        return results;
    } else {
        var results = [];
        values.forEach(function(bill) {
            if (bill.participationType) {
                if (bill.participationType != "simple") {
                    var sumPayment = 0;
                    var userNumber = 0;
                    bill.users.forEach(function(user) {
                        user.actions.forEach(function(action) {
                            if (action.type == "payment") {
                                sumPayment += parseFloat(action.amount);
                            }
                        });
                        if (user.participatesEqually == "true") {
                            userNumber++;
                        }
                    });
                    var diffPayment = bill.sum - sumPayment;
                    var onePaymentToAdd = parseFloat((diffPayment / userNumber).toFixed(2));

                    var paymentAction = { "type": "payment", "amount": onePaymentToAdd };
                    var usageAction = { "type": "usage", "amount": onePaymentToAdd };

                    bill.users.forEach(function(user) {
                        if (user.participatesEqually == "true") {
                            user.actions[user.actions.length] = usageAction;
                            user.actions[user.actions.length] = paymentAction;
                        }
                    });
                }

            }
            results.push(bill);
        })
        return results;
    }


    // FUNCTIONS
    function createDataObject(values) {
        var data = { 'bill': [], 'bucket': [], 'tour': [] };
        values.forEach(function(res) {
            res.forEach(function(doc) {
                data[doc.type].push(doc);
            });
        });
        return data;
    }
}