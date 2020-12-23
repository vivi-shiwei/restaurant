/* 用来区分长 id 和 短 id */
const distinguish = (ids = []) => {
  const _obj = {
    ids: [],
    seqId: []
  }

  ids.forEach(id => {
    id.includes('-') ? _obj.ids.push(id) : _obj.seqId.push(id)
  })

  return _obj
}

module.exports = distinguish
