# Top Open-Source Repositories for Web Vulnerability & Security Auditing

A curated reference guide of **18 leading open-source repositories** for identifying vulnerabilities, logic errors, misconfigurations, and security loopholes in web applications and source code, including up-to-date **GitHub Star Counts**.

---

## 🏆 GitHub Stars Leaderboard (All 18 Repositories)

| Rank | Tool | Repository | GitHub Stars | Primary Category |
| :---: | :--- | :--- | :---: | :--- |
| 1 | **SQLMap** | [`sqlmapproject/sqlmap`](https://github.com/sqlmapproject/sqlmap) | **⭐ 38,400+** | SQL Injection & Database Auditing |
| 2 | **Trivy** | [`aquasecurity/trivy`](https://github.com/aquasecurity/trivy) | **⭐ 37,800+** | All-in-One SCA & Container Scanner |
| 3 | **Nuclei** | [`projectdiscovery/nuclei`](https://github.com/projectdiscovery/nuclei) | **⭐ 31,000+** | Fast Template-Based Vulnerability Scanner |
| 4 | **Gitleaks** | [`gitleaks/gitleaks`](https://github.com/gitleaks/gitleaks) | **⭐ 29,100+** | Secret & API Key Leak Prevention |
| 5 | **TruffleHog** | [`trufflesecurity/trufflehog`](https://github.com/trufflesecurity/trufflehog) | **⭐ 27,700+** | Secret Scanner & Credential Verifier |
| 6 | **Semgrep** | [`semgrep/semgrep`](https://github.com/semgrep/semgrep) | **⭐ 16,500+** | Polyglot Static Code Security (SAST) |
| 7 | **OWASP ZAP** | [`zaproxy/zaproxy`](https://github.com/zaproxy/zaproxy) | **⭐ 15,700+** | Full Web App Vulnerability Scanner (DAST) |
| 8 | **OWASP Amass** | [`owasp-amass/amass`](https://github.com/owasp-amass/amass) | **⭐ 15,100+** | Attack Surface & Subdomain Reconnaissance |
| 9 | **OSV-Scanner** | [`google/osv-scanner`](https://github.com/google/osv-scanner) | **⭐ 11,000+** | Google Open-Source Vulnerability Scanner |
| 10 | **SonarQube** | [`SonarSource/sonarqube`](https://github.com/SonarSource/sonarqube) | **⭐ 11,000+** | Code Quality & Vulnerability Platform |
| 11 | **Nikto** | [`sullo/nikto`](https://github.com/sullo/nikto) | **⭐ 10,700+** | Web Server & Misconfiguration Scanner |
| 12 | **WPScan** | [`wpscanteam/wpscan`](https://github.com/wpscanteam/wpscan) | **⭐ 9,700+** | WordPress Security & Plugin Scanner |
| 13 | **Gosec** | [`securego/gosec`](https://github.com/securego/gosec) | **⭐ 8,900+** | Go AST Security Analyzer |
| 14 | **Bandit** | [`PyCQA/bandit`](https://github.com/PyCQA/bandit) | **⭐ 8,250+** | Python AST Security Linter |
| 15 | **OWASP Dependency-Check** | [`dependency-check/DependencyCheck`](https://github.com/dependency-check/DependencyCheck) | **⭐ 7,700+** | Third-Party Package Vulnerability Scanner |
| 16 | **Brakeman** | [`presidentbeef/brakeman`](https://github.com/presidentbeef/brakeman) | **⭐ 7,250+** | Ruby on Rails Static Security Scanner |
| 17 | **NodeJsScan** | [`ajinabraham/NodeJsScan`](https://github.com/ajinabraham/NodeJsScan) | **⭐ 2,550+** | Node.js Static Security Scanner |
| 18 | **Wapiti** | [`wapiti-scanner/wapiti`](https://github.com/wapiti-scanner/wapiti) | **⭐ 1,850+** | Web Application Black-Box Auditor |

---

## 1. Dynamic Application Security Testing (DAST / Black-Box Scanners)
*These tools test running web applications from the outside to find runtime vulnerabilities like XSS, SQLi, CSRF, and server misconfigurations.*

| Tool | Repository | GitHub Stars | Primary Use Case & Capabilities |
| :--- | :--- | :---: | :--- |
| **Nuclei** | [`projectdiscovery/nuclei`](https://github.com/projectdiscovery/nuclei) | **⭐ 31,064** | Fast, template-based vulnerability scanner with 5,000+ community rules checking for zero-days, misconfigurations, and API issues. |
| **OWASP ZAP** | [`zaproxy/zaproxy`](https://github.com/zaproxy/zaproxy) | **⭐ 15,747** | Flagship open-source web application scanner and interception proxy; industry standard for penetration testers. |
| **Nikto** | [`sullo/nikto`](https://github.com/sullo/nikto) | **⭐ 10,716** | Web server scanner checking over 6,700 dangerous files, outdated server versions, and HTTP header misconfigurations. |
| **Wapiti** | [`wapiti-scanner/wapiti`](https://github.com/wapiti-scanner/wapiti) | **⭐ 1,860** | Black-box auditor that crawls web pages and audits endpoints for SSRF, XXE, file inclusions, and weak credentials. |

---

## 2. Static Application Security Testing (SAST / Source Code Security)
*These tools inspect raw source code (white-box review) to catch insecure coding patterns, logic bugs, and dangerous functions prior to deployment.*

| Tool | Repository | GitHub Stars | Language / Focus | Primary Capabilities |
| :--- | :--- | :---: | :--- | :--- |
| **Semgrep** | [`semgrep/semgrep`](https://github.com/semgrep/semgrep) | **⭐ 16,540** | Multi-Language (30+ langs) | Syntax-aware pattern matcher to find security bugs, enforce secure architecture, and eliminate logic loopholes. |
| **SonarQube** | [`SonarSource/sonarqube`](https://github.com/SonarSource/sonarqube) | **⭐ 10,961** | Multi-Language | Continuous inspection platform detecting vulnerabilities, code smells, and security hotspots in CI/CD. |
| **Gosec** | [`securego/gosec`](https://github.com/securego/gosec) | **⭐ 8,945** | Go | Inspects Go AST to identify weak cryptography, SQL injection, unsafe block usage, and memory leaks. |
| **Bandit** | [`PyCQA/bandit`](https://github.com/PyCQA/bandit) | **⭐ 8,251** | Python | AST-based security linter checking for insecure deserialization, unsafe YAML/eval calls, and hardcoded credentials. |
| **Brakeman** | [`presidentbeef/brakeman`](https://github.com/presidentbeef/brakeman) | **⭐ 7,267** | Ruby on Rails | Tailored static security analyzer specifically designed for Ruby on Rails web applications. |
| **NodeJsScan** | [`ajinabraham/NodeJsScan`](https://github.com/ajinabraham/NodeJsScan) | **⭐ 2,574** | Node.js / JavaScript | Static security scanner designed to identify insecure code patterns and dangerous runtime calls in Node.js apps. |

---

## 3. Software Composition Analysis (SCA / Dependency & CVE Auditing)
*These tools inspect your package manifests and container layers for known public vulnerabilities (CVEs).*

| Tool | Repository | GitHub Stars | Ecosystem | Primary Capabilities |
| :--- | :--- | :---: | :--- | :--- |
| **Trivy** | [`aquasecurity/trivy`](https://github.com/aquasecurity/trivy) | **⭐ 37,828** | Multi-platform, Containers | Comprehensive scanner for container images, Git repositories, lockfiles, and cloud configuration errors. |
| **OSV-Scanner** | [`google/osv-scanner`](https://github.com/google/osv-scanner) | **⭐ 10,992** | Multi-Language lockfiles | Google's official vulnerability scanner powered by the Open Source Vulnerabilities (OSV) distributed database. |
| **OWASP Dependency-Check** | [`dependency-check/DependencyCheck`](https://github.com/dependency-check/DependencyCheck) | **⭐ 7,687** | Java, .NET, Node, Python, Ruby | Identifies known disclosed vulnerabilities (CVEs) in third-party libraries against the National Vulnerability Database (NVD). |

---

## 4. Secret & Sensitive Data Leak Detection
*These tools prevent API keys, database passwords, and authorization tokens from leaking into code repositories.*

| Tool | Repository | GitHub Stars | Primary Capabilities |
| :--- | :--- | :---: | :--- |
| **Gitleaks** | [`gitleaks/gitleaks`](https://github.com/gitleaks/gitleaks) | **⭐ 29,158** | Ultra-fast regex-based secret scanner integrated into pre-commit hooks and CI pipelines to block secret commits. |
| **TruffleHog** | [`trufflesecurity/trufflehog`](https://github.com/trufflesecurity/trufflehog) | **⭐ 27,712** | Deep scans Git history, branch commits, and filesystem archives for 800+ credential types and validates live keys. |

---

## 5. Specialized Security Auditing & Reconnaissance
*Targeted tools for specific web stacks, database injection, and CMS systems.*

| Tool | Repository | GitHub Stars | Target Area | Primary Capabilities |
| :--- | :--- | :---: | :--- | :--- |
| **SQLMap** | [`sqlmapproject/sqlmap`](https://github.com/sqlmapproject/sqlmap) | **⭐ 38,387** | SQL Injection | Automated detection and verification tool for SQL injection flaws and database management system auditing. |
| **OWASP Amass** | [`owasp-amass/amass`](https://github.com/owasp-amass/amass) | **⭐ 15,120** | Attack Surface Discovery | Subdomain enumeration, network mapping, and external asset discovery for organizational infrastructure. |
| **WPScan** | [`wpscanteam/wpscan`](https://github.com/wpscanteam/wpscan) | **⭐ 9,759** | WordPress CMS | Black-box scanner auditing WordPress core installations, plugins, and themes for known vulnerabilities. |

---

## CI/CD Security Implementation Guide

To build an automated multi-layer security pipeline:

```text
  [ Developer Commits Code ]
              │
              ▼
  ┌────────────────────────────────────────┐
  │ 1. Pre-Commit / Local Check             │
  │    • Gitleaks (⭐ 29.1k) - Secret leaks │
  │    • Bandit/Gosec - AST Linting        │
  └───────────────────┬────────────────────┘
                      │
                      ▼
  ┌────────────────────────────────────────┐
  │ 2. CI Pipeline (Pull Requests)         │
  │    • Semgrep (⭐ 16.5k) - SAST Rules   │
  │    • Trivy (⭐ 37.8k) - Dependency CVEs │
  └───────────────────┬────────────────────┘
                      │
                      ▼
  ┌────────────────────────────────────────┐
  │ 3. Staging / Runtime Dynamic Testing   │
  │    • Nuclei (⭐ 31.0k) - Active Checks  │
  │    • OWASP ZAP (⭐ 15.7k) - DAST Scan   │
  └────────────────────────────────────────┘
```
