// local
import { db } from '@db/index';
import * as schema from '@db/schema';
// external
import { eq, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const placeholder_state_user_id = 'u10869961796'; // a standin state for the users id which will be fetched on login

	// Get the specific user profile that matches the user ID
	const userProfile = await db
		.select()
		.from(schema.userProfiles)
		.where(eq(schema.userProfiles.userId, placeholder_state_user_id))
		.limit(1);

	// Optionally get the user data as well
	const user = await db
		.select()
		.from(schema.users)
		.where(eq(schema.users.id, placeholder_state_user_id))
		.limit(1);

	let profileStructure = user[0].userType; // > can be removed

	//* using query
	const favoriteProjects = {
		favoriteProjects: await db.query.favoriteProjects.findMany({
			where: (favoriteProjects, { eq, and }) =>
				and(eq(favoriteProjects.userId, placeholder_state_user_id))
		})
	};
	const ownedProjects = {
		activeProjects: await db.query.projects.findMany({
			where: (projects, { eq, and }) =>
				and(eq(projects.clientId, placeholder_state_user_id), eq(projects.isActive, true))
		}),
		closedProjects: await db.query.projects.findMany({
			where: (projects, { eq, and }) =>
				and(eq(projects.clientId, placeholder_state_user_id), eq(projects.isActive, false))
		})
	};
	const vendoredProjects = {
		activeProjects: await db.query.projects.findMany({
			where: (projects, { eq, and }) =>
				and(eq(projects.vendorId, placeholder_state_user_id), eq(projects.isActive, true))
		}),
		closedProjects: await db.query.projects.findMany({
			where: (projects, { eq, and }) =>
				and(eq(projects.vendorId, placeholder_state_user_id), eq(projects.isActive, false))
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
