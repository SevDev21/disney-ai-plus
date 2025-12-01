# Linear Issue Templates: V2 Test (New Issues)

**PRD**: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)  
**GitHub Issues**: 8 issues (#51-58)  
**Status**: ⏳ Not started

---

## Quick Start

1. Set `LINEAR_API_KEY` environment variable (get from https://linear.app/settings/api)
2. Run: `LINEAR_API_KEY=your-key node scripts/create-linear-issues.js docs/linear-templates/v2-test-linear-templates-v2.md`
3. Check off items in checklist as issues are created

---

## Checklist

- [ ] Issue #1: Implement IdentityProvider Integration (GitHub #51)
- [ ] Issue #2: Implement Web App Login Interface (GitHub #52)
- [ ] Issue #3: Implement API POST /login Endpoint (GitHub #53)
- [ ] Issue #4: Implement Auth Component in API (GitHub #54)
- [ ] Issue #5: Implement Catalog Component in API (GitHub #55)
- [ ] Issue #6: Implement User and Subscription Domain Models (GitHub #56)
- [ ] Issue #7: Deployment Infrastructure Setup (GitHub #57)
- [ ] Issue #8: End-to-End Integration Testing (GitHub #58)
- [ ] All issues cross-linked to GitHub
- [ ] All issues linked in PRD

---

## Templates

<details>
<summary><strong>Template #1: Implement IdentityProvider Integration</strong> (GitHub #51)</summary>

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
5. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #51 - https://github.com/SevDev21/disney-ai-plus/issues/51
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/sequence.md)
  - [C4 Component](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/c4_component.md)

**Dependencies:**
None (foundational issue)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #51
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #2: Implement Web App Login Interface</strong> (GitHub #52)</summary>

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
6. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #52 - https://github.com/SevDev21/disney-ai-plus/issues/52
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/sequence.md)
  - [Deployment Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/deployment.md)

**Dependencies:**
None (can work in parallel with API endpoint)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #52
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #3: Implement API POST /login Endpoint</strong> (GitHub #53)</summary>

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
6. Non-functional requirements (performance, security, observability, resilience) applied

**Related Links:**
- GitHub Issue: #53 - https://github.com/SevDev21/disney-ai-plus/issues/53
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/sequence.md)
  - [C4 Component](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/c4_component.md)

**Dependencies:**
- Depends on: V2 Test: Implement IdentityProvider Integration

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #53
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #4: Implement Auth Component in API</strong> (GitHub #54)</summary>

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
- GitHub Issue: #54 - https://github.com/SevDev21/disney-ai-plus/issues/54
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [C4 Component](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/c4_component.md)
  - [Sequence Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/sequence.md)

**Dependencies:**
- Depends on: V2 Test: Implement IdentityProvider Integration

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #54
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #5: Implement Catalog Component in API</strong> (GitHub #55)</summary>

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
- GitHub Issue: #55 - https://github.com/SevDev21/disney-ai-plus/issues/55
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [C4 Component](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/c4_component.md)

**Dependencies:**
None (can work independently)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #55
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #6: Implement User and Subscription Domain Models</strong> (GitHub #56)</summary>

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
- GitHub Issue: #56 - https://github.com/SevDev21/disney-ai-plus/issues/56
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Logical/Domain Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/logical.md)

**Dependencies:**
None (foundational domain models)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #56
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #7: Deployment Infrastructure Setup</strong> (GitHub #57)</summary>

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
- GitHub Issue: #57 - https://github.com/SevDev21/disney-ai-plus/issues/57
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Deployment Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/deployment.md)

**Dependencies:**
- Depends on: V2 Test: Implement API POST /login Endpoint
- Depends on: V2 Test: Implement Web App Login Interface

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #57
- Update status when GitHub issue is closed

</details>

<details>
<summary><strong>Template #8: End-to-End Integration Testing</strong> (GitHub #58)</summary>

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
6. All component interactions verified
7. Non-functional requirements validated

**Related Links:**
- GitHub Issue: #58 - https://github.com/SevDev21/disney-ai-plus/issues/58
- PRD: [V2 Test PRD v1](docs/prd/v2-test-prd-v1.md)
- Related Diagrams: 
  - [Sequence Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/sequence.md)
  - [C4 Component](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/c4_component.md)
  - [Deployment Diagram](https://github.com/SevDev21/disney-ai-plus/blob/master/docs/diagrams/v2-test/deployment.md)

**Dependencies:**
- Depends on: All other V2 Test issues (integration testing requires all components)

**Notes:**
- Assign to @Cursor for automated implementation
- Link this Linear issue back to GitHub issue #58
- Update status when GitHub issue is closed

</details>

---

## Cross-Linking Guide

### Step 1: Create Linear Issues
Run the script to create all Linear issues:
```bash
LINEAR_API_KEY=your-key node scripts/create-linear-issues.js docs/linear-templates/v2-test-linear-templates-v2.md
```

### Step 2: Link Linear → GitHub
For each created Linear issue:
1. Open the Linear issue
2. Add a comment with: `GitHub: #51 - https://github.com/SevDev21/disney-ai-plus/issues/51`
3. Or use Linear's GitHub integration to link issues

### Step 3: Link GitHub → Linear
For each GitHub issue:
1. Open the GitHub issue
2. Add a comment with: `Linear: [Issue Title](linear-issue-url)`
3. Or use GitHub's Linear integration if configured

### Step 4: Update PRD
Add Linear issue links to the PRD's "Related Linear Issues" section.

---

## @Cursor Tips

- **Assignment**: Assign Linear issues to `@Cursor` for automated implementation
- **Context**: Cursor reads Linear issue details, comments, and context automatically
- **Auto PRs**: Cursor creates PRs automatically when tasks complete
- **Status Updates**: PR status flows back to Linear issues

---

_Source: Generated from GitHub issues #51-58_

