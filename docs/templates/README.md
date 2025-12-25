# AI-Powered Documentation Generation System

> **Version**: 1.0  
> **Last Updated**: 2025-12-25  
> **Purpose**: Convert free-text requirements into structured user stories and technical specifications

---

## 📋 Table of Contents

- [Overview](#overview)
- [Workflow](#workflow)
- [File Structure](#file-structure)
- [Quick Start](#quick-start)
- [Detailed Usage](#detailed-usage)
- [Templates](#templates)
- [Best Practices](#best-practices)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This system helps you transform informal product requirements into professional, AI-ready documentation through a 2-step process:

```
Step 1: Free Text → Structured User Stories
Step 2: User Stories → Feature Specifications (with API endpoints)
```

### Benefits

✅ **Consistency**: All documentation follows the same format  
✅ **Traceability**: Clear links from user stories to features to endpoints  
✅ **AI-Friendly**: Optimized for AI code generation and development  
✅ **Scalable**: Supports projects of any size with folder organization  
✅ **Version Control**: Text-based, git-friendly documentation  

---

## 🔄 Workflow

### The Complete Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    NON-ENGINEER WRITES                          │
│  "I want users to register with email and get verification..."  │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                  STEP 1: PROMPT-1 (AI Agent)                    │
│                 Generates Structured User Story                 │
│                                                                 │
│  Output: US-1.1-user-registration.md                           │
│  - Given-When-Then acceptance criteria                         │
│  - Data requirements                                           │
│  - Business rules                                              │
│  - Validation rules                                            │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  HUMAN REVIEWS   │
         │  AND APPROVES    │
         └────────┬─────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  STEP 2: PROMPT-2 (AI Agent)                    │
│              Generates Feature Specification                    │
│                                                                 │
│  Output: FEATURE-1-authentication.md                           │
│  - API endpoints (POST /api/v1/auth/register)                 │
│  - Request/response schemas                                    │
│  - Error codes                                                 │
│  - Data models                                                 │
│  - Security considerations                                     │
│  - OpenAPI snippets                                            │
└──────────────────┬──────────────────────────────────────────────┘
                   │
                   ▼
         ┌─────────────────┐
         │  READY FOR       │
         │  DEVELOPMENT     │
         └──────────────────┘
```

---

## 📁 File Structure

Your project documentation will be organized like this:

```
project-name/
├── docs/
│   ├── 01-user-stories/
│   │   ├── 01-authentication/
│   │   │   ├── raw/
│   │   │   │   └── 01-auth-requirements.txt      # Original free text
│   │   │   └── generated/
│   │   │       ├── US-1.1-user-registration.md   # Structured story
│   │   │       ├── US-1.2-user-login.md
│   │   │       └── US-1.3-password-reset.md
│   │   ├── 02-profile-management/
│   │   │   └── ...
│   │   └── README.md                              # Index of all stories
│   │
│   ├── 02-features/
│   │   ├── 01-authentication/
│   │   │   ├── FEATURE-1-authentication.md        # Complete spec
│   │   │   └── README.md
│   │   ├── 02-profile-management/
│   │   │   └── ...
│   │   └── README.md                              # Index of all features
│   │
│   ├── 03-api-spec/
│   │   ├── snippets/
│   │   │   └── authentication-endpoints.yaml      # OpenAPI snippets
│   │   ├── openapi.yaml                           # Complete API spec
│   │   └── README.md
│   │
│   └── templates/                                  # This folder
│       ├── PROMPT-1-raw-to-stories.md
│       ├── PROMPT-2-stories-to-features.md
│       ├── USER-STORY-TEMPLATE.md
│       ├── FEATURE-TEMPLATE.md
│       └── README.md (this file)
```

---

## 🚀 Quick Start

### Prerequisites

- Access to an AI agent (Claude, ChatGPT, etc.)
- Basic understanding of your product requirements
- Text editor or IDE

### 5-Minute Setup

1. **Create project structure**
```bash
mkdir -p docs/{01-user-stories,02-features,03-api-spec/snippets,templates}
```

2. **Copy templates to your project**
```bash
# Copy all template files to docs/templates/
```

3. **Write your first requirement**
```bash
# Create a free-text file
cat > docs/01-user-stories/01-authentication/raw/01-registration.txt << 'EOF'
I want users to be able to register with their email address. They should 
receive a verification email. Email must be unique. Password should be at 
least 8 characters.
EOF
```

4. **Generate user story using PROMPT-1**
- Copy content from `PROMPT-1-raw-to-stories.md`
- Paste into your AI agent
- Provide your free-text requirement
- Save the generated output

5. **Generate feature spec using PROMPT-2**
- Copy content from `PROMPT-2-stories-to-features.md`
- Paste into your AI agent
- Provide the generated user story
- Save the generated output

**Done!** You now have structured documentation.

---

## 📖 Detailed Usage

### Step 1: Free Text to User Stories

#### 1.1 Prepare Your Input

Write requirements naturally in a text file:

```
docs/01-user-stories/01-authentication/raw/01-auth-requirements.txt
```

**Good example:**
```
Users should be able to register with email and password. After registration,
send verification email. Email must be unique - if already exists, show error.
Password must be minimum 8 characters.

Users can login with verified email and password. If email not verified, 
show error message.

Users can request password reset by email. We'll send a reset link that 
expires in 1 hour.
```

**Tips:**
- Write naturally, don't worry about structure
- Include validation rules if known
- Mention error cases
- Can be in any language (English, Indonesian, etc.)

#### 1.2 Use PROMPT-1

1. Open your AI agent (Claude, ChatGPT, etc.)

2. Copy the entire content of `PROMPT-1-raw-to-stories.md`

3. At the bottom, add:
```
Now, process the following input:

**Source File**: docs/01-user-stories/01-authentication/raw/01-auth-requirements.txt
**Existing Structure**: None - new project
**Free Text**:
[paste your free text here]
```

4. Submit to AI agent

#### 1.3 Review AI Output

The AI will generate:

1. **File Organization Plan** (YAML) - shows how it will split the content
2. **Generated Files** - complete user story documents
3. **Index Files** - README files for navigation
4. **AI Notes** - assumptions, decisions, recommendations

**Review checklist:**
- [ ] File organization makes sense
- [ ] User story IDs are sequential
- [ ] Acceptance criteria are testable
- [ ] Data requirements are complete
- [ ] Assumptions are flagged for review

#### 1.4 Save Generated Files

Copy each generated file to your project:

```bash
# Example
cat > docs/01-user-stories/01-authentication/generated/US-1.1-user-registration.md << 'EOF'
[paste generated content]
EOF
```

Or use the provided shell commands from AI output.

---

### Step 2: User Stories to Feature Specifications

#### 2.1 Prepare Your Input

Ensure you have approved user stories from Step 1.

#### 2.2 Use PROMPT-2

1. Open your AI agent

2. Copy the entire content of `PROMPT-2-stories-to-features.md`

3. At the bottom, add:
```
Now, process the following user stories:

**Source Files**:
- docs/01-user-stories/01-authentication/generated/US-1.1-user-registration.md

**Existing Feature Structure**: None - new project

**User Story Content**:
[paste the complete user story file content]
```

4. Submit to AI agent

#### 2.3 Review AI Output

The AI will generate:

1. **File Organization Plan** - how features are structured
2. **Feature Specification** - complete technical spec with endpoints
3. **OpenAPI Snippets** - API documentation
4. **Index Files** - README files
5. **AI Generation Notes** - design decisions, alternatives, recommendations

**Review checklist:**
- [ ] API endpoints follow RESTful conventions
- [ ] HTTP methods are appropriate
- [ ] Error codes are comprehensive
- [ ] Security considerations are addressed
- [ ] Data models match user story requirements
- [ ] OpenAPI spec is valid

#### 2.4 Save Generated Files

```bash
# Example: Feature spec
cat > docs/02-features/01-authentication/FEATURE-1-authentication.md << 'EOF'
[paste generated content]
EOF

# Example: OpenAPI snippet
cat > docs/03-api-spec/snippets/authentication-endpoints.yaml << 'EOF'
[paste generated content]
EOF
```

---

## 📝 Templates

### USER-STORY-TEMPLATE.md

Template for structured user stories. Includes:
- User story statement (As a... I want... So that...)
- Acceptance criteria (Given-When-Then)
- Data requirements
- Business rules
- UI/UX notes
- Dependencies

### FEATURE-TEMPLATE.md

Template for technical specifications. Includes:
- API endpoint specifications
- Request/response schemas
- Data models
- Business logic
- Error handling
- Security considerations
- Performance requirements
- Testing requirements

---

## 💡 Best Practices

### Writing Free-Text Requirements

**DO:**
- ✅ Write naturally and conversationally
- ✅ Include validation rules ("password must be 8+ characters")
- ✅ Mention error cases ("if email exists, show error")
- ✅ Describe user flows ("register → verify → login")
- ✅ Include business context ("users need to...")

**DON'T:**
- ❌ Don't try to format like user stories (AI will do this)
- ❌ Don't include technical implementation details
- ❌ Don't use jargon unless necessary
- ❌ Don't worry about being too detailed (AI will ask)

### Reviewing AI Output

**Always review:**
- Acceptance criteria - are they testable?
- Data requirements - are fields correct?
- Business rules - do they make sense?
- Assumptions - do you agree?
- Error scenarios - are they comprehensive?

**Iterate if needed:**
- If output is wrong, provide feedback and regenerate
- You can edit generated files manually
- Mark assumptions as "CONFIRMED" or change them

### File Organization

**Single file when:**
- User stories are closely related (login, logout, session)
- Same user role
- Sequential workflow
- < 5 stories

**Split files when:**
- Different user roles (User vs Admin)
- Different modules (Auth vs Profile)
- Independent workflows
- > 5 stories

**Create subfolders when:**
- > 3 files in a module
- Clear sub-categories exist

---

## 📚 Examples

### Example 1: Simple Authentication

**Input (free text):**
```
Users should register with email and password. Send verification email.
After verification, they can login.
```

**Output:**
- `US-1.1-user-registration.md` - Registration story
- `US-1.2-user-login.md` - Login story
- `FEATURE-1-authentication.md` - Auth endpoints

### Example 2: E-commerce Product Catalog

**Input (free text):**
```
Customers should be able to browse products, filter by category and price,
search by name. They can view product details including images, description,
price, and availability. Products should show related items.
```

**Output:**
- `US-2.1-product-browsing.md` - Browse and filter
- `US-2.2-product-search.md` - Search functionality
- `US-2.3-product-details.md` - Detail view
- `FEATURE-2-product-catalog.md` - All product endpoints

### Example 3: Admin User Management

**Input (free text):**
```
Admins should see all registered users, approve/reject them, suspend accounts,
and view user activity logs. They can filter users by status, registration date,
and search by email or name.
```

**Output:**
- `US-3.1-admin-user-list.md` - List and filter users
- `US-3.2-admin-user-actions.md` - Approve/reject/suspend
- `US-3.3-admin-activity-logs.md` - View logs
- `FEATURE-3-admin-user-management.md` - Admin endpoints

---

## 🔧 Troubleshooting

### AI generates too many files

**Problem**: AI splits one story into 5 separate files  
**Solution**: In your prompt, add:
```
Note: Keep related stories together in one file unless they exceed 500 lines
or represent different user roles.
```

### AI doesn't provide file paths

**Problem**: AI generates content but no file structure  
**Solution**: Ensure you're using the complete prompt, including PART 2 
(File Organization Plan)

### Generated IDs conflict with existing stories

**Problem**: AI generates US-1.1 but you already have it  
**Solution**: In prompt input, specify:
```
**Existing Structure**:
- Module 01 (Authentication): US-1.1, US-1.2, US-1.3 (next should be US-1.4)
- Module 02 (Profile): US-2.1 (next should be US-2.2)
```

### API endpoints don't follow your conventions

**Problem**: AI generates `/auth/register` but you use `/v1/authentication/signup`  
**Solution**: Add to prompt:
```
API Conventions for this project:
- Base path: /api/v1
- Authentication endpoints: /authentication/* (not /auth/*)
- Use 'signup' instead of 'register'
```

### Missing validation rules

**Problem**: AI doesn't include specific validation  
**Solution**: Be explicit in free text:
```
Password must be 8-20 characters, contain uppercase, lowercase, number, 
and special character.
```

### Generated content is too generic

**Problem**: AI gives generic examples  
**Solution**: Provide domain context:
```
**Domain**: Healthcare - HIPAA compliant
**Users**: Doctors, Nurses, Patients
**Special requirements**: Audit logging, data encryption
```

---

## 🎓 Advanced Usage

### Custom Templates

You can modify templates to match your organization's standards:

1. Copy template file
2. Modify sections as needed
3. Reference your custom template in prompts:
```
Use the custom template at docs/templates/custom-user-story-template.md
```

### Integration with CI/CD

Generate API specs automatically:

```yaml
# .github/workflows/generate-api-spec.yml
name: Generate API Spec
on:
  push:
    paths:
      - 'docs/02-features/**/*.md'
jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Merge OpenAPI snippets
        run: |
          # Script to combine all snippets into openapi.yaml
```

### Multiple Languages

Support bilingual documentation:

```
**Language Handling**:
- User stories: Indonesian (primary), English (translation)
- Technical specs: English only
- Error messages: Bilingual
```

---

## 🤝 Contributing

To improve these templates and prompts:

1. Test with real projects
2. Document issues and edge cases
3. Suggest improvements
4. Share examples

---

## 📞 Support

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review [Examples](#examples) for reference
3. Verify you're using the complete prompt
4. Check AI model quality (Claude Sonnet recommended)

---

## 📄 License

These templates and prompts are provided as-is for project documentation.

---

**Happy Documenting! 🎉**
