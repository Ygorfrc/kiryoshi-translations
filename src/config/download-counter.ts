import headers from '../../public/_headers?raw';
import { site } from './site';
import {
  assertDownloadCounterCsp,
  parseDownloadCounter,
} from '../lib/download-counter';

export const downloadCounterEndpoint = parseDownloadCounter(
  // An explicit empty environment value disables collection, including in previews.
  import.meta.env.PUBLIC_DOWNLOAD_COUNTER_URL ?? site.downloadCounterUrl,
);
assertDownloadCounterCsp(downloadCounterEndpoint, headers);
