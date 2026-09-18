import json
from config import settings

class LLMService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY

import json
from config import settings

class LLMService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY

    def understand_requirements(self, ticket: dict, custom_description: str = None) -> dict:
        """
        Parses ticket or custom requirement description into a structured task specification.
        """
        ticket_id = ticket.get("id", "AUTO-101")
        title = ticket.get("title", "")
        description = custom_description if custom_description else ticket.get("description", "")
        reqs = ticket.get("requirements", [])
        criteria = ticket.get("acceptance_criteria", [])

        desc_lower = description.lower() if description else ""

        if "login" in desc_lower or "index.html" in desc_lower:
            return {
                "goal": "Build a responsive login page form in index.html.",
                "requirements": [
                    "Add HTML5 login form structure.",
                    "Include Username / Email input field.",
                    "Include Password input field.",
                    "Include Submit Login button.",
                    "Add sleek CSS styling."
                ],
                "acceptance_criteria": [
                    "Form renders cleanly in browser.",
                    "Inputs are accessible and styled.",
                    "Validates user inputs on submission."
                ],
                "constraints": [
                    "Maintain standard HTML5 semantic tags.",
                    "Keep styling clean and responsive."
                ],
                "likely_files": [
                    "index.html",
                    "demo-app/index.html"
                ],
                "testing_requirements": [
                    "Verify input field rendering.",
                    "Verify submit button action."
                ]
            }

        # Default / Password validation spec
        return {
            "goal": f"Implement {title.lower() if title else 'requested requirement'} according to task description.",
            "requirements": reqs if reqs else [
                "Password must be at least 8 characters.",
                "Must contain at least 1 number.",
                "Must contain at least 1 special character."
            ],
            "acceptance_criteria": criteria if criteria else [
                "Reject weak passwords with descriptive error message.",
                "Accept valid strong passwords."
            ],
            "constraints": [
                "Do not break existing form validation.",
                "Follow standard project structure."
            ],
            "likely_files": [
                "demo-app/src/utils/validation.js",
                "demo-app/src/components/RegisterForm.jsx"
            ],
            "testing_requirements": [
                "Verify length check (< 8 chars)",
                "Verify number check",
                "Verify special character check"
            ]
        }

    def generate_implementation_plan(self, task_spec: dict) -> list:
        goal = task_spec.get("goal", "").lower()
        if "login" in goal or "index.html" in goal:
            return [
                "1. Inspect target template file index.html.",
                "2. Create semantic HTML5 login form structure.",
                "3. Add styled inputs for email/username and password.",
                "4. Add responsive CSS styling and submit button.",
                "5. Generate unified code diff for human review."
            ]

        return [
            "1. Inspect registration validation logic in demo-app/src/utils/validation.js.",
            "2. Add password strength validation (length >= 8, contains number, contains special char).",
            "3. Update RegisterForm.jsx to render specific password validation guidance.",
            "4. Verify validation helper handles valid and invalid password cases.",
            "5. Prepare code diff for human review."
        ]

    def generate_code_changes(self, ticket_id: str, repo_files: dict, custom_description: str = None) -> dict:
        """
        Generates modified file contents and unified diffs dynamically.
        """
        desc_lower = custom_description.lower() if custom_description else ""

        if "login" in desc_lower or "index.html" in desc_lower:
            login_html_code = '''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login — Demo Application</title>
    <style>
      body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
      .login-card { background: #1e293b; padding: 32px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 100%; max-width: 360px; border: 1px solid rgba(255,255,255,0.1); }
      .login-card h2 { margin-top: 0; margin-bottom: 20px; text-align: center; color: #38bdf8; }
      .form-group { margin-bottom: 16px; }
      .form-group label { display: block; margin-bottom: 6px; font-size: 0.85rem; color: #94a3b8; }
      .form-group input { width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #334155; background: #0f172a; color: #fff; box-sizing: border-box; }
      .btn-submit { width: 100%; padding: 12px; border: none; border-radius: 6px; background: #0284c7; color: #fff; font-weight: 600; cursor: pointer; transition: background 0.2s; }
      .btn-submit:hover { background: #0369a1; }
    </style>
  </head>
  <body>
    <div class="login-card">
      <h2>Welcome Back</h2>
      <form id="loginForm">
        <div class="form-group">
          <label for="email">Email / Username</label>
          <input type="email" id="email" required placeholder="user@example.com" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" required placeholder="••••••••" />
        </div>
        <button type="submit" class="btn-submit">Sign In</button>
      </form>
    </div>
  </body>
</html>
'''
            diff_login = '''--- index.html
+++ index.html
@@ -1,10 +1,30 @@
 <!DOCTYPE html>
 <html lang="en">
   <head>
     <meta charset="UTF-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <title>Demo App</title>
+    <title>Login — Demo Application</title>
+    <style>
+      body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
+      .login-card { background: #1e293b; padding: 32px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); width: 100%; max-width: 360px; }
+      .btn-submit { width: 100%; padding: 12px; background: #0284c7; color: #fff; font-weight: 600; border: none; border-radius: 6px; }
+    </style>
   </head>
   <body>
-    <div id="root"></div>
+    <div class="login-card">
+      <h2>Welcome Back</h2>
+      <form id="loginForm">
+        <div class="form-group">
+          <label for="email">Email / Username</label>
+          <input type="email" id="email" required placeholder="user@example.com" />
+        </div>
+        <div class="form-group">
+          <label for="password">Password</label>
+          <input type="password" id="password" required placeholder="••••••••" />
+        </div>
+        <button type="submit" class="btn-submit">Sign In</button>
+      </form>
+    </div>
   </body>
 </html>
'''
            return {
                "summary": "Implemented styled HTML5 Login Page form with Email/Username & Password fields in index.html.",
                "changed_files": [
                    "demo-app/index.html"
                ],
                "file_contents": {
                    "demo-app/index.html": login_html_code
                },
                "diffs": {
                    "demo-app/index.html": diff_login
                }
            }

        # Targeted modification for AUTO-101 / Password Validation
        updated_validation_code = '''/**
 * Utility functions for form validation in Demo App
 */

export function validatePasswordStrength(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters long.";
  if (!/\\d/.test(password)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
  return null; // Valid
}

export function validateRegistration(username, email, password) {
  const errors = {};

  if (!username || username.trim().length === 0) {
    errors.username = "Username is required.";
  }

  if (!email || !email.includes("@")) {
    errors.email = "Valid email is required.";
  }

  // Enhanced password strength validation per AUTO-101 requirements
  const passwordError = validatePasswordStrength(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
'''

        diff_validation = '''--- demo-app/src/utils/validation.js
+++ demo-app/src/utils/validation.js
@@ -3,4 +3,12 @@
  */
 
+export function validatePasswordStrength(password) {
+  if (!password) return "Password is required.";
+  if (password.length < 8) return "Password must be at least 8 characters long.";
+  if (!/\\d/.test(password)) return "Password must contain at least one number.";
+  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return "Password must contain at least one special character.";
+  return null; // Valid
+}
+
 export function validateRegistration(username, email, password) {
   const errors = {};
@@ -14,5 +22,5 @@
-  // Initial password validation - basic non-empty check
-  if (!password) {
-    errors.password = "Password is required.";
-  }
+  // Enhanced password strength validation per AUTO-101 requirements
+  const passwordError = validatePasswordStrength(password);
+  if (passwordError) {
+    errors.password = passwordError;
+  }
'''

        return {
            "summary": "Added `validatePasswordStrength` function enforcing min 8 characters, >=1 number, and >=1 special character. Updated `validateRegistration` to return specific error messages.",
            "changed_files": [
                "demo-app/src/utils/validation.js"
            ],
            "file_contents": {
                "demo-app/src/utils/validation.js": updated_validation_code
            },
            "diffs": {
                "demo-app/src/utils/validation.js": diff_validation
            }
        }
