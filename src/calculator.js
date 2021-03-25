const { ConsoleReporter } = require("jasmine");

class Calculator {
    total(basket, deals) {
        let result = basket.items.map(item => item.price).reduce((a, b) => a + b);
        result -= this.calculateTotalDiscount(basket.items, deals);
        return parseFloat(result.toFixed(2));
    }
    
    calculateTotalDiscount(itemArray, deals) {
        return this.uniqueItemSKUs(itemArray).map(SKU => {
            return this.individualItemDiscount(SKU, itemArray, deals);
        }).reduce((a, b) => a + b);
    }

    individualItemDiscount(SKU, itemArray, deals) {
        return deals[SKU].discount(itemArray, this.countItem);
    }

    uniqueItemSKUs(itemArray) {
        let SKUArray = []
        itemArray.forEach(item => {
            if(!SKUArray.includes(item.id)) SKUArray.push(item.id);
        })
        return SKUArray
    }

    countItem(SKU, itemArray) {
        let counter = 0
        itemArray.forEach(item => {
            if(item.id === SKU) counter ++;
        })
        return counter;
    }
}

module.exports = Calculator;
