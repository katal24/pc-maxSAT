function(doc) {
    if (doc._id == "12371a24e48d3a53e3abd7f842024ff3") {
        doc.description = "o nie!";
        var buckets = doc.buckets;
        doc.bills.forEach(function(bill) {

            if (bill.participationType != "simple") {

                var sumPayment = 0;
                var userNumber = 0;
                bill.users.forEach(function(user) {
                    user.actions.forEach(function(action) {
                        if (action.type == "payment") {
                            sumPayment += parseFloat(action.amount);
                        }
                    });
                    if (user.participatesEqually) {
                        userNumber++;
                    }
                });

                var diffPayment = bill.sum - sumPayment;
                var onePaymentToAdd = (diffPayment / userNumber).toFixed(2);

                var paymentAction = { "type": "payment", "amount": onePaymentToAdd };
                var usageAction = { "type": "usage", "amount": onePaymentToAdd };

                bill.users.forEach(function(user) {
                    if (user.participatesEqually) {

                        user.actions.push(paymentAction);
                        user.actions.push(usageAction);
                        // user.actions.forEach(function(action){
                        //   if(toAdd && action.type == "payment") {
                        //     action.amount = parseFloat(action.amount) + onePaymentToAdd;
                        //     toAdd = false;
                        //   }
                        // });
                    }
                });
            }



            if (bill.currency != "PLN") {
                var costs = [];
                var i = 0;
                var sum = bill.sum;
                // emit(bill.name, bill.currency);
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

                // emit(bill.name, costs);
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

                    emit(user.name, parseFloat(userDifference.toFixed(2))); // więcej kubełków
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
                    emit(user.name, parseFloat((payment - usage).toFixed(2)));
                });
            }

        });
    }
}