# Linear Issue Templates: V2 Test

**PRD**: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)  
**GitHub Issues**: 8 issues (#42-49)  
**Status**: ⏳ Not started

---

## Quick Start

1. Set `LINEAR_API_KEY` environment variable (get from https://linear.app/settings/api)
2. Run: `LINEAR_API_KEY=your-key node scripts/create-linear-issues.js docs/linear-templates/v2-test-linear-templates.md`
3. Check off items in checklist as issues are created

---

## Checklist

- [ ] Issue #1: Implement IdentityProvider Integration (GitHub #42)
- [ ] Issue #2: Implement Web App Login Interface (GitHub #43)
- [ ] Issue #3: Implement API POST /login Endpoint (GitHub #44)
- [ ] Issue #4: Implement Auth Component in API (GitHub #45)
- [ ] Issue #5: Implement Catalog Component in API (GitHub #46)
- [ ] Issue #6: Implement User and Subscription Domain Models (GitHub #47)
- [ ] Issue #7: Deployment Infrastructure Setup (GitHub #48)
- [ ] Issue #8: End-to-End Integration Testing (GitHub #49)
- [ ] All issues cross-linked to GitHub
- [ ] All issues linked in PRD

---

## Templates

<details>
<summary><strong>Template #1: Implement IdentityProvider Integration</strong> (GitHub #42)</summary>

**Title:**
V2 Test: Implement IdentityProvider Integration

**Description:**
**Goal:**
Integrate API with IdentityProvider for credential verification

**Acceptance Criteria:**
1. API sends verification requests to IdentityProvider
2. API handles IdentityProvider responses (success/failure)
3. API processes IdentityProvider results and generates session/token
4. Error handling for IdentityProvider communication failures

**Related Links:**
- GitHub Issue: #42 - https://github.com/SevDev21/disney-ai-plus/issues/42
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](docs/diagrams/v2-test/sequence.md)
  - [C4 Component](docs/diagrams/v2-test/c4_component.md)

**Dependencies:**
None (foundational issue)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #42
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #2: Implement Web App Login Interface</strong> (GitHub #43)</summary>

**Title:**
V2 Test: Implement Web App Login Interface

**Description:**
**Goal:**
Build Web App interface for credential entry and login flow

**Acceptance Criteria:**
1. Interface for users to enter credentials
2. Web App sends POST /login requests to API
3. Web App handles API responses and displays appropriate messages
4. Web App receives and stores session/token from API securely
5. Web App displays "Logged in" confirmation to user

**Related Links:**
- GitHub Issue: #43 - https://github.com/SevDev21/disney-ai-plus/issues/43
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](docs/diagrams/v2-test/sequence.md)
  - [Deployment Diagram](docs/diagrams/v2-test/deployment.md)

**Dependencies:**
None (can work in parallel with API endpoint)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #43
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #3: Implement API POST /login Endpoint</strong> (GitHub #44)</summary>

**Title:**
V2 Test: Implement API POST /login Endpoint

**Description:**
**Goal:**
Create API endpoint for authentication requests

**Acceptance Criteria:**
1. API exposes POST /login endpoint
2. API accepts credential requests from Web App
3. API forwards credential verification to IdentityProvider
4. API generates session/token upon successful authentication
5. API returns session/token to Web App

**Related Links:**
- GitHub Issue: #44 - https://github.com/SevDev21/disney-ai-plus/issues/44
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](docs/diagrams/v2-test/sequence.md)
  - [C4 Component](docs/diagrams/v2-test/c4_component.md)

**Dependencies:**
Depends on: V2 Test: Implement IdentityProvider Integration

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #44
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #4: Implement Auth Component in API</strong> (GitHub #45)</summary>

**Title:**
V2 Test: Implement Auth Component in API

**Description:**
**Goal:**
Create Auth Component within API container to handle authentication logic

**Acceptance Criteria:**
1. Auth Component implemented within API container
2. Auth Component handles all authentication logic
3. Auth Component integrates with IdentityProvider
4. Auth Component manages session/token generation
5. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #45 - https://github.com/SevDev21/disney-ai-plus/issues/45
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [C4 Component](docs/diagrams/v2-test/c4_component.md)
  - [Sequence Diagram](docs/diagrams/v2-test/sequence.md)

**Dependencies:**
Depends on: V2 Test: Implement IdentityProvider Integration

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #45
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #5: Implement Catalog Component in API</strong> (GitHub #46)</summary>

**Title:**
V2 Test: Implement Catalog Component in API

**Description:**
**Goal:**
Create Catalog Component within API container for catalog operations

**Acceptance Criteria:**
1. Catalog Component implemented within API container
2. Catalog Component handles catalog operations
3. Catalog Component integrates with database
4. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #46 - https://github.com/SevDev21/disney-ai-plus/issues/46
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [C4 Component](docs/diagrams/v2-test/c4_component.md)

**Dependencies:**
None (can work independently)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #46
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #6: Implement User and Subscription Domain Models</strong> (GitHub #47)</summary>

**Title:**
V2 Test: Implement User and Subscription Domain Models

**Description:**
**Goal:**
Implement User and Subscription domain models with 1-to-many relationship

**Acceptance Criteria:**
1. User model implemented with id and email fields
2. Subscription model implemented with id and status fields
3. 1-to-many relationship established (User → Subscription)
4. Database schema created and migrated
5. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #47 - https://github.com/SevDev21/disney-ai-plus/issues/47
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Logical/Domain Diagram](docs/diagrams/v2-test/logical.md)

**Dependencies:**
None (foundational domain models)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #47
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #7: Deployment Infrastructure Setup</strong> (GitHub #48)</summary>

**Title:**
V2 Test: Deployment Infrastructure Setup

**Description:**
**Goal:**
Deploy system across Kubernetes cluster with API Pod, Web Pod, and Database

**Acceptance Criteria:**
1. API Pod is provisioned, monitored, and reachable by peers
2. Web Pod is provisioned, monitored, and reachable by peers
3. Database is provisioned, secured, and monitored
4. All infrastructure supports authentication flows
5. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #48 - https://github.com/SevDev21/disney-ai-plus/issues/48
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Deployment Diagram](docs/diagrams/v2-test/deployment.md)

**Dependencies:**
- Depends on: V2 Test: Implement API POST /login Endpoint
- Depends on: V2 Test: Implement Web App Login Interface

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #48
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #8: End-to-End Integration Testing</strong> (GitHub #49)</summary>

**Title:**
V2 Test: End-to-End Integration Testing

**Description:**
**Goal:**
Test complete authentication flow from user input to logged-in state

**Acceptance Criteria:**
1. Test user enters credentials in Web App
2. Test Web App → API → IdentityProvider flow
3. Test session/token generation and storage
4. Test "Logged in" confirmation display
5. Test error scenarios (invalid credentials, IdentityProvider failures, etc.)

**Related Links:**
- GitHub Issue: #49 - https://github.com/SevDev21/disney-ai-plus/issues/49
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](docs/diagrams/v2-test/sequence.md)
  - [C4 Component](docs/diagrams/v2-test/c4_component.md)
  - [Deployment Diagram](docs/diagrams/v2-test/deployment.md)

**Dependencies:**
- Depends on: All other V2 Test issues (integration testing requires all components)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #49
- Update status when GitHub issue is closed

</details>

---

## Cross-Linking Guide

### Step 1: Create Linear Issues
Run the script to create all Linear issues:
```bash
LINEAR_API_KEY=your-key node scripts/create-linear-issues.js docs/linear-templates/v2-test-linear-templates.md
```

### Step 2: Link Linear ↔ GitHub Issues

**Option A: Manual Linking in Linear**
1. Open each Linear issue
2. Add GitHub issue link in description or comments
3. Format: `GitHub: #42 - https://github.com/SevDev21/disney-ai-plus/issues/42`

**Option B: Manual Linking in GitHub**
1. Open each GitHub issue
2. Add Linear issue link in comments
3. Format: `Linear: [V2-TEST-1](https://linear.app/...)`

### Step 3: Update PRD
After creating Linear issues, update the PRD with Linear issue IDs:
- Add section "Related Linear Issues" with all Linear issue URLs
- Link back from Linear issues to PRD

---

## @Cursor Assignment Tips

1. **Assign Issues**: Assign Linear issues to `@Cursor` in Linear UI
2. **Provide Context**: Cursor will read Linear issue details, comments, and context automatically
3. **Auto PR Creation**: Cursor creates PRs automatically when tasks complete
4. **Status Updates**: PR status flows back to Linear issues automatically
5. **Cross-Reference**: Link Linear issues to GitHub issues for bidirectional tracking

**Best Practices:**
- Assign one issue at a time for focused work
- Use Linear comments to provide additional context
- Link related Linear issues together
- Update Linear issue status as work progresses

---

_Source: Generated from [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md) and GitHub issues #42-49_