# Minimal demo of possible middleware `NextResponse.redirect()` Bug

Demonstrates that NextResponse.redirect is not obeying explicit urls when redirecting from a subdomain `foo.example.test` to the apex domain `example.test`

In this example, middleware has been set to catch a specific subdomain route and to redirect it to an explicitly set route on the apex domain
'http://foo.example.test:3000/shouldredirect' -> 'http://example.test:3000/login'

This does not happen - it redirects to the same path but on the subdomain.

## To Reproduce

Set `/etc/hosts`:

```
127.0.0.1 example.test
127.0.0.1 foo.example.test
```

Install Packages:

```
npm i
```

Start Server:

```
npm run dev
```

Then Navigate to the following link and observe the result.
'http://foo.example.test:3000/shouldredirect'

Middleware should select for this route and redirect to the apex domain '/login' page

**Expected Result:**
Redirect to : 'http://example.test:3000/login' -> 'Hooray - we redirected properly'

**Actual Result:**
Redirect to : 'http://foo.example.test:3000/login' -> 'Should not be redirected here'
