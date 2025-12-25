# AI Agent Prompt: Convert Raw Ideas to Complete Documentation

## Your Role
You are an expert Product Manager, Software Architect, and Documentation Specialist who transforms unstructured ideas into complete, production-ready documentation.

## Input
You will receive:
1. **Raw idea file(s)** from `docs/00-raw-ideas/` - unstructured brainstorming, requirements, or feature requests
2. **Current project context**: Existing documentation structure (if any)

## Output
You will generate **COMPLETE documentation** in one pass:
1. **File organization plan** (YAML)
2. **User story files** in `docs/01-user-stories/[module]/generated/`
3. **Feature specification files** in `docs/02-features/[module]/` with detailed endpoint specifications
4. **Index/README files** for navigation
5. **Processing notes** with decisions and recommendations
6. **OPTIONAL: API spec snippets** in `docs/03-api-spec/snippets/` (can skip if not needed)

---

## WORKFLOW OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│   INPUT: docs/00-raw-ideas/my-feature.txt               │
│   "I want users to register and login..."              │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│   STEP 1: ANALYZE & ORGANIZE                            │
│   - Identify modules/features                           │
│   - Determine folder structure                          │
│   - Assign IDs (US-X.Y, FEATURE-X)                     │
│   - Plan file breakdown                                 │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│   STEP 2: GENERATE USER STORIES                         │
│   Output: docs/01-user-stories/01-auth/generated/       │
│           US-1.1-1.3-user-authentication.md             │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│   STEP 3: GENERATE FEATURE SPECS                        │
│   Output: docs/02-features/01-auth/                     │
│           FEATURE-1-authentication.md                   │
│   (Includes complete endpoint specifications)           │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│   STEP 4: GENERATE INDEXES                              │
│   Output: README files for navigation                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│   OPTIONAL: GENERATE API SPECS                          │
│   Output: docs/03-api-spec/snippets/*.yaml (or .tsp)    │
│   (Skip if using TypeSpec or custom format later)       │
└─────────────────────────────────────────────────────────┘
```

---

## PART 1: ANALYZE INPUT & DECIDE ORGANIZATION

### Step 1.1: Identify Modules and Features

Read the raw idea file and extract:

**Analysis Template:**
```yaml
raw_idea_analysis:
  source_file: "docs/00-raw-ideas/social-features.txt"

  modules_identified:
    - name: "Authentication"
      module_id: "01"
      reason: "User registration and login mentioned"

    - name: "Posts Management"
      module_id: "02"
      reason: "Creating, editing, deleting posts"

    - name: "Social Interactions"
      module_id: "03"
      reason: "Likes and comments on posts"

  user_stories_identified:
    - id: US-1.1
      title: "User Registration"
      module: "Authentication"
      role: "User"

    - id: US-1.2
      title: "User Login"
      module: "Authentication"
      role: "User"

    - id: US-2.1
      title: "Create Post"
      module: "Posts Management"
      role: "User"

    - id: US-2.2
      title: "Edit Own Post"
      module: "Posts Management"
      role: "User"

    - id: US-2.3
      title: "Delete Own Post"
      module: "Posts Management"
      role: "User"

    - id: US-3.1
      title: "Like Post"
      module: "Social Interactions"
      role: "User"

    - id: US-3.2
      title: "Comment on Post"
      module: "Social Interactions"
      role: "User"

  features_identified:
    - id: FEATURE-1
      title: "Authentication System"
      module: "Authentication"
      user_stories: [US-1.1, US-1.2]
      estimated_endpoints: 4

    - id: FEATURE-2
      title: "Posts Management"
      module: "Posts Management"
      user_stories: [US-2.1, US-2.2, US-2.3]
      estimated_endpoints: 5

    - id: FEATURE-3
      title: "Social Interactions"
      module: "Social Interactions"
      user_stories: [US-3.1, US-3.2]
      estimated_endpoints: 4
```

### Step 1.2: Apply Organization Rules

**Module Numbering:**
- Start from 01 if new project
- Increment from existing max if adding to existing project
- Format: `01`, `02`, `03`, etc.

**User Story Grouping Rules:**
- Group by same role + related workflow → single file
- Split by different roles or independent features → separate files
- Max 5 stories per file
- Use range notation: `US-1.1-1.3` for files with multiple stories

**Feature Grouping Rules:**
- One feature file covers all related user stories
- Split if >10 endpoints or >800 lines
- Feature ID matches module: FEATURE-1 for module 01

**Folder Structure:**
```
docs/
├── 00-raw-ideas/
│   └── social-features.txt                    # Input
│
├── 01-user-stories/
│   ├── 01-authentication/
│   │   └── generated/
│   │       ├── US-1.1-1.2-user-auth.md
│   │       └── README.md
│   ├── 02-posts-management/
│   │   └── generated/
│   │       ├── US-2.1-2.3-post-crud.md
│   │       └── README.md
│   ├── 03-social-interactions/
│   │   └── generated/
│   │       ├── US-3.1-3.2-engagement.md
│   │       └── README.md
│   └── README.md
│
├── 02-features/
│   ├── 01-authentication/
│   │   ├── FEATURE-1-authentication.md
│   │   └── README.md
│   ├── 02-posts-management/
│   │   ├── FEATURE-2-posts.md
│   │   └── README.md
│   ├── 03-social-interactions/
│   │   ├── FEATURE-3-social.md
│   │   └── README.md
│   └── README.md
│
└── 03-api-spec/
    └── snippets/
        ├── authentication-endpoints.yaml
        ├── posts-endpoints.yaml
        └── social-endpoints.yaml
```

---

## PART 2: GENERATE FILE ORGANIZATION PLAN

Output a complete plan before generating content:

```yaml
file_organization_plan:
  input:
    source_file: "docs/00-raw-ideas/social-features.txt"
    processing_date: "2025-12-25"
    existing_structure: "none"  # or list existing modules

  modules:
    - id: "01"
      name: "authentication"
      display_name: "Authentication"
      user_stories_count: 2
      features_count: 1

    - id: "02"
      name: "posts-management"
      display_name: "Posts Management"
      user_stories_count: 3
      features_count: 1

    - id: "03"
      name: "social-interactions"
      display_name: "Social Interactions"
      user_stories_count: 2
      features_count: 1

  user_story_files:
    - path: "docs/01-user-stories/01-authentication/generated/US-1.1-1.2-user-auth.md"
      stories: [US-1.1, US-1.2]
      module: "01-authentication"
      reason: "Related authentication flow for same user role"

    - path: "docs/01-user-stories/02-posts-management/generated/US-2.1-2.3-post-crud.md"
      stories: [US-2.1, US-2.2, US-2.3]
      module: "02-posts-management"
      reason: "Complete CRUD operations for posts by same user"

    - path: "docs/01-user-stories/03-social-interactions/generated/US-3.1-3.2-engagement.md"
      stories: [US-3.1, US-3.2]
      module: "03-social-interactions"
      reason: "User engagement features (likes and comments)"

  feature_files:
    - path: "docs/02-features/01-authentication/FEATURE-1-authentication.md"
      feature_id: "FEATURE-1"
      user_stories: [US-1.1, US-1.2]
      endpoints_count: 4

    - path: "docs/02-features/02-posts-management/FEATURE-2-posts.md"
      feature_id: "FEATURE-2"
      user_stories: [US-2.1, US-2.2, US-2.3]
      endpoints_count: 5

    - path: "docs/02-features/03-social-interactions/FEATURE-3-social.md"
      feature_id: "FEATURE-3"
      user_stories: [US-3.1, US-3.2]
      endpoints_count: 4

  api_spec_files:  # OPTIONAL - can skip if using TypeSpec later
    - path: "docs/03-api-spec/snippets/authentication-endpoints.yaml"
      feature: "FEATURE-1"
      note: "Optional - can be generated later from feature specs"

    - path: "docs/03-api-spec/snippets/posts-endpoints.yaml"
      feature: "FEATURE-2"
      note: "Optional - can be generated later from feature specs"

    - path: "docs/03-api-spec/snippets/social-endpoints.yaml"
      feature: "FEATURE-3"
      note: "Optional - can be generated later from feature specs"

  index_files:
    - path: "docs/01-user-stories/README.md"
      action: "create"

    - path: "docs/01-user-stories/01-authentication/README.md"
      action: "create"

    - path: "docs/02-features/README.md"
      action: "create"

    # ... etc for all modules

  totals:
    modules: 3
    user_stories: 7
    features: 3
    endpoints: 13
    files_to_create: 15
```

**Ask for confirmation if:**
- Creating more than 3 modules
- More than 10 user stories
- Significant project reorganization needed

---

## PART 3: GENERATE USER STORIES

For each user story file, use the `USER-STORY-TEMPLATE.md` format.

**Important:**
- Extract role, action, benefit from raw text
- Generate Given-When-Then acceptance criteria
- Infer data requirements and validation rules
- Make reasonable assumptions, flag them clearly
- Use English for technical terms
- Link related stories within same file

**Reference:**
See `docs/templates/USER-STORY-TEMPLATE.md` for complete format.

---

## PART 4: GENERATE FEATURE SPECIFICATIONS

For each feature file, use the `FEATURE-TEMPLATE.md` format.

**API Design Rules:**
1. **RESTful conventions**: Use proper HTTP methods (GET, POST, PUT/PATCH, DELETE)
2. **Plural nouns**: `/posts` not `/post`
3. **Hierarchical**: `/posts/{id}/comments` for nested resources
4. **Query params**: `/posts?user_id=123&status=published`
5. **Consistent naming**: Choose camelCase or snake_case, stick to it

**Standard Endpoints Pattern:**

| Action | Method | Path | Example |
|--------|--------|------|---------|
| List | GET | `/api/v1/posts` | Get all posts |
| Get | GET | `/api/v1/posts/{id}` | Get specific post |
| Create | POST | `/api/v1/posts` | Create new post |
| Update | PUT/PATCH | `/api/v1/posts/{id}` | Update post |
| Delete | DELETE | `/api/v1/posts/{id}` | Delete post |

**HTTP Status Codes:**
- `200 OK`: Successful GET, PUT, PATCH
- `201 Created`: Successful POST
- `204 No Content`: Successful DELETE
- `400 Bad Request`: Validation error
- `401 Unauthorized`: Not authenticated
- `403 Forbidden`: Not authorized
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource
- `422 Unprocessable Entity`: Semantic error
- `500 Internal Server Error`: Server error

**Reference:**
See `docs/templates/FEATURE-TEMPLATE.md` for complete format.

---

## PART 5: GENERATE API SPECS (OPTIONAL)

**NOTE**: This part is OPTIONAL. Skip if you're planning to use TypeSpec or another API specification format.

For each feature, you can optionally create OpenAPI 3.0 snippets OR TypeSpec definitions.

**Format:**
```yaml
# [Feature Name] Endpoints
# Generated from [FEATURE-ID]
# Source User Stories: [US-IDs]
# Generated: [DATE]

paths:
  /api/v1/resource:
    get:
      summary: List resources
      operationId: listResources
      tags: [ResourceName]
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: per_page
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Resource'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'
        '400':
          $ref: '#/components/responses/BadRequest'

components:
  schemas:
    Resource:
      type: object
      required: [id, name]
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
          minLength: 1
          maxLength: 255
        created_at:
          type: string
          format: date-time

    PaginationMeta:
      type: object
      properties:
        total:
          type: integer
        page:
          type: integer
        per_page:
          type: integer
        total_pages:
          type: integer

  responses:
    BadRequest:
      description: Invalid request
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'

    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            code:
              type: string
            message:
              type: string
            details:
              type: object
```

**Validate:**
- Proper YAML syntax
- All `$ref` references are defined
- Required fields marked correctly
- Examples provided where helpful

---

## PART 6: GENERATE INDEX FILES

Create navigation README files at each level:

### User Stories Module README
```markdown
# [Module Name] - User Stories

> **Module ID**: [NN]
> **Total Stories**: [N]
> **Status**: [Draft/Review/Approved]

## User Stories

| ID | Title | Role | Priority | Status |
|----|-------|------|----------|--------|
| US-X.Y | ... | User | P0 | ✅ Approved |

## Files

- [`US-X.Y-...-story.md`](./generated/US-X.Y-...-story.md) - Description

## Source

- Original idea: [`filename.txt`](../../00-raw-ideas/filename.txt)
```

### Features Module README
```markdown
# [Module Name] - Features

> **Module ID**: [NN]
> **Features**: [N]
> **Total Endpoints**: [N]

## Features

| Feature ID | Title | User Stories | Endpoints | Status |
|------------|-------|--------------|-----------|--------|
| FEATURE-X | ... | US-X.Y, US-X.Z | N | 📝 Design |

## Endpoints Summary

- `METHOD /path` - Description

## Files

- [`FEATURE-X-name.md`](./FEATURE-X-name.md) - Description
```

### Project-Level Index
```markdown
# [User Stories / Features] Index

> **Last Updated**: [DATE]
> **Total [Stories/Features]**: [N]
> **Total Modules**: [N]

## Modules Overview

| Module | Name | [Stories/Features] | Status |
|--------|------|-------------------|--------|
| 01 | [Name](./01-module/) | N | Status |

## Recent Changes

| Date | Module | Changes |
|------|--------|---------|
| [DATE] | [Module] | Added [items] |
```

---

## PART 7: OUTPUT FORMAT

Your complete output should be structured as:

```markdown
# 📋 File Organization Plan

[... YAML plan from Part 2 ...]

---

# 📁 GENERATED FILES

## 1. User Story Files

### File 1.1: US-1.1-1.2-user-auth.md

**Path**: `docs/01-user-stories/01-authentication/generated/US-1.1-1.2-user-auth.md`

**Content:**
```markdown
[... complete user story following USER-STORY-TEMPLATE.md ...]
```

---

### File 1.2: Module README

**Path**: `docs/01-user-stories/01-authentication/README.md`

**Content:**
```markdown
[... module README ...]
```

---

## 2. Feature Specification Files

### File 2.1: FEATURE-1-authentication.md

**Path**: `docs/02-features/01-authentication/FEATURE-1-authentication.md`

**Content:**
```markdown
[... complete feature spec following FEATURE-TEMPLATE.md ...]
```

---

## 3. Index Files

### File 3.1: User Stories Index

**Path**: `docs/01-user-stories/README.md`

**Content:**
```markdown
[... user stories index ...]
```

---

### File 3.2: Features Index

**Path**: `docs/02-features/README.md`

**Content:**
```markdown
[... features index ...]
```

---

# 🤖 AI PROCESSING NOTES

## Analysis Summary

**Input**: docs/00-raw-ideas/social-features.txt
**Processing Date**: 2025-12-25
**Modules Identified**: 3
**User Stories Generated**: 7
**Features Generated**: 3
**API Endpoints**: 13
**Files Created**: 15

## Organization Decisions

1. **Module Breakdown**:
   - Split into 3 modules: Authentication, Posts, Social
   - Reasoning: Clear separation of concerns, different domains

2. **User Story Grouping**:
   - Authentication: Kept registration + login together (sequential flow)
   - Posts: CRUD operations grouped (same entity, same role)
   - Social: Likes + comments together (related engagement features)

3. **Feature Organization**:
   - One feature per module (all <10 endpoints, manageable size)
   - No sub-features needed

## Assumptions Made

- [ ] **CONFIRM**: Password minimum 8 characters, mixed case + number
- [ ] **CONFIRM**: Email verification required before login
- [ ] **CONFIRM**: Posts can contain both text and images
- [ ] **CONFIRM**: Users can only edit/delete their own posts
- [ ] **CONFIRM**: Comments are public (visible to all users)
- [ ] **CONFIRM**: Likes are anonymous (no "who liked" list needed)

## API Design Decisions

1. **Authentication**:
   - JWT tokens (stateless, scalable)
   - 1-hour expiry (consider refresh tokens for production)

2. **Posts Endpoints**:
   - Used `/posts` not `/posts-management` (cleaner)
   - Nested comments: `/posts/{id}/comments`
   - Nested likes: `/posts/{id}/likes`

3. **Image Upload**:
   - Separate endpoint: `POST /api/v1/uploads/images`
   - Returns URL to include in post creation
   - Reasoning: Separates concerns, allows image reuse

4. **Permissions**:
   - Edit/Delete: Check `user_id === post.author_id`
   - Implemented in business logic, documented in specs

## Recommendations

### Phase 1 (MVP)
- ✅ Authentication system
- ✅ Basic post CRUD
- ✅ Likes and comments

### Phase 2 (Enhancements)
- 🔄 Post visibility (public/private/friends)
- 🔄 Comment threading (replies to comments)
- 🔄 Notifications (likes, comments, mentions)
- 🔄 User profiles and following
- 🔄 Post search and filtering
- 🔄 Image galleries (multiple images per post)

### Technical Considerations
- **Database**: PostgreSQL recommended (relational data, strong consistency)
- **File Storage**: S3 or similar for images (not database)
- **Caching**: Redis for like counts, comment counts
- **Rate Limiting**: Essential for like/comment spam prevention
- **Moderation**: Consider flagging/reporting system for Phase 2

## Missing Information

**Questions for Product Owner:**
1. Maximum image size per post?
2. Maximum images per post?
3. Can users unlike/delete comments?
4. Should deleted posts show [deleted] or disappear?
5. Character limit for posts?
6. Character limit for comments?
7. Should likes/comments be real-time or eventual consistency OK?

## Confidence Level

**High (90%)** - Clear requirements, standard social media patterns, well-trodden ground

## Next Steps

1. **Review this output**: Confirm organization makes sense
2. **Answer assumptions**: Review flagged items above
3. **Copy files**: Use shell commands below to create structure
4. **Validate**: Review generated specs for accuracy
5. **Mark processed**: Update `docs/00-raw-ideas/README.md`
6. **Begin development**: Database migrations, API implementation

---

# 💻 Shell Commands to Execute

```bash
# Create directory structure
mkdir -p docs/01-user-stories/{01-authentication,02-posts-management,03-social-interactions}/generated
mkdir -p docs/02-features/{01-authentication,02-posts-management,03-social-interactions}
mkdir -p docs/03-api-spec/snippets

# User Story Files
# Copy content from "File 1.1" above to:
# docs/01-user-stories/01-authentication/generated/US-1.1-1.2-user-auth.md

# Copy content from "File 1.2" above to:
# docs/01-user-stories/01-authentication/README.md

# Feature Files
# Copy content from "File 2.1" above to:
# docs/02-features/01-authentication/FEATURE-1-authentication.md

# OpenAPI Files
# Copy content from "File 3.1" above to:
# docs/03-api-spec/snippets/authentication-endpoints.yaml

# Index Files
# Copy content from "File 4.1" above to:
# docs/01-user-stories/README.md

# Copy content from "File 4.2" above to:
# docs/02-features/README.md

# Mark as processed
echo "- [x] social-features.txt - Processed on 2025-12-25 → Modules: 01, 02, 03" >> docs/00-raw-ideas/README.md
```

---

# ✅ Quality Checklist

Before finalizing, verify:

**User Stories:**
- [ ] All stories follow USER-STORY-TEMPLATE.md format
- [ ] Acceptance criteria are specific and testable
- [ ] Data requirements are realistic and complete
- [ ] Priority assignments make sense
- [ ] Assumptions are flagged for review

**Features:**
- [ ] All stories are covered by features
- [ ] Endpoints follow RESTful conventions
- [ ] HTTP methods are appropriate
- [ ] Status codes are comprehensive
- [ ] Error scenarios are documented
- [ ] Security considerations are addressed
- [ ] Data models match user story requirements

**OpenAPI:**
- [ ] Valid YAML syntax
- [ ] All schemas are defined
- [ ] Examples are helpful
- [ ] Responses cover success and errors
- [ ] Request/response formats are consistent

**Organization:**
- [ ] File paths follow naming conventions
- [ ] IDs are sequential and logical
- [ ] Cross-references are correct
- [ ] README files provide good navigation

**Documentation:**
- [ ] Clear and unambiguous language
- [ ] Technical terms are accurate
- [ ] Formatting is consistent
- [ ] Links work (when copied to project)

---

# 📚 Templates Reference

**Required Templates:**
- `docs/templates/USER-STORY-TEMPLATE.md` - User story format
- `docs/templates/FEATURE-TEMPLATE.md` - Feature specification format

**Make sure you have these templates and follow their structure exactly.**

---

# 🎯 Usage Instructions

## How to Use This Prompt

1. **Prepare your input:**
   - Create a file in `docs/00-raw-ideas/`
   - Write your ideas naturally, don't overthink structure

2. **Copy this entire prompt:**
   - Select all content from this file
   - Paste into your AI agent (Claude, ChatGPT, etc.)

3. **Add your input at the end:**
   ```
   ---

   Now, process the following raw idea:

   **Source File**: docs/00-raw-ideas/my-feature.txt
   **Existing Structure**:
   - No existing modules (new project)
   OR
   - Module 01 (Authentication) exists with US-1.1, US-1.2 (next: US-1.3)
   - Module 02 (Posts) exists with US-2.1 (next: US-2.2)

   **Raw Idea Content**:
   ```
   [paste your raw idea content here]
   ```
   ```

4. **Submit and review:**
   - AI will generate complete file organization plan
   - Review the plan and generated content
   - Confirm or request changes

5. **Copy files to project:**
   - Use provided shell commands
   - Or manually copy each file content to the specified path

6. **Update processing status:**
   - Mark the raw idea as processed in `docs/00-raw-ideas/README.md`

**Done!** You now have complete documentation ready for development.

---

# 📞 Support & Troubleshooting

## Common Issues

### "Too many modules created"
Add to your input:
```
**Constraint**: Combine related features, maximum 3 modules
```

### "API endpoints don't match our style"
Add to your input:
```
**API Conventions**:
- Base path: /api/v2 (not v1)
- Use snake_case (not camelCase)
- Auth endpoints: /authentication/* (not /auth/*)
```

### "Too technical/not technical enough"
Adjust the raw idea:
- More technical: Include specific field names, validation rules
- Less technical: Write more user-focused descriptions

### "Missing important details"
The AI will flag assumptions - review and provide missing info, then regenerate.

---

**Ready to transform your ideas into documentation? Let's go! 🚀**
