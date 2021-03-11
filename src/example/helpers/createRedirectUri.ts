export const REDIRECT_PROP_NAME = 'redirect';

export const createRedirectUrl = (fromUrl: string) => `?${REDIRECT_PROP_NAME}=` + encodeURIComponent(`${fromUrl}`);
