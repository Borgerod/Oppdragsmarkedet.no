import { fail, redirect } from '@sveltejs/kit';
import { db } from '@db/index';
import { user } from '@db/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ locals }) => {
	console.log('📋 LOADING REGISTRATION PAGE:');
	console.log('📧 Email from locals:', locals.email);
	console.log('👤 Name from locals:', locals.name);
	console.log('🖼️ Image from locals:', locals.image);
	console.log('🆔 User ID from locals:', locals.user?.id);

	return {
		user: locals.user,
		profile: {
			email: locals.email || null,
			name: locals.name || null,
			image: locals.image || null
		}
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const userType = data.get('userType') as string;
		const userRole = data.get('userRole') as string;
		const email = data.get('email') as string;
		const name = data.get('name') as string;
		const image = data.get('image') as string;

		console.log('DEBUG registration fields:', { id, userType, userRole, email, name, image });

		const missing = [];
		if (!id) missing.push('id');
		if (!userType) missing.push('userType');
		if (!userRole) missing.push('userRole');
		if (!email) missing.push('email');
		if (!name) missing.push('name');
		if (!image) missing.push('image');

		if (missing.length > 0) {
			return fail(400, { message: `Missing required fields: ${missing.join(', ')}` });
		}

		await db
			.update(user)
			.set({
				userType: userType as 'vendor' | 'client' | 'employee' | 'admin',
				userRole: userRole as 'private' | 'business' | 'government' | 'employee' | 'admin',
				isEmailVerified: true,
				email,
				name,
				image
			})
			.where(eq(user.id, id));

		console.log('🎉 REGISTRATION COMPLETED:');
		console.log('📧 Email:', email);
		console.log('👤 Name:', name);
		console.log('🖼️ Image:', image);
		console.log('🆔 ID:', id);
		console.log('🏷️ User Type:', userType);
		console.log('👔 User Role:', userRole);

		redirect(302, '/');
	}
};
