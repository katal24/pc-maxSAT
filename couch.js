function(keys, values, rereduce) {
    if (rereduce) {
        var results = {};
        var data = createCompleteTourObject(values);

        var buckets = data.bucket;

        data.bill.forEach(function(bill) {

            if (bill.currency != "PLN") {
                var costs = [];
                costs = getMoneyFromBuckets(bill, buckets, costs);

                bill.users.forEach(function(user) {
                    var userBalance = calculateUserBalance(user);
                    var userBalancePLN = 0;

                    costs.forEach(function(cost, id) {
                        userBalancePLN += (cost / bill.sum) * userBalance * buckets[id].exchange;
                    });
                    saveResults(results, user.name, userBalancePLN);
                });

            } else {
                bill.users.forEach(function(user) {
                    var userBalancePLN = calculateUserBalance(user);
                    saveResults(results, user.name, userBalancePLN);
                });
            }
        });

        return results;

    } else {
        var results = [];

        values.forEach(function(bill) {

            if (bill.participationType && bill.participationType != "simple") {
                bill = countAbsoluteValuesOfPayments(bill);
            }

            results.push(bill);
        });

        return results;
    }


    // FUNCTIONS

    // Tworzy komplenty objekt wyjazdu: dane wyjazdu, informacje o kubełkach i rachunki
    function createCompleteTourObject(values) {
        var data = { 'bill': [], 'bucket': [], 'tour': [] };
        values.forEach(function(res) {
            res.forEach(function(doc) {
                data[doc.type].push(doc);
            });
        });
        return data;
    }

    // Sprowadza każdy rachunek do typu 'simple', czyli wylicza ile zapłacił każdy z uczestników
    function countAbsoluteValuesOfPayments(bill) {
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

        return bill;
    }

    // Oblicza ile pieniędzy zostało wzięte z każdego kubełka
    function getMoneyFromBuckets(bill, buckets, costs) {
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
        return costs;
    }

    // Oblicza różnicę zapłata - należność, czyli bilans użytkownika dla danego rachunku
    function calculateUserBalance(user) {
        var payment = 0;
        var usage = 0;
        var balance = 0;

        user.actions.forEach(function(action) {
            if (action.type == "usage") {
                usage += parseFloat(action.amount);
            } else {
                payment += parseFloat(action.amount);
            }
        });

        balance = payment - usage;
        return balance;
    }

    // Zapisuje bilans użytkownika w wynikowym obiekcie
    function saveResults(results, username, value) {
        if (results[username]) {
            results[username] += parseFloat(value.toFixed(2));
        } else {
            results[username] = parseFloat(value.toFixed(2));
        }
    }
}