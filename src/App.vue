<template>
	<div class="notranslate" id="app">
		<application-layout>
			<template #drawer>
				<drawer />
			</template>
		</application-layout>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Drawer from './components/drawer.vue';
import ApplicationLayout from './layouts/application-layout.vue';

export default Vue.extend({
	components: { ApplicationLayout, Drawer },
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

html {
	font-size: $text-base;
}

#app {
	width: 100%;
	height: 100%;
	min-width: 360px;
	min-height: 100vh;
	font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto,
		'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji', 'Segoe UI Symbol';
	background-color: $very-dark-blue;
}
</style>
