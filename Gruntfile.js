module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*\n Copyright 2012 Facebook Inc.\n\n' + 
          ' Licensed under the Apache License, Version 2.0 (the "License");\n' +
          ' you may not use this file except in compliance with the License.\n' + 
          ' You may obtain a copy of the License at\n' +
          '\n http://www.apache.org/licenses/LICENSE-2.0\n' +
          '\n Unless required by applicable law or agreed to in writing, software\n' +
          ' distributed under the License is distributed on an "AS IS" BASIS,\n' +
          ' WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n' +
          ' See the License for the specific language governing permissions and\n' +
          ' limitations under the License.\n' +
          ' */\n\n' +
          '/* Compiled File */\n\n' +
          '(function (window, undefined) {\n',
        footer: '}(window));',
        process: function(src, filepath) {
          var filename = filepath.substring(0, filepath.lastIndexOf('.'));
          var functionBody = src.slice(src.indexOf('{') + 1, src.lastIndexOf('}'));
          return '  /* ' + filename + ' */\n' + src.slice(src.indexOf('{') + 1, src.lastIndexOf('}'));
        }
      },
      dist: {
        src: [
          'sca.js',
          'indexedDB.init.js',
          'IDBCursor.js',
          'IDBDatabase.js',
          'IDBFactory.js',
          'IDBIndex.js',
          'IDBKeyRange.js',
          'IDBObjectStore.js',
          'IDBRequest.js',
          'IDBTransaction.js',
          'key.js',
          'webSql.js'
        ],
        dest: 'indexedDB.polyfill.js'
      }
    },
    jsbeautifier: {
      files: ['indexedDB.polyfill.js'],
      options: {
          js: {
              indentChar: " ",
              indentLevel: 0,
              indentSize: 2,
              indentWithTabs: false,
              jslintHappy: true,
          }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jsbeautifier');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'jsbeautifier']);
};