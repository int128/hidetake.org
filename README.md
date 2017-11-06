# hidetake.org [![CircleCI](https://circleci.com/gh/int128/hidetake.org.svg?style=shield)](https://circleci.com/gh/int128/hidetake.org)

## Run and deploy

```sh
# Install SDK
gcloud components install app-engine-go

# Run
dev_appserver.py app.yaml

# Deploy
gcloud app deploy --project=$PROJECT_ID
```

## Deploy from CircleCI

Set following environment variables:

- `GCP_PROJECT_ID` - Project ID
- `GCP_SERVICE_ACCOUNT_KEY` - Result of `base64 -i key.json`

