<template>
	<div class="app-layout">
		<div class="app-layout__drawer">
			<slot name="drawer"></slot>
		</div>

		<div class="app-layout__content">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.app-layout {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	&__drawer {
		background-color: $dark-blue;
		position: relative;
	}

	&__content {
		background-color: $very-dark-blue;
	}

	@media screen and (min-width: $breakpoint) {
		&__drawer,
		&__content {
			overflow-y: auto;
		}

		flex-direction: row;

		&__drawer {
			flex-basis: 32%;
		}

		&__content {
			flex-basis: 68%;
		}
	}
}
</style>
