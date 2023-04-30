// ----------
// Этот код описывает модель энергетической системы, которая состоит из объектов PowerPlant и Household,
// а также класса World, который объединяет эти объекты и определяет методы для их взаимодействия.
// ----------
// Класс World
// Определяет глобальное состояние системы, включая все существующие объекты PowerPlant и Household.
// Содержит методы для создания новых объектов PowerPlant и Household, соединения и разъединения этих объектов и для их управления.
// Методы connectHouseholdToPowerPlant и disconnectHouseholdFromPowerPlant используются для соединения и разъединения
// домашних хозяйств и электростанций.
// Методы killPowerPlant и repairPowerPlant используются для управления состоянием электростанций.
// ----------

import { PowerPlant } from "./powerPlant.js";
import { Household } from "./household.js";

export class World {
  constructor() {
    this.powerPlants = new Set();
    this.households = new Set();
  }

  createPowerPlant() {
    const powerPlant = new PowerPlant();
    this.powerPlants.add(powerPlant);
    return powerPlant;
  }

  createHousehold() {
    const household = new Household();
    this.households.add(household);
    return household;
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    household.addPowerPlant(powerPlant);
    powerPlant.addHousehold(household);
    household.updateElectricity();
  }  

  connectHouseholdToHousehold(household1, household2) {
    household1.addConnectedHousehold(household2);
    household1.updateElectricity();
    household2.updateElectricity();
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    household.removePowerPlant(powerPlant);
    household.updateElectricity();
  }

  killPowerPlant(powerPlant) {
    powerPlant.kill();
    Array.from(powerPlant.households).forEach(household => household.updateElectricity());
  }

  repairPowerPlant(powerPlant) {
    powerPlant.repair();
    Array.from(powerPlant.households).forEach(household => household.updateElectricity());
  }

  householdHasEletricity(household) {
    return household.hasElectricity;
  }
}
