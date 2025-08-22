# GitHub Copilot Instructions for GAG Pets Project

## Project Overview
This is a pet management application that handles various pet types and their abilities. The project focuses on pet data management and related functionality.

## Project Structure

### Key Directories
- `/pets/` - **IMPORTANT**: Contains all pet ability data and pet-related information
  - This is the primary data source for pet abilities, stats, and characteristics
  - All pet-related queries should reference data from this folder
  - IGNORE the /Archive folder

## Data Location Guidelines

### Pet Data
- **All pet ability data is stored in the `/pets/` folder**
- When working with pet abilities, stats, or characteristics, always check the pets folder first
- Pet data files may include JSON, YAML, or other structured data formats
- Each pet type may have its own subdirectory or file within the pets folder

## Coding Conventions

### General Guidelines
- Use consistent naming conventions throughout the project
- Maintain clear separation between data and logic
- Document any new pet abilities or data structures
- Follow existing file organization patterns

### File Naming
- Use descriptive names for pet-related files
- Maintain consistency with existing naming patterns in the pets folder
- Use appropriate file extensions for data files (.json, .yaml, .ts, etc.)

### Data Management
- When adding new pet data, place it in the appropriate location within the pets folder
- Ensure data consistency across all pet-related files
- Validate data structures when modifying pet abilities

## Development Workflow

### Before Making Changes
1. Check the pets folder for existing data structures
2. Understand the current pet ability system
3. Ensure compatibility with existing pet data

### When Adding Features
1. Consider how new features interact with pet data
2. Update relevant files in the pets folder if needed
3. Maintain data integrity across the system

### Testing
- Test pet ability functionality thoroughly
- Verify data consistency in the pets folder
- Ensure backward compatibility with existing pet data

## Common Tasks

### Working with Pet Abilities
- Always reference the pets folder for current ability data
- Check for existing ability definitions before creating new ones
- Maintain consistency in ability naming and structure

### Data Updates
- Update pet data in the pets folder when needed
- Ensure all related files are updated consistently
- Document any breaking changes to pet data structures

## Important Notes
- The pets folder is the single source of truth for pet ability data
- Always preserve existing pet data when making changes
- Consider the impact of changes on the overall pet system
- Maintain clear documentation for any new pet features or abilities

## Questions to Ask
When working on pet-related features, consider:
- Does this change affect existing pet data in the pets folder?
- Are there similar abilities or features already defined?
- How does this integrate with the current pet system?
- Should this data be stored in the pets folder?