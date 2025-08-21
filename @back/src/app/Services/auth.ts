// services/auth.service.ts

import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import type {User, UserRole} from "../../@types/User.ts";
import type {
    AuthTokenPayload,
    LoginRequest,
    RegisterRequest,
    AuthResponse
} from '../../@types/Auth.ts';

export class AuthService {
    private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    // Argon2 configuration options
    private readonly ARGON2_OPTIONS: argon2.Options = {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,   // 64MB memory usage
        timeCost: 3,           // 3 iterations
        parallelism: 1,        // 1 thread
    };

    // Hash password
    async hashPassword(password: string): Promise<string> {
        return argon2.hash(password, this.ARGON2_OPTIONS);
    }

    // Compare password
    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return await argon2.verify(hashedPassword, password);
        } catch (error) {
            // If verification fails due to format issues, return false
            return false;
        }
    }

    // Generate JWT token
    generateToken(payload: AuthTokenPayload): string {
        return jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: '7d',
            issuer: 'your-app-name'
        });
    }

    // Verify JWT token
    verifyToken(token: string): AuthTokenPayload | null {
        try {
            return jwt.verify(token, this.JWT_SECRET) as AuthTokenPayload;
        } catch (error) {
            return null;
        }
    }

    // Register user
    async register(userData: RegisterRequest): Promise<AuthResponse> {
        // Validate input
        this.validateRegistration(userData);

        // Hash password
        const hashedPassword = await this.hashPassword(userData.password);

        // Create user object
        const newUser: User = {
            ...userData,
            password: hashedPassword,
            role: userData.role || UserRole.USER,
            created_at: new Date(),
            updated_at: new Date()
        };

        // Save user to database (pseudo-code)
        const savedUser = await this.saveUserToDatabase(newUser);

        // Generate token
        const token = this.generateToken({
            userId: savedUser.user_id!,
            email: savedUser.email,
            role: savedUser.role
        });

        // Return user without password
        const { password, ...userWithoutPassword } = savedUser;

        return {
            user: userWithoutPassword,
            token
        };
    }

    // Login user
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        // Find user by email (pseudo-code)
        const user = await this.findUserByEmail(credentials.email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Compare passwords
        const isValidPassword = await this.comparePassword(credentials.password, user.password);

        if (!isValidPassword) {
            throw new Error('Invalid credentials');
        }

        // Generate token
        const token = this.generateToken({
            userId: user.user_id!,
            email: user.email,
            role: user.role
        });

        // Return user without password
        const { password, ...userWithoutPassword } = user;

        return {
            user: userWithoutPassword,
            token
        };
    }

    // Validate registration data
    private validateRegistration(userData: RegisterRequest): void {
        const { email, password, first_name, last_name } = userData;

        if (!email || !this.isValidEmail(email)) {
            throw new Error('Valid email is required');
        }

        if (!password || password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        if (!first_name?.trim()) {
            throw new Error('First name is required');
        }

        if (!last_name?.trim()) {
            throw new Error('Last name is required');
        }
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Database operations (implement based on your database)
    private async saveUserToDatabase(user: User): Promise<User> {
        // Implement your database save logic here
        // This could use Prisma, TypeORM, MongoDB, etc.
        throw new Error('Implement saveUserToDatabase method');
    }

    private async findUserByEmail(email: string): Promise<User | null> {
        // Implement your database query logic here
        throw new Error('Implement findUserByEmail method');
    }
}