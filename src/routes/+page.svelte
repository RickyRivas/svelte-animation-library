<script>
	import { fade } from '$lib/actions/fade';
	import { easings } from '$lib/animations/fade';
</script>

<h1
	class="fadeIn"
	data-sm-duration="1000"
	use:fade={{
		duration: 3300,
		easing: easings.easeInCubic
	}}
>
	Svelte Animation Library
</h1>
