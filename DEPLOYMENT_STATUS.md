# MandaStrong Studio - Deployment Status

## Deployment Configuration

Your app now knows when it's deployed on bolt.new!

### Features Added:

1. **Environment Variables** (`.env`)
   - `VITE_DEPLOYED_ON_BOLT=true` - Marks the app as deployed
   - `VITE_APP_URL=https://bolt.new` - Sets the deployment URL

2. **Deployment Detection Utility** (`src/lib/deployment.ts`)
   - Auto-detects bolt.new and StackBlitz environments
   - Provides deployment information throughout the app
   - Returns platform name, URL, and deployment status

3. **Visual Indicators**
   - Green "LIVE ON BOLT.NEW" badge on home page (top right)
   - Live status indicator in the menu with pulsing dot
   - Console log when running on bolt.new

### How It Works:

The app automatically detects if it's running on:
- bolt.new domains
- StackBlitz.com domains
- Or when the `VITE_DEPLOYED_ON_BOLT` environment variable is set

### Accessing Deployment Info in Code:

```typescript
import { getDeploymentInfo, isBoltEnvironment } from './lib/deployment';

// Check if deployed
if (isBoltEnvironment()) {
  console.log('Running on bolt.new!');
}

// Get full deployment info
const info = getDeploymentInfo();
console.log(info.platform); // 'bolt.new' or 'local'
console.log(info.url);      // Current URL
console.log(info.isDeployed); // true/false
```

### Your Live URL:

Once deployed on bolt.new, your app will be accessible at the URL provided by bolt.new's deployment dashboard.

The app will automatically show the live status badge when accessed from the deployed URL.

## Build Status:

✅ Project builds successfully
✅ All features working
✅ Ready for production deployment
