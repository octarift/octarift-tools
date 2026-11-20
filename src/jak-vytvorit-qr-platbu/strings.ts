/** English version of the guide (the Czech one is the page's HTML). Generated from a template. */
import type { GuideTranslation } from '@shared/guide-page';

export const en: GuideTranslation = {
  title: 'How to create a Czech QR payment code – step by step',
  description: 'A guide to creating a free QR payment code (QR Platba) for invoices, clubs or friends: what to fill in, how to check the code and print it.',
  html: `
<h1>How to create a Czech QR payment code</h1>
<p class="text-page__meta">Guide · free QR code generator</p>
<p>QR Platba is the Czech standard for paying with a QR code. The payer scans it in their banking app, which fills in
the account number, amount, variable symbol and message. Nothing is retyped, so there are no typos. It is handy for
invoices, clubs, schools, collections or getting money from a friend.</p>

<div class="guide-cta"><p>Create the code in a minute with our generator. Your details are never sent anywhere.</p>
<a class="button button--primary" href="/qr-code/">Create a QR payment</a></div>

<h2>Step by step</h2>
<ol>
  <li>Open the <a href="/qr-code/">QR code generator</a> and choose <strong>Payment → Czech QR payment</strong>.</li>
  <li>Enter the <strong>account number</strong> as <code>prefix-number/bank code</code> (e.g. <code>19-2000145399/0800</code>)
    or as an IBAN. The generator checks it and warns about typos.</li>
  <li>Fill in the <strong>amount</strong>. Leave it empty to let the payer choose (useful for donations).</li>
  <li>Add the <strong>variable symbol</strong>, optionally the specific and constant symbol, and a <strong>message</strong>.</li>
  <li>The code appears right away. Download it as <strong>PNG</strong> (for documents and e-mail) or <strong>SVG</strong> (for print at any size).</li>
</ol>

<h2>What a QR payment can contain</h2>
<ul>
  <li>the recipient's account number (always stored as an IBAN),</li>
  <li>amount and currency (CZK or EUR),</li>
  <li>variable, specific and constant symbol,</li>
  <li>due date, recipient name and a message for the recipient.</li>
</ul>

<h2>Test the code before you send it</h2>
<p>Before printing or sending the code, scan it with your own banking app and check the account, amount and symbols.
You do not have to confirm the payment. For printed codes, make them large enough and keep a white margin around them
so phones read them easily.</p>

<h2>FAQ</h2>
<h3>Is it free?</h3>
<p>Yes. The format is public and our generator is free, with no sign-up.</p>
<h3>Is it safe?</h3>
<p>The code only contains payment details, no passwords. Our generator creates it right in your browser, so your account
number is never sent anywhere. The payer always sees the details in their banking app and has to confirm the payment.</p>
<h3>Does it work in Slovakia or abroad?</h3>
<p>Slovak banks use their own <strong>PAY by square</strong> format, and euro countries use the <strong>EPC QR code
(SEPA)</strong>. Both are in the same generator under Payment.</p>

<div class="guide-related"><h2>More guides</h2><ul><li><a href="/heic-na-jpg/">How to convert HEIC to JPG</a></li><li><a href="/pomodoro-technika/">The Pomodoro Technique</a></li><li><a href="/tabata-trenink/">Tabata workout</a></li></ul></div>
`,
};
