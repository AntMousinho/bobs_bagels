class Checkout {
    constructor(basket, menu) {
        this._basket = basket;
        this._menu = menu;
    }

    total() {
        let result = this._basket.items.map(item => item.price).reduce((a, b) => a + b);
        result -= this.totalDiscount();
        return Math.round(result * 100) / 100;
    }

    countItem(SKU) {
        let count = 0;
        this._basket.items.forEach(item => {
            if(item.id === SKU) count ++;
        });
        return count;
    }

    totalDiscount() {
        return this.onionDiscount() + this.plainDiscount() + this.everythingDiscount() + this.coffeeDiscount()[0];
    }

    onionDiscount() {
        let discount = 0
        let count = this.countItem('BGLO');
        if(count >= 6) {
            discount += 0.45 * Math.floor(count / 6);
        }
        return discount;
    }

    plainDiscount() {
        let discount = 0
        let count = this.countItem('BGLP');
        if(count >= 6) {
            discount += 0.69 * Math.floor(count / 12);
        }
        return discount;
    }

    everythingDiscount() {
        let discount = 0
        let count = this.countItem('BGLE');
        if(count >= 6) {
            discount += 0.45 * Math.floor(count / 6);
        }
        return discount;
    }

    coffeeDiscount() {
        let discount = 0;
        let leftoverPlainCount = this.countItem('BGLP') % 12;
        let coffeeCount = this.countItem('COF');
        if(leftoverPlainCount > 0 && coffeeCount > 0) {
            discount += 0.13 * Math.min(leftoverPlainCount, coffeeCount);
        }
        return [discount, Math.min(leftoverPlainCount, coffeeCount)];
    }



}

module.exports = Checkout;