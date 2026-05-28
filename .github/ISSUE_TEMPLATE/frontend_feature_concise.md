---
name: Frontend Feature (Concise)
about: Minimal frontend backlog item template
title: '[Frontend] '
labels: ['frontend', 'feature', 'quick']
assignees: ''
---

## Implementation Requirements

Build UI features in `frontend/src/{pages,components,styles,tests}/*` that extend shared primitives, handle all states (empty, loading, disabled, missing-data), preserve responsive/accessibility behavior, maintain backward compatibility, include targeted component/integration tests with edge-case coverage, and ensure the UI change is reachable through clear user entry points while exercising any shared utilities through representative usage.

## Checklist
- [ ] Feature implemented in appropriate directory
- [ ] All UI states handled (empty, loading, disabled, missing-data)
- [ ] Responsive and accessible
- [ ] Backward compatible
- [ ] Tests include success path and edge cases
- [ ] Clear user entry point
- [ ] Shared utilities properly exercised

## Background
Contributors need implementation-ready frontend backlog items so UI work can be picked up with clear scope and test expectations.

## Feature Focus
Add the UI behavior or platform support described in the issue title.

## Where to Implement (Exact Targets)
- `apps/web/src/pages/*`
- `apps/web/src/components/*`
- `apps/web/src/styles/*`
- `apps/web/src/tests/*`

## What to Implement
- Build the feature, component, or UI pattern described in the issue title.
- Reuse shared UI or platform primitives where the change obviously belongs.
- Handle empty, loading, disabled, and missing-data states explicitly.
- Preserve responsive behavior and accessibility expectations.

## Interface / Endpoint / Method Details
- Prefer extending shared components and state primitives over page-local one-offs.
- Keep props and state interfaces narrow and predictable.
- Avoid regressions in navigation, focus management, and error handling.

## Acceptance Criteria
- The new UI behavior is reachable through a clear user entry point.
- Responsive and accessibility behavior remain intact.
- Existing page flows remain backward compatible.

## Required Tests
- Add targeted component or integration coverage for the primary success path.
- Add at least one regression or edge-case test for empty, blocked, or fallback behavior.

## Definition of Done
- The UI change is implemented and covered by tests.
- Any shared utility or component introduced by the change is exercised through representative usage.

## Checklist (for PR)
- [ ] Feature implemented in appropriate `apps/web/src/*` directory
- [ ] All UI states handled (empty, loading, disabled, missing-data)
- [ ] Responsive and accessible
- [ ] Backward compatible
- [ ] Tests include success path and edge cases
- [ ] Clear user entry point
- [ ] Shared utilities properly exercised