class Basket {
    constructor(capacity = 2) {
        this._items = [];
        this._capacity = capacity;
    }

    get capacity() {
        return this._capacity;
    }

    get items() {
        return this._items;
    }

    isFull() {
        return this._items.length >= this._capacity;
    }

    addItem(item) {
        if(this.isFull()) return "Cannot add item, basket is full";
        if(this._items.includes(item)) return "Cannot add item that is already in the basket";
        this._items.push(item);
        return this._items;
    }

    removeItem(item) {
        if(!this._items.includes(item)) return "Cannot remove an item that is not in the basket";
        this._items.splice(this._items.indexOf(item), 1);
        return this._items;
    }
}

module.exports = Basket;