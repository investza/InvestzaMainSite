# Requirements Document

## Introduction

The Investza website's preloader component is getting stuck at 99% progress, preventing users from accessing the main application. This creates a poor user experience where users see the loading animation complete but the application never loads. The issue stems from overly complex asset loading detection logic that prevents the progress from reaching 100%.

## Glossary

- **Preloader**: A loading screen component that displays progress while the application initializes
- **Asset Loading**: The process of loading images, stylesheets, and other resources required by the application
- **Progress Bar**: Visual indicator showing loading completion percentage from 0% to 100%
- **Curtain Animation**: The final animation that lifts the preloader screen to reveal the main application
- **Video Preloader**: Background video that plays during the loading process

## Requirements

### Requirement 1

**User Story:** As a user visiting the Investza website, I want the preloader to complete successfully and show the main application, so that I can access the website content without getting stuck on the loading screen.

#### Acceptance Criteria

1. WHEN the preloader starts THEN the system SHALL display progress from 0% to 100% within a reasonable timeframe
2. WHEN the progress reaches 100% THEN the system SHALL trigger the curtain lift animation to reveal the main application
3. WHEN the preloader video ends THEN the system SHALL not prevent the completion process from proceeding
4. WHEN assets are still loading THEN the system SHALL not indefinitely block progress at 99%
5. WHEN the preloader completes THEN the system SHALL call the onComplete callback to hide the preloader and show the main application

### Requirement 2

**User Story:** As a user with slow internet connection, I want the preloader to complete even if some assets haven't fully loaded, so that I can still access the website functionality.

#### Acceptance Criteria

1. WHEN asset loading takes longer than expected THEN the system SHALL proceed with completion after a maximum timeout
2. WHEN some non-critical assets fail to load THEN the system SHALL not prevent the application from starting
3. WHEN the preloader reaches maximum wait time THEN the system SHALL force completion regardless of asset status
4. WHEN network conditions are poor THEN the system SHALL provide a fallback completion mechanism
5. WHEN asset loading detection fails THEN the system SHALL use time-based completion as backup

### Requirement 3

**User Story:** As a developer maintaining the preloader, I want simplified and reliable completion logic, so that the preloader works consistently across different browsers and network conditions.

#### Acceptance Criteria

1. WHEN implementing completion logic THEN the system SHALL use a single reliable trigger mechanism
2. WHEN checking for completion readiness THEN the system SHALL not depend on complex asset detection that can fail
3. WHEN the video ends THEN the system SHALL immediately proceed to completion without additional conditions
4. WHEN progress animation completes THEN the system SHALL not require additional asset loading verification
5. WHEN the preloader initializes THEN the system SHALL set a maximum duration timeout as a safety mechanism