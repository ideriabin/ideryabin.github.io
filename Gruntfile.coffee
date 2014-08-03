module.exports = (grunt) ->

  config = {}

  config.connect =
    dev:
      options:
        keepalive: true
        livereload: true
        open: true

  config.watch =
    options:
      atBegin: true
      interrupt: true
      livereload: true
    content:
      files: 'src/content/**/*.*'
      tasks: 'assemble'
    stylus:
      files: 'src/stylus/**/*.styl'
      tasks: 'stylus'

  config.stylus =
    options:
      paths: ['src/stylus/import']
      import: ['mixins','vars']
    all:
      files:
        'assets/css/styles.css': 'src/stylus/*.styl'

  config.assemble =
    options:
      layoutdir: 'src/content/layouts'
      partials: 'src/content/partials/**/*.hbs'
      data: 'src/content/data/*.yml'
      assets: 'assets'
      layout: 'default.hbs'
    posts:
      expand: true
      cwd: 'src/content/pages'
      dest: '.'
      src: '*.hbs'
      ext: '.html'

  grunt.initConfig config

  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-stylus'
  grunt.loadNpmTasks 'assemble'

  grunt.registerTask 'default', 'watch'
