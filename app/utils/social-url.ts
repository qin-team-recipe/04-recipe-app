export type RecipeLinks = {
  youtube?: string;
  instagram?: string;
  tiktok?: string;
  twitter?: string;
  facebook?: string;
  websites: string[];
};

const YOUTUBE_PREFIX = "https://www.youtube.com";
const INSTAGRAM_PREFIX = "https://www.instagram.com";
const TIKTOK_PREFIX = "https://www.tiktok.com";
const TWITTER_PREFIX = "https://twitter.com";
const FACEBOOK_PREFIX = "https://www.facebook.com";

function isYoutubeUrl(url: string): boolean {
  return url.startsWith(YOUTUBE_PREFIX);
}

function isInstagramUrl(url: string): boolean {
  return url.startsWith(INSTAGRAM_PREFIX);
}

function isTwitterUrl(url: string): boolean {
  return url.startsWith(TWITTER_PREFIX);
}

function isTikTokUrl(url: string): boolean {
  return url.startsWith(TIKTOK_PREFIX);
}

function isFacebookUrl(url: string): boolean {
  return url.startsWith(FACEBOOK_PREFIX);
}

export function formatRecipeLinks(links: string[]): RecipeLinks {
  const formatted: RecipeLinks = links.reduce(
    (sum, link) => {
      if (isYoutubeUrl(link)) {
        return { ...sum, youtube: link };
      }
      if (isInstagramUrl(link)) {
        return { ...sum, instagram: link };
      }
      if (isTwitterUrl(link)) {
        return { ...sum, twitter: link };
      }
      if (isTikTokUrl(link)) {
        return { ...sum, tiktok: link };
      }
      if (isFacebookUrl(link)) {
        return { ...sum, facebook: link };
      }
      return { ...sum, websites: [...sum.websites, link] };
    },
    { websites: [] as string[] }
  );

  return formatted;
}

export type ChefLinks = RecipeLinks;

export const formatChefLinks = formatRecipeLinks;
