export function wrapHtml(bodyHtml: string, opts: { orgName?: string } = {}) {
  const org = opts.orgName || 'FinXpert'
  return `<!doctype html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>${escapeHtml(org)} Notification</title>
  <style>
    body { font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; background:#f8fafc; margin:0; padding:0; }
    .container { max-width:640px; margin:0 auto; padding:24px; }
    .card { background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; padding:24px; }
    .brand { display:flex; align-items:center; gap:8px; color:#111827; font-weight:700; font-size:16px; }
    .footer { color:#6b7280; font-size:12px; margin-top:16px; text-align:center; }
    .hr { height:1px; background:#e5e7eb; margin:16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">${escapeHtml(org)}</div>
    <div class="hr"></div>
    <div class="card">
      ${bodyHtml}
    </div>
    <div class="footer">© ${new Date().getFullYear()} ${escapeHtml(org)}. All rights reserved.</div>
  </div>
</body>
</html>`
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
