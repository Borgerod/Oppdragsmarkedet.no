import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');
		const confirmPassword = data.get('confirmPassword');
		const firstName = data.get('firstName');
		const lastName = data.get('lastName');

		// Basic validation
		if (!email || !password || !confirmPassword || !firstName || !lastName) {
			return fail(400, {
				email,
				firstName,
				lastName,
				missing: true,
				message: 'All fields are required'
			});
		}

		if (
			typeof email !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string' ||
			typeof firstName !== 'string' ||
			typeof lastName !== 'string'
		) {
			return fail(400, {
				email,
				firstName,
				lastName,
				invalid: true,
				message: 'Invalid form data'
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				email,
				firstName,
				lastName,
				invalid: true,
				message: 'Please enter a valid email address'
			});
		}

		// Password validation
		if (password.length < 8) {
			return fail(400, {
				email,
				firstName,
				lastName,
				invalid: true,
				message: 'Password must be at least 8 characters long'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				email,
				firstName,
				lastName,
				invalid: true,
				message: 'Passwords do not match'
			});
		}

		try {
			// Check if user already exists
			const existingUser = await checkUserExists(email);
			if (existingUser) {
				return fail(400, {
					email,
					firstName,
					lastName,
					exists: true,
					message: 'An account with this email already exists'
				});
			}

			// Create new user
			const newUser = await createUser({
				email,
				password,
				firstName,
				lastName
			});

			if (!newUser) {
				return fail(500, {
					email,
					firstName,
					lastName,
					error: true,
					message: 'Failed to create account. Please try again.'
				});
			}

			// Set authentication cookie
			cookies.set('session', 'authenticated', {
				path: '/',
				httpOnly: true,
				secure: !dev,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});

			// Redirect to dashboard or home page
			throw redirect(303, '/');
		} catch (error) {
			if (error && typeof error === 'object' && 'status' in error && error.status === 303) {
				// Re-throw redirect
				throw error;
			}

			console.error('Registration error:', error);
			return fail(500, {
				email,
				firstName,
				lastName,
				error: true,
				message: 'An error occurred during registration. Please try again.'
			});
		}
	}
};

/**
 * Check if user exists
 * TODO [ ]: Replace with your actual database check using Drizzle ORM
 * @param {string} email
 * @returns {Promise<boolean>}
 */
async function checkUserExists(email) {
	// Add your actual database check here
	// Example with Drizzle ORM:
	// const user = await db.select().from(user).where(eq(user.email, email)).limit(1);
	// return user.length > 0;

	return false; // Placeholder
}

/**
 * Create new user
 * TODO [ ]: Replace with your actual user creation logic using Drizzle ORM
 * @param {Object} userData
 * @param {string} userData.email
 * @param {string} userData.password
 * @param {string} userData.firstName
 * @param {string} userData.lastName
 * @returns {Promise<Object|null>}
 */
async function createUser({ email, password, firstName, lastName }) {
	// Add your actual user creation logic here
	// Example with Drizzle ORM and bcrypt:
	// const hashedPassword = await bcrypt.hash(password, 12);
	// const [newUser] = await db.insert(user).values({
	//   email,
	//   passwordHash: hashedPassword,
	//   firstName,
	//   lastName,
	//   createdAt: new Date()
	// }).returning();
	// return newUser;

	return { id: 1, email, firstName, lastName }; // Placeholder
}
