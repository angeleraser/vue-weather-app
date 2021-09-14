<template>
	<div class="notranslate" id="app">
		<v-btn color="gray" label="Click" />

		<search-result-item chevron> London </search-result-item>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchResultItem from './components/search-result-item.vue';
import VBtn from './components/v-btn.vue';

export default Vue.extend({
	components: { VBtn, SearchResultItem },
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
