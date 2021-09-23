<template>
	<div class="drawer-weather-nav">
		<div class="drawer-weather-nav__wrapper">
			<div class="drawer-weather-nav__wrapper__actions">
				<v-btn
					@on-click="$emit('close')"
					flat
					class="drawer-weather-nav__close-btn"
				>
					<close-icon />
				</v-btn>
			</div>

			<div class="drawer-weather-nav__wrapper__content">
				<form @submit.prevent="handleSearchSubmit">
					<search-input required v-model="searchQuery" />
					<v-btn type="submit" color="blue"> Search </v-btn>
				</form>

				<div class="drawer-weather-nav__wrapper__content__results">
					<spinner v-if="loading" />

					<template v-if="results.length > 0">
						<search-result-item
							v-for="(item, index) in results"
							:key="index"
							:title="item.title"
							:oeid="item.oeid"
							@on-click="handleSearchItemClick"
							chevron
						/>
					</template>

					<template v-if="showEmptyResultsMessage">
						<div class="drawer-weather-nav__wrapper__content__results__message">
							No results was found :(
						</div>
					</template>

					<template v-if="error && !loading">
						<div class="drawer-weather-nav__wrapper__content__results__error">
							<p class="drawer-weather-nav__wrapper__content__results__message">
								{{ error }}
							</p>

							<v-btn label="Retry" color="gray" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import CloseIcon from './icons/close-icon.vue';
import SearchInput from './search-input.vue';
import SearchResultItem from './search-result-item.vue';
import Spinner from './spinner.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';

export default Vue.extend({
	props: {
		results: {
			type: Array,
			required: true,
		},

		loading: {
			type: Boolean,
		},

		error: {
			type: String,
		},

		showEmptyResultsMessage: {
			type: Boolean,
		},
	},

	components: { VBtn, CloseIcon, SearchInput, SearchResultItem, Spinner },

	methods: {
		handleSearchItemClick: function (oeid: number) {
			this.$emit('search-item-click', oeid);
		},

		handleSearchSubmit: function () {
			this.$emit('search', this.searchQuery);
		},
	},

	data: function () {
		return {
			searchQuery: '',
		};
	},
});
</script>

<style lang="scss">
.drawer-weather-nav {
	height: 100%;
	left: -100%;
	min-height: 100vh;
	position: absolute;
	top: 0;
	width: 100%;
	transition: all 0.3s;

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

				&__message {
					color: $light-gray;
					opacity: 0.5;
					font-size: 14px;
				}

				.search-result-item:not(:last-child) {
					margin-bottom: 24px;
				}

				&__error {
					display: flex;
					align-items: center;

					p {
						margin-right: 16px;
					}
				}
			}
		}

		@media screen and (min-width: $breakpoint) {
			padding: 40px 48px;
		}
	}

	&--visible {
		left: 0;
	}
}
</style>
