# Pull Request Summary: Consolidate Frontend Contributor Guidelines

## Description
This PR consolidates the repetitive frontend contributor guidelines into a single, comprehensive mandate. It ensures that both human contributors and AI agents have a clear, unified understanding of the scope, quality, and testing expectations for UI work in the `apps/web/src/` directory.

## Changes
- **Issue Templates**: Updated `.github/ISSUE_TEMPLATE/frontend_feature.md` and `.github/ISSUE_TEMPLATE/frontend_feature_concise.md` with the consolidated guideline statement.
- **Documentation**: 
  - Created `CONTRIBUTING.md` at the root to guide human contributors.
  - Created `GEMINI.md` at the root to establish core mandates for agents.

## Consolidated Mandate
> To ensure frontend UI work has clear scope and test expectations, contributors must implement responsive and accessible features in `apps/web/src/` by extending shared UI and state primitives with narrow interfaces, explicitly handling all states (empty, loading, disabled, missing-data), and providing targeted tests for success paths and edge cases (blocked/fallback) to ensure the behavior is reachable, backward compatible, and fully exercises any introduced utilities.

## Verification
- Verified that all issue templates render correctly.
- Confirmed that the new `.md` files are present in the repository root.
- All changes have been committed and pushed to the `main` branch.
