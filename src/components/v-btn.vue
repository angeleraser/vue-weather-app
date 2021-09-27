<template>
	<button
		@click="$emit('on-click')"
		:class="classNames"
		class="v-btn text-medium font-raleway"
	>
		<span class="v-btn__content">
			<slot v-if="!label"> </slot>

			{{ label }}
		</span>
	</button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		label: {
			type: String,
		},

		color: {
			type: String,
		},

		disabled: {
			type: Boolean,
		},

		outlined: {
			type: Boolean,
		},

		round: {
			type: Boolean,
		},

		flat: {
			type: Boolean,
		},

		type: {
			type: String,
			default: () => 'button',
		},
	},

	computed: {
		classNames: function () {
			return {
				[`v-btn--is-${this.color}`]: this.color,

				[`v-btn--is-disabled`]: this.disabled,

				[`v-btn--is-round`]: this.round,

				[`v-btn--is-flat`]: this.flat,

				[`v-btn--is-${this.color}-outlined`]: this.outlined && this.color,
			};
		},
	},
});
</script>

<style lang="scss">
.v-btn {
	background-color: transparent;
	border-color: transparent;
	border-style: solid;
	border-width: 2px;
	color: black;
	font-size: $text-s;
	letter-spacing: 0.05em;
	line-height: 1.75em;
	outline: none;
	padding: 4px 12px;
	transition: 0.3s all;
	height: auto;
	display: inline-flex;

	&:active {
		outline: none;
	}

	&__content {
		display: flex;
		align-items: center;
		height: 100%;
	}

	&--is-blue {
		background-color: $blue;
		color: $white;

		svg {
			fill: currentColor;
		}

		&-outlined {
			color: $blue;
			background-color: $white;
			border-color: $blue;

			&:hover {
				background-color: rgba($color: $blue, $alpha: 0.1);
			}
		}
	}

	&--is-white {
		background-color: $white;
		color: $very-dark-blue;

		svg {
			fill: currentColor;
		}

		&-outlined {
			color: $white;
			background-color: transparent;
			border-color: $white;

			&:hover {
				background-color: rgba($color: black, $alpha: 0.1);
			}
		}
	}

	&--is-pale-blue {
		background-color: $pale-blue;
		color: $white;

		svg {
			fill: currentColor;
		}

		&-outlined {
			color: $pale-blue;
			background-color: transparent;
			border-color: $pale-blue;

			&:hover {
				background-color: rgba($color: black, $alpha: 0.1);
			}
		}
	}

	&--is-gray {
		background-color: $dark-gray;
		color: $white;
		box-shadow: 0px 4px 4px 0px #00000040;

		&-outlined {
			color: $dark-gray;
			background-color: transparent;
			border-color: $dark-gray;

			&:hover {
				background-color: rgba($color: $dark-gray, $alpha: 0.1);
			}
		}
	}

	&:hover {
		filter: brightness(0.9);
	}

	&:active {
		transform: scale(0.98);
	}

	&--is-round {
		border-radius: 50%;
		min-width: 3em;
		min-height: 3em;
		padding: 0;
		align-items: center;

		.v-btn__content {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: center;
		}
	}

	&--is-flat {
		border: none !important;
		background-color: transparent !important;
	}

	&--is-disabled {
		pointer-events: none !important;
		box-shadow: none !important;
		user-select: none;
		opacity: 0.25;
	}
}
</style>
