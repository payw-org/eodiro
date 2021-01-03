import { CauNoticeWatcher } from './index'
import { cau, cse } from './vendors'

const watcher = new CauNoticeWatcher()

watcher.watch(cau)
watcher.watch(cse)

watcher.run().then()
