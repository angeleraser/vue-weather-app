<template>
	<div>
		<slot v-if="loading && !error" name="loading" />

		<slot v-else-if="!loading && error" name="error" />

		<template v-else>
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

		content: {
			type: Boolean,
		},
	},
});
</script>
