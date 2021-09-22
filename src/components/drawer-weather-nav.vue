<template>
	<div class="drawer-weather-nav">
		<div class="drawer-weather-nav__wrapper">
			<div class="drawer-weather-nav__wrapper__actions">
				<v-btn flat class="drawer-weather-nav__close-btn">
					<close-icon />
				</v-btn>
			</div>

			<div class="drawer-weather-nav__wrapper__content">
				<form @submit.prevent>
					<search-input />
					<v-btn color="blue">Search </v-btn>
				</form>

				<div class="drawer-weather-nav__wrapper__content__results">
					<search-result-item label="Location" chevron />
					<search-result-item label="Location" chevron />
					<search-result-item label="Location" chevron />
					<search-result-item label="Location" chevron />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import CloseIcon from './icons/close-icon.vue';
import SearchInput from './search-input.vue';
import SearchResultItem from './search-result-item.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';

export default Vue.extend({
	components: { VBtn, CloseIcon, SearchInput, SearchResultItem },
});
</script>

<style lang="scss">
.drawer-weather-nav {
	height: 100%;
	left: 0;
	min-height: 100vh;
	position: absolute;
	top: 0;
	width: 100%;

	&__wrapper {
		display: flex;
		flex-direction: column;
		background-color: $dark-blue;
		height: 100%;
		padding: 24px 16px;

		&__actions {
			display: flex;
			flex-direction: row-reverse;
			margin-bottom: 40px;

			.v-btn {
				line-height: 0;
				padding: 0;
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			flex: 100%;

			form {
				display: flex;
				margin-bottom: 48px;

				.search-input {
					width: 100%;
					margin-right: 12px;
				}
			}

			&__results {
				flex: 100%;
				max-height: 480px;
				overflow-y: auto;

				.search-result-item:not(:last-child) {
					margin-bottom: 24px;
				}
			}
		}

		@media screen and (min-width: $breakpoint) {
			padding: 40px 48px;
		}
	}
}
</style>
