import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/config',
    'src/client',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
