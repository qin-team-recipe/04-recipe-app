type Link = {
  url: string;
};

type ChefLink = {
  url: string;
  siteName: string;
};

type SocialLinks<Link> = {
  youtube?: Link;
  instagram?: Link;
  tiktok?: Link;
  twitter?: Link;
  facebook?: Link;
  websites: Link[];
};

export type RecipeLinks = SocialLinks<Link>;

export type ChefLinks = SocialLinks<ChefLink>;

const YOUTUBE_PREFIX = "https://www.youtube.com";
const INSTAGRAM_PREFIX = "https://www.instagram.com";
const TIKTOK_PREFIX = "https://www.tiktok.com";
const TWITTER_PREFIX = "https://twitter.com";
const FACEBOOK_PREFIX = "https://www.facebook.com";

function isYoutubeUrl(link: Link): boolean {
  return link.url.startsWith(YOUTUBE_PREFIX);
}

function isInstagramUrl(link: Link): boolean {
  return link.url.startsWith(INSTAGRAM_PREFIX);
}

function isTwitterUrl(link: Link): boolean {
  return link.url.startsWith(TWITTER_PREFIX);
}

function isTikTokUrl(link: Link): boolean {
  return link.url.startsWith(TIKTOK_PREFIX);
}

function isFacebookUrl(link: Link): boolean {
  return link.url.startsWith(FACEBOOK_PREFIX);
}

export function formatSocialLinks<TLink extends Link>(links: TLink[]): SocialLinks<TLink> {
  const formatted: SocialLinks<TLink> = links.reduce(
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
    { websites: [] as TLink[] }
  );

  return formatted;
}
