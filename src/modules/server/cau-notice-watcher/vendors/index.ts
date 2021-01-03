import { cau } from './cau'
import { cse } from './cse'
import { dormitoryBlueMir } from './dormitory-blue-mir'
import { log } from './log'

export * from './cau'
export * from './cse'
export * from './dormitory-blue-mir'
export * from './log'

export const availableVendors = [cau, cse, dormitoryBlueMir, log].map(
  (vendor) => ({
    name: vendor.name,
    key: vendor.key,
  })
)
