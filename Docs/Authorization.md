# FreshMarket – Authorization Matrix

## 1. Purpose

FreshMarket uses JWT-based authentication (AuthN) to identify users and authorization (AuthZ) to control access based on user roles and resource ownership. RBAC determines whether a user can perform an action, while ownership checks ensure users can only access or modify resources they own. See `docs/erd.md` for the database ownership chain.

## 2. Roles

| Role | Capabilities Summary |
|---|---|
| vendor | Own store, products, vendor orders |
| customer | Cart, checkout, own orders |
| anonymous | Public catalogue only (Chapter 14) |

## 3. Master Authorization Matrix

| Action | Route | Authn | Role | Ownership / Scope | Deny Status | Status |
|---|---|---|---|---|---|---|
| Health | GET /health | none | — | — | — | Current |
| Register | POST /api/auth/register | none | — | — | — | Current |
| Me | GET /api/auth/me | JWT | any | self | 401 | Current |
| Patch store | PATCH /api/stores/:id | JWT | vendor | store.userId = req.user.id | 403 | Planned |
| Create store | POST /api/stores | JWT | vendor | One store per user (Ch 9) | 403 | Planned |
| Create product | POST /api/products | JWT | vendor | product.storeId = own store | 403 | Planned |
| Patch product | PATCH /api/products/:id | JWT | vendor | Via store chain | 403 | Planned |
| Public catalogue | GET /api/products | optional | — | Published only | — | Planned |
| Get cart | GET /api/cart | JWT | customer | cart.userId | 403 | Planned |
| Checkout | POST /api/checkout | JWT | customer | Own cart | 403 | Planned |
| Vendor orders | GET /api/vendor/orders | JWT | vendor | order.storeId → own store | 403 | Planned |
| Customer orders | GET /api/orders/my | JWT | customer | order.customerId | 403 | Planned |

## 4. Check Types Glossary

| Type | Meaning |
|---|---|
| none | Public |
| JWT | requireAuth |
| role | requireRole(...) |
| ownership | Database lookup chain |
| scope | Query filter `{ userId: req.user.id }` |

## 5. IDOR Test Checklist

- [ ] Vendor B PATCH Vendor A store → 403
- [ ] Vendor B PATCH Vendor A product → 403 (Chapter 11)
- [ ] Customer A GET Customer B cart → 403 (Chapter 16)

## 6. HTTP Status Rules

| Status | Meaning | Usage |
|---|---|---|
| 401 Unauthorized | User is not authenticated | Missing or invalid JWT |
| 403 Forbidden | User is authenticated but lacks permission | Wrong role or ownership |
| 404 Not Found | Requested resource does not exist | Missing store or resource |

Return 401 for authentication failures and 403 for authorization failures. Do not return 401 for ownership or role failures.