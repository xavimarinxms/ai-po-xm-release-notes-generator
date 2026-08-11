import { ReleaseInput } from '@/types';

export const SAMPLE_INPUT: ReleaseInput = {
  productName: 'NovaPay',
  version: 'v2.4.0',
  releaseDate: '2024-08-15',
  changes: `- Bulk payment: send up to 500 payments in a single CSV upload (previously limited to 50)
- New payment status webhook: real-time push notifications when a payment status changes (pending → processing → settled)
- Onboarding redesign: reduced steps from 7 to 4 and added inline bank verification via Plaid
- Performance: payment history page loads 3x faster (reduced from 4.2s to 1.4s median)
- Fix: duplicate payment detection now catches edge cases with same-day same-amount transfers
- Fix: CSV export was silently truncating rows beyond 1,000 — now exports all rows
- API: new /v2/payments endpoint with cursor-based pagination (old /v1/payments deprecated, sunset in 90 days)
- API: added idempotency-key header support to prevent duplicate payment submissions
- Security: session tokens now rotate every 30 minutes (previously 24h)`,
  context: 'NovaPay is a B2B payment platform for SMBs. End users are finance managers and accountants. Technical audience is the engineering teams of client companies integrating via API.',
};
