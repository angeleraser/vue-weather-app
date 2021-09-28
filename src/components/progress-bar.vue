<template>
	<div class="progress-bar">
		<div class="progress-bar__steps">
			<span>0</span>
			<span>50</span>
			<span>100</span>
		</div>

		<div class="progress-bar__placeholder">
			<div
				:style="`width: ${value}%`"
				class="progress-bar__placeholder__fill"
			></div>
		</div>

		<div class="progress-bar__percentage-symbol">%</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		value: {
			type: String,
			default: () => '0',
		},
	},
});
</script>

<style lang="scss">
.progress-bar {
	width: 100%;
	display: flex;
	flex-direction: column;
	font-weight: $text-medium;

	&__steps {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	&__placeholder {
		height: 10px;
		width: 100%;
		background-color: $v-light-gray;
		border-radius: 12px;
		margin: 4px 0;

		&__fill {
			height: 100%;
			width: 0%;
			background-color: $v-yellow;
			border-radius: 12px;
			animation: fill 1s forwards linear;
			transform-origin: left;
			transform: scaleX(0);

			@keyframes fill {
				from {
					transform: scaleX(0);
				}

				to {
					transform: scaleX(100%);
				}
			}
		}
	}

	&__percentage-symbol {
		width: 100%;
		text-align: right;
	}
}
</style>
