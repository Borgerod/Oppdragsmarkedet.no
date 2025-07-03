import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		// Basic validation
		if (!email || !password) {
			return fail(400, {
				email,
				missing: true,
				message: 'Email and password are required'
			});
		}

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				email,
				invalid: true,
				message: 'Invalid form data'
			});
		}

		// Basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				email,
				invalid: true,
				message: 'Please enter a valid email address'
			});
		}

		try {
			// TODO [ ]: Replace this with your actual authentication logic
			// This is a placeholder implementation

			// Example authentication check (replace with your actual auth system)
			const isValidUser = await authenticateUser(email, password);

			if (!isValidUser) {
				return fail(400, {
					email,
					credentials: true,
					message: 'Invalid email or password'
				});
			}

			// Set authentication cookie or session
			// TODO [ ]: Replace with your actual session/auth token logic
			cookies.set('session', 'authenticated', {
				path: '/',
				httpOnly: true,
				secure: !dev,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});

			console.log('🔐 CUSTOM LOGIN SUCCESS:');
			console.log('📧 Email:', email);
			console.log('⏰ Login Time:', new Date().toISOString());

			// Redirect to dashboard or home page
			throw redirect(303, '/');
		} catch (error) {
			if (error && typeof error === 'object' && 'status' in error && error.status === 303) {
				// Re-throw redirect
				throw error;
			}

			console.error('Login error:', error);
			return fail(500, {
				email,
				error: true,
				message: 'An error occurred during login. Please try again.'
			});
		}
	}
};

/**
 * Placeholder authentication function
 * TODO [ ]: Replace with your actual authentication logic
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
async function authenticateUser(email: string, password: string) {
	// This is a placeholder - replace with your actual authentication
	// For example, check against your database using Drizzle ORM

	// Temporary demo logic - remove this
	if (email === 'demo@example.com' && password === 'demo123') {
		return true;
	}

	// Add your actual authentication logic here
	// Example with database:
	// const user = await db.select().from(user).where(eq(user.email, email)).limit(1);
	// if (user.length === 0) return false;
	// return await bcrypt.compare(password, user[0].passwordHash);

	return false;
}
