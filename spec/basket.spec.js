const Basket = require('../src/basket');
const Item = require('../src/item');

let userBasket, item1, item2, item3;

describe('Adding an item to the basket', () => {
    it('An item has been added to basket', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        
        expect(userBasket.addItem(item1).length).toEqual(1);
    })

    it('The exact item was added to basket', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        userBasket.addItem(item1);
        expect(userBasket.addItem(item2)[1]).toEqual(item2);
    })

    it('cannot add item when isFull is true', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        item2 = new Item(2, 'a', 'n', 2.00);
        item3 = new Item(3, 'a', 'n', 4.00);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        expect(userBasket.addItem(item3)).toEqual(`Cannot add item, basket is full`);
    })

    it(`cannot add an item is it is already in the basket`, () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        userBasket.addItem(item1);
        expect(userBasket.addItem(item1)).toEqual(`Cannot add item that is already in the basket`);
    })
})

describe(`Removing an item from the basket`, () => {
    it('successfully removes an item from array', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        item2 = new Item(2, 'a', 'n', 2.00);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        
        expect(userBasket.removeItem(item2).length).toEqual(1);
    })

    it('check to see if it removes the exact item from the array', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        item2 = new Item(2, 'a', 'n', 2.00);
        userBasket.addItem(item1);
        userBasket.addItem(item2);

        expect(userBasket.removeItem(item1).includes(item1)).toEqual(false);
    })

    it('cannot remove an item if it is not in the basket', () => {
        userBasket = new Basket();
        expect(userBasket.removeItem(item1)).toEqual(`Cannot remove an item that is not in the basket`);
    })
})

describe('Basket capacity and isFull tests', () => {
    it('get capacity returns the capacity that is set', () => {
        userBasket = new Basket(4);
        expect(userBasket.capacity).toEqual(4);
    })

    it('isFull returns false then items.length < capacity', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        userBasket.addItem(item1);
        expect(userBasket.isFull()).toEqual(false);
    })

    it('isFull returns true when items.length = capacity', () => {
        userBasket = new Basket();
        item1 = new Item(1, 'a', 'n', 3.00);
        item2 = new Item(2, 'a', 'n', 2.00);
        userBasket.addItem(item1);
        userBasket.addItem(item2);
        expect(userBasket.isFull()).toEqual(true);
    })
})