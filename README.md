# hidetake.org

This is my website serving on App Engine.

## How to run and deploy

```
# Install SDK
gcloud components install app-engine-go

# Run
dev_appserver.py app.yaml

# Deploy
gcloud app deploy --project=$PROJECT_ID
```
