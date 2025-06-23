// local
import { db } from '@db/index';
import * as schema from '@db/schema';
// external
import {
	eq,
	and,
	inArray,
	or,
	isNotNull,
	sql,
	arrayContained,
	arrayContains,
	not,
	gte,
	lte
} from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail as kitFail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	// TODO [ ] make it automaticlly fetch user-location and workfield then apply that as a filter.

	// Get the specific user profile that matches the user ID
	const projects = await db.select().from(schema.projects);

	return {
		projects: projects || null
	};
};

// It worked.
// can you do this for workfield (is name category in db)

export const actions = {
	filterProjects: async ({ request }) => {
		try {
			const formData = await request.formData();
			// Handle array fields properly by using getAll() for known array fields
			const arrayFields = [
				'experienceRequirements_include',
				'experienceRequirements_exclude',
				'jobAttributes_include',
				'jobAttributes_exclude',
				'clientRole'
			];

			// Single field examples: textSearch, location, category, budget_min, budget_max
			const filterData: Record<string, string | string[]> = {};

			// Process all form entries
			for (const [key, value] of formData.entries()) {
				if (arrayFields.includes(key)) {
					// For array fields, use getAll() to get all values
					filterData[key] = formData.getAll(key) as string[];
				} else {
					// For single fields, use the regular approach
					filterData[key] = value as string;
				}
			}

			console.log('formData: ', formData);
			console.log('filterData: ', filterData);

			// Build conditions for exact positional matching using SPLIT_PART
			const locationConditions: any[] = [];
			const workfieldConditions: any[] = [];
			const clientRoleConditions: any[] = [];

			//* Location  - Use SPLIT_PART for flexible matching

			// Parse location string to extract meaningful parts with position awareness
			const locationInput = filterData.location?.toString() || '';
			const locationParts = locationInput.split(',').map((part) => part.trim());
			if (locationParts.some((part) => part.length > 0)) {
				locationParts.forEach((part, index) => {
					if (part.length > 0) {
						locationConditions.push(
							sql`LOWER(TRIM(SPLIT_PART(${schema.projects.location}, ',', ${index + 1}))) = LOWER(${part})`
						);
					}
				});
			}

			//* Category  - exact match on category field
			if (filterData.category && filterData.category.length > 0) {
				// ?todo: if category=empty: trigger saftey function that saves location, IP and other data. then notify admin and block user. Note: must add to cookie-accept
				workfieldConditions.push(
					sql`LOWER(${schema.projects.category}) = LOWER(${filterData.category})`
				);
			}

			//* ClientRole  - exact match on client_role field
			if (
				filterData.clientRole &&
				Array.isArray(filterData.clientRole) &&
				filterData.clientRole.length > 0
			) {
				clientRoleConditions.push(inArray(schema.projects.clientRole, filterData.clientRole));
			} else if (typeof filterData.clientRole === 'string' && filterData.clientRole.length > 0) {
				clientRoleConditions.push(eq(schema.projects.clientRole, filterData.clientRole));
			}

			// Combine all conditions
			const allConditions = [
				...locationConditions,
				...workfieldConditions,
				...clientRoleConditions
			];

			// * BudgetRange INCLUDE
			filterData.currency;
			//TODO add currency
			const budgetMin = filterData.budget_min ? Number(filterData.budget_min) : undefined;
			const budgetMax = filterData.budget_max ? Number(filterData.budget_max) : undefined;

			if (budgetMin !== undefined && !isNaN(budgetMin)) {
				allConditions.push(gte(schema.projects.budget, budgetMin));
			}
			if (budgetMax !== undefined && !isNaN(budgetMax)) {
				allConditions.push(lte(schema.projects.budget, budgetMax));
			}

			//* ExperienceRequirements INCLUDE (from experienceRequirements_include)
			if (
				filterData.experienceRequirements_include &&
				Array.isArray(filterData.experienceRequirements_include) &&
				filterData.experienceRequirements_include.length > 0
			) {
				allConditions.push(
					arrayContains(
						schema.projects.experienceRequirements,
						filterData.experienceRequirements_include
					)
				);
			}
			//! ExperienceRequirements INCLUDE (from experienceRequirements_include)

			if (
				filterData.experienceRequirements_exclude &&
				Array.isArray(filterData.experienceRequirements_exclude) &&
				filterData.experienceRequirements_exclude.length > 0
			) {
				allConditions.push(
					not(
						arrayContains(
							schema.projects.experienceRequirements,
							filterData.experienceRequirements_exclude
						)
					)
				);
			}

			//* jobAttributes INCLUDE (from jobAttributes_include)
			if (
				filterData.jobAttributes_include &&
				Array.isArray(filterData.jobAttributes_include) &&
				filterData.jobAttributes_include.length > 0
			) {
				allConditions.push(
					arrayContains(schema.projects.jobAttributes, filterData.jobAttributes_include)
				);
			}
			//! jobAttributes INCLUDE (from jobAttributes_include)

			if (
				filterData.jobAttributes_exclude &&
				Array.isArray(filterData.jobAttributes_exclude) &&
				filterData.jobAttributes_exclude.length > 0
			) {
				allConditions.push(
					not(arrayContains(schema.projects.jobAttributes, filterData.jobAttributes_exclude))
				);
			}

			// > FINAL, MAKE FILTERED REQUEST
			const filteredProjects = await db
				.select()
				.from(schema.projects)
				.where(allConditions.length > 0 ? and(...allConditions) : sql`1 = 1`);

			console.log(`Found ${filteredProjects.length} projects matching filter criteria`);
			console.log('filteredProjects: ', filteredProjects);

			return {
				success: true,
				projects: filteredProjects
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// Enhanced FormData debugging output
// console.log('\n==================================================');
// console.log('📝 FILTER FORM DATA RECEIVED ON SERVER');
// console.log('==================================================');

// 	// Print all FormData entries individually
// 	console.log('\n📋 FORM DATA ENTRIES:');
// 	const formDataEntries = Array.from(formData.entries());
// 	if (formDataEntries.length === 0) {
// 		console.log('   [No entries found in FormData]');
// 	} else {
// 		formDataEntries.forEach(([key, value]) => {
// 			console.log(`   ${key}: ${value}`);
// 		});
// 	}

// 	// Print array-type fields (fields that appear multiple times)
// 	console.log('\n📑 ARRAY-TYPE FIELDS:');
// 	const arrayFields = new Set();
// 	formDataEntries.forEach(([key]) => {
// 		if (formData.getAll(key).length > 1) {
// 			arrayFields.add(key);
// 		}
// 	});

// 	if (arrayFields.size === 0) {
// 		console.log('   [No array fields found]');
// 	} else {
// 		Array.from(arrayFields).forEach((field) => {
// 			const fieldName = String(field);
// 			console.log(`   ${fieldName}: ${JSON.stringify(formData.getAll(fieldName))}`);
// 		});
// 	}

// 	// Print the consolidated object
// 	console.log('\n🔍 CONSOLIDATED FILTER DATA OBJECT:');
// 	console.log(JSON.stringify(filterData, null, 2));
// 	console.log('==================================================\n');

// 	// Build the query conditions based on filterData
// 	const conditions = [];

// 	// Category filter
// 	if (filterData.category) {
// 		conditions.push(eq(schema.projects.category, filterData.category.toString()));
// 	}

// 	// Client role filter
// 	if (filterData.clientRole) {
// 		conditions.push(eq(schema.projects.clientRole, filterData.clientRole.toString()));
// 	}

// 	// Location filter
// 	if (filterData.location) {
// 		conditions.push(sql`${schema.projects.location} LIKE ${`%${filterData.location}%`}`);
// 	}

// 	// Budget range filter
// 	if (filterData.minBudget) {
// 		conditions.push(sql`${schema.projects.budget} >= ${Number(filterData.minBudget)}`);
// 	}

// 	if (filterData.maxBudget) {
// 		conditions.push(sql`${schema.projects.budget} <= ${Number(filterData.maxBudget)}`);
// 	}

// 	// Experience requirements filter
// 	if (filterData.experienceRequirements) {
// 		const expReqs = Array.isArray(filterData.experienceRequirements)
// 			? filterData.experienceRequirements
// 			: [filterData.experienceRequirements];

// 		conditions.push(sql`${schema.projects.experienceRequirements} && ${JSON.stringify(expReqs)}`);
// 	}

// 	// Job attributes filter
// 	if (filterData.jobAttributes) {
// 		const jobAttrs = Array.isArray(filterData.jobAttributes)
// 			? filterData.jobAttributes
// 			: [filterData.jobAttributes];

// 		conditions.push(sql`${schema.projects.jobAttributes} && ${JSON.stringify(jobAttrs)}`);
// 	}

// 	// Date filters
// 	if (filterData.startDate) {
// 		conditions.push(sql`${schema.projects.postDate} >= ${filterData.startDate.toString()}`);
// 	}

// 	if (filterData.endDate) {
// 		conditions.push(sql`${schema.projects.postDate} <= ${filterData.endDate.toString()}`);
// 	}

// 	// // Project state filter
// 	// if (filterData.state) {
// 	// 	conditions.push(eq(schema.projects.state, filterData.state.toString()));
// 	// }

// 	// Project state filter
// 	if (filterData.state) {
// 		const stateValue = filterData.state.toString() as
// 			| 'draft'
// 			| 'posted'
// 			| 'in_progress'
// 			| 'completed'
// 			| 'cancelled';
// 		conditions.push(eq(schema.projects.state, stateValue));
// 	}
// 	// Construct and execute the query
// 	try {
// 		const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions);

// 		const query =
// 			conditions.length > 0
// 				? db.select().from(schema.projects).where(whereClause)
// 				: db.select().from(schema.projects);

// 		// Execute the query
// 		const results = await query;

// 		return {
// 			success: true,
// 			projects: results
// 		};
// 	} catch (error) {
// 		console.error('Error  projects:', error);
// 		return kitFail(500, {
// 			success: false,
// 			message: 'Failed to filter projects',
// 			error: error instanceof Error ? error.message : 'Unknown error'
// 		});
// 	}
// }
// } satisfies Actions;
