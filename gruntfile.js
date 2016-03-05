module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            build: {
                options: {
                    target: "es6",
                    fast: "never",
                    module: "commonjs",
                    moduleResolution: "node",
                    removeComments: "true",
                    sourceMap: "true",
                    noImplicitAny: "true",
                    preserveConstEnums: "true",
                    experimentalDecorators: "true"
                },
                src: ["src/**/*.ts", "!node_modules/**/*.ts"],
                outDir: "js"
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            all: {
                src: ["src/**/*.ts", "!node_modules/**/*.ts", "!obj/**/*.ts", "!typings/**/*.ts"]
            }
        },

        watch: {
            scripts: {
                files: ["src/**/*.ts", "!node_modules/**/*.ts"],
                tasks: ["newer:tslint:all", "ts:build"],
                options: {
                    spawn: false
                }
            }
        },

        nodemon: {
            dev: {
                script: "js/server.js"
            },
            options: {
                ignore: ["node_modules/**", "gruntfile.js"],
                env: {
                    PORT: "8080"
                }
            }
        },

        concurrent: {
            watchers: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-newer");
    grunt.loadNpmTasks("grunt-nodemon");
    grunt.loadNpmTasks("grunt-concurrent");

    grunt.registerTask("default", ["tslint:all", "ts:build"]);
    grunt.registerTask("serve", ["concurrent:watchers"]);
}
