module.exports = (prefix = '00000000', i = 0) => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}
