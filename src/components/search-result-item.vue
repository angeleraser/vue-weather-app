<template>
	<button class="search-result-item font-raleway">
		<span class="search-result-item__content">
			<slot v-if="!label" />

			<template v-else>
				{{ label }}
			</template>

			<chevron-right-icon v-if="chevron" />
		</span>
	</button>
</template>

<script lang="ts">
import Vue from 'vue';
import ChevronRightIcon from './icons/chevron-right-icon.vue';

export default Vue.extend({
	props: {
		label: {
			type: String,
		},

		chevron: {
			type: Boolean,
		},
	},

	components: { ChevronRightIcon },
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

	&__content {
		padding: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: $white;
		width: 100%;

		svg {
			fill: $gray-3;
			display: none;
		}
	}

	&:hover {
		background-color: rgba($color: $gray-3, $alpha: 0.2);
		border-color: $gray-3;

		svg {
			display: inline-block;
		}
	}
}
</style>
