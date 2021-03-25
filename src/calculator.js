class Calculator {
    constructor(basket, deals) {
        this._basket = basket;
        this._deals = deals
    }

    items() {
        return this._basket.items;
    }

    total() {
        let result = this.items().map(item => item.price).reduce((a, b) => a + b);
        result -= this.calculateTotalDiscount();
        return parseFloat(result.toFixed(2));
    }
    
    calculateTotalDiscount() {
        return this.uniqueItemSKUs().map(SKU => {
            return this.individualItemDiscount(SKU);
        }).reduce((a, b) => a + b);
    }

    individualItemDiscount(SKU) {
        return this._deals[SKU].discount(this.items());
    }

    uniqueItemSKUs() {
        let SKUArray = []
        this._basket.items.forEach(item => {
            if(!SKUArray.includes(item.id)) SKUArray.push(item.id);
        })
        return SKUArray
    }
}

module.exports = Calculator;