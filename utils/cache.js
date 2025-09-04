// Simple in-memory cache for pet calculations
import { API_CONFIG } from '../config/constants.js';

class CalculationCache {
    constructor(maxSize = 1000, ttl = 5 * 60 * 1000) { // 5 minutes default TTL
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }

    /**
     * Generate cache key from pet calculation parameters
     * @param {string} petKey - Pet identifier
     * @param {number} weight - Pet weight
     * @param {string} modifierType - Modifier type
     * @returns {string} Cache key
     */
    _generateKey(petKey, weight, modifierType) {
        return `${petKey}:${weight}:${modifierType || 'none'}`;
    }

    /**
     * Get cached calculation result
     * @param {string} petKey - Pet identifier
     * @param {number} weight - Pet weight
     * @param {string} modifierType - Modifier type
     * @returns {string|null} Cached result or null if not found/expired
     */
    get(petKey, weight, modifierType) {
        const key = this._generateKey(petKey, weight, modifierType);
        const item = this.cache.get(key);

        if (!item) {
            return null;
        }

        // Check if item has expired
        if (Date.now() > item.expires) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    /**
     * Store calculation result in cache
     * @param {string} petKey - Pet identifier
     * @param {number} weight - Pet weight
     * @param {string} modifierType - Modifier type
     * @param {string} result - Calculation result
     */
    set(petKey, weight, modifierType, result) {
        const key = this._generateKey(petKey, weight, modifierType);

        // Remove oldest items if cache is full
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            value: result,
            expires: Date.now() + this.ttl
        });
    }

    /**
     * Clear expired items from cache
     */
    cleanup() {
        const now = Date.now();
        for (const [key, item] of this.cache.entries()) {
            if (now > item.expires) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Get cache statistics
     * @returns {Object} Cache statistics
     */
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            ttl: this.ttl
        };
    }

    /**
     * Clear all cached items
     */
    clear() {
        this.cache.clear();
    }
}

// Create singleton cache instance
export const calculationCache = new CalculationCache();

// Clean up expired items every 5 minutes
setInterval(() => {
    calculationCache.cleanup();
}, 5 * 60 * 1000);
