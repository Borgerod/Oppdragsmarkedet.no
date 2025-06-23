# SortBy Functionality Implementation

## Overview

Implemented comprehensive sorting functionality for the ProjectList component using Svelte 5 runes and modern reactive patterns.

## Features Implemented

### 1. Reactive Sorting System

- Uses `$derived` runes for automatic reactivity
- Sorts projects based on the `sortBy` prop
- Maintains pagination state across sort changes

### 2. Sorting Options Supported

All sorting options from the dropdown are fully implemented:

#### **Mest relevant** (Most Relevant)

- Prioritizes paid listings first
- Then sorts by listing priority score (if available)
- Default fallback sorting

#### **Publisert (ny til gammel)** (Published - New to Old)

- Sorts by publication date, newest first
- Handles Norwegian date formats (e.g., "15. Mai")
- Robust date parsing with fallbacks

#### **Publisert (gammel til ny)** (Published - Old to New)

- Sorts by publication date, oldest first
- Same robust date parsing as above

#### **Pris (høy til lav)** (Price - High to Low)

- Sorts by budget/price, highest first
- Handles missing budget values gracefully

#### **Pris (lav til høy)** (Price - Low to High)

- Sorts by budget/price, lowest first
- Handles missing budget values gracefully

#### **Nærmest** (Nearest/Closest)

- NOT MADE YET
  will:
- Sorts by profile.address(as gps coordinates) - user.gps-location
- smallest difference goes first.

#### **Frist (minst til størst)** (Nearest/Closest)

- Sorts by due date, nearest deadline first
- Uses the same robust date parsing system

#### **Frist (størst til minst** (Nearest/Closest)

- does the same but oppposite

#### **Mest populær** (Most Popular)

- Calculates popularity score from:
  - Favorited count
  - View count
  - Purchase count (weighted 2x)
- Sorts by highest popularity first

#### **Minst populær** (Least Popular)

- Same popularity calculation as above
- Sorts by lowest popularity first

### 3. Technical Implementation

#### Svelte 5 Runes Used

- `$derived` for reactive computed values
- `$state` for component state
- `$effect` for side effects
- `$props` for component props

#### Key Functions

- `getSortedProjects()`: Main sorting logic
- `parseDate()`: Robust date parsing helper
- `changePage()`: Pagination management

#### Reactive Variables

- `currentProjects`: Derived from props.projects
- `sortedProjects`: Automatically sorted based on sortBy prop
- `visibleProjects`: Paginated subset of sorted projects
- `totalPages`: Calculated from project count

### 4. Date Parsing Features

- Handles Norwegian date formats ("15. Mai", "5. Juni", etc.)
- Month name mapping for Norwegian months
- Fallback to standard date parsing
- Graceful handling of invalid dates

### 5. Error Handling

- Null/undefined safety for all data fields
- Default values for missing properties
- Graceful degradation when data is incomplete

## Usage

The sorting functionality is automatically triggered when the `sortBy` prop changes. The component maintains its current page position and updates the visible projects accordingly.

```svelte
<ProjectList
	projects={projectData}
	gridView={displaySettings.gridView}
	sortBy={displaySettings.sortBy}
/>
```

## Performance Considerations

- Uses `$derived` for efficient reactive updates
- Only re-sorts when projects or sortBy changes
- Maintains efficient pagination (12 items per page)
- Minimal re-renders due to Svelte 5's fine-grained reactivity

## Future Enhancements

- Could add more sophisticated relevance scoring
- Could implement user location-based distance sorting for "Nærmest"
- Could add custom sorting preferences
- Could implement sorting by multiple criteria
