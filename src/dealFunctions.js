const deals = {
    "BGLO": {
        discount(itemList, countFunction) {
            let count = countFunction("BGLO", itemList);
            return 0.45 * Math.floor(count / 6);
        }
    },
    "BGLP": {
        discount(itemList, countFunction) {
            let count = countFunction("BGLP", itemList);
            return 0.69 * Math.floor(count / 12);
        }
    },
    "BGLE": {
        discount(itemList, countFunction) {
            let count = countFunction("BGLE", itemList);
            return 0.45 * Math.floor(count / 6);
        }
    },
    "COF": {
        discount(itemList, countFunction) {
            let leftoverPlainCount = countFunction("BGLP", itemList) % 12;
            let leftoverCoffeeCount = countFunction("COF", itemList) - countFunction("CRON", itemList);
            if(leftoverCoffeeCount > 0) return 0.13 * Math.min(leftoverCoffeeCount, leftoverPlainCount);
            return 0;
        }
    },
    "CRON": {
        discount(itemList, countFunction) {
            let cronutCount = countFunction("CRON", itemList);
            let coffeeCount = countFunction("COF", itemList);
            return 0.49 * Math.min(coffeeCount, cronutCount);
        }
    }
};

module.exports = deals;
