/*
 * assemble-bootstrap
 * http://github.com/assemble/assemble-bootstrap
 *
 * Copyright (c) 2013 Jon Schlinkert
 * MIT License
 */
"use strict";

module.exports = function(grunt) {

  var pretty = require('pretty');

  if(!grunt.file.exists('vendor/bootstrap/_config.yml')) {
    grunt.fail.fatal('>> Please run "bower install" before continuing.');
  }

  // Project configuration.
  grunt.initConfig({

    // Load Bootstrap's config data.
    site: grunt.file.readYAML('vendor/bootstrap/_config.yml'),

    // Run Bootstrap's own Gruntfile.
    subgrunt: {
      test: {
        options: {task: 'test'},
        src: ['vendor/bootstrap']
      },
      js: {
        options: {task: 'concat:bootstrap'},
        src: ['vendor/bootstrap']
      },
      css: {
        options: {task: 'recess:bootstrap'},
        src: ['vendor/bootstrap']
      },
      dist: {
        options: {task: 'dist'},
        src: ['vendor/bootstrap']
      },
      all: {
        options: {task: 'default'},
        src: ['vendor/bootstrap']
      }
    },

    // Regex for refactor task.
    replacements: require('./tasks/replacements'),

    // Refactor Liquid to Handlebars so we can
    // build with Assemble instead of Jekyll
    frep: {
      bootstrap: {
        options: {
          replacements: '<%= replacements.bootstrap %>'
        },
        files: [
          {expand: true, cwd: 'vendor/bootstrap', src: ['*.html', '_layouts/*.html', '_includes/*.html'], dest: 'templates/', ext: '.hbs'}
        ]
      },
      examples: {
        options: {
          replacements: '<%= replacements.examples %>'
        },
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: 'vendor/bootstrap/examples/',
          src: ['{*,**}/*.html'],
          dest: '<%= site.destination %>/examples/'
        }]
      }
    },

    assemble: {
      options: {
        flatten: true,
        site: '<%= site %>',
        helpers: ['helper-prettify'],
        assets: '<%= site.destination %>/assets',
        partials: 'templates/_includes/*.hbs',
        layoutdir: 'templates/_layouts',
        layout: 'default.hbs',
        postprocess: pretty
      },
      docs: {
        src: ['templates/*.hbs'],
        dest: '<%= site.destination %>/'
      }
    },

    copy: {
      libs: {
        files: {
          '<%= site.destination %>/assets/js/highlight.js': ['vendor/highlightjs/highlight.pack.js'],
          '<%= site.destination %>/assets/css/github.css':  ['vendor/highlightjs/styles/github.css']
        }
      },
      assets: {
        files: [
          {expand: true, cwd: 'vendor/bootstrap/examples', src: ['**/*.css', '**/*.{jpg,png,gif}'], dest: '<%= site.destination %>/examples/'},
          {expand: true, cwd: 'vendor/bootstrap/dist', src: ['**'], dest: '<%= site.destination %>/assets/'},
          {expand: true, cwd: 'vendor/bootstrap', src: ['assets/**'], dest: '<%= site.destination %>/'}
        ]
      }
    },

    clean: {
      dist: ['<%= site.destination %>/**/*', '!<%= site.destination %>/.{git,gitignore}']
    }
  });

  grunt.config.set('site.description', 'Generated by http://assemble.io');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-frep');
  grunt.loadNpmTasks('grunt-sync-pkg');

  // Load local "Subgrunt" task to run Bootstrap's Gruntfile.
  grunt.loadTasks('tasks');

  // Tests task.
  grunt.registerTask('test', ['subgrunt:test']);

  grunt.registerTask('dev', ['clean', 'frep', 'assemble']);

  // Default task to be run with the "grunt" command.
  grunt.registerTask('default', [
    'clean',
    'subgrunt:js',
    'subgrunt:css',
    'copy',
    'frep',
    'assemble',
    'sync'
  ]);
};
