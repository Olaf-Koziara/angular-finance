# Security Considerations

This document outlines security considerations for the Angular Finance Server.

## Current Security Implementation

### ✅ Implemented

1. **Password Security**
   - Passwords are hashed using bcrypt with 10 salt rounds
   - Plain text passwords are never stored
   - Password requirements enforced: minimum 8 characters, uppercase, lowercase, and number

2. **Authentication (JWT with Access/Refresh Tokens)**
   - **Access Tokens**: Short-lived (15 minutes by default), sent via Authorization header
   - **Refresh Tokens**: Long-lived (7 days by default), stored in HttpOnly cookies
   - Token rotation: New refresh token issued on each refresh, old token revoked
   - Separate secrets for access and refresh tokens (configurable)
   - Revocation support: Individual tokens or all user tokens can be revoked
   - Secure token verification with proper error handling

3. **CSRF Protection**
   - `sameSite: 'strict'` on all cookies prevents cross-origin cookie sending
   - CORS origin validation restricts cross-origin requests
   - Path-scoped cookies limit exposure to auth endpoints only

4. **Rate Limiting**
   - Login endpoint: 5 attempts per 15 minutes per IP
   - Register/Refresh endpoints: 10 attempts per 15 minutes per IP
   - General endpoints: 60 requests per minute per IP

5. **Input Validation**
   - All user inputs validated using Zod schemas
   - Email format validation
   - Password strength requirements
   - Sanitized error messages

6. **Security Headers**
   - Helmet middleware for secure HTTP headers
   - CORS configuration for cross-origin requests

7. **Error Handling**
   - No sensitive information leaked in error messages
   - Different messages for production vs development
   - Proper error logging

8. **Environment Configuration**
   - Sensitive data stored in environment variables
   - Example configuration file (.env.example) provided
   - Actual .env file gitignored

## Token Flow

### Login/Register Flow:
1. User sends credentials
2. Server validates credentials
3. Server generates access token (15m) and refresh token (7d)
4. Access token returned in response body
5. Refresh token set as HttpOnly cookie

### API Request Flow:
1. Client sends request with `Authorization: Bearer <access_token>`
2. If token expired (401), client calls refresh endpoint
3. Refresh endpoint validates refresh token from cookie
4. New token pair generated, old refresh token revoked
5. Client retries original request with new access token

### Logout Flow:
1. Client calls logout endpoint
2. Server revokes refresh token in database
3. Server clears HttpOnly cookie
4. Client clears stored access token

## ⚠️ Production Recommendations

### Additional Production Measures

1. **HTTPS Only**
   - Always use HTTPS in production
   - Set `COOKIE_SECURE=true` in production environment
   - Configure secure cookie settings

2. **Database Security**
   - Use connection pooling
   - Limit database user permissions
   - Regular backups
   - Encrypt data at rest

3. **Secrets Management**
   - Use a dedicated secrets manager (AWS Secrets Manager, Azure Key Vault, HashiCorp Vault)
   - Use separate secrets for JWT_SECRET and JWT_REFRESH_SECRET
   - Rotate JWT secrets regularly
   - Never commit secrets to version control

4. **Monitoring & Logging**
   - Implement comprehensive logging
   - Monitor for suspicious activities (unusual refresh token usage)
   - Set up alerts for failed login attempts
   - Log authentication events
   - Clean up expired/revoked tokens periodically

5. **API Security**
   - Implement API versioning
   - Add request size limits
   - Implement timeout for requests
   - Consider adding API keys for service-to-service communication

6. **Dependency Security**
   - Regularly update dependencies
   - Use `npm audit` to check for vulnerabilities
   - Consider using Dependabot or similar tools

7. **Testing**
   - Regular security testing
   - Penetration testing
   - Automated security scans in CI/CD

## Security Checklist for Deployment

- [x] Implement rate limiting on all authentication endpoints
- [ ] Configure HTTPS/TLS
- [ ] Use strong, unique JWT_SECRET (at least 32 characters)
- [ ] Use separate JWT_REFRESH_SECRET for refresh tokens
- [x] Set appropriate JWT token expiration (access: 15m, refresh: 7d)
- [ ] Enable database connection encryption
- [ ] Configure secure CORS origins (not wildcards)
- [ ] Set up monitoring and alerting
- [ ] Review and customize Helmet configuration
- [ ] Implement request size limits
- [ ] Add request timeout configuration
- [ ] Set up regular security audits
- [ ] Configure logging to external service
- [ ] Test backup and recovery procedures
- [ ] Set up periodic cleanup of expired tokens

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly rather than using the public issue tracker.
