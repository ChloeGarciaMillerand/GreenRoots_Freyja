// utils/auth.utils.ts

import type { User } from '../../@types/User.ts';

// Remove sensitive information from user object
export const sanitizeUser = (user: User): Omit<User, 'password'> => {
    const { password, ...sanitizedUser } = user;
    return sanitizedUser;
};

// Email validation utility
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
    isValid: boolean;
    errors: string[]
} => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (password.length > 128) {
        errors.push('Password must be less than 128 characters');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Generate random string for tokens or salts
export const generateRandomString = (length: number = 32): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const cryptoObj = globalThis.crypto || require('crypto');
    const randomValues = new Uint8Array(length);

    if (cryptoObj.getRandomValues) {
        cryptoObj.getRandomValues(randomValues);
    } else {
        // Fallback for Node.js
        const crypto = require('crypto');
        const buffer = crypto.randomBytes(length);
        for (let i = 0; i < length; i++) {
            randomValues[i] = buffer[i];
        }
    }

    for (let i = 0; i < length; i++) {
        result += chars.charAt(randomValues[i] % chars.length);
    }

    return result;
};

// Rate limiting utilities
export class RateLimiter {
    private attempts: Map<string, { count: number; resetTime: number }> = new Map();
    private blocked: Map<string, number> = new Map();

    isBlocked(identifier: string): boolean {
        const blockTime = this.blocked.get(identifier);
        if (!blockTime) return false;

        if (Date.now() > blockTime) {
            this.blocked.delete(identifier);
            this.attempts.delete(identifier);
            return false;
        }

        return true;
    }

    recordAttempt(identifier: string, windowMs: number = 900000, maxAttempts: number = 5): boolean {
        if (this.isBlocked(identifier)) {
            return false;
        }

        const now = Date.now();
        const attempt = this.attempts.get(identifier);

        if (!attempt || now > attempt.resetTime) {
            this.attempts.set(identifier, { count: 1, resetTime: now + windowMs });
            return true;
        }

        attempt.count++;

        if (attempt.count > maxAttempts) {
            this.blocked.set(identifier, now + 1800000); // Block for 30 minutes
            return false;
        }

        return true;
    }

    getRemainingAttempts(identifier: string, maxAttempts: number = 5): number {
        const attempt = this.attempts.get(identifier);
        if (!attempt) return maxAttempts;

        return Math.max(0, maxAttempts - attempt.count);
    }
}

// Token extraction from headers
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
};

// Error response formatter
export const formatErrorResponse = (error: unknown): { message: string; code?: string } => {
    if (error instanceof Error) {
        return {
            message: error.message,
            code: (error as any).code
        };
    }

    return {
        message: 'An unexpected error occurred'
    };
};