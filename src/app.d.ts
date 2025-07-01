// // See https://svelte.dev/docs/kit/types#app.d.ts
// // for information about these interfaces
// declare global {
// 	namespace App {
// 		// interface Error {}
// 		interface Locals {
// 			user: any;
// 			session: any;
// 			email?: string;
// 			name?: string;
// 			image?: string;
// 		}
// 		// interface PageData {}
// 		// interface PageState {}
// 		// interface Platform {}
// 	}
// }
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: any;
			session: any;
			email?: string;
			name?: string;
			image?: string;
		}
		interface PageData {
			user?: any;
		}
		// interface PageState {}
		// interface Platform {}
	}
}
export {};
