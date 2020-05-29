class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {

      let {sellIn, name, quality} = this.items[i];

      let {newQuality, newSellIn } = this.updateQualityItem({
        sellIn,
        name,
        quality
      });

      this.items[i].quality = newQuality;
      this.items[i].sellIn = newSellIn;
    }

    return this.items;
  }

  updateQualityItem({
    sellIn,
    name,
    quality
  }) {
    let newQuality;

    switch (name) {
      case 'Aged Brie':
        newQuality = this.increaseQuality({quality});
        break;

      case 'Conjured':
        newQuality = quality <=0 ? 0 : quality - 2;
        break;

      case 'Sulfuras, Hand of Ragnaros':
        newQuality = quality;
        break;

      case 'Backstage passes to a TAFKAL80ETC concert':
        switch (true) {
          case ( sellIn <= 10): newQuality = this.increaseQuality({quality, add:2}); break;
          case ( sellIn <= 5): newQuality = this.increaseQuality({quality, add:3}); break;
          case ( sellIn <= 0): newQuality = 0; break;
          default : newQuality = this.increaseQuality({quality})
        }
        break;

      default:
        newQuality = this.decreaseQuality({quality, sellIn})
    }

    return {
      newSellIn:--sellIn,
      newQuality
    }
  }

  decreaseQuality ({quality, sellIn}={}) {
    return quality === 0 ? 0 : sellIn < 0 ? quality - 2 : quality - 1;

  }

  increaseQuality ({quality, add = 1} ={}) {
   return quality >=50 ? 50 : quality + add
  }
}

module.exports = {
  Item,
  Shop
};
