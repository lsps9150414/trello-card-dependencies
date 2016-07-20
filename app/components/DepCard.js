import joint from 'jointjs';

export const DepCard = joint.shapes.basic.Generic.extend({
  markup:
  '<g class="scalable">' +
    '<rect/>' +
      '<foreignObject>' +
        '<div xmlns="http://www.w3.org/1999/xhtml">Trello Card</div>' +
      '</foreignObject>' +
  '</g>',

  defaults: joint.util.deepSupplement({
    type: 'basic.Rect',
    attrs: {
      rect: { fill: 'white', stroke: 'black', 'follow-scale': true, width: 80, height: 40 },
      foreignObject: { width: 80, height: 40 }
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
});
