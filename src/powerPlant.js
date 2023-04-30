// Класс PowerPlant
// Описывает объект электростанции.
// Содержит список объектов Household, которые подключены к нему, и флаг, который определяет, работает ли эта электростанция.

export class PowerPlant {
    constructor() {
      this.alive = true;
      this.households = new Set();
    }
  
    addHousehold(household) {
      this.households.add(household);
    }
  
    removeHousehold(household) {
      this.households.delete(household);
    }
  
    kill() {
      this.alive = false;
    }
  
    repair() {
      this.alive = true;
    }
  }