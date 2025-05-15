# Optimized Database Schema for Oppdragsmarkedet.no

This document explains the optimized database schema design for the Oppdragsmarkedet.no platform.

## Key Improvements

### 1. Consolidated Projects Table

The new schema uses a single `projects` table as the source of truth for all project data, regardless of project status:

- **Eliminates data duplication** that existed across multiple tables (`_projects`, `activeProjects`, `completedProjects`)
- **Simplifies state transitions** through a status enum field
- **Single query path** for all project-related operations

### 2. Type Safety with Enums

- `projectStatusEnum`: Enforces valid project status values
- `userTypeEnum`: Ensures consistent user types
- `userRoleEnum`: Ensures consistent user roles
- `transactionSourceEnum` and `transactionTypeEnum`: Standardize financial transaction types

### 3. Normalized Data Structure

Data that was previously stored in JSON arrays or nested objects is now properly normalized:

- **Project favorites** are now in a dedicated table with proper references
- **Followed clients** in a separate table with proper foreign keys
- **Profile tags** as explicit boolean fields for easier querying
- **Financial transactions** properly modeled

### 4. Explicit Relationships via Drizzle ORM

Relations are explicitly defined using Drizzle's `relations` function:

```javascript
export const usersRelations = relations(users, ({ one, many }) => ({
	profile: one(profiles, {
		fields: [users.id],
		references: [profiles.user_id]
	})
	// ... more relationships
}));
```

This provides:

- Better TypeScript integration
- Query builder functionality
- Clearer relationship documentation

### 5. ID Structure Maintained

The schema preserves your existing ID structure format:

```
(id_type char)(user_role_extention char)[unique number](user_role char)(role_class char)[area_number]
```

For example: `u10000023cp` for a private client user.

## Key Tables

### Core Tables

- `users`: Basic authentication and identification
- `profiles`: Personal information and ratings
- `projects`: Consolidated project information

### Vendor-specific Tables

- `vendorProfiles`: Business-specific vendor information
- `socialMedia`: Vendor social media links

### Project Interaction Tables

- `projectFavorites`: Which users have favorited which projects
- `savedFilters`: Saved search criteria
- `followedClients`: Vendor-client follow relationships

### Financial Tables

- `wallets`: User balance tracking
- `financialTransactions`: Record of all financial activities
- `walletTransactions`: Transfers between wallets
- `financialStats`: User financial summaries

## Usage Examples

Sample queries are included as commented code at the bottom of the schema file:

- Getting project details with client and vendor information
- Retrieving active projects for a vendor
- Getting financial summaries

## Migration Considerations

When moving to this schema:

1. All existing project data should be consolidated into the single `projects` table
2. JSON data in the old schema should be unpacked into the appropriate normalized tables
3. Update application queries to use the new schema structure and relations
