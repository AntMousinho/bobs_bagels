const countItem = (SKU, itemList) => {
    let count = 0;
    itemList.forEach(item => {
        if(item.id === SKU) count ++;
    });
    return count;
}

const deals = {
    'BGLO': {
        discount(itemList) {
            let count = countItem('BGLO', itemList);
            return 0.45 * Math.floor(count / 6);
        }
    },
    'BGLP': {
        discount(itemList) {
            let count = countItem('BGLP', itemList);
            return 0.69 * Math.floor(count / 12);
        }
    },
    'BGLE': {
        discount(itemList) {
            let count = countItem('BGLE', itemList);
            return 0.45 * Math.floor(count / 6);
        }
    },
    'COF': {
        discount(itemList) {
            let leftoverPlainCount = countItem('BGLP', itemList) % 12;
            let leftoverCoffeeCount = countItem('COF', itemList) - countItem('CRON', itemList);
            if(leftoverCoffeeCount > 0) return 0.13 * Math.min(leftoverCoffeeCount, leftoverPlainCount);
            return 0;
        }
    },
    'CRON': {
        discount(itemList) {
            let cronutCount = countItem('CRON', itemList);
            let coffeeCount = countItem('COF', itemList);
            return 0.49 * Math.min(coffeeCount, cronutCount);
        }
    }
}

module.exports = deals;
