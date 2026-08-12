"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, CheckCircle2, Play, Wrench, FileCode, AlertTriangle, Sparkles, Copy, Check } from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  framework: string;
  filename: string;
  vulnerability: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  policyRule: string;
  cisBenchmark: string;
  codeVulnerable: string;
  codeRemediated: string;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "terraform-s3",
    name: "AWS S3 & Security Group",
    framework: "Terraform (HCL)",
    filename: "main.tf",
    vulnerability: "Public Ingress 0.0.0.0/0 & Disabled Server-Side Encryption",
    severity: "CRITICAL",
    policyRule: "enter.aws.s3.encryption_required && enter.aws.sg.no_public_ingress",
    cisBenchmark: "CIS AWS Benchmark v1.4.0 § 2.1.1",
    explanation: "S3 bucket lacks AES-256 KMS encryption and security group permits unrestricted ingress traffic on port 22.",
    codeVulnerable: `resource "aws_s3_bucket" "financial_data" {
  bucket = "enterprise-customer-ledgers"
  acl    = "public-read" # ❌ VIOLATION: Public ACL exposed

  # ❌ VIOLATION: Missing Server-Side Encryption Configuration
}

resource "aws_security_group" "bastion_ingress" {
  name        = "bastion-allow-all"
  description = "Production Bastion SG"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # ❌ VIOLATION: Unrestricted SSH Access
  }
}`,
    codeRemediated: `resource "aws_s3_bucket" "financial_data" {
  bucket = "enterprise-customer-ledgers"
}

# ✅ REMEDIATED: Enforce Private Access & Block Public Sharing
resource "aws_s3_bucket_public_access_block" "financial_block" {
  bucket                  = aws_s3_bucket.financial_data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# ✅ REMEDIATED: Enforce KMS Customer Managed Key Encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "kms_enc" {
  bucket = aws_s3_bucket.financial_data.id
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.vault_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}

resource "aws_security_group" "bastion_ingress" {
  name        = "bastion-restricted"
  description = "Production Bastion SG (Hardened)"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.240.0.0/16"] # ✅ REMEDIATED: Restricted Corporate CIDR
  }
}`,
  },
  {
    id: "k8s-pod",
    name: "Kubernetes Manifest",
    framework: "Kubernetes (YAML)",
    filename: "deployment.yaml",
    vulnerability: "Privileged Container Execution & Writable Root Filesystem",
    severity: "CRITICAL",
    policyRule: "enter.k8s.security_context.disallow_privileged",
    cisBenchmark: "CIS Kubernetes Benchmark v1.6.0 § 5.2.1",
    explanation: "Container pod runs as root with full kernel capabilities and writable host path mounting.",
    codeVulnerable: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-processor-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: payment-api
        image: entersoft/payments:v2.4.1
        securityContext:
          privileged: true           # ❌ VIOLATION: Root kernel privilege escalation
          readOnlyRootFilesystem: false # ❌ VIOLATION: Mutable root filesystem
          allowPrivilegeEscalation: true`,
    codeRemediated: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-processor-service
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: payment-api
        image: entersoft/payments:v2.4.1
        securityContext:
          privileged: false          # ✅ REMEDIATED: Disallow root privilege
          runAsNonRoot: true
          runAsUser: 10001
          readOnlyRootFilesystem: true # ✅ REMEDIATED: Immutable root filesystem
          allowPrivilegeEscalation: false
          capabilities:
            drop:
              - ALL`,
  },
  {
    id: "cloudformation-iam",
    name: "AWS CloudFormation",
    framework: "CloudFormation (JSON)",
    filename: "template.json",
    vulnerability: "Wildcard Admin Permissions (*:*) in IAM Policy",
    severity: "HIGH",
    policyRule: "enter.aws.iam.no_wildcard_admin_actions",
    cisBenchmark: "CIS AWS Benchmark v1.4.0 § 1.16",
    explanation: "IAM Role policy statement specifies full administrative access across all cloud resources.",
    codeVulnerable: `{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "AppServiceExecutionRole": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "AppExecutionOverlyPermissive",
        "PolicyDocument": {
          "Statement": [{
            "Effect": "Allow",
            "Action": "*",             // ❌ VIOLATION: Unrestricted Wildcard Action
            "Resource": "*"             // ❌ VIOLATION: Unrestricted Wildcard Resource
          }]
        }
      }
    }
  }
}`,
    codeRemediated: `{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Resources": {
    "AppServiceExecutionRole": {
      "Type": "AWS::IAM::Policy",
      "Properties": {
        "PolicyName": "AppExecutionLeastPrivilege",
        "PolicyDocument": {
          "Statement": [{
            "Effect": "Allow",
            "Action": [                // ✅ REMEDIATED: Explicit Least Privilege
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "sqs:SendMessage"
            ],
            "Resource": [
              "arn:aws:dynamodb:us-east-1:123456789012:table/ledger-prod",
              "arn:aws:sqs:us-east-1:123456789012:queue/payment-events"
            ]
          }]
        }
      }
    }
  }
}`,
  },
];

export default function Iac_InteractiveTerminal() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [isRemediated, setIsRemediated] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleScenarioChange = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setIsRemediated(false);
  };

  const handleRunEvaluation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsEvaluating(false);
    }, 650);
  };

  const handleToggleRemediation = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      setIsRemediated(!isRemediated);
      setIsEvaluating(false);
    }, 450);
  };

  const handleCopyCode = () => {
    const code = isRemediated ? selectedScenario.codeRemediated : selectedScenario.codeVulnerable;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="simulator"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#040407] text-white border-t border-white/[0.08] overflow-hidden isolate"
    >
      {/* Background Lighting Bloom */}
      <div className="absolute top-1/3 right-1/4 w-[750px] h-[450px] bg-gradient-to-l from-[#3B82F6]/15 via-[#8B5CF6]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1360px] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="font-mono text-xs uppercase tracking-widest text-[#93C5FD] block mb-3">
            // INTERACTIVE SIMULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal tracking-tight text-white leading-[1.08]">
            Test Real-Time AST Policy Evaluation
          </h2>
          <p className="text-sm sm:text-base text-white/65 font-normal leading-relaxed mt-4">
            Select an infrastructure framework below to inspect how EnProbe AST analyzes manifests, catches security violations, and auto-generates non-breaking remediation code.
          </p>
        </div>

        {/* Framework Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc)}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                selectedScenario.id === sc.id
                  ? "bg-white text-black border-white shadow-[0_0_25px_rgba(255,255,255,0.25)] scale-[1.02]"
                  : "bg-white/[0.03] border-white/[0.12] text-white/70 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>{sc.framework}</span>
            </button>
          ))}
        </div>

        {/* Interactive IDE Terminal Arena */}
        <div className="relative rounded-2xl border border-white/[0.15] bg-[#0A0A0F]/90 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Top IDE Window Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.1] bg-white/[0.02]">
            {/* macOS Window Controls + Filename */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>

              <div className="h-4 w-[1px] bg-white/10" />

              <div className="flex items-center gap-2 font-mono text-xs text-white/80">
                <Terminal className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span className="font-semibold text-white">{selectedScenario.filename}</span>
                <span className="text-white/40">({selectedScenario.framework})</span>
              </div>
            </div>

            {/* Action Buttons: Run Evaluation & Apply Remediation */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.1] text-xs font-mono text-white/80 flex items-center gap-1.5 transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              <button
                onClick={handleToggleRemediation}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow-sm ${
                  isRemediated
                    ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30"
                    : "bg-[#8B5CF6]/25 border border-[#8B5CF6]/50 text-purple-200 hover:bg-[#8B5CF6]/40"
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>{isRemediated ? "Revert to Vulnerable Code" : "Auto-Remediate Code"}</span>
              </button>

              <button
                onClick={handleRunEvaluation}
                disabled={isEvaluating}
                className="px-4 py-1.5 rounded-lg bg-white text-black font-mono text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-md active:scale-95"
              >
                <Play className={`w-3 h-3 fill-black ${isEvaluating ? "animate-spin" : ""}`} />
                <span>{isEvaluating ? "Scanning..." : "Re-Scan AST"}</span>
              </button>
            </div>
          </div>

          {/* IDE Main Body: Split View (Code View + Policy Inspector Pane) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Left/Main Code Editor Window */}
            <div className="lg:col-span-8 p-6 sm:p-8 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto bg-[#07070B] border-b lg:border-b-0 lg:border-r border-white/[0.08] relative">
              {/* Scan Beam Animation during evaluation */}
              {isEvaluating && (
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent shadow-[0_0_15px_#8B5CF6] z-20 pointer-events-none"
                />
              )}

              <pre className="text-zinc-300 select-text">
                <code>
                  {isRemediated ? selectedScenario.codeRemediated : selectedScenario.codeVulnerable}
                </code>
              </pre>
            </div>

            {/* Right Policy & Benchmark Inspector Pane */}
            <div className="lg:col-span-4 p-6 sm:p-7 bg-[#09090E] flex flex-col justify-between">
              <div>
                {/* Status Indicator Pill */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    AST EVALUATION STATUS
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${
                      isRemediated
                        ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                        : "bg-red-500/10 border-red-500/40 text-red-400 animate-pulse"
                    }`}
                  >
                    {isRemediated ? "0 Violations // PASSED" : `${selectedScenario.severity} VIOLATION`}
                  </span>
                </div>

                {/* Violation/Remediation Banner */}
                <div
                  className={`p-4 rounded-xl border mb-5 transition-colors ${
                    isRemediated
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200"
                      : "bg-red-950/20 border-red-500/30 text-red-200"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {isRemediated ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-sans font-semibold text-xs sm:text-sm text-white">
                        {isRemediated ? "Policy Verified & Hardened" : selectedScenario.vulnerability}
                      </h4>
                      <p className="text-xs text-white/70 mt-1 leading-relaxed">
                        {isRemediated
                          ? "All security parameters successfully validated against OPA enterprise guardrails. Safe for CI/CD merge."
                          : selectedScenario.explanation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Rule Specs */}
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">OPA Rego Policy Signature:</span>
                    <span className="text-[#A78BFA] break-all">{selectedScenario.policyRule}</span>
                  </div>

                  <div>
                    <span className="text-white/40 text-[10px] uppercase block">Compliance Reference:</span>
                    <span className="text-[#93C5FD]">{selectedScenario.cisBenchmark}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Trigger */}
              <div className="pt-6 mt-6 border-t border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                  <span>Latency: ~1.4ms</span>
                  <span>Parser: Native AST v3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
