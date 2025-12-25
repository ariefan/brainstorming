# How to Use the Raw Ideas Folder

This folder is your **brainstorming drop zone**. Just write down your ideas in any format, and AI will transform them into structured documentation.

## Quick Example

**Your raw idea file** (`example-social-media-app.txt`):
```
I want users to register with email and password.
They can create posts with text and images.
Other users can like and comment on posts.
```

**AI processes it and generates:**
- `docs/01-user-stories/01-authentication/generated/US-1.1-1.2-auth.md`
- `docs/01-user-stories/02-posts/generated/US-2.1-2.3-post-management.md`
- `docs/01-user-stories/03-social/generated/US-3.1-3.2-interactions.md`
- `docs/02-features/01-authentication/FEATURE-1-auth.md`
- `docs/02-features/02-posts/FEATURE-2-posts.md`
- `docs/02-features/03-social/FEATURE-3-social.md`
- `docs/03-api-spec/snippets/authentication-endpoints.yaml`
- `docs/03-api-spec/snippets/posts-endpoints.yaml`
- `docs/03-api-spec/snippets/social-endpoints.yaml`
- All README/index files

All from ONE AI prompt!

## Steps

### 1. Create Your Idea File

```bash
cat > docs/00-raw-ideas/my-app-idea.txt << 'EOF'
[Your brainstorming here...]
EOF
```

**Tips:**
- Write naturally, like you're explaining to a friend
- Include validation rules if you know them ("password min 8 chars")
- Mention error cases ("if email already exists, show error")
- Don't worry about structure or perfect grammar

### 2. Process with AI

```bash
# View the AI prompt
cat docs/templates/PROMPT-0-ideas-to-docs.md
```

**Instructions:**
1. Copy the entire `PROMPT-0-ideas-to-docs.md` content
2. Paste into Claude, ChatGPT, or your AI agent
3. At the end, add:

```
---

Now, process the following raw idea:

**Source File**: docs/00-raw-ideas/my-app-idea.txt
**Existing Structure**: None (new project)

**Raw Idea Content**:
[paste your idea file content here]
```

4. Submit and wait for AI to generate everything

### 3. Review Output

The AI will provide:
- File organization plan (what folders/files it will create)
- Complete user story files
- Complete feature specification files
- Complete OpenAPI snippets
- All README/index files
- Processing notes with decisions and assumptions

**Review checklist:**
- Does the module breakdown make sense?
- Are the API endpoints appropriate?
- Do the assumptions match your intent?

### 4. Copy Files to Project

The AI will provide shell commands like:

```bash
mkdir -p docs/01-user-stories/01-authentication/generated
mkdir -p docs/02-features/01-authentication
# ... etc
```

Just copy-paste each file content to the suggested path.

### 5. Mark as Processed

Update `docs/00-raw-ideas/README.md`:

```markdown
| my-app-idea.txt | ✅ Processed | 2025-12-25 | Modules: 01, 02, 03 |
```

## Example Files

- `example-social-media-app.txt` - A complete example showing the format
- This file (`EXAMPLE-HOW-TO-USE.md`) - Instructions

Delete these examples when you're ready to use the system for real.

## What Makes a Good Raw Idea File?

### GOOD Example ✅

```
I want a job board where employers post jobs and candidates apply.

Employers should:
- Register company accounts
- Post job listings (title, description, salary range, location)
- View applications
- Accept or reject candidates

Candidates should:
- Register personal accounts
- Browse jobs
- Filter by location, salary, job type
- Apply with resume upload
- See application status

Validation:
- Salary range: min < max
- Resume: PDF only, max 2MB
```

**Why it's good:**
- Clear user roles (Employer, Candidate)
- Specific actions for each role
- Mentions data fields
- Includes validation rules
- Natural language

### BAD Example ❌

```
Need auth and CRUD for posts
```

**Why it's bad:**
- Too vague
- No user perspective
- No context or details
- Uses jargon without explanation

## Tips for Better Results

**DO:**
- ✅ Write in plain language
- ✅ Describe what users want to do
- ✅ Include validation rules
- ✅ Mention error cases
- ✅ Provide business context

**DON'T:**
- ❌ Try to write user stories (AI will do this)
- ❌ Include technical implementation details
- ❌ Worry about perfect formatting
- ❌ Pre-organize into modules (AI will decide)

## Common Questions

**Q: Can I include multiple features in one file?**
A: Yes! The AI will split them into proper modules. But if features are completely unrelated, consider separate files for clarity.

**Q: What file format should I use?**
A: `.txt` is simplest, but `.md` works too. Use whatever you're comfortable with.

**Q: Can I use my native language?**
A: Yes, but specify in your prompt. The AI can translate to English for technical docs while keeping user stories in your language.

**Q: How detailed should I be?**
A: More detail = better output. But even rough notes work - the AI will make reasonable assumptions and flag them for review.

**Q: What if the AI gets it wrong?**
A: Provide feedback and regenerate. Or manually edit the generated files.

---

**Ready to start? Delete these examples and create your first real idea file!**
