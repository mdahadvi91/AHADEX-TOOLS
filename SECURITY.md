# Security Policy

## Our Promise

AHADEX Tools is designed with privacy and security as first-class concerns:

- **No server** — every tool runs entirely in your browser
- **No uploads** — your files never leave your device
- **No tracking** — analytics respects Consent Mode v2 and only collects what you allow
- **No third-party code** — only well-known open-source libraries, all bundled at build time

## Supported Versions

Only the latest production deployment at **https://ahadex.fun** is supported with security updates. Older versions of the source code are not maintained.

## Reporting a Vulnerability

If you believe you have found a security vulnerability, please **do not open a public GitHub issue**.

Instead, email:

**mdahadvi91@gmail.com**

Please include:

- A description of the vulnerability
- Steps to reproduce
- The affected URL or file
- Any relevant screenshots or proof-of-concept

You can expect:

- **Acknowledgement** within 48 hours
- **Status update** within 5 days
- **Credit** in the fix commit (unless you prefer to remain anonymous)

## Scope

In scope:

- `https://ahadex.fun` (the live site)
- The source code in this repository

Out of scope:

- Vulnerabilities in third-party dependencies (please report those upstream)
- Social engineering of the maintainer
- Denial of service attacks

## What We Care About

- Data leakage (any way files or inputs could leave the browser)
- XSS via crafted file names, metadata, or SVG inputs
- Supply chain attacks via dependencies
- Consent bypass (analytics or ads firing without consent)

Thank you for helping keep AHADEX Tools safe.
