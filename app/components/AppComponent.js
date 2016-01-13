'use strict';

import {
  Component
} from 'angular2/core';

import {
  remote
} from 'electron';

import {
  Observable
} from 'rxjs';

const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

@Component({
  selector: 'app',
  template:`
    <h1>Hello {{stranger}}</h1>
    <p>You clicked on {{item}}</p>
  `
})
export default class {
  constructor() {
    this.stranger = 'electron';
    this.item = 'nothing';
  }

  ngOnInit() {

    

    var template = [
      {
        label: 'Game',
        submenu: [
          {
            label: 'New game',
            click: () => {
              console.log('new game');
              self.item = 'new game';
              console.log(self.item);
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'New Player',
            click: () => {
              console.log('new player');
              self.item = 'new player';
            }
          },
          {
            type: 'separator'
          },
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:'
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Command+R',
            click: function() { remote.getCurrentWindow().reload(); }
          },
          {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function() { remote.getCurrentWindow().toggleDevTools(); }
          },
        ]
      },
      {
        label: 'Window',
        submenu: [
          {
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
          },
          {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
          }
        ]
      },
      {
        label: 'Help',
        submenu: []
      }
    ];

    let menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
  }
}
