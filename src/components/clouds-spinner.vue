<template>
	<div class="clouds-spinner">
		<div class="clouds-spinner__cloud-wrapper">
			<cloud-icon class="clouds-spinner__first-cloud cloud-svg" />
		</div>
		<cloud-icon class="clouds-spinner__second-cloud cloud-svg" />
		<cloud-icon class="clouds-spinner__third-cloud cloud-svg" />
	</div>
</template>

<script>
import CloudIcon from './icons/cloud-icon.vue';
export default {
	components: { CloudIcon },
};
</script>

<style lang="scss">
.clouds-spinner {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width: 200px;

	svg {
		fill: $light-gray;
		width: 35%;
		height: 35%;
	}

	&__cloud-wrapper {
		display: flex;
		height: 35%;
		justify-content: center;
		width: 100%;
	}

	.cloud-svg {
		animation: cloud-shining 1s infinite alternate;
	}

	&__first-cloud {
		margin: 0 auto;
	}

	&__second-cloud.cloud-svg {
		margin-right: 5%;
		animation-delay: 1.25s;
	}

	&__third-cloud.cloud-svg {
		animation-delay: 1.5s;
	}

	@keyframes cloud-shining {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0.15;
			transform: scale(0.97);
		}
	}
}
</style>
