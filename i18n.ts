export const i18n = {
    defaultLocale: 'en',
    locales: ['en', 'de'],
};

export function getLocaleFromPath(pathname: string): string {
    const segments = pathname.split('/');
    const locale = segments[1];

    if (i18n.locales.includes(locale)) {
        return locale;
    }

    return i18n.defaultLocale;
}
