/* Storage.ts
 * (c) 2019 Jang Haemin
 * @license MIT
 */

export default class EodiroStorage {
  univVendor: string

  constructor(univVendor: string) {
    this.univVendor = univVendor
  }

  getUnivData() {
    // validate the data
    let univData = JSON.parse(localStorage.getItem(this.univVendor))
    if (!univData) {
      univData = {}
    }

    return univData
  }

  setUnivData(newUnivData: Object) {
    if (Object.keys(newUnivData).length === 0) {
      localStorage.removeItem(this.univVendor)
    } else {
      localStorage.setItem(this.univVendor, JSON.stringify(newUnivData))
    }
  }

  getFavoriteBuildings(): string[] {
    let univData = this.getUnivData()
    let list = univData.favoriteBuildings
    if (!list) {
      list = []
    }

    return list
  }

  toggleFavoriteBuilding(buildingID: string) {
    let result
    let univData = this.getUnivData()
    let list: string[] = univData.favoriteBuildings
    if (!list) {
      list = []
      univData.favoriteBuildings = list
    }

    let index = list.indexOf(buildingID)
    if (index !== -1) {
      list.splice(index, 1)
      result = false
    } else {
      list.unshift(buildingID)
      result = true
    }

    if (list.length === 0) {
      delete univData.favoriteBuildings
    } else {
      univData.favoriteBuildings = list
    }

    this.setUnivData(univData)

    return result
  }
}