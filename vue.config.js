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
				// additionalData: '@import "@/assets/scss/variables.scss";',
			},
		},
	},

	transpileDependencies: ['quasar'],
};
