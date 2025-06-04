// local
import { db } from '@db/index';
import * as schema from '@db/schema';
// external
import { eq, and, inArray, or, isNotNull, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail as kitFail } from '@sveltejs/kit';
export const load: PageServerLoad = async () => {
	// Get the specific user profile that matches the user ID
	const projects = await db.select().from(schema.projects);

	// const filterValues =

	return {
		projects: projects || null
	};
};

export const actions = {
	filterProjects: async ({ request }) => {
		const formData = await request.formData();
		const filterData = Object.fromEntries(formData);

		console.log('Filter data received:', filterData);

		// Build the query conditions based on filterData
		const conditions = [];

		// Category filter
		if (filterData.category) {
			conditions.push(eq(schema.projects.category, filterData.category.toString()));
		}

		// Client role filter
		if (filterData.clientRole) {
			conditions.push(eq(schema.projects.clientRole, filterData.clientRole.toString()));
		}

		// Location filter
		if (filterData.location) {
			conditions.push(sql`${schema.projects.location} LIKE ${`%${filterData.location}%`}`);
		}

		// Budget range filter
		if (filterData.minBudget) {
			conditions.push(sql`${schema.projects.budget} >= ${Number(filterData.minBudget)}`);
		}

		if (filterData.maxBudget) {
			conditions.push(sql`${schema.projects.budget} <= ${Number(filterData.maxBudget)}`);
		}

		// Experience requirements filter
		if (filterData.experienceRequirements) {
			const expReqs = Array.isArray(filterData.experienceRequirements)
				? filterData.experienceRequirements
				: [filterData.experienceRequirements];

			conditions.push(sql`${schema.projects.experienceRequirements} && ${JSON.stringify(expReqs)}`);
		}

		// Job attributes filter
		if (filterData.jobAttributes) {
			const jobAttrs = Array.isArray(filterData.jobAttributes)
				? filterData.jobAttributes
				: [filterData.jobAttributes];

			conditions.push(sql`${schema.projects.jobAttributes} && ${JSON.stringify(jobAttrs)}`);
		}

		// Date filters
		if (filterData.startDate) {
			conditions.push(sql`${schema.projects.postDate} >= ${filterData.startDate.toString()}`);
		}

		if (filterData.endDate) {
			conditions.push(sql`${schema.projects.postDate} <= ${filterData.endDate.toString()}`);
		}

		// Project state filter
		if (filterData.state) {
			conditions.push(eq(schema.projects.state, filterData.state.toString()));
		}

		// Construct and execute the query
		try {
			let query = db.select().from(schema.projects);

			// Apply filters if any conditions exist
			if (conditions.length > 0) {
				query = query.where(and(...conditions));
			}

			// Execute the query
			const results = await query;

			return {
				success: true,
				projects: results
			};
		} catch (error) {
			console.error('Error filtering projects:', error);
			return kitFail(500, {
				success: false,
				message: 'Failed to filter projects',
				error: error instanceof Error ? error.message : 'Unknown error'
			});
		}
	}
} satisfies Actions;
