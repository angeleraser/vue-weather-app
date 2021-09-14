<template>
	<div class="search-input font-raleway">
		<div class="search-input__icon"><search-icon /></div>

		<div class="search-input__content">
			<input
				type="text"
				:value="value"
				@input="e => $emit('input', e.target.value)"
				placeholder="search location"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import SearchIcon from './icons/search-icon.vue';

export default Vue.extend({
	components: { SearchIcon },

	props: {
		value: {
			type: String,
		},
	},
});
</script>

<style lang="scss">
.search-input {
	padding: 14px;
	display: flex;
	border: 1px solid $light-gray;

	&__icon {
		display: flex;
		align-items: center;
		margin-right: 14px;

		svg {
			fill: $gray-3;
		}
	}

	&__content {
		width: 100%;

		input {
			outline: none;
			border: none;
			background-color: transparent;
			color: $light-gray;
			width: 100%;
			font-size: $text-s;

			&::placeholder {
				color: $gray-3;
			}
		}
	}
}
</style>
