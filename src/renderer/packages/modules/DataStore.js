import Datastore from 'nedb-promises'
import path from 'path'
import { remote } from 'electron'

// export default new Datastore({
//   autoload: true,
//   filename: path.join(remote.app.getPath('userData'), '/data.db')
// })
let docs = Datastore.create(remote.app.getPath('userData') + '/docs.db')
export default { docs };