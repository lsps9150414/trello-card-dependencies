import joint from 'jointjs';

export const DepCard = joint.shapes.basic.Generic.extend({
  markup:
  '<g class="scalable">' +
    '<rect/><text/>' +
      '<foreignObject>' +
        '<div xmlns="http://www.w3.org/1999/xhtml"></div>' +
      '</foreignObject>' +
  '</g>',

  defaults: joint.util.deepSupplement({
    type: 'basic.Rect',
    attrs: {
      rect: { fill: 'red', stroke: 'black', 'follow-scale': true, width: 80, height: 40 },
      foreignObject: { width: 80, height: 40, style: { 'background-color': 'white' } },
      div: { style: { 'background-color': 'green' } },
      text: { text: 'tessttt' },
    }
  }, joint.shapes.basic.Generic.prototype.defaults)
});
