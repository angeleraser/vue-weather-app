<template>
	<div class="clouds-background">
		<cloud-icon class="clouds-background__cloud" />
		<cloud-icon class="clouds-background__cloud" />
		<cloud-icon class="clouds-background__cloud" />
		<cloud-icon class="clouds-background__cloud" />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import CloudIcon from './icons/cloud-icon.vue';

export default Vue.extend({
	components: { CloudIcon },
});
</script>

<style lang="scss">
.clouds-background {
	display: flex;
	min-height: 600px;
	position: relative;
	width: 100%;
	overflow: hidden;
	font-size: 150px;

	&__cloud {
		position: absolute;
		left: -1em;
		top: 0;
		width: 1em;
		height: 1em;
		animation: slide_cloud 30s linear infinite;
		fill: $v-gray-primary;
		opacity: 0.1;

		&:nth-child(1) {
			top: 0;
		}

		&:nth-child(2) {
			top: 1em;
			animation-delay: 4s;
			animation-duration: 36s;
		}

		&:nth-child(3) {
			top: 2em;
			animation-delay: 8s;
			animation-duration: 14s;
		}

		&:nth-child(4) {
			top: 3em;
			animation-duration: 46s;
		}

		@keyframes slide_cloud {
			from {
				left: -1em;
			}

			to {
				left: 100%;
			}
		}
	}
}
</style>
