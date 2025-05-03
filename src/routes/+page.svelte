<svelte:options runes />

<script lang="ts">
	import Header from '../stories/Header.svelte';
	import Footer from '../stories/Footer.svelte';
	//  import DropDown from '../stories/forms/DropDown.svelte';
	// import UserList from './userList.svelte';
	// import '../stories/page.css';
	// import ProjectListPage from './projectListPage.svelte';
	// import Tabs from '../stories/tabs.svelte';
	// import Home from './home.svelte';
	// import Button from '../stories/Button.svelte';
	// import NeumorphicButton from '../stories/NeumorphicButton.svelte';
	import ProjectListPage from './ProjectListPage.svelte';

	// let user = $state(null);
	// console.log(dropdown_value);
	// let data =
	// let area=$state()
</script>

<svelte:head>
	<style>
		body {
			margin: 0;
			min-height: 100vh;
			display: flex;
			flex-direction: column;
		}
	</style>
</svelte:head>

<div class="page-wrapper">
	<Header />
	<div class="content">
		<ProjectListPage />
	</div>
	<Footer />
</div>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex: 1;
		padding: 2rem;
	}
</style>
