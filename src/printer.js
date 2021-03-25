const Item = require('./item');
const Basket = require('./basket');
const Checkout = require('./checkout');

class Printer {
    constructor(checkout) {
        this._checkout = checkout;
    }

    items() {
        return this._checkout.items();
    }

    countItem(item) {
        return this._checkout.countItem(item);
    }

    itemObject() {
        let itemObject = {};
        this.items().forEach(item => {
            itemObject[item.id] = {
                name: item.name,
                variant: item.variant,
                price: item.price
            }
        })
        return itemObject;
    }

    printReceipt() {
        const date = new Date(Date.now());
        let output = `\t~~~ Bob's Bagels ~~~`
        output += `\n\n\t${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, 0)}-${(date.getDate() + 1).toString().padStart(2, 0)} ${(date.getHours() + 1).toString().padStart(2, 0)}:${(date.getMinutes() + 1).toString().padStart(2, 0)}:${(date.getSeconds() + 1).toString().padStart(2, 0)}`;
        output += `\n\n----------------------------\n`;
        for(let [key, value] of Object.entries(this.itemObject())) {
            output += `\n${value.variant} ${value.name}\t${this.countItem(key)}\t${(this.countItem(key) * value.price).toFixed(2)}`;
        }
        output += `\n\n----------------------------`;
        output += `\nTotal        ${this._checkout.total()}`
        output += `\n     thank you        \n   for your order!         `
        return output;
    }
}

let userBasket = new Basket(25);
for(let i = 0; i < 2; i++){
    userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.49));
}
for(let i = 0; i < 12; i++){
    userBasket.addItem(new Item('BGLP', 'Bagel', 'Plain', 0.39));
}
for(let i = 0; i < 6; i++){
    userBasket.addItem(new Item('BGLE', 'Bagel', 'Everything', 0.49));
}
for(let i = 0; i < 3; i++){
    userBasket.addItem(new Item('COF', 'Coffee', '', 0.99));
}
let testCheckout = new Checkout(userBasket);

let testPrinter = new Printer(testCheckout);
console.log(testPrinter.itemObject());
// console.log(testPrinter.itemObject()['BGLO'].price)
console.log(testPrinter.printReceipt());