# [US-X.Y]: User Story Title

> **Module**: [Authentication / Profile / Orders / etc]  
> **Epic**: [Parent Epic Name]  
> **Priority**: P0 (Critical) | P1 (High) | P2 (Medium) | P3 (Low)  
> **Status**: 📝 Draft | ✅ Approved | 🚧 In Development | ✔️ Done

---

## User Story

**As a** [Role/User Type]  
**I want to** [Action/Capability]  
**So that** [Business Value/Outcome]

---

## Context & Background

[Brief description of why this story exists, business problem it solves]

---

## Acceptance Criteria

### Happy Path
- [ ] **GIVEN** [precondition/context]  
      **WHEN** [user action/trigger]  
      **THEN** [expected result/system behavior]

- [ ] **GIVEN** [another scenario context]  
      **WHEN** [action]  
      **THEN** [result]

### Edge Cases
- [ ] **GIVEN** [edge case context]  
      **WHEN** [action]  
      **THEN** [how system handles it]

### Validation Rules
- [ ] Field X must be [validation rule]
- [ ] User must have [permission/state]
- [ ] System must check [business rule]

---

## Business Rules

| Rule ID | Rule Description | Example |
|---------|------------------|---------|
| BR-X.Y.1 | [Rule statement] | [Concrete example] |
| BR-X.Y.2 | [Another rule] | [Example] |

---

## Data Requirements

### Input Data
```yaml
required:
  field_name: data_type (validation_rules)
  email: string (format: email, unique)
  
optional:
  field_name: data_type (default: value)
```

### Output Data
```yaml
success_response:
  field_name: data_type
  user_id: uuid
  
error_response:
  error_code: string
  message: string
```

### Relationships
- [Entity A] `has_many` [Entity B]
- [Entity C] `belongs_to` [Entity D]

---

## User Flow

```
1. User [action]
2. System [validation/processing]
3. System [response/next step]
4. User [next action]
```

---

## UI/UX Requirements

- **Screen/Page**: [Name of page/screen]
- **Components**: [List of UI components needed]
- **Interactions**: [User interactions required]
- **Responsive**: Yes/No - [mobile/tablet/desktop considerations]
- **Accessibility**: [WCAG requirements, screen reader support]

---

## Success Criteria

- **User Success Metric**: [How to measure user success]
- **Technical Metric**: [Performance/reliability requirements]
- **Business KPI**: [Business outcome measurement]

---

## Constraints & Assumptions

### Technical Constraints
- [Technology limitation]
- [Integration constraint]

### Business Constraints
- [Budget/time limitation]
- [Regulatory requirement]

### Assumptions
- [What we're assuming about users]
- [What we're assuming about environment]

---

## Dependencies

### Depends On (Blockers)
- [ ] US-X.Y - [Story that must be completed first]

### Blocks (Downstream)
- [ ] US-X.Z - [Story that depends on this]

### Related Stories
- US-X.W - [Related but not blocking]

---

## Out of Scope

- [Explicitly not included in this story]
- [Features for future iterations]

---

## Questions & Decisions

| Question | Answer | Decided By | Date |
|----------|--------|------------|------|
| [Open question] | [Decision made or "TBD"] | [Person/Team] | YYYY-MM-DD |

---

## Attachments

- Mockup: [Link or path to design files]
- Flowchart: [Link to flow diagram]
- Research: [Link to user research/data]

---

## Changelog

| Date | Author | Changes |
|------|--------|---------|
| YYYY-MM-DD | [Name] | Initial draft |
| YYYY-MM-DD | [Name] | Added acceptance criteria |
| YYYY-MM-DD | [Name] | Approved for development |
