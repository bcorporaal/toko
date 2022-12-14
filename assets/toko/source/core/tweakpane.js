import Toko from './main';

//
//  additions to TweakPane
//

//
// create a list that is convenient to use by Tweakpane
//
Toko.prototype.formatForTweakpane = function (inList, propertyName) {
  let o = {};

  if (typeof propertyName == 'string') {
    inList.forEach(function (m) {
      o[m[propertyName]] = m[propertyName];
    });
  } else {
    inList.forEach(function (m) {
      o[m] = m;
    });
  }

  return o;
}

//
//  add next, previous and random buttons to the pane to navigate a specific list
//
Toko.prototype.addPaneNavButtons = function (pane, pObject, pName, paletteList) {
  pane.addBlade({
    view: 'buttongrid',
    size: [3, 1],
    cells: (x, y) => ({
      title: [
        ['← prev', 'rnd', 'next →'],
      ][y][x],
    }),
    label: ' ',
  }).on('click', (ev) => {
    switch (ev.index[0]) {
      case 0:
        pObject[pName] = this.findPreviousInList(pObject[pName],paletteList);
        break;
      case 1:
        pObject[pName] = this.findRandomInList(pObject[pName],paletteList);
        break;
      case 2:
        pObject[pName] = this.findNextInList(pObject[pName],paletteList);
        break;
      default:
        console.log('a non-existing button was pressed:',ev.index[0]);
        break;
    }
    this.basePane.refresh()
  });
}

//
//  find the next item in a list formatted for TweakPane
//
Toko.prototype.findNextInList = function (item, list) {
  let keys = Object.keys(list);
  let i = keys.indexOf(item);
  let n;
  if (i < keys.length-1) {
    n = i + 1;
  } else {
    n = 0;
  }
  let newItem = keys[n];
  return list[newItem];
}

//
//  find the previous item in a list formatted for TweakPane
//
Toko.prototype.findPreviousInList = function (item, list) {
  let keys = Object.keys(list);
  let i = keys.indexOf(item);
  let n;
  if (i > 0) {
    n = i - 1;
  } else {
    n = keys.length - 1;
  }
  let newItem = keys[n];
  return list[newItem];
}

//
//  select a random item in a list formatted for TweakPane
//
Toko.prototype.findRandomInList = function (item, list) {
  let keys = Object.keys(list);
  let newItem;
  do {
    newItem = random(keys);
  } while (newItem == item);
  return list[newItem];
}