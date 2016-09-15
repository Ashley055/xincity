module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('grunt-contrib-copy')(grunt);
	require('grunt-contrib-clean')(grunt);


	var config = {
		app: 'app',
		dist: 'dist'
	};


	grunt.initConfig({

		config: config,
		copy: {
			main: {
				files: [{
					expand: true,
					src: ['<%= config.app %>/**', '!<%= config.app%>/less/**'],
					dest: '<%= config.dist%>/'
				}]
			}
		},

		clean: ['<%= config.dist%>/'],

		less: {
			development: {
				options: {
					paths: ['<%= config.app %>/']
				},
				files: {
					'<%= config.app %>/css/index.css': '<%= config.app %>/less/alltype.less'
				}
			}
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

	grunt.registerTask('server', [
		'connect:server',
		'watch'
	]);

	//组合命令
	grunt.registerTask('post', ['clean', 'copy']);

};