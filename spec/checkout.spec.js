const Basket = require('../src/basket');
const Checkout = require('../src/checkout');
const Item = require('../src/item');
const bobsMenu = require('../src/bobsMenu');

let userBasket, item1, item2, item3, item4, item5, item6, item7, item8, checkout;

describe('Testing checkout class total', () => {
    it('basket.total sums the price of items', () => {
        userBasket = new Basket(3);
        item1 = new Item(1, 3.00);
        item2 = new Item(2, 2.00);
        item3 = new Item(3, 4.00);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        userBasket.addItem(item3);
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(9.00);
    })
})


describe('Checking deals and changing them for summary', () => {
    it('Checking countItem function', () => {
        userBasket = new Basket(10);
        for(let i = 0; i < 5; i++) {
            userBasket.addItem(new Item('BGLO', 0.49));
        }
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.countItem('BGLO')).toEqual(5);
    })
    
    it('Adding 1 deal, checking that total is correct', () => {
        userBasket = new Basket(10);
        for(let i = 0; i < 6; i++) {
            userBasket.addItem(new Item('BGLO', 0.49));
        }
        item1 = new Item('BGLP', 0.39);
        userBasket.addItem(item1);
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(2.88)
    })
    
    it('Adding a deal and same bagel type, checking that total is correct (i.e 9 onion bagels)', () => {
        userBasket = new Basket(10);
        for(let i = 0; i < 9; i++) {
            userBasket.addItem(new Item('BGLO', 0.49));
        }
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(3.96)
    })

    it('Example order 1', () => {
        userBasket = new Basket(25);
        for(let i = 0; i < 2; i++){
            userBasket.addItem(new Item('BGLO', 0.49));
        }
        for(let i = 0; i < 12; i++){
            userBasket.addItem(new Item('BGLP', 0.39));
        }
        for(let i = 0; i < 6; i++){
            userBasket.addItem(new Item('BGLE', 0.49));
        }
        for(let i = 0; i < 3; i++){
            userBasket.addItem(new Item('COF', 0.99));
        }
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(10.43);
    })

    it('Example order 2', () => {
        userBasket = new Basket(16);
        for (let i = 0; i < 16; i ++) {
            userBasket.addItem(new Item('BGLP', 0.39));
        }

        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(5.55);
    })

    it('Adding 6 onion bagels and recognising a deal', () => {
        userBasket = new Basket(6);
        for(let i = 0; i < 6; i++) {
            userBasket.addItem(new Item('BGLO', 0.49));
        }
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(2.49);
    })

    it('Adding 8 onion bagels and recognising a deal', () => {
        userBasket = new Basket(100);
        for(let i = 0; i< 8; i++){
            userBasket.addItem(new Item('BGLO', 0.49));
        }
        checkout = new Checkout(userBasket, bobsMenu);
        expect(checkout.total()).toEqual(3.47);
    })
})
