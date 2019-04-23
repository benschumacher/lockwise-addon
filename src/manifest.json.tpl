{
  "manifest_version": 2,
  "name": "{{title}}",
  "version": "{{version}}",
  "description": "{{description}}",
  "icons": {
    "48": "icons/lb_locked.svg",
    "96": "icons/lb_locked.svg"
  },


  "content_security_policy": "script-src 'self' {{testing_csp_scripts}} ; object-src 'self' {{testing_csp_objects}}",

  "applications": {
    "gecko": {
      "id": "{{id}}",
      "strict_min_version": "63.0"
    }
  },

  "background": {
    "scripts": ["background.js"]
  },

  "browser_action": {
    "default_icon": {
      "32": "icons/lb_locked.svg"
    },
    "default_title": "{{title}}",
    "browser_style": false
  },

  "sidebar_action": {
    "default_icon": {
      "16": "icons/icon-lockbox.svg",
      "32": "icons/icon-lockbox.svg"
    },
    "default_title": "{{title}}",
    "default_panel": "list/popup.html"
  },

  "commands": {
    "_execute_sidebar_action": {
      "suggested_key": {
        "default": "Ctrl+Shift+L"
      }
    }
  },

  "experiment_apis": {
    "logins": {
      "schema": "experiments/logins/schema.json",
      "parent": {
        "scopes": ["addon_parent"],
        "script": "experiments/logins/api.js",
        "paths": [["experiments", "logins"]]
      }
    },
    "sync": {
      "schema": "experiments/sync/schema.json",
      "parent": {
        "scopes": ["addon_parent"],
        "script": "experiments/sync/api.js",
        "paths": [["experiments", "sync"]]
      }
    },
    "temptelemetry": {
      "schema": "experiments/temptelemetry/schema.json",
      "parent": {
        "scopes": ["addon_parent"],
        "script": "experiments/temptelemetry/api.js",
        "paths": [["experiments", "temptelemetry"]]
      }
    }
  },

  "permissions": [
    "tabs",
    "clipboardRead",
    "clipboardWrite",
    "mozillaAddons",
    "storage",
    "telemetry"
  ]
}
