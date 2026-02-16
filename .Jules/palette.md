## 2026-02-16 - Contextual Action Labels
**Learning:** Icon-only buttons in data tables (Edit, Delete) are inaccessible without context. Using generic labels like "Edit" for every row confuses screen reader users.
**Action:** Use parameterized translation keys (e.g., `EDIT_ROW: "Edit transaction: {{title}}"`) to generate unique, descriptive ARIA labels for each row's actions. This pattern should be standard for all list/table components.
