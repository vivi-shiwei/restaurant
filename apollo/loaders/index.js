const DataLoader = require('dataloader')
const unique = require('../../lib/api/unique')
const { getUsersByIds } = require('../../db/model/user')

const createLoaders = {
  user: new DataLoader(keys => {
    const ids = unique(keys)
    return getUsersByIds(ids)
      .then(rows => (
        keys.map(key => (
          rows.find(x => x.id === key || x.seq_id.toString() === key)
        ))
      ))
  })
}

module.exports = createLoaders
