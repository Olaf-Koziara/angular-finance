# Case Study: Reactive Currency Formatting with Angular Pipes

## Problem
In our financial application, monetary values must be displayed according to a global user preference (e.g., USD, EUR, PLN).
The initial approach required:
1.  Injecting `SettingsService` into every single component that displayed a monetary value.
2.  Manually fetching the current currency code.
3.  Passing both the value and the currency code to a utility function: `formatCurrency(value, currentCurrency)`.
4.  Implementing manual reactivity (computeds or effects) to ensure the view refreshed when the setting changed.

This resulted in **boilerplate code** and repetitive dependency injection across the application logic.

## Solution: `AppCurrencyPipe`
We implemented a custom Angular Pipe (`AppCurrencyPipe`) to handle this responsibility centrally.

### Key Implementation Details
*   **Dependency Injection**: The pipe currently injects `SettingsService` directly.
*   **Impure Pipe (`pure: false`)**: By default, Angular pipes are "pure" and only re-calculate when their input arguments change. Since the numeric value (e.g., `100`) stays the same while the *currency context* changes, a pure pipe wouldn't update. Setting `pure: false` allows the pipe to run on every change detection cycle, picking up the new signal value from the service.

### Benefits
1.  **Simplified Templates**: Usage is reduced to a simple declarative syntax: `{{ value | appCurrency }}`.
2.  **Cleaner Component Code**: Components (like `FinancialSummaryCard` or `BudgetChart`) no longer need to know about `SettingsService` or handle formatting logic.
3.  **Global Reactivity**: Changing the currency in the settings dialog instantly updates every number in the application without requiring page reloads or manual subscriptions in individual components.
4.  **Symbol-Only Mode**: Passing an empty string or null value (`{{ "" | appCurrency }}`) allows the pipe to return just the currency symbol (e.g., "$", "€") for input prefixes or labels, maintaining reactivity.
