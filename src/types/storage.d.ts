type StorageKeys = 'sbpd' | 'sbsp'

declare interface Storage {
  getItem(key: StorageKeys): string | null
  removeItem(key: StorageKeys): void
  setItem(key: StorageKeys, value: string): void
}
