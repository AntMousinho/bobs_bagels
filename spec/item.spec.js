const Item = require('../src/item');

let item;

describe('Testing item getters', () => {
    it('get id returns item id', () => {
        item = new Item(1, 2.50);
        expect(item.id).toEqual(1);
    })

    it('get price returns item price', () => {
        item = new Item(1, 2.50);
        expect(item.price).toEqual(2.50);
    })
})
