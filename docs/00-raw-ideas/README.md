# Raw Ideas & Brainstorming

> **Purpose**: Drop zone for unstructured ideas, requirements, and brainstorming notes
> **AI Processing**: Files here are automatically processed by AI to generate structured documentation
> **Status**: 🧠 Raw (Unprocessed)

---

## 📝 How to Use This Folder

### 1. Add Your Ideas

Simply create a text file with your thoughts, requirements, or brainstorming notes:

```bash
# Create a new idea file
cat > docs/00-raw-ideas/my-new-feature.txt << 'EOF'
I want users to be able to create posts with images and text.
They should be able to edit and delete their own posts.
Other users can like and comment on posts.
EOF
```

**File Naming:**
- Use descriptive names: `social-media-features.txt`, `payment-integration.txt`
- Date prefix optional: `2025-12-25-user-profiles.txt`
- Any format: `.txt`, `.md`, or even just notes

**Don't worry about:**
- ❌ Organizing by module
- ❌ Structuring as user stories
- ❌ Technical details
- ❌ Perfect grammar or format

**Do include:**
- ✅ What users should be able to do
- ✅ Any validation rules you know
- ✅ Error cases or edge cases
- ✅ Business context

---

### 2. Process with AI

Use the AI prompt to automatically:
- Analyze your ideas
- Decide module organization
- Generate user stories in `01-user-stories/`
- Generate feature specs in `02-features/`
- Create OpenAPI snippets in `03-api-spec/`

**Command:**
```bash
# See the AI prompt
cat docs/templates/PROMPT-0-ideas-to-docs.md
```

The AI will:
1. Read your raw idea file(s)
2. Identify distinct features/modules
3. Create proper folder structure
4. Generate complete documentation
5. Provide file organization plan

---

### 3. Review & Approve

After AI processing:
- Review the generated file organization plan
- Confirm the module breakdown makes sense
- Approve or request changes
- Copy generated files to your project

---

## 📂 Current Files

| File | Status | Created | Processed |
|------|--------|---------|-----------|
| _No files yet_ | - | - | - |

---

## 🔄 Processing Status

### Unprocessed Ideas
- None yet - add your first idea!

### Recently Processed
- _History will appear here_

---

## 💡 Tips

### Good Example
```
I want a job board where employers can post jobs and candidates can apply.

Employers:
- Register company account
- Post job openings (title, description, salary range, location)
- View applications
- Accept/reject candidates

Candidates:
- Register personal account
- Browse job listings
- Filter by location, salary, job type
- Submit application with resume
- Track application status

Email notifications when:
- New job matches candidate preferences
- Application status changes
```

### What Makes It Good?
- ✅ Clear user roles (Employers, Candidates)
- ✅ Specific actions for each role
- ✅ Mentions data fields
- ✅ Includes notification requirements
- ✅ Natural language, easy to read

---

## 🚀 Quick Start

**Your first time?**

1. **Create an idea file:**
   ```bash
   cat > docs/00-raw-ideas/test-idea.txt << 'EOF'
   Users should be able to register with email and password.
   After registration, send verification email.
   They can login after verifying their email.
   EOF
   ```

2. **Process with AI:**
   - Copy content from `docs/templates/PROMPT-0-ideas-to-docs.md`
   - Paste into Claude, ChatGPT, or your AI agent
   - Provide the idea file path and content
   - Review generated output

3. **Copy generated files:**
   - The AI will provide complete file contents
   - Copy to the suggested paths
   - Update this README with processing status

**Done!** You now have structured user stories and feature specs.

---

## 🔗 Related Documentation

- [AI Prompt for Processing](../templates/PROMPT-0-ideas-to-docs.md)
- [User Stories Documentation](../01-user-stories/)
- [Feature Specifications](../02-features/)
- [API Specifications](../03-api-spec/)
- [Full Documentation System](../templates/README.md)

---

## 📊 Statistics

- **Total Idea Files**: 0
- **Total Processed**: 0
- **Pending Processing**: 0
- **Lines of Ideas**: 0

---

**Ready to brainstorm? Just create a file and start writing! 🧠✨**
