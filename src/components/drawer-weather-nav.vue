<template>
	<div :class="drawerNavClassNames" class="drawer-weather-nav font-raleway">
		<div class="drawer-weather-nav__wrapper">
			<div class="drawer-weather-nav__wrapper__actions">
				<v-btn
					@on-click="$emit('input', !value)"
					flat
					class="drawer-weather-nav__close-btn"
				>
					<close-icon />
				</v-btn>
			</div>

			<div class="drawer-weather-nav__wrapper__content">
				<form @submit.prevent="handleSearchSubmit">
					<drawer-search-input required v-model="searchQuery" />
					<v-btn :disabled="isFetchingLocalization" type="submit" color="blue">
						Search
					</v-btn>
				</form>

				<div class="drawer-weather-nav__wrapper__content__results">
					<render-component
						:content="results.length > 0"
						:error="Boolean(requestError)"
						:loading="isFetchingLocalization"
					>
						<template #loading>
							<ripple-spinner
								class="drawer-weather-nav__wrapper__content__results__spinner"
							/>
						</template>

						<template #error>
							<div class="drawer-weather-nav__wrapper__content__results__error">
								<p
									class="drawer-weather-nav__wrapper__content__results__message"
								>
									{{ requestError.message }}
								</p>

								<v-btn
									v-if="requestError.retry_action"
									label="Retry"
									color="gray"
									@on-click="$emit('retry-fetch-localization')"
								/>
							</div>
						</template>

						<template #content>
							<search-result-item
								:key="index"
								:oeid="item.oeid"
								:title="item.title"
								:disabled="
									isFetchingOnEarthLocalization && selectedOeid !== item.oeid
								"
								:loading="
									isFetchingOnEarthLocalization && selectedOeid === item.oeid
								"
								@on-click="handleSearchItemClick"
								chevron
								v-for="(item, index) in results"
							/>
						</template>
					</render-component>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import CloseIcon from './icons/close-icon.vue';
import RenderComponent from './render-component.vue';
import RippleSpinner from './spinners/ripple-spinner.vue';
import DrawerSearchInput from './drawer-search-input.vue';
import SearchResultItem from './search-result-item.vue';
import VBtn from './v-btn.vue';
import Vue from 'vue';

export default Vue.extend({
	props: {
		results: {
			type: Array,
			required: true,
		},

		isFetchingLocalization: {
			type: Boolean,
		},

		isFetchingOnEarthLocalization: {
			type: Boolean,
		},

		requestError: {
			required: false,
		},

		value: {
			type: Boolean,
		},
	},

	components: {
		VBtn,
		CloseIcon,
		DrawerSearchInput,
		SearchResultItem,
		RippleSpinner,
		RenderComponent,
	},

	methods: {
		handleSearchItemClick: function (oeid: number) {
			this.selectedOeid = oeid;
			this.$emit('search-item-click', oeid);
		},

		handleSearchSubmit: function () {
			this.$emit('search', this.searchQuery);
		},
	},

	computed: {
		drawerNavClassNames: function (): { [className: string]: boolean } {
			return {
				'drawer-weather-nav--visible': this.value,
			};
		},
	},

	data: function () {
		return {
			searchQuery: '',
			selectedOeid: 0,
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
	z-index: 999;

	&__wrapper {
		display: flex;
		flex-direction: column;
		background-color: var(--card-bg-color);
		height: 100%;
		padding: 24px 16px;

		&__actions {
			display: flex;
			flex-direction: row-reverse;
			margin-bottom: 40px;

			.v-btn {
				line-height: 0;
				padding: 0;
				svg {
					fill: var(--foreground-color-2);
				}
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			flex: 100%;

			form {
				display: flex;
				margin-bottom: 48px;
				padding: 0 1px;

				.drawer-search-input {
					width: 100%;
					margin-right: 12px;
				}
			}

			&__results {
				flex: 100%;
				max-height: 480px;
				overflow-y: auto;
				padding: 0 1px;

				&__message {
					color: var(--foreground-color-2);
					opacity: 0.5;
					font-size: 14px;
				}

				.search-result-item:not(:last-child) {
					margin-bottom: 24px;
				}

				&__error {
					display: flex;
					align-items: center;
					justify-content: space-between;

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
