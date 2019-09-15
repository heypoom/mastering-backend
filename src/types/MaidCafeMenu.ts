export interface MaidCafeResponse {
  success: true
  data: MaidCafeMenu
}

export interface MaidCafeMenu {
  [category: string]: {
    [menu: string]: MenuItem
  }
}

export interface MenuItem {
  price: number
  name: {
    jp: string
    en: string
    th: string
  }
}
