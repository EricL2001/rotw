declare namespace NodeJS {
    interface ProcessEnv {
      readonly VERCEL_URL?: string;
      readonly VERCEL_BRANCH_URL?: string;
      readonly NEXT_PUBLIC_BASE_URL?: string; // If you still use this for local fallback
      readonly STRIPE_SECRET_KEY: string; // Assuming your secret key *must* be set
      // Add any other environment variables you access
    }
  }