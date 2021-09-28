<template>
	<div class="drawer-search-input font-raleway">
		<div class="drawer-search-input__icon"><search-icon /></div>

		<div class="drawer-search-input__content">
			<input
				:required="required"
				:value="value"
				@input="e => $emit('input', e.target.value)"
				autocomplete="off"
				placeholder="search location"
				type="text"
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

		required: {
			type: Boolean,
		},
	},
});
</script>

<style lang="scss">
.drawer-search-input {
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
			font-family: $font-raleway;
			color: $light-gray;
			width: 100%;
			font-size: $text-s;
			font-weight: $text-medium;

			&::placeholder {
				color: $gray-3;
			}
		}
	}
}
</style>
