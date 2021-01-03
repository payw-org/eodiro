import { CauNoticeWatcher } from '@/modules/server/cau-notice-watcher'
import * as Vendors from '@/modules/server/cau-notice-watcher/vendors'

async function run() {
  const feed = new CauNoticeWatcher()

  feed.watch(Vendors.cau)
  feed.watch(Vendors.dormitoryBlueMir)
  feed.watch(Vendors.cse)
  feed.watch(Vendors.log)

  try {
    await feed.run()
  } catch (error) {
    console.error(error)
  }

  process.exit()
}

run()
