// Класс Household
// Описывает объект домашнего хозяйства.
// Содержит список объектов PowerPlant, к которым он подключен, список связанных с ним домашних хозяйств, и флаг, который определяет,
// имеет ли это домашнее хозяйство электричество.
// Метод updateElectricity используется для обновления состояния флага, основываясь на состоянии всех подключенных электростанций 
// и домашних хозяйств.
// Методы addConnectedHousehold и removeConnectedHousehold используются для установления и разрыва связи между домашними хозяйствами.

export class Household {
    constructor() {
      this.powerPlants = new Set();
      this.connectedHouseholds = new Set();
      this.hasElectricity = false;
    }
  
    addPowerPlant(powerPlant) {
      this.powerPlants.add(powerPlant);
      powerPlant.addHousehold(this);
    }
  
    removePowerPlant(powerPlant) {
      this.powerPlants.delete(powerPlant);
      powerPlant.removeHousehold(this);
      this.connectedHouseholds.forEach(household => household.removeConnectedHousehold(this));
      this.updateElectricity();
    }
  
    addConnectedHousehold(household) {
      this.connectedHouseholds.add(household);
      household.connectedHouseholds.add(this);
    }
  
    removeConnectedHousehold(household) {
      this.connectedHouseholds.delete(household);
      household.connectedHouseholds.delete(this);
    }
  
    updateElectricity() {
      const hasElectricityBefore = this.hasElectricity;
      const visited = new Set(); // множество уже посещенных узлов
      const queue = [this]; // очередь
      let foundPowerPlant = false;
    
      while (queue.length > 0 && !foundPowerPlant) {
        const currentHousehold = queue.shift();
        visited.add(currentHousehold);
    
        // Проверяем, есть ли в текущем доме работающая электростанция
        if (Array.from(currentHousehold.powerPlants).some(powerPlant => powerPlant.alive)) {
          foundPowerPlant = true;
          break;
        }
    
        // Добавляем в очередь соседние дома, которые еще не посещали
        Array.from(currentHousehold.connectedHouseholds).forEach(household => {
          if (!visited.has(household)) {
            queue.push(household);
          }
        });
      }
    
      // Устанавливаем свойство hasElectricity в зависимости от найденной электростанции
      this.hasElectricity = foundPowerPlant;
    
      // Если свойство hasElectricity изменилось, обновляем все связанные дома
      if (this.hasElectricity !== hasElectricityBefore) {
        Array.from(this.connectedHouseholds).forEach(household => household.updateElectricity());
      }
    }
  }