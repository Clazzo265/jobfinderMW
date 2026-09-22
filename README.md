"# jobfinderMW"

## Deploying

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` deploys the client to GitHub Pages after pushes to `main`. In the repository, open **Settings > Pages** and choose **GitHub Actions** as the source.

GitHub Pages hosts only the static client. Deploy the `server` directory to a Node-compatible host such as Render, Railway, or Fly.io, and configure its `RAPIDAPI_KEY` environment variable. Then create a repository variable named `VITE_API_URL` under **Settings > Secrets and variables > Actions > Variables**, with the deployed API URL ending in `/api`, for example:

```text
https://your-api-host.example/api
```
