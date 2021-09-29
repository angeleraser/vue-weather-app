<template>
	<button
		:class="classNames"
		@click="emitOnClick"
		class="search-result-item font-raleway"
	>
		<span class="search-result-item__content">
			<slot v-if="!title" />

			<template v-else>
				{{ title }}
			</template>

			<chevron-right-icon v-if="chevron && !loading" />
			<search-result-item-spinner v-if="loading" />
		</span>
	</button>
</template>

<script lang="ts">
import Vue from 'vue';
import ChevronRightIcon from './icons/chevron-right-icon.vue';
import SearchResultItemSpinner from './spinners/search-result-item-spinner.vue';

export default Vue.extend({
	props: {
		title: {
			type: String,
			required: true,
		},

		oeid: {
			type: Number,
			required: true,
		},

		chevron: {
			type: Boolean,
		},

		loading: {
			type: Boolean,
		},

		disabled: {
			type: Boolean,
		},
	},

	components: { ChevronRightIcon, SearchResultItemSpinner },

	computed: {
		classNames: function (): { [className: string]: boolean } {
			return {
				['search-result-item--loading']: this.loading,
				['search-result-item--disabled']: this.disabled,
			};
		},
	},

	methods: {
		emitOnClick: function () {
			if (this.loading) return;

			this.$emit('on-click', this.oeid);
		},
	},
});
</script>

<style lang="scss">
.search-result-item {
	display: inline-flex;
	background-color: transparent;
	font-size: $text-s;
	letter-spacing: 0.05em;
	line-height: 1.75em;
	transition: 0.3s all;
	height: auto;
	border-width: 1px;
	border-style: solid;
	border-color: transparent;
	padding: 0;
	width: 100%;
	height: auto;
	outline: none;

	&:active {
		outline: none;
	}

	&__content {
		padding: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: var(--foreground-color-2);
		width: 100%;

		svg {
			fill: var(--foreground-color-2);
			opacity: 0;
			transition: all 0.3s;
		}
	}

	&--loading,
	&:hover {
		background-color: rgba($color: $v-gray-tertiary, $alpha: 0.2);
		border-color: $v-gray-tertiary;

		svg {
			opacity: 1;
		}
	}

	&--disabled {
		background-color: rgba(0, 0, 0, 0.12) !important;
		pointer-events: none !important;
		color: rgba(0, 0, 0, 0.26) !important;
		box-shadow: none !important;
		user-select: none;
		opacity: 0.5;
	}
}
</style>
