'use strict';

import { Injectable } from 'angular2/core';
import { Munchkin }   from '../models/Munchkin.model';
import { Observable } from 'rxjs';

@Injectable()
export class MunchkinService {

  constructor() {
    this.db = new PouchDB('munchkins');

    this.datas = {
      munchkins: []
    };

    this.munchkins = null;
    this.munchkinsObserver = null;

    this.init();
  }

  init() {
    this.munchkins = Observable.create((observer) => {
      this.munchkinsObserver = observer;
    });
  }

  async loadGame() {
    try {
      var items = await this.db.allDocs({
        include_docs: true
      });
    } catch(err) {
      console.log(err);
    }

    if (!items.rows) {
      this.datas.munchkins = [];
    } else {
      this.datas.munchkins = items.rows.map(
        row => new Munchkin(row.doc)
      );
    }

    this.munchkinsObserver.next(this.datas.munchkins);
  }

  async newGame() {
    try {
      let items = await this.db.allDocs({
        include_docs: true
      });

      if (items.total_rows) {
        await Promise.all(items.rows.map(
          item => this.db.remove(item.doc)
        ));
      }

      this.datas.munchkins = [];
      this.munchkinsObserver.next(this.datas.munchkins);
    } catch(err) {
      console.log(err);
    }
  }

  async addMunchkin() {
    let munchkin = new Munchkin({
      name: 'munchkin'
    });

    console.log(munchkin);

    try {
      var result = await this.db.post(munchkin);
    } catch(err) {
      console.log(err);
      return this.munchkinsObserver.onError(err);
    }

    if (!result.ok || result.ok === false) {
      return this.munchkinsObserver.onError('add fail');
    }

    munchkin._id = result.id;
    munchkin._rev = result.rev;

    this.datas.munchkins.push(munchkin);
    this.munchkinsObserver.next(this.datas.munchkins);
  }

  async updateMunchkin(munchkin) {
    let result = await this.db.put(munchkin);
    if (!result.ok || result.ok === false) {
      return this.munchkinsObserver.onError('update fail');
    }

    munchkin._rev = result.rev;

    this.datas.munchkins.forEach((data, i) => {
      if (data._id === munchkin._id) {
        this.datas.munchkins[i] = munchkin;
      }
    });

    this.munchkinsObserver.next(this.datas.munchkins);
  }
}
