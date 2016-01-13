'use strict';

import { Injectable } from 'angular2/core';
import { Munchkin }   from '../models/Munchkin.model';
import PouchDB        from 'pouchdb';

@Injectable()
export class MuchkinService {

  constructor() {
    this.db = new PouchDB('munchkins');
    this.munchkins = [];
  }

  async loadGame() {
    let items = await this.db.allDocs({
      include_docs: true
    });

    if (!items.rows) {
      this.munchkins = [];
      return [];
    }

    this.munchkins = items.row.map(
      row => new Munchkin(row)
    );

    return this.munchkins;
  }

  async newGame() {
    let result = await this.db.destroy();
    return result.ok && result.ok === true;
  }

  async addMunchkin(munchkin) {
    let result = await this.db.post(munchkin);
    if (!result.ok || result.ok === false) {
      throw 'Save error';
    }

    munchkin._id = resp.id;
    munchkin._rev = resp.rev;
  }

  async updateMunchkin(munchkin) {
    let result = await this.db.put(munchkin);
    if (!result.ok || result.ok === false) {
      throw 'Update error';
    }

    munchkin._rev = result.rev;
  }
}
