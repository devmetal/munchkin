'use strict';

export class Munchkin {
  name;
  level;
  gear;
  isWarior;
  _id;
  _rev;
  bonus;

  constructor(datas) {
    this.name = datas.name || "";
    this.level = datas.level || 0;
    this.gear = datas.gear || 0;
    this.isWarior = datas.isWarior || false;
    this._id = datas._id || datas.id || "";
    this._rev = datas._rev ||  datas.rev || "";
    this.helper = null;
    this.bonus = null;
  }

  setHelper(m) {
    this.helper = m;
  }
}
