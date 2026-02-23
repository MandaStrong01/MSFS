export const isDeployedOnBolt = import.meta.env.VITE_DEPLOYED_ON_BOLT === 'true';

export const getAppUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return import.meta.env.VITE_APP_URL || 'http://localhost:5173';
};

export const isBoltEnvironment = () => {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;
  return (
    hostname.includes('bolt.new') ||
    hostname.includes('stackblitz.com') ||
    import.meta.env.VITE_DEPLOYED_ON_BOLT === 'true'
  );
};

export const getDeploymentInfo = () => {
  return {
    isDeployed: isDeployedOnBolt || isBoltEnvironment(),
    platform: isBoltEnvironment() ? 'bolt.new' : 'local',
    url: getAppUrl(),
    timestamp: new Date().toISOString(),
  };
};
