<template>
	<div
		:class="{
			'render-component--loading': loading && !error,
			'render-component--error': !loading && error,
			'render-component--content': !loading && !error,
		}"
		class="render-component"
	>
		<slot v-if="loading && !error" name="loading" />

		<slot v-if="!loading && error" name="error" />

		<template v-if="!error && !loading">
			<slot name="content" />
			<slot />
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		loading: {
			type: Boolean,
		},

		error: {
			type: Boolean,
		},
	},
});
</script>

<style lang="scss"></style>
