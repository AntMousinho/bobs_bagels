const Basket = require('../src/basket');
const Calculator = require('../src/calculator');
const Item = require('../src/item');
const deals = require('../src/dealFunctions')

let userBasket, calculator;

describe('Testing calculator basic function: ', () => {
    beforeEach(() => {
        userBasket = new Basket(30);
        calculator = new Calculator();
    })

    it('countItems()', () => {
        for(let i = 0; i < 5; i++) {
            userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.49));
        }

        expect(calculator.countItem('BGLO', userBasket.items)).toEqual(5);
    })

    it('countItems() where there are multiple items in basket', () => {
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

        expect(calculator.countItem('BGLE', userBasket.items)).toEqual(6);
    })
})

describe('Testing Calculator class total', () => {
    it('basket.total sums the price of items', () => {
        userBasket = new Basket(10);
        for(let i = 0; i < 5; i++) {
            userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.49));
        }
        calculator = new Calculator();
        expect(calculator.total(userBasket, deals)).toEqual(2.45);
    })
})


describe('Checking deals and changing them for summary: ', () => {
    beforeEach(() => {
        userBasket = new Basket(30);
        calculator = new Calculator();
    })

    it('Adding 6 onion bagels and recognising a deal', () => {
        for(let i = 0; i < 6; i++) {
            userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.49));
        }

        expect(calculator.total(userBasket, deals)).toEqual(2.49);
    })

    it('Adding 8 onion bagels and recognising a deal', () => {
        for(let i = 0; i< 8; i++){
            userBasket.addItem(new Item('BGLO', 'Bagel', 'Onion', 0.49));
        }

        expect(calculator.total(userBasket, deals)).toEqual(3.47);
    })

    it('Adding 1 plain bagel and 1 cofee implements the deal', () => {
        userBasket.addItem(new Item('COF', 'Coffee', '', 0.99));
        userBasket.addItem(new Item('BGLP', 'Bagel', 'Plain', 0.39));

        expect(calculator.total(userBasket, deals)).toEqual(1.25);
    })

    it('Adding 13 plain bagels and 2 coffees, implements 12 bagel deal, and 1 coffee deal', () => {
        for(let i = 0; i < 13; i++) {
            userBasket.addItem(new Item('BGLP', 'Bagel', 'Plain', 0.39));
        }
        for(let i = 0; i < 2; i++) {
            userBasket.addItem(new Item('COF', 'Coffee', '', 0.99));
        }
        
        expect(calculator.total(userBasket, deals)).toEqual(6.23);
    })

    it('Example order 1', () => {
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

        expect(calculator.total(userBasket, deals)).toEqual(10.43);
    })

    it('Example order 2', () => {
        for (let i = 0; i < 16; i ++) {
            userBasket.addItem(new Item('BGLP', 'Bagel', 'Plain', 0.39));
        }

        expect(calculator.total(userBasket, deals)).toEqual(5.55);
    })
})


describe('Testing cronut functionality: ', () => {
    beforeEach(() => {
        userBasket = new Basket(30)
        calculator = new Calculator()
    })

    it('returning total price of basket only filled with cronuts', () => {
        for(let i = 0; i < 3; i++) {
            userBasket.addItem(new Item('CRON', 'Cronut', '', 3.49));
        }

        expect(calculator.total(userBasket, deals)).toEqual(10.47)
    })
    
    it('returning correct price for 1 cronut and coffee deal', () => {
        userBasket.addItem(new Item('CRON', 'Cronut', '', 3.49));
        userBasket.addItem(new Item('COF', 'Coffee', '', 0.99));
        
        expect(calculator.total(userBasket, deals)).toEqual(3.99);
    })

    it('returning correct price, cronut deal takes priority over plain bagel and coffee deal', () => {
        for(let i = 0; i < 2; i++) {
            userBasket.addItem(new Item('CRON', 'Cronut', '', 3.49));
        }
        for(let i = 0; i < 5; i++) {
            userBasket.addItem(new Item('BGLP', 'Bagel', 'Plain', 0.39));
        }
        for(let i = 0; i < 3; i++) {
            userBasket.addItem(new Item('COF', 'Coffee', '', 0.99));
        }

        expect(calculator.total(userBasket, deals)).toEqual(10.79);
    })
})