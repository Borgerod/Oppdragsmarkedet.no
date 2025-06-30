// local
import { db } from '@db/index';
import * as schema from '@db/schema';
// external
import { eq, and, inArray, or, isNotNull, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const placeholder_state_user_id = 'u10869961796'; // a standin state for the user id which will be fetched on login

	// Get the specific user profile that matches the user ID
	const userProfile = await db
		.select()
		.from(schema.userProfiles)
		.where(eq(schema.userProfiles.userId, placeholder_state_user_id))
		.limit(1);

	// Optionally get the user data as well
	const user = await db
		.select()
		.from(schema.user)
		.where(eq(schema.user.id, placeholder_state_user_id))
		.limit(1);
	let profileStructure = user[0].userType; // > can be removed

	// Get favorite projects first (without relations)
	const favoriteProjectsData = await db
		.select()
		.from(schema.favoriteProjects)
		.where(eq(schema.favoriteProjects.userId, placeholder_state_user_id));

	// Fetch all project IDs from favorite projects
	const projectIds = favoriteProjectsData.map((fp) => fp.projectId);

	// Fetch projects separately
	const projectsData =
		projectIds.length > 0
			? await db.select().from(schema.projects).where(inArray(schema.projects.id, projectIds))
			: [];

	// Create a Map of projects by ID for easy lookup
	const projectsMap = new Map(projectsData.map((project) => [project.id, project]));

	// Combine the data manually
	const favoritesWithRefs = favoriteProjectsData.map((favorite) => ({
		...favorite,
		project: projectsMap.get(favorite.projectId) || null
	}));
	// Create the structure with the project data embedded
	const favoriteProjects = {
		favoriteProjects: favoritesWithRefs
	};

	// Helper function to create an order-by expression
	const getSortedProjects = async (whereClause: any) => {
		// First get all projects matching the criteria
		const projects = await db.query.projects.findMany({
			where: whereClause
		});

		// Then sort them in JavaScript
		return projects.sort((a, b) => {
			// First by state (draft always first)
			const stateOrder: Record<string, number> = {
				draft: 0,
				posted: 1,
				in_progress: 2
			};

			const aStateValue = stateOrder[a.state || ''] ?? 3;
			const bStateValue = stateOrder[b.state || ''] ?? 3;

			if (aStateValue !== bStateValue) {
				return aStateValue - bStateValue;
			}

			// Then by appropriate date
			let aDate: string | null = null;
			let bDate: string | null = null;

			if (a.state === 'posted') {
				aDate = a.postDate;
			} else if (a.state === 'in_progress') {
				aDate = a.startDate;
			} else {
				aDate = a.postDate;
			}

			if (b.state === 'posted') {
				bDate = b.postDate;
			} else if (b.state === 'in_progress') {
				bDate = b.startDate;
			} else {
				bDate = b.postDate;
			}

			// For descending order (newest first)
			if (!aDate) return 1;
			if (!bDate) return -1;
			return new Date(bDate).getTime() - new Date(aDate).getTime();
		});
	};

	const ownedProjects = {
		activeProjects: await getSortedProjects(
			and(
				eq(schema.projects.clientId, placeholder_state_user_id),
				or(eq(schema.projects.state, 'draft'), eq(schema.projects.isActive, true))
			)
		),
		closedProjects: await db.query.projects.findMany({
			where: (projects, { eq, and, or }) =>
				and(
					eq(projects.clientId, placeholder_state_user_id),
					eq(projects.isActive, false),
					or(eq(projects.state, 'completed'), eq(projects.state, 'cancelled'))
				),
			orderBy: (projects, { desc }) => [desc(projects.finishDate)]
		})
	};

	const vendoredProjects = {
		activeProjects: await getSortedProjects(
			and(
				isNotNull(schema.projects.vendorId),
				eq(schema.projects.vendorId, placeholder_state_user_id),
				eq(schema.projects.isActive, true)
			)
		),
		closedProjects: await db.query.projects.findMany({
			where: (projects, { eq, and, or, isNotNull }) =>
				and(
					isNotNull(projects.vendorId),
					eq(projects.vendorId, placeholder_state_user_id),
					or(eq(projects.state, 'completed'), eq(projects.state, 'cancelled'))
				),
			orderBy: (projects, { desc }) => [desc(projects.finishDate)]
		})
	};
	//> /_______________ WORK AREA  _______________

	return {
		favoriteProjects: favoriteProjects,
		ownedProjects: ownedProjects,
		vendoredProjects: vendoredProjects,
		profileStructure: profileStructure, // > can be removed
		user: user[0] || null,
		userProfile: userProfile[0] || null
	};
};
