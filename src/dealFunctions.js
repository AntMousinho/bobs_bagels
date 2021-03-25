const deals = {
    'BGLO': {
        discount(count) {
            return 0.45 * Math.floor(count / 6);
        }
    },
    'BGLP': {
        discount(count) {
            return 0.69 * Math.floor(count / 12);        
        }
    },
    'BGLE': {
        discount(count) {
            return 0.45 * Math.floor(count / 6);
        }
    },
    'COF': {
        discount(leftoverPlaincount, coffeeCount) {
            return 0.13 * Math.min(leftoverPlainCount, coffeeCount);
        }
    }
}

module.exports = deals;
