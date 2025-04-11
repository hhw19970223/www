export function getUrl(url: string) {
  return process.env.NEXT_PUBLIC_API_URL + url;
}

export function getS3UrlLog(locale: Locale) {
  return process.env.NEXT_PUBLIC_S3_LOG_URL?.replace('locale', locale) || '';
}

export function getCommonHeader() {
  return {
    product: 'Official',
  }
}