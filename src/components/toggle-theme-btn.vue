<template>
	<v-btn
		:color="mode === 'light' ? 'pale-blue' : 'white'"
		@on-click="$emit('toggle', mode === 'dark' ? 'light' : 'dark')"
		round
		tooltip="Switch theme"
	>
		<light-mode-icon />
	</v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import LightModeIcon from './icons/light-mode-icon.vue';
import VBtn from './v-btn.vue';

export default Vue.extend({
	props: {
		mode: {
			type: String,
			required: true,
		},
	},

	components: { VBtn, LightModeIcon },
});
</script>

<style lang="scss"></style>
