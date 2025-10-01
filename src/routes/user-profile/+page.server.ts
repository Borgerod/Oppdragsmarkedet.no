import { db } from '@db/index';
import * as schema from '@db/schema';
import { eq, and, inArray, or, isNotNull } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

// async function getVendorProfileByUserId(userId: string) {
// 	const vendorProfile = await db.query.vendorProfiles.findFirst({
// 		where: (vendorProfiles, { eq }) => eq(vendorProfiles.userId, userId)
// 	});
// 	return vendorProfile;
// }
// async function getEmployeeProfileByUserId(userId: string) {
// 	const employeeProfile = await db.query.employeeProfiles.findFirst({
// 		where: (employeeProfiles, { eq }) => eq(employeeProfiles.userId, userId)
// 	});
// 	return employeeProfile;
// }

export const load: PageServerLoad = async (event) => {
	const parentData = await event.parent();
	const user = parentData.user;

	if (!user) {
		return {
			favoriteProjects: { favoriteProjects: [] },
			ownedProjects: { activeProjects: [], closedProjects: [] },
			vendoredProjects: { activeProjects: [], closedProjects: [] },
			profileStructure: null,
			user: null,
			userProfile: null,
			vendorProfile: null,
			employeeProfile: null
		};
	}

	const userProfile = await db
		.select()
		.from(schema.userProfiles)
		.where(eq(schema.userProfiles.userId, user.id))
		.limit(1);

	const vendorProfile =
		user.userType === 'vendor'
			? await db.query.vendorProfiles.findFirst({
					where: (vendorProfiles, { eq }) => eq(vendorProfiles.userId, user.id)
				})
			: null;

	const employeeProfile =
		user.userType === 'employee'
			? await db.query.employeeProfiles.findFirst({
					where: (employeeProfiles, { eq }) => eq(employeeProfiles.userId, user.id)
				})
			: null;

	const userRow = await db.select().from(schema.user).where(eq(schema.user.id, user.id)).limit(1);

	const favoriteProjectsData = await db
		.select()
		.from(schema.favoriteProjects)
		.where(eq(schema.favoriteProjects.userId, user.id));

	const projectIds = favoriteProjectsData.map((fp) => fp.projectId);

	const projectsData =
		projectIds.length > 0
			? await db.select().from(schema.projects).where(inArray(schema.projects.id, projectIds))
			: [];

	const projectsMap = new Map(projectsData.map((project) => [project.id, project]));

	const favoritesWithRefs = favoriteProjectsData.map((favorite) => ({
		...favorite,
		project: projectsMap.get(favorite.projectId) || null
	}));
	const favoriteProjects = {
		favoriteProjects: favoritesWithRefs
	};

	const getSortedProjects = async (whereClause: any) => {
		const projects = await db.query.projects.findMany({
			where: whereClause
		});
		const stateOrder: Record<string, number> = {
			draft: 0,
			posted: 1,
			in_progress: 2
		};
		return projects.sort((a, b) => {
			const aStateValue = stateOrder[a.state || ''] ?? 3;
			const bStateValue = stateOrder[b.state || ''] ?? 3;
			if (aStateValue !== bStateValue) return aStateValue - bStateValue;
			let aDate: string | null = null;
			let bDate: string | null = null;
			if (a.state === 'posted') aDate = a.postDate;
			else if (a.state === 'in_progress') aDate = a.startDate;
			else aDate = a.postDate;
			if (b.state === 'posted') bDate = b.postDate;
			else if (b.state === 'in_progress') bDate = b.startDate;
			else bDate = b.postDate;
			if (!aDate) return 1;
			if (!bDate) return -1;
			return new Date(bDate).getTime() - new Date(aDate).getTime();
		});
	};

	const ownedProjects = {
		activeProjects: await getSortedProjects(
			and(
				eq(schema.projects.clientId, user.id),
				or(eq(schema.projects.state, 'draft'), eq(schema.projects.isActive, true))
			)
		),
		closedProjects: await db.query.projects.findMany({
			where: (projects, { eq, and, or }) =>
				and(
					eq(projects.clientId, user.id),
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
				eq(schema.projects.vendorId, user.id),
				eq(schema.projects.isActive, true)
			)
		),
		closedProjects: await db.query.projects.findMany({
			where: (projects, { eq, and, or, isNotNull }) =>
				and(
					isNotNull(projects.vendorId),
					eq(projects.vendorId, user.id),
					or(eq(projects.state, 'completed'), eq(projects.state, 'cancelled'))
				),
			orderBy: (projects, { desc }) => [desc(projects.finishDate)]
		})
	};

	return {
		vendorProfile,
		employeeProfile,
		favoriteProjects: favoriteProjects,
		ownedProjects: ownedProjects,
		vendoredProjects: vendoredProjects,
		profileStructure: null,
		user: userRow[0] || null,
		userProfile: userProfile[0] || null
	};
};
