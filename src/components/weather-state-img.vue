<template>
	<div
		:style="`width:${width}px; height:${height}px`"
		class="weather-state-image"
		:class="{ 'weather-state-image--is-skeleton': isLoading }"
	>
		<div
			v-if="isLoading"
			:style="`font-size:${width}px;`"
			class="weather-state-image__cloud-skeleton"
		>
			<cloud-icon />
			<span>?</span>
		</div>

		<img
			:width="width"
			:height="height"
			lazy
			v-else
			:src="src"
			:alt="alt"
			:aria-label="ariaLabel"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import CloudIcon from './icons/cloud-icon.vue';

export default Vue.extend({
	components: { CloudIcon },

	name: 'WeatherStateImage',

	props: {
		alt: {
			type: String,
			required: true,
		},

		src: {
			type: String,
			required: true,
		},

		ariaLabel: {
			type: String,
			required: true,
		},

		width: {
			type: String,
			default: () => '56',
		},

		height: {
			type: String,
			default: () => '62',
		},
	},

	created: function () {
		const image = new Image();

		image.src = this.src;

		image.onload = () => {
			this.isLoading = false;
		};

		image.onerror = () => {
			this.isLoading = false;
		};
	},

	data: function () {
		return {
			isLoading: true,
		};
	},
});
</script>

<style lang="scss">
.weather-state-image {
	display: inline-block;

	svg {
		width: 100%;
		height: 100%;
	}

	&__cloud-skeleton {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;

		span {
			position: absolute;
			color: $gray-3;
			font-size: 0.4em;
			margin-top: 8px;
		}
	}

	&--is-skeleton {
		opacity: 0.5;

		svg {
			animation: skeleton-loading 1s linear infinite alternate;
		}
	}

	@keyframes skeleton-loading {
		0% {
			fill: hsl(200, 20%, 70%);
		}

		100% {
			fill: hsl(200, 20%, 95%);
		}
	}
}
</style>
