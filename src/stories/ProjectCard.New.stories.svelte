<script lang="ts" module>
	//   import { Meta, Story } from '@storybook/addon-svelte-csf';

	import { defineMeta } from '@storybook/addon-svelte-csf';
	import ProjectCard from './ProjectCard.New.svelte';
	import { fn } from '@storybook/test';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	const { Story } = defineMeta({
		title: 'UI/ProjectCard',
		component: ProjectCard,
		tags: ['autodocs'],
		argTypes: {
			gridView: {
				control: 'boolean',
				description: 'Display card in grid view if true, list view if false'
			},
			project: {
				control: 'object',
				description: 'Project data to display in the card'
			}
			// handleFavorite: { action: 'favoriteToggled' }
		},
		args: {
			gridView: true,
			project: {
				id: 'pro81747690130',
				clientId: 'u30210834755',
				vendorId: null,
				title: 'Boring av brønn på hytte',
				shortDescription:
					'Trenger å få boret brønn for vannforsyning til hytte. Ca 100 meter fra vei, må regne med tyngre utstyr.',
				longDescription:
					'Har kjøpt hytte og trenger egen vannforsyning. Ønsker å få boret en brønn som kan gi stabilt vann året rundt. Hytta ligger i et område med mye fjell, så det kreves profesjonelt utstyr og erfaring.',
				location: 'kongsberg, Blefjell',
				address: 'Mockdata Street 115',
				category: 'Plumber',
				experienceRequirements: ['Drilling'],
				jobAttributes: ['Vann', 'Hytte', 'Haster'],
				thumbnailImageLink:
					'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
				imageGallery: [
					'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg',
					'https://upload.wikimedia.org/wikipedia/commons/7/72/House_at_J%C3%A6ren_in_Norway_Garborgheimen.JPG',
					'https://i.pinimg.com/736x/70/97/6e/70976e6b44a4cfb10968252a696d0c04.jpg'
				],
				postDate: '1986-03-15 23:00:00',
				startDate: '2003-08-26 22:00:00',
				dueDate: '1995-07-14 22:00:00',
				finishDate: '2009-02-19 23:00:00',
				estimatedTime: '2 uker',
				budget: 79000,
				currency: 'NOK',
				paymentVerification: true,
				state: 'posted',
				poster_type: 'private',
				isActive: false,
				favoritedCount: 53,
				viewCount: 34,
				purchaseCount: 3,
				paidListing: true,
				listingPriorityScore: 34,
				vendorRating: 3,
				clientRating: 5
			}
		}
	});
</script>

<Story name="Preview Vertical" args={{ gridView: true }} />
<!-- 
				title: 'Sample Project',
				description: 'This is a sample project description',
				company: 'Sample Company',
				location: 'Oslo, Norway',
				deadline: '2025-06-30',
				tags: ['Development', 'Design', 'UI/UX']
-->

<!-- 
{
  "title": "Boring av brønn",
  "description": "Trenger å få boret brønn for vannforsyning til hytte. Ca 100 meter fra vei, må regne med tyngre utstyr.",
  "company": "Sample Company",
  "location": "Oslo, Norway",
  "deadline": "2025-06-30",
  "tags": [
    "Development",
    "Design",
    "UI/UX"
  ]
}
-->
