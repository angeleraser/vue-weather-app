<template>
	<div class="render-component">
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

<style lang="scss">
.render-component {
	width: 100%;
	height: 100%;
}
</style>
