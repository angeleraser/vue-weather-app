<template>
	<today-highlight-card class="humidity-card" title="Humidity">
		<div class="strong value">{{ value }} <span class="unity">%</span></div>
	</today-highlight-card>
</template>

<script lang="ts">
import Vue from 'vue';
import TodayHighlightCard from './today-highlight-card.vue';

export default Vue.extend({
	components: { TodayHighlightCard },
	props: { value: { type: String, required: true } },
});
</script>

<style lang="scss"></style>
