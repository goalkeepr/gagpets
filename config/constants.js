// Configuration constants for the pet calculator application

/**
 * Server configuration
 */
export const SERVER_CONFIG = {
    DEFAULT_PORT: 8029,
    DEFAULT_HOST: '0.0.0.0',
    STATIC_FILES_CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in ms
    API_RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes in ms
    API_RATE_LIMIT_MAX_REQUESTS: 100
};

/**
 * Pet calculation constraints
 */
export const PET_CONSTRAINTS = {
    MIN_WEIGHT: 0.88,
    MAX_WEIGHT: 114.40,
    DEFAULT_WEIGHT: 10.00,
    MIN_AGE: 1,
    MAX_AGE: 100,
    DEFAULT_AGE: 50
};

/**
 * Time formatting constants
 */
export const TIME_CONSTANTS = {
    SECONDS_PER_MINUTE: 60,
    SECONDS_PER_HOUR: 3600,
    MINUTES_PER_HOUR: 60
};

/**
 * Modifier configuration
 */
export const MODIFIER_CONFIG = {
    SPECTRAL_MODIFIER: 0.08,
    GOLDEN_MULTIPLIER: 0.1,
    RAINBOW_MULTIPLIER: 0.2,
    NIGHTMARE_MULTIPLIER: 0.22,
    MIN_CALCULATION_TIME: 1
};

/**
 * API response configuration
 */
export const API_CONFIG = {
    MAX_PETS_PER_PAGE: 100,
    DEFAULT_PETS_PER_PAGE: 20,
    RESPONSE_TIMEOUT: 5000
};

/**
 * Frontend configuration
 */
export const UI_CONFIG = {
    DEBOUNCE_DELAY_MS: 300,
    MOBILE_BREAKPOINT: 768,
    DESKTOP_BREAKPOINT: 1024
};

/**
 * File size limits for optimization
 */
export const FILE_LIMITS = {
    MAX_PET_CATEGORY_LINES: 500,
    MAX_SINGLE_FILE_LINES: 300,
    WARN_FILE_SIZE_LINES: 200
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
    INVALID_WEIGHT: 'Weight must be a number between 0.88 and 114.40',
    INVALID_AGE: 'Age must be a number between 1 and 100',
    PET_NOT_FOUND: 'Pet not found, please choose from the available pets',
    CALCULATION_FAILED: 'Failed to calculate pet ability',
    MODULE_LOAD_FAILED: 'Failed to load pet data'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
    DATA_LOADED: 'Pet data loaded successfully',
    CALCULATION_COMPLETE: 'Pet ability calculated',
    SERVER_STARTED: 'Server started successfully'
};
