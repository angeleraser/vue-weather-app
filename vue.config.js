module.exports = {
	pluginOptions: {
		quasar: {
			importStrategy: 'kebab',
			rtlSupport: true,
		},
	},

	css: {
		loaderOptions: {
			scss: {
				prependData: '@import "@/assets/scss/vars.scss";',
			},
		},
	},

	transpileDependencies: ['quasar'],
};
