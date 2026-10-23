import { site } from './site';
import { downloadCounterEndpoint } from './download-counter';

const override = import.meta.env.PUBLIC_VISIT_COUNTER_ENABLED;
if (override !== undefined && !['', 'true', 'false'].includes(override))
  throw new Error(
    'PUBLIC_VISIT_COUNTER_ENABLED deve ser true, false ou vazio.',
  );

// The existing public endpoint/CSP validation is shared; no SDK or secret needed.
export const visitCounterEnabled = Boolean(
  downloadCounterEndpoint &&
  (override === undefined ? site.visitCounterEnabled : override === 'true'),
);
