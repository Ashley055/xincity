module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('grunt-contrib-copy')(grunt);
	require('grunt-contrib-clean')(grunt);


	var config = {
		app: 'app',
		dist: 'dist',
		xcity: 'xcity',
		fang: 'fang'
	};


	grunt.initConfig({

		config: config,
		copy: {
			main: {
			    expand: true,
			    cwd: '<%= config.app %>',
			    src: ['images/*', 'index.html', 'css/img/*'],
			    dest: '<%= config.dist %>/'
			},
			xcity: {
				files:[ {expand: true, src:['<%= config.app %>/**', '!<%= config.app %>/less/**'], dest: '<%= config.xcity %>/'}]
			},
			fang: {
				files:[ {expand: true, src:['<%= config.app %>/js/*','<%= config.app %>/fimage/*', '<%= config.app %>/css/fang.css', '<%= config.app %>/fang.html'], dest: '<%= config.fang %>/'}]
			}
		},

		clean: {
			dist: ['<%= config.dist %>'],
			tmp: ['.tmp'],
			xcity: ['<%= config.xcity %>'],
			fang: ['<%= config.fang %>']
		},

		less: {
			development: {
				options: {
					paths: ['<%= config.app %>/']
				},
				files: {
					'<%= config.app %>/css/index.css': '<%= config.app %>/less/alltype.less',
					'<%= config.app %>/css/fang.css': '<%= config.app %>/less/fang.less',
				}
			}
		},

		useminPrepare: {  // 与usemin结合的话，会自动有cancat,cssmin,uglify task。不要在声明具体task
			html:'<%= config.app %>/index.html'
		},

		usemin: {
			html:['<%= config.dist %>/{,*/}*.html']
		},
		
		connect: {
			server: {
				options: {
					port: 9000,
					hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
					livereload: 35729, //声明给 watch 监听的端口
					open: true, //自动打开网页 http://
					base: [
						'app' //主目录
					]
				}
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: '<%=connect.server.options.livereload%>' //监听前面声明的端口  35729
				},
				files: [ //下面文件的改变就会实时刷新网页
					'<%= config.app %>/*.html',
					'<%= config.app %>/css/{,*/}*.css',
					'<%= config.app %>/js/{,*/}*.js',
					'<%= config.app %>/images/{,*/}*.{png,jpg}'
				]
			},
			less: {
				files:['<%= config.app %>/less/{,*/}*.less'], //监测less文件
				tasks:['less'], // 执行对应task less
				options: {livereload:false}
			}
		}

	});

	//生成不压缩源码
	grunt.registerTask('bsource', [
		'clean:xcity',
		'copy:xcity'
	]);

	grunt.registerTask('fang', [
		'clean:fang',
		'copy:fang'
	]);

	//运行开发模式
	grunt.registerTask('server', [
		'connect:server',
		'watch'
	]);

	//生成压缩的源码
	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'copy',
		'usemin',
		'clean:tmp'
	]);

};