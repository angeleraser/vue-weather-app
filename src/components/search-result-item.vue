<template>
	<button @click="emitOnClick" class="search-result-item font-raleway">
		<span class="search-result-item__content">
			<slot v-if="!title" />

			<template v-else>
				{{ title }}
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
	},

	components: { ChevronRightIcon },

	methods: {
		emitOnClick: function () {
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

	&__content {
		padding: 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: $white;
		width: 100%;

		svg {
			fill: $gray-3;
			opacity: 0;
			transition: all 0.3s;
		}
	}

	&:hover {
		background-color: rgba($color: $gray-3, $alpha: 0.2);
		border-color: $gray-3;

		svg {
			opacity: 1;
		}
	}
}
</style>
