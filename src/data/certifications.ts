export interface CertificationItem {
  id: string;
  name: string;
  authority: string;
  description: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "cert-in",
    name: "CERT-In Empanelled",
    authority: "Ministry of Electronics and Information Technology",
    description: "Officially empanelled security auditor authorized to conduct information security audits for corporate and governmental networks."
  },
  {
    id: "crest",
    name: "CREST Registered",
    authority: "CREST Council",
    description: "Formally certified penetration testing services meeting rigid international requirements for technical capabilities and ethical standards."
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001 Certified",
    authority: "Global Standards Registrar",
    description: "Adhering to comprehensive standards for establishing, implementing, maintaining, and continually improving security management systems."
  },
  {
    id: "gdpr",
    name: "GDPR Compliant",
    authority: "EU Data Protection Board",
    description: "Validated data processing controls and operational workflows complying with the General Data Protection Regulation."
  }
];
