import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');

		// Basic validation
		if (!email) {
			return fail(400, {
				email,
				missing: true,
				message: 'Email address is required'
			});
		}

		if (typeof email !== 'string') {
			return fail(400, {
				email,
				invalid: true,
				message: 'Invalid form data'
			});
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				email,
				invalid: true,
				message: 'Please enter a valid email address'
			});
		}

		try {
			// Check if user exists
			const userExists = await checkUserExists(email);

			// Always return success to prevent email enumeration attacks
			// But only send email if user actually exists
			if (userExists) {
				await sendPasswordResetEmail(email);
			}

			return {
				success: true,
				email,
				message: 'Password reset email sent successfully'
			};
		} catch (error) {
			console.error('Password reset error:', error);
			return fail(500, {
				email,
				error: true,
				message: 'An error occurred while sending the reset email. Please try again.'
			});
		}
	}
};

/**
 * Check if user exists
 * TODO: Replace with your actual database check using Drizzle ORM
 * @param {string} email
 * @returns {Promise<boolean>}
 */
async function checkUserExists(email) {
	// Add your actual database check here
	// Example with Drizzle ORM:
	// const user = await db.select().from(user).where(eq(user.email, email)).limit(1);
	// return user.length > 0;

	// For demo purposes, return true for any email
	return true;
}

/**
 * Send password reset email
 * TODO: Replace with your actual email sending logic
 * @param {string} email
 * @returns {Promise<void>}
 */
async function sendPasswordResetEmail(email) {
	// Generate reset token and store it in database
	// const resetToken = generateResetToken();
	// const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
	//
	// await db.insert(passwordResets).values({
	//   email,
	//   token: resetToken,
	//   expiresAt
	// });
	//
	// const resetUrl = `${process.env.ORIGIN}/reset-password?token=${resetToken}`;
	//
	// Send email using your preferred email service (NodeMailer, SendGrid, etc.)
	// await sendEmail({
	//   to: email,
	//   subject: 'Password Reset - Oppdragsmarkedet',
	//   html: `
	//     <h1>Reset Your Password</h1>
	//     <p>Click the link below to reset your password:</p>
	//     <a href="${resetUrl}">Reset Password</a>
	//     <p>This link will expire in 1 hour.</p>
	//   `
	// });

	console.log(`Password reset email would be sent to: ${email}`);
}
