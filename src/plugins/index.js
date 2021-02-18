require
  .context('./', true, /\.js$/)
  .keys()
  .forEach(plugin => {
    require('./' + plugin.replace('./', ''))
  })