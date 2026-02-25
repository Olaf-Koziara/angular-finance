import json
import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 720})
    page = context.new_page()

    # Mock Auth
    user = {
        "id": "user1",
        "email": "test@example.com",
        "name": "Test User"
    }
    # Note: we use json.dumps here, so we need to be careful with quotes
    user_json = json.dumps(user)

    page.add_init_script(f"""
        window.sessionStorage.setItem('auth_access_token', 'mock-token');
        window.sessionStorage.setItem('auth_user', '{user_json}');
    """)

    # Mock API
    transactions = {
        "items": [
            {
                "id": "1",
                "date": "2023-11-01T10:00:00Z",
                "title": "Grocery Shopping",
                "category": "Food",
                "type": "expense",
                "amount": 50.25
            },
            {
                "id": "2",
                "date": "2023-11-02T14:30:00Z",
                "title": "Salary",
                "category": "Other",
                "type": "income",
                "amount": 3000
            }
        ],
        "total": 2
    }

    page.route("**/api/transactions*", lambda route: route.fulfill(
        status=200,
        content_type="application/json",
        body=json.dumps(transactions)
    ))

    page.route("**/api/dashboard*", lambda route: route.fulfill(status=200, body=json.dumps({})))
    page.route("**/api/budgets*", lambda route: route.fulfill(status=200, body=json.dumps({"items": [], "total": 0})))

    # Navigate
    page.goto("http://localhost:4200/transactions")

    # Wait for table
    try:
        page.wait_for_selector("table.transaction-table", timeout=10000)
    except Exception as e:
        page.screenshot(path="client/verification/error.png")
        print(f"Error waiting for table: {e}")
        raise e

    # Locate edit button inside the table
    # We target the first edit button in the table actions column
    edit_button = page.locator("table.transaction-table button[color='primary']").first

    # Hover
    edit_button.hover()

    # Wait a bit for tooltip
    time.sleep(1)

    # Screenshot
    page.screenshot(path="client/verification/transactions_tooltip.png")
    print("Screenshot saved to client/verification/transactions_tooltip.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
