export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  title: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
};

/**
 * Draft starter content pending legal review — see
 * SITE_LAUNCH_CHECKLIST.md items 15/16. Reflects the site's actual
 * current behavior (contact form data collection, Resend as email
 * processor, no analytics/tracking cookies) rather than generic
 * boilerplate that overclaims or underclaims what the site does.
 */
export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  effectiveDate: "September 2026",
  intro: [
    "Corland Partners (\"we,\" \"us,\" or \"our\") respects your privacy. This Privacy Policy explains what information we collect through this website, how we use it, and your choices regarding that information.",
  ],
  sections: [
    {
      heading: "Information We Collect",
      paragraphs: [
        "When you submit our contact form, we collect the information you provide: your name, email address, message, and optionally your phone number and company name.",
        "We do not currently use analytics, tracking cookies, or advertising pixels on this website. If that changes in the future, this policy will be updated accordingly.",
      ],
    },
    {
      heading: "How We Use Your Information",
      paragraphs: [
        "We use the information you submit solely to respond to your inquiry and follow up about our services. We do not sell or rent your information to third parties.",
      ],
    },
    {
      heading: "Third-Party Service Providers",
      paragraphs: [
        "We use Resend, a transactional email service, to deliver contact form submissions to our team and to send you a confirmation email. Our website is hosted on Railway. These providers process your information only as necessary to provide these services to us.",
      ],
    },
    {
      heading: "Data Retention",
      paragraphs: [
        "We retain contact form submissions for as long as reasonably necessary to respond to your inquiry and maintain business records.",
      ],
    },
    {
      heading: "Your Rights",
      paragraphs: [
        "You may contact us at any time to ask what information we have about you or to request that it be deleted, using the contact details below.",
      ],
    },
    {
      heading: "Children's Privacy",
      paragraphs: [
        "This website is not directed to children under 13, and we do not knowingly collect information from children.",
      ],
    },
    {
      heading: "Changes to This Policy",
      paragraphs: [
        "We may update this policy from time to time. The effective date above reflects the most recent update.",
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  title: "Terms of Use",
  effectiveDate: "September 2026",
  intro: [
    "These Terms of Use (\"Terms\") govern your use of the Corland Partners website. By using this website, you agree to these Terms.",
  ],
  sections: [
    {
      heading: "Use of This Website",
      paragraphs: [
        "This website provides general information about Corland Partners and our services to kingdom businesses. Nothing on this website constitutes a binding offer, a guarantee of business results, or professional financial, legal, or tax advice.",
      ],
    },
    {
      heading: "Intellectual Property",
      paragraphs: [
        "The content, logo, and design of this website are the property of Corland Partners and may not be reproduced or used without our permission, except as necessary to view the website in a standard web browser.",
      ],
    },
    {
      heading: "Third-Party Links",
      paragraphs: [
        "This website contains links to third-party sites (for example, our Facebook page and the Transparency in Coverage disclosure). We are not responsible for the content or practices of any third-party site we link to.",
      ],
    },
    {
      heading: "No Warranty",
      paragraphs: [
        "This website and its content are provided \"as is\" without warranties of any kind, express or implied, to the fullest extent permitted by law.",
      ],
    },
    {
      heading: "Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Corland Partners is not liable for any damages arising from your use of this website.",
      ],
    },
    {
      heading: "Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of the State of Texas, without regard to its conflict of law principles.",
      ],
    },
    {
      heading: "Changes to These Terms",
      paragraphs: [
        "We may update these Terms from time to time. The effective date above reflects the most recent update.",
      ],
    },
  ],
};
