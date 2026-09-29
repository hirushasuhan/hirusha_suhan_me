# Next.js Portfolio Release & Deployment Protocol

## Pre-Release Verification

1. **Working Tree Inspection:**
   ```bash
   git status
   git diff
   ```
2. **Production Compilation Check:**
   ```bash
   npm run build
   ```
   *Ensure all static routes compile cleanly and TypeScript passes.*

## Versioning & Tagging

1. **Version Update:**
   Update `"version"` in `package.json`:
   ```json
   "version": "1.1.2"
   ```
2. **Stage & Commit:**
   ```bash
   git add -A
   git commit -m "Release v1.1.2: <Summary of changes>"
   ```
3. **Annotated Tag:**
   ```bash
   git tag -a v1.1.2 -m "Release v1.1.2: <Detailed notes>"
   ```

## Remote Deployment Gate

1. **User Confirmation Prompt:**
   - Present commit hash, tag version, and list of modified files.
   - Await explicit user authorization.
2. **Push to Remote:**
   ```bash
   git push origin master --follow-tags
   ```
3. **Post-Push Health Verification:**
   ```bash
   git status
   git log --oneline --decorate -n 3
   ```
